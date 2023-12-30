export interface VehiclePositionData {
    license: string;
    date_position: Date;
    speed: number;
    longitude: number;
    latitude: number;
    ignited: boolean;
}

export interface VehicleTimeInPOI {
    license: string;
    poiName: string;
    date_position: Date;
    timeSpent: number;
    latitude: number;
    longitude: number;
    selected?: boolean;
}
