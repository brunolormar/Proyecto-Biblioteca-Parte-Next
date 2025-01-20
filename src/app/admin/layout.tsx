import React from "react";
import { IChildren } from "../../interfaces/IChildren";
import { ILink } from '../../interfaces/ILinks';
import { Menu } from "../../components/commons/Menu";

export default function AdminLayout({children}: IChildren){
    const enlaces:ILink[] = [
        { name: 'Libros', href: '/admin/libros' },
        { name: 'autores', href: '/admin/autores' },
        { name: 'Prestamos', href: '/admin/prestamos' },
        { name: 'Socios', href: '/admin/socios' },
        
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
