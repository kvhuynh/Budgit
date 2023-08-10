import { Container } from "@mui/material";
import { LargeBox, fadeInUp } from "../../themes/styles";
import { motion } from "framer-motion";

import TransactionTable from "../TransactionTable";

export const TransactionWidget: React.FC<{transactions: any[]}> = (transactions) => {
	return (
		<Container maxWidth="lg">
			<LargeBox sx={{ boxShadow: 5 }} component={motion.div} {...fadeInUp}>
				<TransactionTable data={transactions}></TransactionTable>
			</LargeBox>
		</Container>
	);
};

export default TransactionWidget;
