import { ExpenseCategoryModel } from "../models";
import { ObjectId } from "mongodb";
import { ExpenseCategory } from "../models/expensecategory.model";

/**
 * @description This function is used to fetch all categories 
 * @author Kunal Rathod
 * @returns {Promise<ExpenseCategory|null>}
 */

export async function fetchExpenseCategories(): Promise<ExpenseCategory[]> {
    return await ExpenseCategoryModel.find({deleteStatus:true}).populate('userId');
  }
  
  /**
   * @description This function is used to find a Order by Id
   * @param {String} id
   * @author Kunal Rathod
   * @returns {Promise<ExpenseCategory|null>}
   */
  
  export async function fetchOrderById(Id: string): Promise<ExpenseCategory | null> {
    const objectId = new ObjectId(Id);
    return await ExpenseCategoryModel.findOne({ _id: objectId }).populate("userId");
  }
 
 
  /**
   * @description this function creates a Expense Category in database
   * @param {ExpenseCategory} ExpenseCategory
   * @author Kunal Rathod
   * @returns {ExpenseCategory<ExpenseCategory>}
   */
  
  export async function createExpenseCategory(ExpenseCategory: ExpenseCategory): Promise<ExpenseCategory> {
    return await ExpenseCategoryModel.create(ExpenseCategory);
  }
  