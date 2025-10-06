import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useTrainData from './hooks/useTrainData';
import StationSelect from './components/StationInput';
import TripCard from './components/TripCard';
import FavoriteRouteCard from './components/FavoriteRouteCard';
import { SwapIcon, StarIcon, SunIcon, MoonIcon, ChevronLeftIcon, ChevronRightIcon, FacebookIcon } from './components/IconComponents';
import { Trip, FavoriteRoute } from './types';
import { useLanguage } from './hooks/useLanguage';
import { t } from './services/translations';


type Tab = 'suburban' | 'mainline';

// --- Helper Components defined in-file for simplicity ---

const useTheme = (): [string, () => void] => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('sntf-theme') || 'light';
        }
        return 'light';
    });

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('sntf-theme', theme);
    }, [theme]);

    return [theme, toggleTheme];
};


const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);
    return <div className="text-lg font-mono text-gray-700 dark:text-gray-300">{time.toLocaleTimeString('fr-FR')}</div>;
};

const Loader: React.FC = () => (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900 text-blue-800 dark:text-blue-300">
         <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-2xl mt-4">Chargement des données des trains...</p>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
    const { stations, findTrips, loading } = useTrainData();
    const [fromStation, setFromStation] = useState('');
    const [toStation, setToStation] = useState('');
    const [searchDate, setSearchDate] = useState(new Date());
    const [trips, setTrips] = useState<Trip[]>([]);
    const [nextTripIndex, setNextTripIndex] = useState<number>(-1);
    const [searched, setSearched] = useState(false);
    const [favorites, setFavorites] = useState<FavoriteRoute[]>([]);
    const [activeTab, setActiveTab] = useState<Tab>('suburban');
    const [theme, toggleTheme] = useTheme();
    const [lang, setLang] = useLanguage();

    const toggleLang = () => {
        setLang(lang === 'fr' ? 'ar' : 'fr');
    }

    useEffect(() => {
        const storedFavorites = localStorage.getItem('sntf-favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);
    
    const parseTime = (timeStr: string): number => {
        if (!timeStr || !timeStr.includes(':')) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const filteredStations = useMemo(() => {
        return stations.filter(s => s.category === activeTab || s.category === 'both');
    }, [stations, activeTab]);

    const handleSearch = () => {
        if (fromStation && toStation) {
            const results = findTrips(fromStation, toStation, searchDate, activeTab);
            setTrips(results);

            // Find next available train
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const searchDay = new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate());
            
            let nextIndex = -1;
            if (searchDay.getTime() === today.getTime()) {
                 const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
                 nextIndex = results.findIndex(trip => parseTime(trip.departureTime) > currentTimeInMinutes);
            }
            setNextTripIndex(nextIndex);

            setSearched(true);
        } else {
            alert(t(lang, "selectStationsPrompt"));
        }
    };

    const handleSwap = () => {
        setFromStation(toStation);
        setToStation(fromStation);
    };

    const handleReset = () => {
        setFromStation('');
        setToStation('');
        setTrips([]);
        setSearched(false);
        setNextTripIndex(-1);
        setSearchDate(new Date());
    };

    const handleFavoriteSelect = (route: FavoriteRoute) => {
        const fromStationObj = stations.find(s => s.name === route.from);
        const toStationObj = stations.find(s => s.name === route.to);

        if (fromStationObj && toStationObj) {
            // Check if the route belongs primarily to one category to switch tabs appropriately
            const isSuburbanRoute = (fromStationObj.category === 'suburban' || fromStationObj.category === 'both') && (toStationObj.category === 'suburban' || toStationObj.category === 'both');
            const isMainlineRoute = (fromStationObj.category === 'mainline' || fromStationObj.category === 'both') && (toStationObj.category === 'mainline' || toStationObj.category === 'both');
            
            let tabForFavorite = activeTab;

            if (isSuburbanRoute && activeTab !== 'suburban') {
                tabForFavorite = 'suburban';
                setActiveTab('suburban');
            } else if (isMainlineRoute && !isSuburbanRoute && activeTab !== 'mainline') {
                tabForFavorite = 'mainline';
                setActiveTab('mainline');
            }
            
            // Set stations after potential tab switch to ensure they are in the filtered list
            setFromStation(route.from);
            setToStation(route.to);
            
            // Auto-search when a favorite is clicked
             const today = new Date();
            setSearchDate(today);
            
            // Use a timeout to ensure the state update from tab change is processed before searching
            setTimeout(() => {
                const results = findTrips(route.from, route.to, today, tabForFavorite);
                setTrips(results);
                setSearched(true);

                // Recalculate next trip index
                const now = new Date();
                const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
                const nextIndex = results.findIndex(trip => parseTime(trip.departureTime) > currentTimeInMinutes);
                setNextTripIndex(nextIndex);
            }, 0);
        }
    };

    const isCurrentRouteFavorite = useMemo(() => {
        if (!fromStation || !toStation) return false;
        return favorites.some(fav => fav.from === fromStation && fav.to === toStation);
    }, [fromStation, toStation, favorites]);

    const toggleFavorite = () => {
        if (!fromStation || !toStation) return;

        const fromStationObj = stations.find(s => s.name === fromStation);
        const toStationObj = stations.find(s => s.name === toStation);
        if (!fromStationObj || !toStationObj) return;

        let newFavorites;
        if (isCurrentRouteFavorite) {
            newFavorites = favorites.filter(fav => !(fav.from === fromStation && fav.to === toStation));
        } else {
            newFavorites = [...favorites, { from: fromStation, to: toStation, fromAr: fromStationObj.nameAr, toAr: toStationObj.nameAr }];
        }
        setFavorites(newFavorites);
        localStorage.setItem('sntf-favorites', JSON.stringify(newFavorites));
    };
    
    const deleteFavorite = (routeToDelete: FavoriteRoute) => {
        const newFavorites = favorites.filter(fav => !(fav.from === routeToDelete.from && fav.to === routeToDelete.to));
        setFavorites(newFavorites);
        localStorage.setItem('sntf-favorites', JSON.stringify(newFavorites));
    };
    
    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        handleReset();
    }

    const handleDateChange = (days: number) => {
        setSearchDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        });
    };


    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Toggle dark mode">
                                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                            </button>
                             <button onClick={toggleLang} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-semibold text-sm w-10 h-10 flex items-center justify-center" aria-label={t(lang, 'language')}>
                                 {lang === 'fr' ? 'AR' : 'FR'}
                             </button>
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 dark:text-blue-300">{t(lang, 'title')}</h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t(lang, 'subtitle')}</p>
                        </div>
                        <Clock />
                    </div>
                </header>

                <main className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                     <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg flex p-1 mb-6 relative">
                         <div
                            className="absolute top-1 bottom-1 bg-blue-600 rounded-md shadow-md transition-all duration-300 ease-in-out"
                            style={{
                                width: 'calc(50% - 4px)',
                                transform: lang === 'ar' ? 'translateX(-100%)' : 'translateX(0)',
                                left: activeTab === 'suburban' ? (lang === 'ar' ? '100%' : '4px') : (lang === 'ar' ? '50%' : '50%'),
                            }}
                        />
                        <button onClick={() => handleTabChange('suburban')} className={`w-1/2 p-3 font-bold rounded-md z-10 transition-colors ${activeTab === 'suburban' ? 'text-white' : 'text-blue-800 dark:text-blue-200'}`}>
                            {t(lang, 'suburbanTab')}
                        </button>
                        <button onClick={() => handleTabChange('mainline')} className={`w-1/2 p-3 font-bold rounded-md z-10 transition-colors ${activeTab === 'mainline' ? 'text-white' : 'text-blue-800 dark:text-blue-200'}`}>
                            {t(lang, 'mainlineTab')}
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <StationSelect id="from" placeholder={t(lang, 'fromPlaceholder')} value={fromStation} onChange={(e) => setFromStation(e.target.value)} stations={filteredStations} lang={lang}/>
                        <button onClick={handleSwap} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-600 transition transform hover:rotate-180" aria-label={t(lang, 'swapStations')}>
                            <SwapIcon className="rtl:-scale-x-100"/>
                        </button>
                        <StationSelect id="to" placeholder={t(lang, 'toPlaceholder')} value={toStation} onChange={(e) => setToStation(e.target.value)} stations={filteredStations} lang={lang}/>
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex items-center w-full sm:w-auto">
                            <button onClick={() => handleDateChange(-1)} className="p-3 bg-gray-100 dark:bg-gray-700 ltr:rounded-l-lg rtl:rounded-r-lg hover:bg-gray-200 dark:hover:bg-gray-600" aria-label={t(lang, 'previousDay')}><ChevronLeftIcon className="rtl:-scale-x-100"/></button>
                            <label htmlFor="search-date" className="sr-only">{t(lang, 'searchDate')}</label>
                            <input 
                              id="search-date"
                              type="date" 
                              value={searchDate.toISOString().split('T')[0]} 
                              onChange={(e) => {
                                if (e.target.value) {
                                    const [year, month, day] = e.target.value.split('-').map(Number);
                                    setSearchDate(new Date(year, month - 1, day));
                                }
                              }}
                              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-y-2 border-gray-200 dark:border-gray-600 text-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button onClick={() => handleDateChange(1)} className="p-3 bg-gray-100 dark:bg-gray-700 ltr:rounded-r-lg rtl:rounded-l-lg hover:bg-gray-200 dark:hover:bg-gray-600" aria-label={t(lang, 'nextDay')}><ChevronRightIcon className="rtl:-scale-x-100"/></button>
                        </div>

                        <button onClick={handleSearch} className="w-full sm:flex-grow bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition shadow-md">
                            {t(lang, 'search')}
                        </button>
                        <button onClick={handleReset} className="w-full sm:w-auto text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                             {t(lang, 'reset')}
                        </button>
                        <button onClick={toggleFavorite} disabled={!fromStation || !toStation} className="disabled:opacity-50 disabled:cursor-not-allowed text-yellow-500" aria-label={t(lang, 'toggleFavorite')}>
                            <StarIcon filled={isCurrentRouteFavorite} />
                        </button>
                    </div>
                </main>
                
                {favorites.length > 0 && (
                    <section className="mt-8 fade-in">
                        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">{t(lang, 'favoriteRoutes')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {favorites.map((fav, index) => (
                                <FavoriteRouteCard key={index} route={fav} onSelect={handleFavoriteSelect} onDelete={deleteFavorite} lang={lang} deleteLabel={t(lang, 'deleteFavorite')}/>
                            ))}
                        </div>
                    </section>
                )}

                <section className="mt-8">
                    {searched && trips.length > 0 && (
                        <div className="fade-in">
                           <h2 className="text-2xl font-bold text-center text-gray-700 dark:text-gray-300 mb-4">{t(lang, 'availableTrips')}</h2>
                            {trips.map((trip, index) => (
                                <TripCard key={index} trip={trip} isNext={index === nextTripIndex} lang={lang}/>
                            ))}
                        </div>
                    )}
                    {searched && trips.length === 0 && (
                        <div className="text-center p-8 bg-yellow-50 dark:bg-yellow-900/50 rounded-lg fade-in">
                            <p className="text-xl text-yellow-800 dark:text-yellow-300">{t(lang, 'noTrips')}</p>
                        </div>
                    )}
                </section>

                <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
                    <a 
                        href="https://www.facebook.com/sntfhoraires" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={t(lang, 'facebookContact')}
                    >
                        <FacebookIcon />
                        <span className="font-semibold">{t(lang, 'facebookContact')}</span>
                    </a>
                </footer>
            </div>
        </div>
    );
};

export default App;