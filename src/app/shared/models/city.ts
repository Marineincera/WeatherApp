export class City {
    title!: string;
    location_type?: string;
    woeid?: number | undefined;
    distance?: number;

    constructor(city: City){
        Object.assign(city, this)
    }
}
