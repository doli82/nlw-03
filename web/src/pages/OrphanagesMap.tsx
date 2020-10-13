import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { Map, TileLayer } from "react-leaflet";

import mapMarkerImg from '../images/map-marker.svg'

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanages-map.css';

const OrphanagesMap = () => (
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt="Happy"/>
                <h2>Escolha um orfanato do mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>
            <footer>
                <strong>Brasília de Minas</strong>
                <span>Minas Gerais</span>
            </footer>
        </aside>

        <Map 
            center={[-16.2132876,-44.4276196]}
            zoom={15}
            style={{width: '100%', height: '100%'}}
        >
            {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer> */}
            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer>
        </Map>
        <Link to="" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
        </Link>
    </div>
)

export default OrphanagesMap;