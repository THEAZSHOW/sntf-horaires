import React from 'react';
import { FavoriteRoute } from '../types';
import { SwapIcon, XIcon } from './IconComponents';
import { Language } from '../services/translations';

interface FavoriteRouteCardProps {
  route: FavoriteRoute;
  onSelect: (route: FavoriteRoute) => void;
  onDelete: (route: FavoriteRoute) => void;
  lang: Language;
  deleteLabel: string;
}

const FavoriteRouteCard: React.FC<FavoriteRouteCardProps> = ({ route, onSelect, onDelete, lang, deleteLabel }) => {
  return (
    <div className="relative bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition group">
        <div onClick={() => onSelect(route)} className="flex items-center flex-grow text-blue-800 dark:text-blue-200 gap-2">
            <span className="font-semibold">{lang === 'ar' ? route.fromAr : route.from}</span>
            <span className="block rtl:-scale-x-100"><SwapIcon /></span>
            <span className="font-semibold">{lang === 'ar' ? route.toAr : route.to}</span>
        </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onDelete(route); }} 
        className="absolute top-1 ltr:right-1 rtl:left-1 text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={deleteLabel}
      >
        <XIcon />
      </button>
    </div>
  );
};

export default FavoriteRouteCard;