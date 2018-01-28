import {Amenity} from './amenity'
import {Park} from './park'

export interface IFilter {
    Filter(parks: Array<Park>): Array<Park>;
    IsActive: boolean;
    Name: string;
}

export class AmenityFilter implements IFilter {
    Amenity: Amenity;
    IsActive: boolean = false;
    Name: string;

    constructor(amenity: Amenity) {
        this.Amenity = amenity;
        this.Name = amenity.Name;
    }

    public Filter(parks: Array<Park>): Array<Park> {
        return parks.filter(park => park.Amenities.filter(amenity => amenity.Id == this.Amenity.Id).length > 0);
    }
}

export class OrFilter implements IFilter {
    Filters: Array<IFilter>;
    IsActive: boolean = false;
    Name: string;

    constructor(amenities: Array<Amenity>, name: string) {
        this.Filters = amenities.map(x => new AmenityFilter(x));
        this.Name = name;
    }

    public Filter(parks: Array<Park>): Array<Park> {
        var valid = new Set<Park>();
        for(let filter of this.Filters) {
            for(let park of filter.Filter(parks)) {
                valid.add(park);
            }
        }
        return Array.from(valid);
    }
}