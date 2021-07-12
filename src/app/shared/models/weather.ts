export class Weather {
    id!: number;
    applicable_date!: Date;
    weather_state_name!: string;
    weather_state_abbr?: string;
    wind_speed?: number;
    wind_direction?: number;
    wind_direction_compass?: string;
    min_temp?: number;
    max_temp?: number;
    the_temp?:number;
    air_pressure?: number;
    humidity?: number;
    visibility?: number;
    predictability?: number;
    created?: Date;

    constructor(weather: Weather){
        Object.assign(weather, this)
    }
}
