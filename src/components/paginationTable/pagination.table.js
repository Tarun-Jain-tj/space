// src/components/pagination.table.js
import React from "react";

import { useTable, usePagination } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import './pagination.css'

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    )

    // Render the UI for your table

    return (

        <div className="imageDiv">
            {/* <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
          
                <div className="cards">
                    {data.map((value, index) => {

                        return (
                            <div className="card">
                                <div className={'imageDiv'}><img alt={"name"} className={`image`} src={value.links.mission_patch_small} /></div>
                                <div className="mentonName">{value.mission_name} #{value.flight_number}</div>
                                <div><b>Mention ID: </b>{value.mission_id ? value.mission_id[0] : 'Not Available'}</div>
                                <div><b>Launch year: </b>{value.launch_year}</div>
                                <div><b>Success launch: </b>{value.launch_success != null ? value.launch_success.toString() : 'Not Available'}</div>
                                <div><b>success landing: </b>{value.rocket.first_stage.cores[0].land_success != null ? value.rocket.first_stage.cores[0].land_success.toString() : 'Not Available'}</div>
                            </div>
                        )

                    })}
                </div>
           
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            {/* <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[5, 10, 20, 30, 40, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul> */}
        </div >
    )
}

const PaginationTableComponent = (props) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Flight Number',
                        accessor: 'flight_number',
                    },
                    {
                        Header: 'Mission Name',
                        accessor: 'mission_name',
                    },
                    {
                        Header: 'Launch Year',
                        accessor: 'launch_year',
                    },
                    {
                        Header: 'Launch Success',
                        accessor: d => d.launch_success,
                    },
                    {
                        Header: 'Land Success',
                        accessor: d => d.rocket.first_stage.cores[0].land_success ? d.rocket.first_stage.cores[0].land_success : d.rocket.first_stage.cores[0].land_success,
                    },
                ],
            },
        ],
        []
    )

    // console.log(JSON.stringify(data));


    return (
        <Table columns={columns} data={props.data} />
    )
}

export default PaginationTableComponent;