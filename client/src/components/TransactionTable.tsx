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

	console.log(props.data);
	const rows = props.data?.transactions?.map((item: any, index: any) => ({
		id: index + 1,
		name: item.name,
		amount: item.amount,
		date: item.date,
	}));

	return (
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
