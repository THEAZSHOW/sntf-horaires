
import { TrainRun } from '../../types';

export const tunisieAlgerieRuns: TrainRun[] = [
    // =======================================================================
    // Ligne: Tunisie -> Algérie
    // =======================================================================
    { trainNumber: 'Train', lineName: 'Tunisie - Algérie (Train)', lineNameAr: 'تونس - الجزائر (قطار)', days: [1, 3, 5], stops: [ // Lundi, Mercredi, Vendredi
        { stationName: 'Tunis', time: '08:25' }, { stationName: 'Béja', time: '10:35' }, { stationName: 'Jendouba', time: '11:35' }, { stationName: 'Ghardimaou', time: '12:03' }, { stationName: 'Souk Ahras', time: '15:17' }, { stationName: 'Annaba', time: '18:20' }
    ]},
    { trainNumber: 'Autocar', lineName: 'Tunisie - Algérie (Autocar)', lineNameAr: 'تونس - الجزائر (حافلة)', days: 'daily', stops: [
        { stationName: 'Annaba', time: '20:20' }, { stationName: 'Alger', time: '06:44' }
    ]},
];
