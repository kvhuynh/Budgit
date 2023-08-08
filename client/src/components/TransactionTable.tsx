import { Box } from "@mui/system";
import {
	DATA_GRID_PROPS_DEFAULT_VALUES,
	DataGrid,
	GridColDef,
	GridValueGetterParams,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";

const columns: GridColDef[] = [
	{
		field: "name",
		headerName: "Name",
		width: 300,
	},

	{
		field: "date",
		headerName: "Date",
		width: 300,
	},
	{
		field: "amount",
		headerName: "Amount",
		width: 300,
	},

	{ field: "id", headerName: "ID", width: 90 },
];

export const TransactionTable = (props: any) => {

	const rows = props.data?.map((item: any, index: any) => ({
		id: index + 1,
		name: item.name,
		amount: item.amount,
		date: item.date,
	}));

	return (
		// <div style={{ height: 400, width: "100%" }}>
		// 	<DataGrid
		// 		rows={rows}
		// 		columns={columns}
		// 		pageSize={5}
		// 		rowsPerPageOptions={[5]}
		// 	/>
		// </div>
		<Box sx={{ height: 400, width: "100%", padding: 2 }}>
			Recent Transactions
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				sx={{ border: 0 }}
			/>
		</Box>
	);
};

export default TransactionTable;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export const TransactionTable = () => {
//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}

//         // pageSizeOptions={[5]}
//         checkboxSelection
//         // disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }

// export default TransactionTable;
