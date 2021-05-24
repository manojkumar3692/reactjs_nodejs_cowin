import React, { useState, useEffect } from 'react';
import { useTable, useExpanded } from 'react-table'
// Service
import SERVICEAPI from '../../service/fileAPI.js'

// Style
import './tableComponent.scss'

function TableComponent(props) {
    const data = React.useMemo(
        () => props.data.length !== 0 ? props.data : [],
        [props.data]
      )

      const columns = React.useMemo(
        () => [
            {
                Header: () => null, 
                id: 'expander', 
                Cell: ({ row }) => (
                  <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? '👇' : '👉'}
                  </span>
                ),
              },
          {
            Header: 'Area',
            accessor: 'block_name', 
          },
          {
            Header: 'Pincode',
            accessor: 'pincode', 
          },
          {
            Header: 'Clinic Name',
            accessor: 'name',
          },
        ],
        []
      )

      const renderRowSubComponent = React.useCallback(
        ({ row }) => {
            const {original} = row
            return (
                <div className="vaccineSlots">
                    
                        {
                            original.sessions.map((each) => {
                                return (
                                   <div className="vaccineSlots__container">
                                       <ul>
                                            <li>Vaccine Name: {each.vaccine}</li>
                                            <li>Available Dose: {each.available_capacity}</li>
                                            <li>Age Limit: {each.min_age_limit}</li>
                                            <li>Slots : {each.slots.map((slot) => <span style={{'margin':'10px'}}>{slot}</span>)}</li>
                                       </ul>
                                    </div>
                                )
                            })
                        }
                    
                </div>
            )
        },
        []
      )

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        state: { expanded },
      } = useTable({ columns, data },
        useExpanded 
    )
    return (
        <div className="tableComponent">
             <>
      <pre>
      </pre>
      <table {...getTableProps()} style={{ width: '100%' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              // Use a React.Fragment here so the table markup is still valid
              <React.Fragment key={i} {...row.getRowProps()}>
                <tr>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()} style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length} >
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
        </div>
    );
}

export default TableComponent;