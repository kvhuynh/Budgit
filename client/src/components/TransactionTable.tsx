import * as React from 'react';
import { useState, useEffect } from "react"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { log } from 'console';

const columns: GridColDef[] = [
  { 
    field: 'name', 
    headerName: 'Name', 
    width: 70,
    valueGetter: (params: any) => {
      console.log(params)
    }
  },

  { 
    field: 'balance',
    headerName: 'Balance', 
    width: 130,
    valueGetter: (params: any) => {
      // console.log(params.id)
    }
  },
  { field: 'limit', headerName: 'Limit', width: 130 },
  { field: 'type', headerName: 'Type', width: 130 },

  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const defaultRows = [
  {
    id: 1,
    Lot: "2101000134",
    Bill: "M0000013092",
    Shelf: "W13-A1",
    Bin: "B01",
    Rate: 221,
    Stock: 128.0,
    Transfer: 12,
    Total: 234,
  },
];

export const TransactionTable = (props: any) => {
  console.log(props);
  
  // const [data, setData] = useState([])
  // useEffect(() => {
  //   // console.log(props.data);
  //   for (let i = 0; i < props.data.length; i++) {
  //     props.data[i].push(i)
  //   }
  //   console.log(props.data);
    
  // })

  // const test = (data: any) => {

  // }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
      {/* <DataGrid
        // rows={props.data}
        rows={defaultRows}
        // rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // getRowId={(row: any) => row[row.length-1]}
        // checkboxSelection
      /> */}
    </div>
  );
}

export default TransactionTable;
