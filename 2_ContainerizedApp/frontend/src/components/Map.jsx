
import { useState,useRef,useEffect } from 'react'
import { MapContainer, TileLayer, Marker,Popup,useMapEvents } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

const Map = (props) => {
    //,{onMapLatitudeValueChange,onMapLongitudeValueChange}
    //const mapRef = useRef();
    const [mapPosition,setMapPosition] = useState({lat: props.lat, lng:props.lon})
    const [markerPosition, setMarkerPosition] = useState({lat: props.lat, lng:props.lon});

    useEffect(()=>{
        setMapPosition({lat: props.lat, lng:props.lon})
        setMarkerPosition({lat: props.lat, lng:props.lon})
    },[props])

    const markerIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.8.0/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

    useEffect(() => {
        //console.log(props.lat,props.lon)
        if (markerPosition) {
            setMapPosition(markerPosition);
        }
      }, [markerPosition]);
    
    const GetLocationFromClick = () => {
        const map = useMapEvents({
            click(e) {
                console.log("I click on the map and get the coord: ",e.latlng);
                setMapPosition({lat:e.latlng.lat, lng:e.latlng.lng})
                setMarkerPosition({lat:e.latlng.lat, lng:e.latlng.lng});
            },
        });
        return null;
    };

    /*
    useEffect(()=>(
        onMapLatitudeValueChange(markerPosition.lat)
    ),[markerPosition])

    useEffect(()=>(
        onMapLongitudeValueChange(markerPosition.lon)
    ),[markerPosition])
    */

    return (
        <div id="map">
            <p>The map shows the latitude and longitude from the form but you can also click on the map to fill the form. Enjoy :)</p>
            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} style={{ height: '400px', width: '100%' }} >
                <GetLocationFromClick />
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markerPosition && (
                    <Marker position={markerPosition} icon={markerIcon}>
                        <Popup>Prediction: {props.estimation!==null ? props.estimation.toFixed(2) : <p>Compute the estimation first.</p>}</Popup>
                    </Marker>
                    
                )}
            </MapContainer>
        </div>
    )
}

export default Map