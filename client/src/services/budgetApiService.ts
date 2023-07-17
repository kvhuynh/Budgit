import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/budgets",
	withCredentials: true,
});

export const createBudget = async (budgetData: Object) => {
	console.log(budgetData);

	const res = await http.post("/new", budgetData);
	return res.data;
};

export const getAllBudgets = async () => {
	const res = await http.get("/");
	return res.data;
};

export const getOneBudget = async (budgetName: string) => {
	const res = await http.get("/" + budgetName);
	console.log(res.data);

	return res.data;
};

export const updateBudget = async (budgetName: string, updatedData: any) => {
	console.log(updatedData);

	const res = await http.put(
		`/${budgetName}/update`,
		updatedData.totalBudgetValue
	);

	console.log(res.data);

	return res.data;
};

export const deleteBudget = async (budgetId: number) => {
	const res = await http.delete(`/${budgetId}/delete`);
	return res.data;
};
