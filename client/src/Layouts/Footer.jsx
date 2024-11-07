import { FaFacebookF, FaInstagram,FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (

    <footer className="bg-black text-white py-8">
    <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Logo y sección de navegación */}
        <div className="mb-8 md:mb-0">
          
          <h1 className="text-2xl font-bold mb-2">MexShoes</h1>
          <p className="text-gray-400">Calzado urbano y el mejor estilo.</p>
        </div>

        {/* Enlaces de navegación */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-400">
          <ul className="flex flex-col space-y-2">
            <li><a href="#" className="hover:text-white">Acerca</a></li>
            <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-white">Términos de Servicio</a></li>
          </ul>
          <ul className="flex flex-col space-y-2">
            <li><a href="#" className="hover:text-white">Ayuda</a></li>
            <li><a href="#" className="hover:text-white">Contáctanos</a></li>
            <li><a href="#" className="hover:text-white">Envíos y Devoluciones</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="flex items-center space-x-4 text-gray-400">
          <a href="#" className="hover:text-white" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white" aria-label="Instagram">
            <FaInstagram />
          </a> 
          <a href="#" className="hover:text-white" aria-label="YouTube">
            <FaTiktok />
          </a>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      {/* Derechos reservados */}
      <div className="text-center text-gray-500 text-sm">
        <span>
          © 2024 <a href="/" className="hover:underline">MexShoes</a>. Todos los derechos reservados.
        </span>
      </div>
    </div>
  </footer>

  );
};

export default Footer;
