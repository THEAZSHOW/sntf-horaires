export const translations = {
    fr: {
        title: "SNTF Horaires",
        subtitle: "Le moyen le plus simple et rapide de trouver les horaires des trains",
        fromPlaceholder: "Gare de départ",
        toPlaceholder: "Gare d'arrivée",
        search: "Rechercher",
        reset: "Réinitialiser",
        suburbanTab: "Banlieue d'Alger",
        mainlineTab: "Grandes Lignes & Régional",
        favoriteRoutes: "Trajets favoris",
        availableTrips: "Voyages disponibles",
        noTrips: "Aucun voyage direct disponible pour ce trajet à la date sélectionnée.",
        nextTrain: "Prochain Train",
        shareTripTitle: "SNTF - Horaire de train",
        shareTripText: (from: string, to: string, departure: string, arrival: string, line: string) => 
            `Train de ${from} à ${to}. Départ: ${departure}, Arrivée: ${arrival}. Ligne: ${line}`,
        copiedToClipboard: "Détails du voyage copiés dans le presse-papiers !",
        selectStationsPrompt: "Veuillez sélectionner une gare de départ et une gare d'arrivée.",
        facebookContact: "Contactez-nous sur Facebook",
        language: "Langue",
        toggleFavorite: "Ajouter aux favoris",
        deleteFavorite: "Supprimer le trajet favori",
        swapStations: "Inverser les gares",
        previousDay: "Jour précédent",
        nextDay: "Jour suivant",
        searchDate: "Date de recherche",
    },
    ar: {
        title: "مواقيت SNTF",
        subtitle: "أسهل وأسرع طريقة للعثور على مواقيت القطارات",
        fromPlaceholder: "محطة الانطلاق",
        toPlaceholder: "محطة الوصول",
        search: "بحث",
        reset: "إعادة تعيين",
        suburbanTab: "ضواحي الجزائر",
        mainlineTab: "خطوط كبرى وجهوية",
        favoriteRoutes: "الرحلات المفضلة",
        availableTrips: "الرحلات المتوفرة",
        noTrips: "لا توجد رحلات مباشرة متاحة لهذا المسار في التاريخ المحدد.",
        nextTrain: "القطار التالي",
        shareTripTitle: "SNTF - مواقيت القطار",
        shareTripText: (from: string, to: string, departure: string, arrival: string, line: string) => 
            `قطار من ${from} إلى ${to}. الانطلاق: ${departure}، الوصول: ${arrival}. الخط: ${line}`,
        copiedToClipboard: "تم نسخ تفاصيل الرحلة إلى الحافظة!",
        selectStationsPrompt: "الرجاء اختيار محطة الانطلاق ومحطة الوصول.",
        facebookContact: "اتصل بنا على الفيسبوك",
        language: "اللغة",
        toggleFavorite: "إضافة إلى المفضلة",
        deleteFavorite: "حذف الرحلة المفضلة",
        swapStations: "عكس المحطات",
        previousDay: "اليوم السابق",
        nextDay: "اليوم التالي",
        searchDate: "تاريخ البحث",
    }
};

export type Language = keyof typeof translations;

export const t = (lang: Language, key: keyof typeof translations.fr, ...args: any[]) => {
    const translation = translations[lang][key];
    if (typeof translation === 'function') {
        return (translation as Function)(...args);
    }
    return translation;
};