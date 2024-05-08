import { Router } from "express";
import { ExpenseController } from "../controllers";
import { jwtverify } from "../middlewares";

const router = Router();
router.use(jwtverify);

router.post("/addExpense", ExpenseController.addExpense);
router.get("/fetchExpenses", ExpenseController.fetchExpenses);
router.get("/fetchExpenses/grouped", ExpenseController.fetchExpensesGrouped);
router.get("/fetchExpenses/matched", ExpenseController.fetchExpensesMonthly);

export default router;
