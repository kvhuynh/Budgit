import { DATA_GRID_PROPS_DEFAULT_VALUES, DataGrid, GridColDef } from "@mui/x-data-grid";
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
];

export const TransactionTable = (props: any) => {
		console.log(props)

		const rows = props.data?.map((item: any, index: any) => ({
			id: index + 1,
			name: item.name,
			amount: item.amount,
			date: item.date,
		}));


	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
			/>
		</div>
	);
};

export default TransactionTable;
