import {Amenity} from './amenity'

export class Park {
    public Amenities: Array<Amenity>;
    public Name: string;
    public Lat: number;
    public Lon: number;
    public Id: number;
    public Visible: boolean = true;

    public constructor(init?:Partial<Park>) {
        Object.assign(this, init);
    }
}