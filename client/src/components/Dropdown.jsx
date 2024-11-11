"use client";

import { Dropdown } from "flowbite-react";
import {Link} from "react-router-dom"
 
export function UserDropdown({ logoutHandler }) {
   
  
  return (
    <Dropdown label=" nOMBRE DE USER" dismissOnClick={false}>
      <Link to="/order-history">
        <Dropdown.Item>Historial de Compras</Dropdown.Item>
      </Link>
      
      <Link to="/profile">
        <Dropdown.Item>Perfil</Dropdown.Item>
      </Link>

      <Dropdown.Item onClick={logoutHandler}>Cerrar Sesión</Dropdown.Item>
    </Dropdown>
  );
}
