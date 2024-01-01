export interface VehiclePositionData {
    license: string;
    date_position: Date;
    speed: number;
    longitude: number;
    latitude: number;
    ignited: boolean;
    poi?: string;
}

export interface VehicleTimeInPOIData {
    entryTime: Date | string;
    exitTime: Date | string;
    latitude: number;
    longitude: number;
    license: string;
    poiName: string;
    timeSpent: number;
}
