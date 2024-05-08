import { ExpenseModel } from "../models";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { Expense } from "../models/expense.model";


export async function fetchExpensesGrouped(month?: string) {
    let expenses: Expense[] = [];
  
    if (month) {
      expenses = await ExpenseModel.find({
        date: { $gte: new Date(month), $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)) }
      });
    } else {
      expenses = await ExpenseModel.find();
    }
  
    const groupedExpenses = groupExpensesByCategory(expenses);
    return groupedExpenses;
  }
  
  function groupExpensesByCategory(expenses: Expense[]) {
    const groupedExpenses: { [key: string]: { totalAmount: number, count: number } } = {};
  
    expenses.forEach((expense) => {
      if (!groupedExpenses[expense.categoryId.toString()]) {
        groupedExpenses[expense.categoryId.toString()] = { totalAmount: 0, count: 0 };
      }
  
      groupedExpenses[expense.categoryId.toString()].totalAmount += expense.amount;
      groupedExpenses[expense.categoryId.toString()].count++;
    });
  
    return groupedExpenses;
  }
 
 /**
 * @description This function is used to list all Users
 * @author Keshav suman
 * @param {number} page
 * @returns {Promise<any>}
 */
export async function fetchExpenses(page: number): Promise<any> {
    return await ExpenseModel.find({})
      .skip((page - 1) * 10);
  }

 /**
   * @description this function creates a Expense Category in database
   * @param {Expense} Expense
   * @author Kunal Rathod
   * @returns {Expense<Expense>}
   */
  
 export async function createExpense(Expense: Expense): Promise<Expense> {
    return await ExpenseModel.create(Expense);
  }
 

  
export async function fetchMonthlyExpenseData(categoryId: string, month: string) {
    const startDate = new Date(month);
    const endDate = new Date(new Date(month).setMonth(startDate.getMonth() + 1));
  
    const expenses = await ExpenseModel.find({
      categoryId: new ObjectId(categoryId),
      date: { $gte: startDate, $lt: endDate }
    });
  
    const groupedExpenses = groupExpensesByDay(expenses);
    return groupedExpenses;
  }
  
  function groupExpensesByDay(expenses: Expense[]) {
    const groupedExpenses: { [key: string]: number } = {};
  
    expenses.forEach((expense) => {
      const dayOfMonth = expense.date.getDate().toString();
      if (!groupedExpenses[dayOfMonth]) {
        groupedExpenses[dayOfMonth] = 0;
      }
  
      groupedExpenses[dayOfMonth] += expense.amount;
    });
  
    return groupedExpenses;
  }