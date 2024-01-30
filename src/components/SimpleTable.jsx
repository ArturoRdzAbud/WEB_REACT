import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from "dayjs";

function SimpleTable() {

    const [data, setDatos] = useState([]);

    useEffect(() => {
        // Cambia la URL a la de tu API
        //EJEMPLO EDICION ROLAnd
        //Ejemplo 2
        //Ejemplo 3 otro comentario alma
        const apiUrl = 'http://localhost:3000/ConsultarGrid?psSpSel=%22BuscarEquipos%22';

        // Haciendo la solicitud a la API utilizando Axios
        axios.get(apiUrl)
            .then(response => setDatos(response.data))
            .catch(error => console.error('Error al obtener datos:', error));

        // console.log(data)    

    }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente


    const columns = [
        {
            header: 'Id',
            accessorKey: 'IdEquipo',
            footer: 'Mi Id'
        },
        // { header: 'Nombre y Apellido',       código de refencia para cuando ocupemos concatenar dos columnas
        // accessorFn: row => `${row.nombre} ${row.apellido}`
        //},
        {
            header: 'Nombre',
            accessorKey: 'Nombre',
            footer: 'mi Nombre'
            //cell: info => dayjs(info.getValue()).format('DD/MM/YYYY')    //Código de referencia para cuando tengamos una columna fecha    
        }
    ];

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState("")

    const table = useReactTable({
        data, columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, globalFilter: filtering, },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,

    })





    return (
        <div>
            <h1>Catálogo de equipos</h1>
            <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            />
            <table border="1">

                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header => (
                                    <th key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {{ asc: "⬆️", desc: "⬇️" }[header.column.getIsSorted() ?? null]}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                    }
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {
                                footerGroup.headers.map(footer => (
                                    <th key={footer.id}>
                                        {flexRender(footer.column.columnDef.footer, footer.getContext())}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                    }
                </tfoot>

            </table>

            <button className="btn btn-primary" onClick={() => table.setPageIndex(0)}>
                Primera Página
            </button>

            <button onClick={() => (table.previousPage())}>
                Página anterior
            </button>


            <button onClick={() => (table.nextPage())}>
                Página siguiente
            </button>

            <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                Última Página
            </button>


        </div>
    );

}

export default SimpleTable