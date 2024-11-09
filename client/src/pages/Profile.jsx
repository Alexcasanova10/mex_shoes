import React, { useState, useEffect } from "react";
import Layout from "../Layouts/Layouts";
import CoverPic from '../assets/images/bg-profile.jpg';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '',
        shippingAddress: {
            address: '',
            city: '',
            postalCode: '',
            country: ''
        }
    });

    // Aquí puedes agregar la lógica para cargar los datos del perfil al montar el componente
    useEffect(() => {
        // Ejemplo: fetch para obtener los datos y establecer el estado
        // fetch('/api/profile').then(response => response.json()).then(data => setProfileData(data));
    }, []);

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('shippingAddress')) {
            const addressField = name.split('.')[1];
            setProfileData(prevState => ({
                ...prevState,
                shippingAddress: {
                    ...prevState.shippingAddress,
                    [addressField]: value
                }
            }));
        } else {
            setProfileData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <>
            <Layout>
                <div className='relative h-[300px] flex items-center justify-center'
                    style={{
                        backgroundImage: `url(${CoverPic})`,
                        backgroundSize: "105%",
                        backgroundPosition: "bottom",
                        backgroundRepeat: "no-repeat"
                    }}>
                    <span className='text-6xl font-bold drop-shadow-xl text-gray-50'>Perfil</span>
                    <span id='shop-now' className='absolute bottom-[20px]'></span>
                </div>

                <div className="flex justify-center mt-10">
                    <form className="w-full max-w-lg bg-white p-8  shadow-md space-y-4">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl mb-7  dark:text-white">Información de Cuenta</h2>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleChange}
                                className="w-full p-2 border "
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleChange}
                                className="w-full p-2  "
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={profileData.password}
                                onChange={handleChange}
                                className="w-full p-2  "
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Dirección</label>
                            <input
                                type="text"
                                name="shippingAddress.address"
                                value={profileData.shippingAddress.address}
                                onChange={handleChange}
                                className="w-full p-2  "
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Ciudad</label>
                            <input
                                type="text"
                                name="shippingAddress.city"
                                value={profileData.shippingAddress.city}
                                onChange={handleChange}
                                className="w-full p-2 border "
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Código Postal</label>
                            <input
                                type="text"
                                name="shippingAddress.postalCode"
                                value={profileData.shippingAddress.postalCode}
                                onChange={handleChange}
                                className="w-full p-2 border "
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">País</label>
                            <input
                                type="text"
                                name="shippingAddress.country"
                                value={profileData.shippingAddress.country}
                                onChange={handleChange}
                                className="w-full p-2 border "
                            />
                        </div>

                        <button type="submit" className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7">
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default Profile;
