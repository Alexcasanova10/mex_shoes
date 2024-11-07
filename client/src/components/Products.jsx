import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productListAction } from "../Redux/Actions/Product";
import Layout from "../Layouts/Layouts";

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products = [] } = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  const enumBrand = ["Adidas","Nike","Puma","Reebok","Charly","Vans","Panam","Otras"];
  return (
    <>
    <Layout>
      <div className=" min-h-screen">
        {loading ? (
          <h1>loading</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <>

            <section className=" body-font">  
              <div className="container px-5 py-12 mx-auto">
                {/* Barra de Filtros */}
                
                <h2 class="text-4xl mb-7 font-bold dark:text-white">El mejor calzado urbano</h2>
                <div className="flex justify-between items-center bg-white p-4">
                  <select  className="text-white bg-[#050708] hover:bg-[#050708]/80   font-medium block text-lg px-5 py-2.5 dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7">
                    <option disabled selected >Fitro por marca</option>
                    {enumBrand.map((brand)=>(
                      <option>{brand}</option>
                    ))}
                  </select>
                  {/* <button className="text-white bg-[#050708] hover:bg-[#050708]/80   font-medium block text-lg px-5 py-2.5 text-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7">Filtro</button> */}

                  <p className="text-gray-500">n productos</p>
                  <select className="border border-gray-300 text-gray-700 py-2 px-3 ">
                    <option>Ordenar</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                  </select>
                </div>
                <div className="flex flex-wrap -m-4">
                  {products.map((product) => (
                    <div className="p-4 lg:w-1/4 md:w-1/2" key={product.id}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <Link to={`/products/${product._id}`} className="group block">
                        <div className="w-[286px] h-[286px] overflow-hidden bg-gray-200 group-hover:opacity-90 transition-transform duration-300 ease-in-out transform hover:scale-105">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                          <div className="p-4">
                            <h3 className="text-gray-800  text-lg mb-1 truncate">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-2">Marca: {product.brand}</p>
                            <p className="text-lg  text-gray-900">${product.price}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
    </>
  );
};

export default Products;
