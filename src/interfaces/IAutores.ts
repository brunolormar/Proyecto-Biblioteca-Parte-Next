
import { IColumn, ILibro } from "./ILibros";

export interface IAutor {
  codigo_de_autor: string;
  nombre:          string;
  libros:          ILibro[]; /*El parentesis es para que entienda que el autor puede tener varios libros*/
}

/*export interface Libro {
  id:                   string;
  autor_id:             string;
  titulo:               string;
  isbn:                 string;
  fecha_de_publicacion: Date;
  editorial:            string;
  numero_de_paginas:    string;
  serie:                null;
  clasificacion:        string;
  estado:               string;
  situacion:            string;
  portada:              string;
  prestamosLibro:       any[];
}*/

const ColumAutor:IColumn[] = [
  {
      key: "codigo_de_autor",
      label: "Codigo",
    },
    {
      key: "nombre",
      label: "Nombre",
    },
];

export default ColumAutor;
