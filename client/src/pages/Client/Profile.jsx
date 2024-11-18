// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../../Layouts/Layouts";
// import CoverPic from '../../assets/images/bg-profile.jpg';
// import { getUserProfile, 
    
//  } from "../../Redux/Actions/User";

// const Profile = () => {
        
//     const dispatch = useDispatch();
//     useEffect(() => {
//       dispatch(getUserProfile());
//     }, [dispatch]);
  
//     const userProfileReducer = useSelector((state) => state.userProfileReducer);
//     const { user, loading, error } = userProfileReducer;

//     return (
//         <Layout>
//             <div className='relative h-[300px] flex items-center justify-center' style={{ backgroundImage: `url(${CoverPic})`, backgroundSize: "cover" }}>
//                 <span className='text-6xl font-bold text-gray-50'>Perfil</span>
//             </div>

//             <div className="flex justify-center mt-10">
//                 <form className="w-full max-w-lg bg-white p-8 shadow-md space-y-4" /*</div>onSubmit={handleSubmit}*/>
//                     <div className="text-center mb-6">
//                         <h2 className="text-3xl mb-7">Información de Cuenta</h2>
//                     </div>
 
//                         <>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Nombre</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={user.name}
//                                     // onChange={handleChange}
//                                     className="w-full p-2 border"
//                                 />
//                             </div>

              
                            
//                             <div className="mb-4">
//                                 <label className="block text-gray-700">Correo Electrónico</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={user.email}
//                                     // onChange={handleChange}
//                                     className="w-full p-2 border"
//                                 />
//                             </div>

                      

//                             <button type="submit" className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7">
//                                 Guardar Cambios
//                             </button>
//                         </>
                    
//                 </form>
//             </div>
//         </Layout>
//     );
// };

// export default Profile; 


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layouts/Layouts";
import CoverPic from '../../assets/images/bg-profile.jpg';
import { getUserProfile, updateUserProfileAction } from "../../Redux/Actions/User";

const Profile = () => {
    const dispatch = useDispatch();

    // Estados locales para los campos del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    // Cargar la información del perfil cuando se monta el componente
    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    const userProfileReducer = useSelector((state) => state.userProfileReducer);
    const { user, loading, error } = userProfileReducer;

    // Actualizar los estados locales cuando se obtienen los datos del usuario
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    // Manejar el cambio en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfileAction({ name, email }));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000); // Mostrar mensaje de éxito por 3 segundos
    };

    return (
        <Layout>
            <div className='relative h-[300px] flex items-center justify-center' style={{ backgroundImage: `url(${CoverPic})`, backgroundSize: "cover" }}>
                 <span className='text-6xl font-bold text-dark'>Perfil</span>

            </div>

            <div className="flex justify-center mt-10">
                <form className="w-full max-w-lg bg-white p-8 shadow-md space-y-4" onSubmit={handleSubmit}>
                    <div className="text-center mb-6">
                        <h2 className="text-3xl mb-7">Información de Cuenta</h2>
                    </div>

                    {success && <div className="text-green-500 text-center mb-4">Perfil actualizado exitosamente</div>}
                    {error && <div className="text-red-500 text-center mb-4">Error: {error}</div>}

                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="w-full p-2 border"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full p-2 border"
                        />
                    </div>

                    <button type="submit" className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 font-medium block w-full text-lg px-5 py-2.5 mb-7">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Profile;
