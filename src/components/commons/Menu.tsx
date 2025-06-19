'use client';

import React, { FC, useContext } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { ILink } from "../../interfaces/ILinks";
import Cookies from "js-cookie";
import { AuthContext } from "@/app/context/auth";
import { useRouter } from "next/navigation";

interface Props {
    links: ILink[]
}

//Componentes parametrizado (RECIBE PARAMETROS)
export const Menu:FC<Props> = ({links}) => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const onLogout = () => {
    logout();
    router.push('/public'); // Redirigir al home u otra ruta tras logout
  };
  
  return (
    <Navbar className="bg-cyan-200">
      <NavbarBrand>
        { /*<BibliotecaLogo />*/ }
        <p className="font-bold text-inherit">Biblioteca</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 space-y-1 px-2 pb-3 pt-2" justify="center">
        {
          links.map ( (link) => ( //return
            <NavbarItem key={link.name} className="block rounded-md bg-blue-500 px-3 py-2 text-base font-medium text-white">
              <Link color="foreground" href={ link.href }>
                { link.name}
              </Link>
            </NavbarItem>
          ))
        }     
      </NavbarContent>
      {/*{ ! Cookies.get('email')}*/}
        {/*?*/}
        <NavbarContent justify="end">
          {!user ? (
            <>
              <NavbarItem className="hidden lg:flex block rounded-md bg-green-200 px-6 py-3 text-base font-medium">
                <Link href="/auth/login">Login</Link>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex block rounded-md bg-green-200 pt-2 text-base font-medium">
                <Button as={Link} color="primary" href="/auth/register" variant="flat">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem className="text-sm font-medium text-black">
                ¡Hola, {user.username}!
              </NavbarItem>
              <NavbarItem>
                <Button color="danger" onClick={onLogout} variant="flat">
                  Logout
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>
      </Navbar>
  );
}
