import React from 'react';
import { Trip } from '../types';
import { ClockIcon, TrainIcon, ShareIcon, LongArrowRightIcon } from './IconComponents';
import { Language, t } from '../services/translations';

interface TripCardProps {
  trip: Trip;
  isNext?: boolean;
  lang: Language;
}

const TripCard: React.FC<TripCardProps> = ({ trip, isNext, lang }) => {
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = t(
        lang, 
        'shareTripText', 
        lang === 'ar' ? trip.fromStationAr : trip.fromStationFr,
        lang === 'ar' ? trip.toStationAr : trip.toStationFr,
        trip.departureTime,
        trip.arrivalTime,
        lang === 'ar' ? trip.lineNameAr : trip.lineNameFr
    );

    if (navigator.share) {
      navigator.share({
        title: t(lang, 'shareTripTitle'),
        text: shareText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert(t(lang, 'copiedToClipboard'));
      });
    }
  };

  const cardClasses = `bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-4 transition-all transform hover:scale-[1.02] hover:shadow-lg w-full max-w-2xl mx-auto ${isNext ? 'border-2 border-green-500 dark:border-green-400' : 'border border-gray-200 dark:border-gray-700'}`;

  return (
    <div className={cardClasses}>
      <div className="p-6 relative">
        {isNext && (
          <div className="absolute top-0 ltr:left-0 rtl:right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 ltr:rounded-br-lg rtl:rounded-bl-lg ltr:rounded-tl-lg rtl:rounded-tr-lg">
            {t(lang, 'nextTrain')}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{lang === 'ar' ? trip.fromStationAr : trip.fromStationFr}</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-wider">{trip.departureTime}</p>
          </div>
          <div className="flex-grow text-center px-4">
             <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                <ClockIcon />
                <span className="text-sm">{trip.duration}</span>
             </div>
             <div className="flex items-center text-gray-400 my-2">
                <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
                <span className="block rtl:-scale-x-100"><LongArrowRightIcon /></span>
                <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>
             <div className="flex items-center justify-center text-green-600 dark:text-green-400 gap-1">
                <TrainIcon />
                <span className="text-sm font-semibold">{lang === 'ar' ? trip.lineNameAr : trip.lineNameFr}</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{lang === 'ar' ? trip.toStationAr : trip.toStationFr}</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-wider">{trip.arrivalTime}</p>
          </div>
        </div>
        <button
            onClick={handleShare}
            aria-label={t(lang, 'shareTripTitle')}
            className="absolute bottom-2 ltr:left-2 rtl:right-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
            <ShareIcon />
        </button>
      </div>
    </div>
  );
};

export default TripCard;