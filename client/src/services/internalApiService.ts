import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api",
	withCredentials: true,
});

// User operations
export const createUser = async (potentialUser: Object) => {
	const res = await http.post("/users/register", potentialUser);
	return res.data;
};

export const loginUser = async (potentialUser: Object) => {
	const res = await http.post("/users/login", potentialUser);
	return res.data;
};

export const getCurrentUser = async () => {
	const res = await http.get("/users/");
	return res.data;
};

export const logoutUser = async () => {
	const res = await http.get("/users/logout");

	return res.data;
};

export const createBudget = async (budgetData: Object) => {
	console.log(budgetData);

	const res = await http.post("/budgets/new", budgetData);
	return res.data;
};

export const getAllBudgets = async () => {
	const res = await http.get("/budgets/");
	return res.data;
};

export const getOneBudget = async (budgetName: string) => {
	const res = await http.get("/budgets/" + budgetName);
	console.log(res.data);

	return res.data;
};

export const updateBudget = async (budgetName: string, updatedData: any) => {
	console.log(updatedData);

	const res = await http.put(
		`/budgets/${budgetName}/update`,
		updatedData.totalBudgetValue
	);

	console.log(res.data);

	return res.data;
};

export const deleteBudget = async (budgetId: number) => {
	const res = await http.delete(`/budgets/${budgetId}/delete`);
	return res.data;
};

export const createBudgetItem = async (
	budgetItemData: Object,
	budgetId: number
) => {
	console.log(budgetItemData);

	const res = await http.post(`/budgetItems/${budgetId}/new`, budgetItemData);

	return res.data;
};

export const getAllBudgetItemsByBudget = async (budget: any) => {
	try {
		const res = await http.get(`/budgetItems/${budget.id}`);
		console.log(res.data);

		return res.data;
	} catch {}
};

export const getOneBudgetItem = async (budgetItemId: any) => {
	console.log(budgetItemId);

	const res = await http.get(`/budgetItems/${budgetItemId}/single`);

	return res.data;
};

export const updateBudgetItem = async (budgetItemData: any) => {
	const res = await http.put(
		`/budgetItems/${budgetItemData.id}/update`,
		budgetItemData
	);
	console.log(res.data);

	return res.data;
};

export const deleteBudgetItem = async (budgetItemId: number) => {
	console.log("deletingBudgetItem");

	const res = await http.delete(`/budgetItems/${budgetItemId}/delete`);
	console.log(res.data);

	return res.data;
};

export const getAllIncomeSources = async () => {
	const res = await http.get("/incomeSources/");
	console.log(res.data);

	return res.data;
};

export const getAllTransactions = async () => {
	console.log("getting all transactions from internalapiservice");

	const res = await http.get("/incomeSources/transactions");
	console.log(res.data);

	return res.data;
};
