import { Router } from "express";
import { ExpenseCategoryController } from "../controllers";
import { jwtverify } from "../middlewares";

const router = Router();
router.use(jwtverify);

router.post("/addExpenseCategory", ExpenseCategoryController.addExpenseCategory);
router.get("/fetchExpenseCategory", ExpenseCategoryController.fetchExpenseCategory);
router.delete("/deleteExpenseCategory/:id", ExpenseCategoryController.deleteExpenseCategory);

export default router;
