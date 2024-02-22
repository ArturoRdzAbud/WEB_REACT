import {
    useReactTable, getCoreRowModel, flexRender, getPaginationRowModel
    , getSortedRowModel, getFilteredRowModel
    // ,useColumnVisibility 
} from "@tanstack/react-table";
import React, { useState } from 'react';
import dayjs from "dayjs";
import { ElementoCampo } from './ElementoCampo';
import { useEffect } from "react";

function SimpleTable({ data, columns, handleEdit }) {



    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState("")
    // const { setColumnVisibility, getToggleHiddenProps } = useColumnVisibility();

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

    const handleCheckboxChange = (row, isChecked) => {
        row.isActive = isChecked;
    };


    return (
        <div>


            <ElementoCampo type='text' lblCampo="Filtro :" claCampo="filtro" valCampo={filtering} onInputChange={setFiltering} />


            <table border="1">

                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {
                                headerGroup.headers.map(header => (
                                    header.column.columnDef.visible && (//VALIDA SI ES VISIBLE
                                        <th key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{ asc: "⬆️", desc: "⬇️" }[header.column.getIsSorted() ?? null]}
                                        </th>
                                    )
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
                                cell.column.columnDef.visible && (  //VALIDA SI ES VISIBLE
                                    <td key={cell.id}>
                                        {
                                            // let hasMeta = flexRender(cell.column.columnDef.cell, cell.getContext())

                                            (cell.column.id == "Nombre" || cell.column.id == "Descripcion") ?    //VALIDA SI ES COLUMNA TIPO LINK
                                                <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(row) }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</a>
                                                // : (cell.column.id == "Activo") ?
                                                : (cell.column.id.endsWith("Chk")) ?
                                                
                                                    // <ElementoCampo 
                                                    // type="checkbox" 
                                                    // lblCampo="" 
                                                    // editable={false} 
                                                    // valCampo={cell.renderValue().toString()}
                                                    // onChange={(e) => {handleCheckboxChange(row, e.target.checked)}}
                                                    // ></ElementoCampo> 

                                                    <input
                                                        type="checkbox"
                                                        checked={cell.renderValue().toString() == 'true'}
                                                        onChange={(e) => {  
                                                            handleCheckboxChange(row, e.target.checked);
                                                        }}
                                                        disabled={true}
                                                    />
                                                    :
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                   
                                        }
                                    </td>
                                )

                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {
                                footerGroup.headers.map(footer => (
                                    footer.column.columnDef.visible && (//VALIDA SI ES VISIBLE
                                        <th key={footer.id}>
                                            {flexRender(footer.column.columnDef.footer, footer.getContext())}
                                        </th>
                                    )
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

            <button className="btn btn-primary" onClick={() => (table.previousPage())}>
                Página anterior
            </button>


            <button className="btn btn-primary" onClick={() => (table.nextPage())}>
                Página siguiente
            </button>

            <button className="btn btn-primary" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                Última Página
            </button>


        </div>
    );

}

export default SimpleTable