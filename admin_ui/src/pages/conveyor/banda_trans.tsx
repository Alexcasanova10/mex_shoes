import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";

import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from "react-icons/hi";

import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store"; // Ajusta la ruta según tu estructura
import { bandListAction } from "../../Redux/Actions/Banda";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

const ConveyorPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalBlue, totalRed, totalGreen } = useSelector(
    (state: RootState) => state.bandListReducer
  );

  useEffect(() => {
    dispatch(bandListAction());
  }, [dispatch]);

  return (
    <NavbarSidebarLayout isFooter={false}>
       

      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
 
            <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Inicio</span>
                </div>
              </Breadcrumb.Item>
               <Breadcrumb.Item>Banda Transportadora</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Banda Transportadora
            </h1>
          </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 p-4">
                 <div className="bg-blue-600 text-white rounded-lg p-6 shadow-md">
                  <h2 className="text-2xl font-bold">{totalBlue}</h2>
                  <p className="mt-2">Producto Nuevo</p>
                </div>
                <div className="bg-green-500 text-white rounded-lg p-6 shadow-md">
                  <h2 className="text-2xl font-bold">{totalGreen}</h2>
                  <p className="mt-2">Pendiente de envío</p>
                </div>
                <div className="bg-red-500 text-white rounded-lg p-6 shadow-md">
                  <h2 className="text-2xl font-bold">{totalRed}</h2>
                  <p className="mt-2">Devolución</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ConveyorPage;
