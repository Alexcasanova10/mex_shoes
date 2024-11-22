"use client";

import { Dropdown } from "flowbite-react";
import {Link} from "react-router-dom"
 


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../Redux/Actions/User";



export function UserDropdown({ logoutHandler }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const userProfileReducer = useSelector((state) => state.userProfileReducer);
  const { user, loading, error } = userProfileReducer;
   
  
  return (
    // <Dropdown label={`Hola! ${user.name}`} dismissOnClick={false}>

     <Dropdown label="owo" dismissOnClick={false}>   
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
