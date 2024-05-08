import mongoose, { Schema, Document } from "mongoose";

export interface Expense extends Document {
  title: string;
  date: Date;
  amount: number;
  categoryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

const expenseSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'expensecategory',
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    }
  
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Expense>("expense", expenseSchema);
