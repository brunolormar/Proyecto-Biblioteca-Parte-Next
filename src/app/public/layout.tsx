import React from "react";
import { IChildren } from "../../interfaces/IChildren";
import { Menu } from "../../components/commons/Menu";
import { ILink } from '../../interfaces/ILinks';


export default function PublicLayout({children}: IChildren){
    //peticion la BD <-- LINKS DEL FRONTEND
    const enlaces:ILink[] = [
        { name: 'Libros', href: '/public/libros' },
        { name: 'autores', href: '/public/autores' },
        { name: 'preguntas frecuentes', href: '/public/preguntas-frecuentes' },
        { name: 'noticias', href: '/public/noticias' },
        { name: 'cifras', href: '/public/cifras' },
        //{ name: 'Login', href: '/auth/login' },
        //{ name: 'Sign Up', href: '/auth/sign-up' },
    ]
    return (
        <>
            <header>
                <Menu links = {enlaces} />

            </header>
            <main>
                { children }
            </main>   
        </>
    );
  }

