import mongoose, { Schema, Document } from "mongoose";

export interface ExpenseCategory extends Document {
  categoryName: string;
  userId: mongoose.Schema.Types.ObjectId;
  deleteStatus:Boolean;
  updatedAt: Date;
  createdAt: Date;
}

const expenseCategorySchema: Schema = new Schema(
  {
    categoryName: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    deleteStatus: {
      type: Boolean,
      default:true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ExpenseCategory>("expensecategory", expenseCategorySchema);
