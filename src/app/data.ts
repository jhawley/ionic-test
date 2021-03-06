import {Amenity} from './amenity'
import {Park} from './park'
import {IFilter, AmenityFilter, OrFilter, NoFilter} from './filter'

export interface IData {
    GetFilters(): Array<IFilter>;
    GetTopFilters(): Array<IFilter>;
    SetFilterActive(IFilter): void; 
    ClearFilters(): void; 
    GetParks(): Array<Park>;
    GetAmenities(): Array<Amenity>;
    ActivePark: Park;
}

export class MockData implements IData {
    private Amenities: Array<Amenity>;
    private Filters: Array<[IFilter, boolean]>;
    public Parks: Array<Park>;
    public ActivePark: Park;

    constructor() {
        this.Amenities = [
            new Amenity({Id: 1, Name: 'Picnic Tables'}),
            new Amenity({Id: 2, Name: 'Shelter'}),
            new Amenity({Id: 3, Name: 'Hiking'})
        ];

        var f1 = new AmenityFilter(this.Amenities[0]);
        var f2 = new AmenityFilter(this.Amenities[1]);
        var f3 = new AmenityFilter(this.Amenities[2]);

        this.Filters = [
            [new NoFilter(), true],
            [new OrFilter([this.Amenities[0], this.Amenities[1]], "Picnic"), true],
            [f1, false], [f2, false], [f3, false]
        ];

        this.Parks = [
            new Park({Id: 1, Name: 'Park 1', Amenities: [this.Amenities[0]], Lat: 37.129852, Lon: -80.408939}),
            new Park({Id: 2, Name: 'Park 2', Amenities: [this.Amenities[1]], Lat: 37.130952, Lon: -80.407939}),
            new Park({Id: 3, Name: 'Park 3', Amenities: [this.Amenities[2]], Lat: 37.128752, Lon: -80.409939}),
            new Park({Id: 4, Name: 'Park 4', Amenities: [this.Amenities[0], this.Amenities[2]], Lat: 37.129852, Lon: -80.408839}),
            new Park({Id: 5, Name: 'Park 5', Amenities: [this.Amenities[1], this.Amenities[2]], Lat: 37.129852, Lon: -80.408739}),
            new Park({Id: 6, Name: 'Park 6', Amenities: [this.Amenities[0]], Lat: 37.139852, Lon: -80.418839}),
            new Park({Id: 7, Name: 'Park 7', Amenities: [this.Amenities[1]], Lat: 37.119852, Lon: -80.398739})
        ];

        this.ActivePark = this.Parks[0];
    }

    public GetFilters(): Array<IFilter> {
        return this.Filters.filter(x => !x[1]).map(x => x[0]);
    }

    public GetTopFilters(): Array<IFilter> {
        return this.Filters.filter(x => x[1]).map(x => x[0]);
    }

    public GetParks(): Array<Park> {
        return this.Parks;
    }

    public GetAmenities(): Array<Amenity> {
        return this.Amenities;
    }

    public ClearFilters(): void {
        for(let filter of this.Filters.filter(x => x[0].IsActive).map(x => x[0])) {
            filter.IsActive = false;
        }
    }

    // deactivates other filters
    public SetFilterActive(filter: IFilter) {
        for(let lfilter of this.Filters.map(x => x[0])) {
            lfilter.IsActive = filter.Name == lfilter.Name;
        }

        var parksInvisible = new Set<number>();
        for(let afilter of this.Filters.filter(x => x[0].IsActive).map(x => x[0])) {
            var aParksVisible = new Set<number>(afilter.Filter(this.Parks).map(x => x.Id));
            for(let parkId of this.Parks.map(x => x.Id)) {
                if(!aParksVisible.has(parkId)) {
                    parksInvisible.add(parkId);
                }
            }
        }

        for(let park of this.Parks) {
            park.Visible = !parksInvisible.has(park.Id);
        }
    }
}