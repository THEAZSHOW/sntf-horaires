import { useState, useEffect, useCallback } from 'react';
import { Station, TrainRun, Trip, DayOfWeek } from '../types';
import { aghaAeroportRuns } from '../services/data/agha-aeroport';
import { aghaEstRuns } from '../services/data/agha-est';
import { aghaOranTlemcenRuns } from '../services/data/agha-oran-tlemcen';
import { aghaZeraldaRuns } from '../services/data/agha-zeralda';
import { aeroportAghaRuns } from '../services/data/aeroport-agha';
import { algerElaffrounRuns } from '../services/data/alger-elaffroun';
import { algerTheniaRuns } from '../services/data/alger-thenia';
import { elaffrounAlgerRuns } from '../services/data/elaffroun-alger';
import { elaffrounTheniaRuns } from '../services/data/elaffroun-thenia';
import { ouedaissiTheniaAghaRuns } from '../services/data/ouedaissi-thenia-agha';
import { theniaAlgerRuns } from '../services/data/thenia-alger';
import { theniaOuedaissiRuns } from '../services/data/thenia-ouedaissi';
import { theniaZeraldaRuns } from '../services/data/thenia-zeralda';
import { tlemcenOranAghaRuns } from '../services/data/tlemcen-oran-agha';
import { zeraldaAghaRuns } from '../services/data/zeralda-agha';
import { zeraldaTheniaRuns } from '../services/data/zeralda-thenia';
import { estAghaRuns } from '../services/data/est-agha';
import { bejaiaBeniMensourRuns } from '../services/data/bejaia-beni-mensour';
import { beniMensourBejaiaRuns } from '../services/data/beni-mensour-bejaia';
import { tissemsiltBordjRuns } from '../services/data/tissemsilt-bordj';
import { bordjTissemsiltRuns } from '../services/data/bordj-tissemsilt';
import { djelfaLaghouatRuns } from '../services/data/djelfa-laghouat';
import { laghouatDjelfaRuns } from '../services/data/laghouat-djelfa';
import { algerieTunisieRuns } from '../services/data/algerie-tunisie';
import { tunisieAlgerieRuns } from '../services/data/tunisie-algerie';
import { theniaElaffrounRuns } from '../services/data/thenia-elaffroun';
import { BecharOranRuns } from '../services/data/Bechar-Oran';


