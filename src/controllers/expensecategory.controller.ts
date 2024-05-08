import { Request, Response } from "express";
import httpStatus from "http-status";
import {ExpenseCategory}  from "../models/expensecategory.model";
import { ExpenseCategoryService } from "../service";

export async function addExpenseCategory(req: Request, res: Response) {
    try {
      const userId : any = res.get("userId")!;
      const { categoryName } = req.body;
      const category  = {
        categoryName: categoryName,
        userId: userId,
      };
  
      const createdCategory = await ExpenseCategoryService.createExpenseCategory(
        category as ExpenseCategory
      );
     
      res.status(httpStatus.OK).send({
        statusCode: httpStatus.OK,
        message: "new Expense Category added",
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
  
  export async function fetchExpenseCategory(req: Request, res: Response) {
    try {
     
      const category = await ExpenseCategoryService.fetchExpenseCategories(
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
  
  
  export async function deleteExpenseCategory(req: Request, res: Response) {
    try {
      const { id} = req.params;
      const category = await ExpenseCategoryService.fetchCategoriesById(id);
  
      if (category) {
        category.deleteStatus = true;
        category.save();
        res.status(httpStatus.OK).send({
          statusCode: httpStatus.OK,
          message: "category deleted successfully",
          data: category,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      });
    }
  }
  