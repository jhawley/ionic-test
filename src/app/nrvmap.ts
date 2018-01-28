import * as L from 'leaflet';
import {Park} from './park'
import {IFilter} from './filter'
import {ParkDetailsLink} from './app.component'

export class NRVMap {
    public Map: L.Map;
    public Layer: L.TileLayer;
    public Markers: Array<L.marker> = [];
    public IndexedMarkers: {[key: number]: L.marker} = {};
    public Filter: IFilter = null;

    constructor(selector: string, layerURL: string, attribution: string, lat: number, lon: number) {
        this.Map = new L.Map(selector).setView([lat, lon], 10);
        this.Layer = new L.TileLayer(layerURL, { attribution: attribution });
        this.Layer.addTo(this.Map);
    }

    public AddPark(park: Park) {
        this.IndexedMarkers[park.Id] = new L.marker([park.Lat, park.Lon]).addTo(this.Map);
        // cheating - consider generating component
        this.IndexedMarkers[park.Id].bindPopup("<park-details-link></park-details-link><h2>" + park.Name + "</h2><h2><a href='#' onclick=\"document.getElementById('toggleRightMenu' + "+park.Id+").click()\">Details</a><h2>");
        this.Markers.push(this.IndexedMarkers[park.Id]);
    }

    public HideMarker(parkId: number) {
        this.IndexedMarkers[parkId].remove();
    }

    public ShowMarker(parkId: number) {
        this.IndexedMarkers[parkId].addTo(this.Map);
    }

    public FitBounds() {
        var group = new L.featureGroup(this.Markers.filter(marker => marker._map != null));
        this.Map.fitBounds(group.getBounds(), {padding: [50, 50]});
    }
}