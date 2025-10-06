import { useState, useEffect, useCallback } from 'react';
import { Language } from '../services/translations';

export const useLanguage = (): [Language, (lang: Language) => void] => {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== 'undefined') {
            const storedLang = localStorage.getItem('sntf-language') as Language;
            return storedLang && ['fr', 'ar'].includes(storedLang) ? storedLang : 'fr';
        }
        return 'fr';
    });

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.lang = language;
        if (language === 'ar') {
            root.dir = 'rtl';
        } else {
            root.dir = 'ltr';
        }
        localStorage.setItem('sntf-language', language);
    }, [language]);

    return [language, setLanguage];
};
