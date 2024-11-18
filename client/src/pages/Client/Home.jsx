import Layout from "../../Layouts/Layouts"
// import Products from "../components/Products"
// import Landing from "./Landing"
import { Link } from "react-router-dom";

// import { Carousel } from 'flowbite-react';


const Home =  () => {
    return (
      <Layout>
      <section className="relative w-full h-screen    bg-cover bg-center" style={{ backgroundImage: "url('https://lustmexico.com/cdn/shop/files/IMG_0478.jpg?v=1730735414&width=1320')" }}>
            <div className="absolute inset-0 bg-black  opacity-50 "></div>
            <div className="container mx-auto px-6 h-full flex items-center justify-end">
              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-2">Descubre lo nuevo de Adidas</h1>
                <p className="text-white text-lg mb-8">Productos de calidad y estilo único.</p>
                <a
                  href="/products"
                  className="bg-white  absolute text-gray-800 font-semibold px-6 py-3 hover:bg-gray-100 transition duration-300"
                >
                  Comprar ahora
                </a>
              </div>
            </div>
      </section>
      {/* Featured Products */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h1 class="text-3xl mb-7 text-center dark:text-white">Productos destacados</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
             <Link to="/products/6738523b56f60447f2e29d03" className="group block">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img
                  className="h-64 w-full object-cover mb-4 rounded"
                  src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/52c951e30dcb4ff1bfdfd053405a6f75_9366/Samba_Shoes_Green_IG1243_01_standard.jpg"
                  alt="Producto 1"
                />
                <h3 className="text-xl font-semibold mb-2">Adidas Samba Classic</h3>
                <p className="text-gray-600">$1200</p>
                
              </div>
            </Link>
             <Link to="/products/6738523b56f60447f2e29d09" className="group block">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img
                  className="h-64 w-full object-cover mb-4 rounded"
                  src="https://tafmx.vtexassets.com/arquivos/ids/409079-800-auto?v=638337727366400000&width=800&height=auto&aspect=true"
                  alt="Producto 1"
                />
                <h3 className="text-xl font-semibold mb-2">Nike Air Max 90</h3>
                <p className="text-gray-600">$1400</p>
                
              </div>
            </Link>
             <Link to="/products/6738523b56f60447f2e29d0a" className="group block">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <img
                  className="h-64 w-full object-cover mb-4 rounded"
                  src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_450,h_450/global/371570/01/sv01/fnd/EEA/fmt/png"
                  alt="Producto 1"
                />
                <h3 className="text-xl font-semibold mb-2">Puma RS-X³ Puzzle</h3>
                <p className="text-gray-600">$1100</p>
                
              </div>
            </Link>

           
          </div>
        </div>
      </section>         
      <section className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://lustmexico.com/cdn/shop/files/IMG_7068_a3b18200-b4bd-4fdd-9759-2256e0c276d6.jpg?v=1730932037&width=1500')" }}>
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="container mx-auto px-6 h-full flex items-center justify-end">
              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-2">Nike Dunk listo para ti</h1>
                <p className="text-white text-lg mb-8">Estilo único.</p>
                <a
                  href="/products"
                  className="bg-white absolute text-gray-800 font-semibold px-6 py-3 hover:bg-gray-100 transition duration-300"
                >
                  Comprar ahora
                </a>
              </div>
            </div>
      </section>

      <section className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://highxtar.com/wp-content/uploads/2022/08/highxtar-versatiles-y-atemporales-repasamos-los-5-clasicos-de-vans-3.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="container mx-auto px-6 h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-2">La vieja escuela te espera</h1>
                <p className="text-white text-lg mb-8">Conoce los clásicos de vans</p>
                <a
                  href="/products"
                  className="bg-white absolute text-gray-800 font-semibold px-6 py-3 hover:bg-gray-100 transition duration-300"
                >
                  Explorar
                </a>
              </div>
            </div>
      </section>
      
      <section className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F01%2Freebok-club-c-85-vintage-11.jpg?q=75&w=800&cbr=1&fit=max')" }}>
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="container mx-auto px-6 h-full flex items-center justify-end">
              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-2">Lo último de Rebook</h1>
                <p className="text-white text-lg mb-8">Conoce un estilo único.</p>
                <a
                  href="#"
                  className="bg-white text-gray-800 font-semibold px-6 py-3 hover:bg-gray-100 transition duration-300 absolute"
                >
                  Comprar ahora
                </a>
              </div>
            </div>
      </section>
 

      <div className="container mx-auto mb-10  mt-14 px-6">
          <h1 class="text-3xl text-center dark:text-white">Conoce nuestras colecciones</h1>
      </div>

      <div className="grid grid-cols-6">
        <img className="h-auto w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" src="https://lustmexico.com/cdn/shop/files/IMG_8354.jpg?v=1729877866&width=750" />
        <img className="h-auto w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" src="https://lustmexico.com/cdn/shop/files/IMG_8364.jpg?v=1729877810&width=750" alt="image description" />
        <img className="h-auto w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" src="https://lustmexico.com/cdn/shop/files/IMG_4001.jpg?v=1724860734&width=750" />
        <img className="h-auto w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" src="https://lustmexico.com/cdn/shop/files/IMG_7768.jpg?v=1728056288&width=375" alt="image description" />
        <img className="h-auto w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" src="https://lustmexico.com/cdn/shop/files/IMG_8374.jpg?v=1729877847&width=750" alt="image description" />
        <img className="h-auto w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" src="https://lustmexico.com/cdn/shop/files/IMG_8990.jpg?v=1729877764&width=375" alt="image description" />
      </div>

      </Layout>
    );
}

export default Home;