import { Router } from "express";
import authRoutes from "./auth.routes";
import expenseRoutes from "./expense.routes";
import expensecategoryRoutes from "./expensecategory.routes";


const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/expensecategory", expensecategoryRoutes);
routes.use("/expense", expenseRoutes);

export default routes;
