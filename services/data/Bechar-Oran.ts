import { TrainRun } from '../../types';

export const BecharOranRuns: TrainRun[] = [
    { trainNumber: 'NEW', lineName: 'Bechar-Oran', lineNameAr: 'بشار - وهران', days: 'daily', stops: [ { stationName: 'Bechar', time: '21:00' }, { stationName: 'Oran', time: '07:11' } ]},
    { trainNumber: 'NEW', lineName: 'Oran - Bechar', lineNameAr: 'وهران - بشار', days: 'daily', stops: [ { stationName: 'Oran', time: '20:30' }, { stationName: 'Bechar', time: '06:45' } ]}
];
