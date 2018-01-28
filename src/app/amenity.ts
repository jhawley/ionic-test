export class Amenity {
    public Name: string;
    public Id: number;

    public constructor(init?:Partial<Amenity>) {
        Object.assign(this, init);
    }
}