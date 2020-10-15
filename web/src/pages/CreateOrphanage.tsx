import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import '../styles/pages/create-orphanage.css';
import { FiPlus, FiX } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

export default function CreateOrphanage(): JSX.Element {
    const [position, setPosition] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [openOnWeekends, setOpenOnWeekends] = useState(false);
    const [openingHours, setOpeningHours] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const history = useHistory();

    useEffect(() => {
        const selectedImagesPreview = images.map((file) => URL.createObjectURL(file));
        setImagesPreview(selectedImagesPreview);
    }, [images]);

    const handleMapClick = (event: LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
        setPosition({
            latitude: lat,
            longitude: lng,
        });
    };

    const handleSelectedImages = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }
        const selectedImages = [...images, ...Array.from(event.target.files)];
        setImages(selectedImages);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('about', about);
        formData.append('instructions', instructions);
        formData.append('latitude', String(position.latitude));
        formData.append('longitude', String(position.longitude));
        formData.append('open_on_weekends', String(openOnWeekends));
        formData.append('opening_hours', openingHours);
        images.forEach((file) => {
            formData.append('images', file);
        });

        await api.post('/orphanages', formData);

        alert('Orfanato cadastrado com sucesso!!');
        history.push('/app');
    };

    const discardImage = (position: number) => {
        const selectedImages = images.filter((file, index) => index !== position);
        setImages(selectedImages);
    };

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form className="create-orphanage-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados</legend>

                        <Map
                            center={[-16.2074875, -44.4288859]}
                            style={{ width: '100%', height: 280 }}
                            zoom={14}
                            onclick={handleMapClick}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            {position.longitude !== 0 && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[position.latitude, position.longitude]}
                                />
                            )}
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name" value={name} onChange={({ target }) => setName(target.value)} />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">
                                Sobre <span>Máximo de 300 caracteres</span>
                            </label>
                            <textarea
                                id="name"
                                maxLength={300}
                                value={about}
                                onChange={({ target }) => setAbout(target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {imagesPreview.map((src, index) => (
                                    <span key={src} className="preview-container">
                                        <img src={src} alt={images[index]?.name} />
                                        <button onClick={() => discardImage(index)}>
                                            <FiX size={24} color="#FF669D" />
                                        </button>
                                    </span>
                                ))}

                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                                <input multiple onChange={handleSelectedImages} type="file" id="image[]" />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={({ target }) => setInstructions(target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de Funcionamento</label>
                            <input
                                id="opening_hours"
                                value={openingHours}
                                onChange={({ target }) => setOpeningHours(target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={openOnWeekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>
                                <button
                                    type="button"
                                    className={!openOnWeekends ? 'active' : ''}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
