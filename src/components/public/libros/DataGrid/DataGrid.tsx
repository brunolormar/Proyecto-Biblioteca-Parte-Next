import React, { FC } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { IColumn, ILibro } from "../../../../interfaces/ILibros";

interface Props {
    libros: ILibro[],
    columns: IColumn[]
}

export const DataGrid:FC<Props> = ({libros, columns}) => {
  return (
    <Table className="border-collapse border w-4/5">
        <thead>
            {
                columns.map ( (col) => (
                    <th key={col.label}
                        className="border border-slate-300">( col.label )</th>
                ))
            }
        </thead>
        <tbody>
            {
                libros.map ( (libro) => (
                  <tr key={libro.id}
                      className="font-family:Cambria">
                    <td className="font-family:Cambria">( libro.isbn )</td>
                    <td>( libro.titulo )</td>
                    <td>( libro.numero_de_paginas )</td>
                    <td>( libro.situacion )</td>
                    {/*<th> { libro.thumbnailUrl } </th>*/}
                    <td>
                      <img className="h-20 w-20" src={ libro.portada } />
                    </td>
                    <td>
                      {/* <Image
                            src={ libro.thumbnailUrl }
                            height={200}
                            width={200}
                            alt="Picture od the author"
                          /> */}
                    </td>
                  </tr>
                ))
            }
        </tbody>

    </Table>

  )
}

export default DataGrid
