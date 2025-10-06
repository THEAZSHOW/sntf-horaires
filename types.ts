export interface Station {
  name: string; // French name
  nameAr: string; // Arabic name
  category: 'suburban' | 'mainline' | 'both' | 'international';
}

export interface Stop {
  stationName: string; // Will match Station.name
  time: string; // HH:mm
}

export type DayOfWeek = 'daily' | 'except_friday' | 'only_friday' | number[];

export interface TrainRun {
  trainNumber: string;
  lineName: string;
  lineNameAr: string;
  stops: Stop[];
  days: DayOfWeek;
}

export interface Trip {
  departureTime: string;
  arrivalTime: string;
  duration: string;
  lineNameFr: string;
  lineNameAr: string;
  fromStationFr: string;
  fromStationAr: string;
  toStationFr: string;
  toStationAr:string;
}

export interface FavoriteRoute {
  from: string; 
  to: string; 
  fromAr: string;
  toAr: string;
}