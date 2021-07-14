export class City {
    title!: string;
    location_type?: string;
    woeid?: number | undefined;
    distance?: number;
    applicable_date?: Date | undefined;

    constructor(city: City){
        Object.assign(city, this)
    }
}
