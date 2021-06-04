export default interface Park {
    id: number;
    name: string;
    image: string;
    description: string;
    lat: number;
    lon: number;
    parkArea: number;
    views: number;
    ratingsAvg: number;

    contact: string;
    location: string;
    // trails: [];
}