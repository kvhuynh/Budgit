import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/budgetItems",
	withCredentials: true,
});

export const createBudgetItem = async (
	budgetItemData: Object,
	budgetId: number
) => {
	console.log(budgetItemData);

	const res = await http.post(`/${budgetId}/new`, budgetItemData);

	return res.data;
};

export const getAllBudgetItemsByBudget = async (budget: any) => {
	try {
		const res = await http.get(`/${budget.id}`);
		console.log(res.data);

		return res.data;
	} catch {}
};

export const getOneBudgetItem = async (budgetItemId: any) => {
	console.log(budgetItemId);

	const res = await http.get(`/${budgetItemId}/single`);

	return res.data;
};

export const updateBudgetItem = async (budgetItemData: any) => {
	const res = await http.put(
		`/${budgetItemData.id}/update`,
		budgetItemData
	);

	return res.data;
};

export const deleteBudgetItem = async (budgetItemId: number) => {
	console.log("deletingBudgetItem");

	const res = await http.delete(`/${budgetItemId}/delete`);
	console.log(res.data);

	return res.data;
};