const useTrainData = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const [suburbanTrainRuns, setSuburbanTrainRuns] = useState<TrainRun[]>([]);
    const [mainlineTrainRuns, setMainlineTrainRuns] = useState<TrainRun[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Data is embedded here to simulate loading from the service
        const ALL_STATIONS: Station[] = [
            // Suburban Stations (Algiers Region)
            { name: 'Agha', nameAr: 'آغا', category: 'both' },
            { name: 'Ain Naadja', nameAr: 'عين النعجة', category: 'suburban' },
            { name: 'Aéroport Houari Boumediene', nameAr: 'مطار هواري بومدين', category: 'suburban' },
            { name: 'Alger', nameAr: 'الجزائر', category: 'both' },
            { name: 'Ateliers', nameAr: 'الورشات', category: 'suburban' },
            { name: 'Baba Ali', nameAr: 'بابا علي', category: 'suburban' },
            { name: 'Bab Ezzouar', nameAr: 'باب الزوار', category: 'suburban' },
            { name: 'Beni Mered', nameAr: 'بني مراد', category: 'suburban' },
            { name: 'Birtouta', nameAr: 'بئر توتة', category: 'suburban' },
            { name: 'Blida', nameAr: 'البليدة', category: 'both' },
            { name: 'Boudouaou', nameAr: 'بودواو', category: 'suburban' },
            { name: 'Boufarik', nameAr: 'بوفاريك', category: 'suburban' },
            { name: 'Boukhalfa', nameAr: 'بوخالفة', category: 'suburban' },
            { name: 'Boumerdes', nameAr: 'بومرداس', category: 'both' },
            { name: 'Bordj Menaiel', nameAr: 'برج منايل', category: 'suburban' },
            { name: 'Caroubier', nameAr: 'الخروبة', category: 'suburban' },
            { name: 'Chiffa', nameAr: 'شفة', category: 'suburban' },
            { name: 'Corso', nameAr: 'قورصو', category: 'suburban' },
            { name: 'Dar El Beida', nameAr: 'الدار البيضاء', category: 'suburban' },
            { name: 'Draa Ben Khedda', nameAr: 'ذراع بن خدة', category: 'suburban' },
            { name: 'El Affroun', nameAr: 'العفرون', category: 'both' },
            { name: 'El Harrach', nameAr: 'الحراش', category: 'both' },
            { name: 'Gué de Constantine', nameAr: 'جسر قسنطينة', category: 'suburban' },
            { name: 'Hussein Dey', nameAr: 'حسين داي', category: 'suburban' },
            { name: 'Isser', nameAr: 'يسر', category: 'suburban' },
            { name: 'Kef Naadja', nameAr: 'كاف النعجة', category: 'suburban' },
            { name: 'Mouzaia', nameAr: 'موزاية', category: 'suburban' },
            { name: 'Naciria', nameAr: 'الناصرية', category: 'suburban' },
            { name: 'Oued Aissi', nameAr: 'وادي عيسي', category: 'suburban' },
            { name: 'Oued Aissi Université', nameAr: 'جامعة وادي عيسي', category: 'suburban' },
            { name: 'Oued Smar', nameAr: 'وادي السمار', category: 'suburban' },
            { name: 'Reghaia', nameAr: 'رغاية', category: 'suburban' },
            { name: 'Reghaia Ind', nameAr: 'رغاية صناعية', category: 'suburban' },
            { name: 'Rouiba', nameAr: 'رويبة', category: 'suburban' },
            { name: 'Rouiba Ind', nameAr: 'رويبة صناعية', category: 'suburban' },
            { name: 'Sidi Abdellah', nameAr: 'سيدي عبد الله', category: 'suburban' },
            { name: 'Sidi Abdellah Université', nameAr: 'جامعة سيدي عبد الله', category: 'suburban' },
            { name: 'Si Mustapha', nameAr: 'سي مصطفى', category: 'suburban' },
            { name: 'Tadmait', nameAr: 'تادمايت', category: 'suburban' },
            { name: 'Tessala El Merdja', nameAr: 'تسالة المرجة', category: 'suburban' },
            { name: 'Thenia', nameAr: 'الثنية', category: 'both' },
            { name: 'Tidjelabine', nameAr: 'تيجلابين', category: 'suburban' },
            { name: 'Tizi Ouzou', nameAr: 'تيزي وزو', category: 'suburban' },
            { name: 'Zéralda', nameAr: 'زرالدة', category: 'suburban' },
            // Mainline Stations
            { name: 'Ain Beida', nameAr: 'عين البيضاء', category: 'mainline' },
            { name: 'Ain Defla', nameAr: 'عين الدفلى', category: 'mainline' },
            { name: 'Ain Fakroun', nameAr: 'عين فكرون', category: 'mainline' },
            { name: 'Ain Lahdjel', nameAr: 'عين الحجل', category: 'mainline' },
            { name: 'Ain Mlila', nameAr: 'عين مليلة', category: 'mainline' },
            { name: 'Ain Oussera', nameAr: 'عين وسارة', category: 'mainline' },
            { name: 'Ain Touta', nameAr: 'عين التوتة', category: 'mainline' },
            { name: 'Akbou', nameAr: 'أقبو', category: 'mainline' },
            { name: 'Al Attaf', nameAr: 'العطاف', category: 'mainline' },
            { name: 'Allaghan', nameAr: 'ألاغان', category: 'mainline' },
            { name: 'Ammal', nameAr: 'عمال', category: 'mainline' },
            { name: 'Amdane Djami', nameAr: 'عمدان جامي', category: 'mainline' },
            { name: 'Annaba', nameAr: 'عنابة', category: 'mainline' },
            { name: 'Arib', nameAr: 'عريب', category: 'mainline' },
            { name: 'Azib', nameAr: 'أزيب', category: 'mainline' },
            { name: 'Azzaba', nameAr: 'عزابة', category: 'mainline' },
            { name: 'Barhoum', nameAr: 'برهوم', category: 'mainline' },
            { name: 'Barika', nameAr: 'بريكة', category: 'mainline' },
            { name: 'Batna', nameAr: 'باتنة', category: 'mainline' },
            { name: 'Bechar', nameAr: 'بشار', category: 'mainline' },
            { name: 'Bejaia', nameAr: 'بجاية', category: 'mainline' },
            { name: 'Beni Amrane', nameAr: 'بني عمران', category: 'mainline' },
            { name: 'Beni Mensour', nameAr: 'بني منصور', category: 'mainline' },
            { name: 'Bir Saf Saf', nameAr: 'بئر صفصاف', category: 'mainline' },
            { name: 'Birine', nameAr: 'بيرين', category: 'mainline' },
            { name: 'Biskra', nameAr: 'بسكرة', category: 'mainline' },
            { name: 'Bordj Bou Arreridj', nameAr: 'برج بوعريريج', category: 'mainline' },
            { name: 'Bougara', nameAr: 'بوقرة', category: 'mainline' },
            { name: 'Boughzoul', nameAr: 'بوغزول', category: 'mainline' },
            { name: 'Bouira', nameAr: 'البويرة', category: 'mainline' },
            { name: 'Boukadir', nameAr: 'بوقادير', category: 'mainline' },
            { name: 'Boumedfaa', nameAr: 'بومدفع', category: 'mainline' },
            { name: 'Bouti Sayeh', nameAr: 'بوطي سايح', category: 'mainline' },
            { name: 'Chehbounia', nameAr: 'الشهبونية', category: 'mainline' },
            { name: 'Cheikh Ben Yahia', nameAr: 'الشيخ بن يحيى', category: 'mainline' },
            { name: 'Chelghoum Laïd', nameAr: 'شلغوم العيد', category: 'mainline' },
            { name: 'Chlef', nameAr: 'الشلف', category: 'mainline' },
            { name: 'Constantine', nameAr: 'قسنطينة', category: 'mainline' },
            { name: 'Djamaa', nameAr: 'جامعة', category: 'mainline' },
            { name: 'Djelfa', nameAr: 'الجلفة', category: 'mainline' },
            { name: 'El Adjiba', nameAr: 'العجيبة', category: 'mainline' },
            { name: 'El Amra', nameAr: 'العامرة', category: 'mainline' },
            { name: 'El Arrouche', nameAr: 'الحروش', category: 'mainline' },
            { name: 'El Eulma', nameAr: 'العلمة', category: 'mainline' },
            { name: 'El Gourzi', nameAr: 'الڨورزي', category: 'mainline' },
            { name: 'El Kantara', nameAr: 'القنطرة', category: 'mainline' },
            { name: 'El Khroub', nameAr: 'الخروب', category: 'mainline' },
            { name: 'El Kseur', nameAr: 'القصر', category: 'mainline' },
            { name: 'El Meghaier', nameAr: 'المغير', category: 'mainline' },
            { name: 'El Ouatya', nameAr: 'الوطاية', category: 'mainline' },
            { name: 'Hanif', nameAr: 'حنيف', category: 'mainline' },
            { name: 'Hassi Bahbah', nameAr: 'حاسي بحبح', category: 'mainline' },
            { name: 'Hassi Fedoul', nameAr: 'حاسي فدول', category: 'mainline' },
            { name: 'Ighzer Amokrane', nameAr: 'إيغيل أمقران', category: 'mainline' },
            { name: 'Il Maten', nameAr: 'إيل ماتن', category: 'mainline' },
            { name: 'Kadiria', nameAr: 'قادرية', category: 'mainline' },
            { name: 'Khemis Miliana', nameAr: 'خميس مليانة', category: 'mainline' },
            { name: 'Laghouat', nameAr: 'الأغواط', category: 'mainline' },
            { name: 'Lakhdaria', nameAr: 'الأخضرية', category: 'mainline' },
            { name: 'Le Barrage', nameAr: 'السد', category: 'mainline' },
            { name: 'Lotta', nameAr: 'لوطا', category: 'mainline' },
            { name: 'Mansourah', nameAr: 'المنصورة', category: 'mainline' },
            { name: "M'sila", nameAr: 'المسيلة', category: 'mainline' },
            { name: 'Medjaz', nameAr: 'مجاز', category: 'mainline' },
            { name: 'Mizan', nameAr: 'ميزان', category: 'mainline' },
            { name: 'Mohammadia', nameAr: 'المحمدية', category: 'mainline' },
            { name: 'Morsott', nameAr: 'مرسط', category: 'mainline' },
            { name: 'Moudrou', nameAr: 'مودرو', category: 'mainline' },
            { name: 'Oran', nameAr: 'وهران', category: 'mainline' },
            { name: 'Ouled Ammar', nameAr: 'أولاد عمار', category: 'mainline' },
            { name: 'Ouled Mimoun', nameAr: 'أولاد ميمون', category: 'mainline' },
            { name: 'Oued Fodda', nameAr: 'وادي الفضة', category: 'mainline' },
            { name: 'Oued Ghir', nameAr: 'وادي غير', category: 'mainline' },
            { name: 'Oued Rhiou', nameAr: 'وادي رهيو', category: 'mainline' },
            { name: 'Oued Tlelat', nameAr: 'وادي تليلات', category: 'mainline' },
            { name: 'Oum El Bouaghi', nameAr: 'أم البواقي', category: 'mainline' },
            { name: 'Ramdane Djamel', nameAr: 'رمضان جمال', category: 'mainline' },
            { name: 'Relizane', nameAr: 'غليزان', category: 'mainline' },
            { name: 'Rouina', nameAr: 'روينة', category: 'mainline' },
            { name: 'Setif', nameAr: 'سطيف', category: 'mainline' },
            { name: 'Sidi Aich', nameAr: 'سيدي عيش', category: 'mainline' },
            { name: 'Sidi Bel Abbes', nameAr: 'سيدي بلعباس', category: 'mainline' },
            { name: 'Sidi Bouabida', nameAr: 'سيدي بوعبيدة', category: 'mainline' },
            { name: 'Sidi Ladjel', nameAr: 'سيدي لعجال', category: 'mainline' },
            { name: 'Sidi Lakhdar', nameAr: 'سيدي لخضر', category: 'mainline' },
            { name: 'Sidi Makhlouf', nameAr: 'سيدي مخلوف', category: 'mainline' },
            { name: 'Sidi Yahia', nameAr: 'سيدي يحيى', category: 'mainline' },
            { name: 'Sig', nameAr: 'سيق', category: 'mainline' },
            { name: 'Souk El Had', nameAr: 'سوق الأحد', category: 'mainline' },
            { name: 'Souk Ahras', nameAr: 'سوق أهراس', category: 'mainline' },
            { name: 'Tadjenanet', nameAr: 'تاجنانت', category: 'mainline' },
            { name: 'Takrets', nameAr: 'تاكريتز', category: 'mainline' },
            { name: 'Tazmalt', nameAr: 'تازمالت', category: 'mainline' },
            { name: 'Tebessa', nameAr: 'تبسة', category: 'mainline' },
            { name: 'Teleghma', nameAr: 'التلاغمة', category: 'mainline' },
            { name: 'Tissemsilt', nameAr: 'تيسمسيلت', category: 'mainline' },
            { name: 'Tlemcen', nameAr: 'تلمسان', category: 'mainline' },
            { name: 'Toghza', nameAr: 'توغزة', category: 'mainline' },
            { name: 'Touggourt', nameAr: 'تقرت', category: 'mainline' },
            // International Stations
            { name: 'Béja', nameAr: 'باجة', category: 'international' },
            { name: 'Ghardimaou', nameAr: 'غار الدماء', category: 'international' },
            { name: 'Jendouba', nameAr: 'جندوبة', category: 'international' },
            { name: 'Tunis', nameAr: 'تونس', category: 'international' },
        ];
        
        const SUBURBAN_RUNS: TrainRun[] = [
           ...algerTheniaRuns,
           ...theniaAlgerRuns,
           ...algerElaffrounRuns,
           ...elaffrounAlgerRuns,
           ...aghaZeraldaRuns,
           ...zeraldaAghaRuns,
           ...aghaAeroportRuns,
           ...aeroportAghaRuns,
           ...theniaElaffrounRuns,
           ...elaffrounTheniaRuns,
           ...zeraldaTheniaRuns,
           ...theniaZeraldaRuns,
           ...theniaOuedaissiRuns,
           ...ouedaissiTheniaAghaRuns,
        ];

        const MAINLINE_RUNS: TrainRun[] = [
           ...aghaOranTlemcenRuns,
           ...BecharOranRuns,
           ...tlemcenOranAghaRuns,
           ...aghaEstRuns,
           ...estAghaRuns,
           ...bejaiaBeniMensourRuns,
           ...beniMensourBejaiaRuns,
           ...tissemsiltBordjRuns,
           ...bordjTissemsiltRuns,
           ...djelfaLaghouatRuns,
           ...laghouatDjelfaRuns,
           ...algerieTunisieRuns,
           ...tunisieAlgerieRuns,
        ];
        
        setStations(ALL_STATIONS);
        setSuburbanTrainRuns(SUBURBAN_RUNS);
        setMainlineTrainRuns(MAINLINE_RUNS);
        setLoading(false);
    }, []);

    const findTrips = useCallback((fromStationName: string, toStationName: string, date: Date, activeTab: 'suburban' | 'mainline'): Trip[] => {
        const trips: Trip[] = [];
        const fromStationDetails = stations.find(s => s.name === fromStationName);
        const toStationDetails = stations.find(s => s.name === toStationName);
        if (!fromStationDetails || !toStationDetails) {
            return [];
        }

        const isTrainRunningOnDate = (days: DayOfWeek, date: Date): boolean => {
            const dayOfWeek = date.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
            const isFriday = dayOfWeek === 5;

            if (days === 'daily') return true;
            if (days === 'except_friday' && !isFriday) return true;
            if (days === 'only_friday' && isFriday) return true;
            if (Array.isArray(days)) {
                return days.includes(dayOfWeek);
            }
            return false;
        };

        const parseTime = (timeStr: string): number => {
            if (!timeStr || !timeStr.includes(':')) return 0;
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        const runsToSearch = activeTab === 'suburban' ? suburbanTrainRuns : mainlineTrainRuns;

        runsToSearch.forEach(run => {
            if (!isTrainRunningOnDate(run.days, date)) {
                return;
            }

            const fromIndex = run.stops.findIndex(stop => stop.stationName === fromStationName);
            const toIndex = run.stops.findIndex(stop => stop.stationName === toStationName);

            if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
                const departureStop = run.stops[fromIndex];
                const arrivalStop = run.stops[toIndex];
                
                const departureTimeMinutes = parseTime(departureStop.time);
                const arrivalTimeMinutes = parseTime(arrivalStop.time);

                let durationMinutes = arrivalTimeMinutes - departureTimeMinutes;
                
                if (durationMinutes < 0) {
                    // Departure is before 6 PM and duration is negative: likely data error for a day train.
                    if (departureTimeMinutes < 18 * 60) {
                        return; // Skip this invalid trip
                    }
                    // Otherwise, assume it's a valid overnight trip
                    durationMinutes += 24 * 60;
                }
                
                const durationHours = Math.floor(durationMinutes / 60);
                const durationMins = durationMinutes % 60;
                const durationStr = `${durationHours}h ${String(durationMins).padStart(2, '0')}m`;

                trips.push({
                    departureTime: departureStop.time,
                    arrivalTime: arrivalStop.time,
                    duration: durationStr,
                    lineNameFr: run.lineName,
                    lineNameAr: run.lineNameAr,
                    fromStationFr: fromStationDetails.name,
                    fromStationAr: fromStationDetails.nameAr,
                    toStationFr: toStationDetails.name,
                    toStationAr: toStationDetails.nameAr
                });
            }
        });
        
        return trips.sort((a, b) => parseTime(a.departureTime) - parseTime(b.departureTime));
    }, [stations, suburbanTrainRuns, mainlineTrainRuns]);

    return { stations, findTrips, loading };
};

export default useTrainData;