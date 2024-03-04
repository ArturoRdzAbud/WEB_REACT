import {
    useReactTable, getCoreRowModel, flexRender, getPaginationRowModel
    , getSortedRowModel, getFilteredRowModel
    // ,useColumnVisibility 
} from "@tanstack/react-table";
import React, { useState } from 'react';
import dayjs from "dayjs";
import { ElementoCampo } from './ElementoCampo';
import { useEffect } from "react";

import Pagefirst from '../svg/page-first.svg?react'
import Pageprev from '../svg/page-prev.svg?react'
import Pagenext from '../svg/page-next.svg?react'
import Pagelast from '../svg/page-last.svg?react'
import Pagenew from '../svg/page-new.svg?react'
import Pagetop from '../svg/page-top.svg?react'

function SimpleTable({ data
    , columns
    , handleEdit //para columna tipo link
    // , handleEdit2//para otra columna tipo link
    , esOcultaBotonNuevo = false
    , handleNuevo//Evento al dar clic en nuevo
    , buttonRefNuevo }) {


    useEffect(() => {
        table.setPageSize(20);
    }, [])




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

    const vuelveArriba = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const nextPage = () => {
        if (table.getCanNextPage())
            table.nextPage()
        // console.log(table.getPageCount())
        //https://tanstack.com/table/v8/docs/api/features/pagination#setpagesize
    }


    return (
        <>
            <div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ flexGrow: 1 }}>
                        <ElementoCampo type='text' lblCampo="Filtro :" claCampo="filtro" valCampo={filtering} onInputChange={setFiltering} />
                    </span>
                    {table.getPageCount() > 1 &&
                        <span >
                            <button type="button" className="btn btn-secondary" onClick={() => table.setPageIndex(0)}><Pagefirst /></button>
                            <button type="button" className="btn btn-primary" onClick={() => (table.previousPage())}><Pageprev /></button>
                            <button type="button" className="btn btn-primary" onClick={nextPage}><Pagenext /></button>
                            <button type="button" className="btn btn-secondary" onClick={() => table.setPageIndex(table.getPageCount() - 1)}><Pagelast /></button>
                        </span>
                    }

                    <span>
                        <button type="button" ref={buttonRefNuevo} className="btn btn-primary" onClick={handleNuevo} hidden={esOcultaBotonNuevo}><Pagenew /></button>
                    </span>
                </div>

                {/* {table.getPageCount() > 1 &&
                    <div style={{ display: 'flex', alignItems: 'left' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => table.setPageIndex(0)}><Pagefirst /></button>
                        <button type="button" className="btn btn-primary" onClick={() => (table.previousPage())}><Pageprev /></button>
                        <button type="button" className="btn btn-primary" onClick={nextPage}><Pagenext /></button>
                        <button type="button" className="btn btn-secondary" onClick={() => table.setPageIndex(table.getPageCount() - 1)}><Pagelast /></button>
                    </div>
                } */}
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
                                                    <a href="#" onClick={(e) => { e.preventDefault(); handleEdit(row, cell.column.id) }}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</a>
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



                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ flexGrow: 1 }}>
                        {/* <button type="button" className="btn btn-secondary" onClick={() => table.setPageIndex(0)}><Pagefirst /></button>
                    <button type="button" className="btn btn-primary" onClick={() => (table.previousPage())}><Pageprev /></button>
                    <button type="button" className="btn btn-primary" onClick={nextPage}><Pagenext /></button>
                    <button type="button" className="btn btn-secondary" onClick={() => table.setPageIndex(table.getPageCount() - 1)}><Pagelast /></button> */}
                    </span>
                    <span>
                        <button type="button" className="btn btn-secondary" onClick={vuelveArriba}><Pagetop /></button>
                    </span>
                </div>


            </div >
        </>
    );

}

export default SimpleTable