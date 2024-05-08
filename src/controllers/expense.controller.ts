import { Request, Response } from "express";
import httpStatus from "http-status";
import { Expense } from "../models/expense.model";
import { ExpenseService } from "../service";


export async function addExpense(req: Request, res: Response) {
    try {
      const userId : any = res.get("userId")!;
      const { title , date, amount , categoryId} = req.body;
      const expense  = {
        title: title,
        date:date,
        amount:amount,
        categoryId:categoryId,
        userId: userId,
      };
  
      const createdCategory = await ExpenseService.createExpense(
        expense as Expense
      );
     
      res.status(httpStatus.OK).send({
        statusCode: httpStatus.OK,
        message: "new Expense added",
        data: createdCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      });
    }
  }

  export async function fetchExpenses(req: Request, res: Response) {
    try {
        const { page } = req.query;
      const category = await ExpenseService.fetchExpenses(
        parseInt(page as string),
      );
  
  
      res.status(httpStatus.OK).send({
        statusCode: httpStatus.OK,
        message: "Expence Categories fetched successfully",
        data: category,
      });
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      });
    }
  }
  
  export async function fetchExpensesGrouped(req: Request, res: Response) {
    try {
        const { month } = req.query;
        const expenses = await ExpenseService.fetchExpensesGrouped(month as string);
  
        res.status(httpStatus.OK).send({
            statusCode: httpStatus.OK,
            message: "Expenses grouped by category fetched successfully",
            data: expenses,
        });
    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to fetch grouped expenses",
            error: error,
        });
    }
}

export async function fetchExpensesMonthly(req: Request, res: Response) {
    try {
        const { categoryId } = req.params;
        const { month } = req.query;
        const expenses = await ExpenseService.fetchMonthlyExpenseData(categoryId, month as string);
  
        res.status(httpStatus.OK).send({
            statusCode: httpStatus.OK,
            message: "Monthly expense data fetched successfully",
            data: expenses,
        });
    } catch (error) {
        console.log(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Failed to fetch monthly expense data",
            error: error,
        });
    }
}
