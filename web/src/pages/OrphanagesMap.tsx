import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';

const mapIcon = leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});

const OrphanagesMap = (): JSX.Element => (
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="Happy" />
                <h2>Escolha um orfanato do mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>
            <footer>
                <strong>Brasília de Minas</strong>
                <span>Minas Gerais</span>
            </footer>
        </aside>

        <Map center={[-16.2132876, -44.4276196]} zoom={15} style={{ width: '100%', height: '100%' }}>
            {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer> */}
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            ></TileLayer>
            <Marker icon={mapIcon} position={[-16.2132876, -44.4276196]}>
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                    Orfanado de BM
                    <Link to="">
                        <FiArrowRight size={20} color="#FFF" />
                    </Link>
                </Popup>
            </Marker>
        </Map>
        <Link to="" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
        </Link>
    </div>
);

export default OrphanagesMap;
