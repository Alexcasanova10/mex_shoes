import { useDispatch, useSelector } from "react-redux";
import { UserDropdown } from "../components/Dropdown";
import { Link } from "react-router-dom";
import { userLogoutAction } from "../Redux/Actions/User";

import Checkout from "../pages/Checkout";
import { useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { BiCart, BiUser } from "react-icons/bi";


const Navbar = () => {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  const dispatch = useDispatch();


  const qty = useSelector((state)=> state.cartReducer.cartItems.reduce((total,item)=> total+item.qty,0))

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };


  const [open, setOpen] = useState(false)
  return (
    <>

      {/* <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://drive.google.com/file/d/1nzc2QF6RpPc-tXJ8uBMLosvPZPpR9ziG/view?usp=sharing"
              className="h-8 mr-3"
              alt="Logo MexShoes"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MexShoes
            </span>

            
          </Link>

          <div className="flex md:order-2">
            {!userInfo ? (
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Iniciar Sesión
              </Link>
            ) : (
              <>
                <UserDropdown logoutHandler={logoutHandler}></UserDropdown>
                <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                  onClick={() => setOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>

                  <span>{qty}</span>
                </button>

                <Checkout open={open} setOpen={setOpen}></Checkout>
              </>
            )}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/products"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Tienda
                </Link>
              </li> 
            </ul>
          </div>
        </div>
      </nav> */}

      <nav className="bg-gray-50 shadow-md flex items-center justify-between px-10 py-5 border-b-[1px] text-[#000] sticky top-0 left-0 z-30">
        <Link to="/" className="flex items-center">
          <img
            src="https://github.com/Alexcasanova10/humansoft/blob/master/logomexshoes.jpg?raw=true"
            className="h-12 w-12  mr-3"
            alt="Logo MexShoes"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MexShoes
          </span>
        </Link>
        
        <ul className="flex gap-x-10 text-md">
          <Link to="/products" className="flex items-center">
            <li><a className="relative text-2xl flex items-center gap-x-2 text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100 after:transition-all after:duration-300 after:origin-right hover:after:origin-left" href="/">Tienda</a></li>
          </Link>

          <li><a className="relative text-2xl flex items-center gap-x-2 text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100 after:transition-all after:duration-300 after:origin-right hover:after:origin-left" href="/">Puma</a></li>
          <li><a className="relative text-2xl flex items-center gap-x-2 text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100 after:transition-all after:duration-300 after:origin-right hover:after:origin-left" href="/">Adidas</a></li>
          <li><a className="relative text-2xl flex items-center gap-x-2 text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100 after:transition-all after:duration-300 after:origin-right hover:after:origin-left" href="/">Nike</a></li>
        </ul>
        
        <div className="flex items-center gap-x-8 font-normal text-lg">
          <h3 className="flex items-center gap-x-2 cursor-pointer">
            {!userInfo ? (
              <Link
                to="/login"
                className="relative flex items-center gap-x-2 text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100 after:transition-all after:duration-300 after:origin-right hover:after:origin-left"
              > 
                <BiUser className="text-3xl"/>
                Cuenta
                  
              </Link>
            ) : (
              <>
                <UserDropdown logoutHandler={logoutHandler}></UserDropdown>
                <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                  onClick={() => setOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span>{qty}</span>
                </button>
                <Checkout open={open} setOpen={setOpen}></Checkout>
              </>
            )}
          </h3>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
