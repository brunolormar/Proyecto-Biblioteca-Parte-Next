import { IAutor } from "./IAutores";
import { IClasificacion } from "./IClasificacion";

export interface ILibro {
    id:                   string;
    autor_id:             string;
    titulo:               string;
    isbn:                 string;
    fecha_de_publicacion: Date;
    editorial:            string;
    numero_de_paginas:    string;
    serie:                null | string;
    clasificacion:        Clasificacion;
    estado:               Estado;
    situacion:            Situacion;
    portada:              string;
    prestamosLibro:       any[];
    /*clasificaciones:              IClasificacion;*/
    autor:              IAutor;
}

export enum Clasificacion {
    Adulto = "Adulto",
    Infantil = "infantil",
    Juvenil = "juvenil",
}

export enum Estado {
    Descatalogado = "descatalogado",
    EnCatalogo = "en catalogo",
}

export enum Situacion {
    Libre = "libre",
    Prestado = "prestado",
}

export interface IColumn {
    key: string;
    label: string;
  }
  const ColumLibro:IColumn[] = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "titulo",
      label: "TITULO",
    },
    {
      key: "pagina",
      label: "PAGINA",
    },
    {
      key: "situacion",
      label: "SITUACION",
    },
    {
      key: "thumbnailUrl",
      label: "Imagen",
    },
  ];
  
  export default ColumLibro;
  