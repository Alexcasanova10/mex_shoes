import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { FaWarehouse } from "react-icons/fa";
import { MdOutlineLocalShipping} from "react-icons/md";
import { TbBuildingFactory2 } from "react-icons/tb";
import { MdHome } from "react-icons/md";

import { useDispatch } from "react-redux";
import { logoutAction } from "../Redux/Actions/User"
const ExampleSidebar: FC = function () {
  // const [currentPage, setCurrentPage] = useState("");

  // useEffect(() => {
  //   const newPage = window.location.pathname;

  //   setCurrentPage(newPage);
  // }, [setCurrentPage]);

  const [currentPage, setCurrentPage] = useState("");
  const dispatch = useDispatch();  // Usamos el hook para acceder a dispatch

  useEffect(() => {
    const newPage = window.location.pathname;
    setCurrentPage(newPage);
  }, [setCurrentPage]);

  // Función que maneja el logout
  const handleLogout = () => {
    dispatch(logoutAction());  // Llama a la acción de logout
  };

  
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
        
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/"
                icon={MdHome}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Inicio
              </Sidebar.Item>
              <Sidebar.Item
                href="/productos"
                icon={FaWarehouse}
                className={
                  "/e-commerce/products" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Productos
              </Sidebar.Item>
              <Sidebar.Item
                href="/pedidos"
                icon={MdOutlineLocalShipping}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Lista de pedidos
              </Sidebar.Item>
              <Sidebar.Item
                href="/conveyor"
                icon={TbBuildingFactory2}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Banda Transportadora
              </Sidebar.Item>
              {/* <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                Sign in
              </Sidebar.Item>
              <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                Sign up
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
          <Sidebar.Item
                onClick={handleLogout}  // Agrega el manejador de logout aquí
                icon={CiLogout}
              >
                Cerrar Sesión
              </Sidebar.Item>
             
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
