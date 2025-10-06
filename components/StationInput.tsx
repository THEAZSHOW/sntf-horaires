import React from 'react';
import { Station } from '../types';
import { Language } from '../services/translations';

interface StationSelectProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  stations: Station[];
  lang: Language;
}

const StationSelect: React.FC<StationSelectProps> = ({ id, placeholder, value, onChange, stations, lang }) => {
  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">{placeholder}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg text-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition appearance-none"
        aria-label={placeholder}
      >
        <option value="" disabled>{placeholder}</option>
        {stations.map((station) => (
          <option key={station.name} value={station.name}>
            {lang === 'ar' ? station.nameAr : station.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
      </div>
    </div>
  );
};

export default StationSelect;