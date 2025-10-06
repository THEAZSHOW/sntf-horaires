
import { TrainRun } from '../../types';

export const algerieTunisieRuns: TrainRun[] = [
    // =======================================================================
    // Ligne: Algérie -> Tunisie
    // =======================================================================
    { trainNumber: 'Autocar', lineName: 'Algérie - Tunisie (Autocar)', lineNameAr: 'الجزائر - تونس (حافلة)', days: 'daily', stops: [
        { stationName: 'Alger', time: '18:40' }, { stationName: 'Annaba', time: '05:28' }
    ]},
    { trainNumber: 'Train', lineName: 'Algérie - Tunisie (Train)', lineNameAr: 'الجزائر - تونس (قطار)', days: [0, 2, 4], stops: [ // Dimanche, Mardi, Jeudi
        { stationName: 'Annaba', time: '09:00' }, { stationName: 'Souk Ahras', time: '11:10' }, { stationName: 'Ghardimaou', time: '13:21' }, { stationName: 'Jendouba', time: '15:17' }, { stationName: 'Béja', time: '16:15' }, { stationName: 'Tunis', time: '18:27' }
    ]},
];
