/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
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
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import {orderListAction}from "../../Redux/Actions/Order"

import {Order} from "../../Redux/types";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../../Redux/hook";
  import { RootState } from "../../Redux/store";
  import { useEffect } from "react";


const OrdersPage: FC = function () {

  const dispatch = useAppDispatch();
  const { orders } = useSelector((state: RootState) => state.orderListReducer);

  useEffect(() => {
    dispatch(orderListAction());
  }, [dispatch]);

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Inicio</span>
                </div>
              </Breadcrumb.Item>
               <Breadcrumb.Item>Lista de pedidos</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Pedidos
            </h1>
          </div>
          
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <OrdersTable orders={orders}/>
            </div>
          </div>
        </div>
      </div>
     </NavbarSidebarLayout>
  );
};

// const OrdersTable: FC = function () {

//   return (
//     <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
//       <Table.Head className="bg-gray-100 dark:bg-gray-700">
//         <Table.HeadCell>ID de Pedido</Table.HeadCell>
//         <Table.HeadCell>User</Table.HeadCell>
//         <Table.HeadCell>Información de pedido</Table.HeadCell>
//         <Table.HeadCell>Dirección</Table.HeadCell>
//         <Table.HeadCell>Precio Total</Table.HeadCell>
//         <Table.HeadCell>Fecha</Table.HeadCell>
//         <Table.HeadCell>Estatus</Table.HeadCell>
//       </Table.Head>
//       <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
//         <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
//           <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//             #194556
//           </Table.Cell>  
//           <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
//             <div className="text-base font-semibold text-gray-900 dark:text-white">
//               #12134
//             </div> 
//           </Table.Cell>
//           <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
//             <div className="text-base font-semibold text-gray-900 dark:text-white">
//               tenis chidos
//             </div> 
//           </Table.Cell>
//           <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//             Calle x colonia 1
//           </Table.Cell>
//           <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//             $149
//           </Table.Cell> 
//           <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//             Nov 14 20
//           </Table.Cell>
//           <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
//             Pagado
//           </Table.Cell>
           
//         </Table.Row>
    
        
//       </Table.Body>
//     </Table>
//   );
// };


const OrdersTable= ({ orders }: { orders: Order[] }) => {

  return (
<Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
  <Table.Head className="bg-gray-100 dark:bg-gray-700">
    <Table.HeadCell>ID de Pedido</Table.HeadCell>
    <Table.HeadCell>User</Table.HeadCell>
    <Table.HeadCell>Información de pedido</Table.HeadCell>
    <Table.HeadCell>Dirección</Table.HeadCell>
    <Table.HeadCell>Precio Total</Table.HeadCell>
    <Table.HeadCell>Fecha</Table.HeadCell>
    <Table.HeadCell>Estatus</Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
    {orders.map((order: Order) => (
      <Table.Row key={order._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
        <Table.Cell className="whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white">
          {order._id}
        </Table.Cell>
        <Table.Cell className="whitespace-normal break-words p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base  font-semibold text-gray-900 dark:text-white">
             {order.user}
          </div>
        </Table.Cell>
        <Table.Cell className="whitespace-normal break-words p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
          <div className="text-base font-semibold text-gray-900 dark:text-white">
            <ul>
              {order.orderItems.map((item) => (
                <li key={item._id} className="whitespace-normal break-words">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                    <p>{item.name} - {item.qty} x ${item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Table.Cell>
        <Table.Cell className="whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white">
          {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
        </Table.Cell>
        <Table.Cell className="whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white">
          {order.totalPrice}
        </Table.Cell>
        <Table.Cell className="whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white">
          {order.createdAt}
        </Table.Cell>
        <Table.Cell className="whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white">
          {order.isPaid===true ? (
            <div className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
              <p>Pagado</p>
            </div>
          ) : (
            <div className="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
              <p>Pendiente de pago</p>
            </div>
          )}
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
  );
};


 
 

export default OrdersPage;
