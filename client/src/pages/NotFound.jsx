// src/pages/NotFound.jsx
import React from 'react';
import { Link } from "react-router-dom";
import Layout from "../Layouts/Layouts";

const NotFound = () => {
  return (
    <Layout>
        <div className="flex flex-col items-center justify-center h-96    text-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-8xl font-extrabold text-gray-800 dark:text-white mb-4">
                404
            </h1>
            <p className="text-xl  mb-6">
                La página que buscas no existe.
            </p>
            <Link to="/products" className="inline-block">
                <button className="px-6 py-3 bg-[#050708] text-white text-lg font-semibold hover:bg-[#050708]/90 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/70 dark:focus:ring-gray-600 transition duration-200">
                Volver a la tienda
                </button>
            </Link>
        </div>
    </Layout>
  );
};

export default NotFound;
