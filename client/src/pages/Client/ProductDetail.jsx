import { useParams } from "react-router-dom";
import Layout from "../../Layouts/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { productAction } from "../../Redux/Actions/Product";
import {addToCartAction} from "../../Redux/Actions/Cart";

function ProductDetail() {

  const { id } = useParams()
  
  const dispatch = useDispatch();
  const productReducer = useSelector((state) => state.productReducer);
  const { loading, error, product } = productReducer;

  useEffect(() => {
    dispatch(productAction(id))
  }, [dispatch, id])

  const [qty, setQty] = useState(1);

  const [selectedSize, setSelectedSize] = useState(null);

  const addToCartHandler = () => {
    if(!selectedSize){
      alert('Favor de seleccionar una talla');
      return 
    }

    dispatch(addToCartAction(id, qty, selectedSize));
  }
   

  return (
    <Layout>
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={product.image}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">


                  <h1 className="text-3xl text-gray-900 dark:text-white">
                    {product.name}
                  </h1>

                   <p class="text-xl mt-5 mb-5 text-gray-900 dark:text-white">{product._id}</p>
 
                   <p class="text-xl mt-5  text-gray-900 dark:text-white">${product.price}.00</p>
                   <p class="text-xs mb-5 text-gray-900 dark:text-white">Impuestos incluidos</p>

                  
                  
                  <p className="leading-relaxed">{product.description}</p>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded ${
                            selectedSize === size ? 'bg-black text-white' : 'bg-white text-gray-800'
                          } hover:bg-gray-200`}
                        >
                          {size}
                        </button>
                      ))}
                  </div>
                   
                  </div>
                  
                  <div className="">
                    {product.countInStock > 0 ? (
                      <div className="flex ml-6 items-center">
                        <span className="mr-3">Cantidad</span>
                        <div className="relative">
                          <select
                            value={qty}
                            onChange={(e) =>
                              setQty(parseInt(e.target.value, 10))
                            }
                            className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <svg
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6 9l6 6 6-6"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                   
                  <div className="mt-14 flex">

                    {product.countInStock > 0 ? (
                      <button
                        onClick={addToCartHandler}
                        className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium block w-full  text-lg px-5 py-2.5 text-center  dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-7"
                      >
                        Agregar al carrito
                      </button>
                    ) : (
                      <>
                        <h1 className="cursor-not-allowed flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                          Próximamente disponible
                        </h1>

                        
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}



      
    </Layout>
  );
}

export default ProductDetail;
