import { eq } from "drizzle-orm";
import { Trash, TrashIcon } from "lucide-react";
import { db } from "@/utils/dbConfig";
import React from "react";
import { Expenses } from "@/utils/schema";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    console.log(result);
    if (result) {
      toast.success("Expense Deleted Successfully");
      refreshData();
    }
  };
  return (
    <div className="mt-3">
      <h2 className="text-lg font-bold mt-5 mb-5">Your Latest Expenses</h2>
      <div className="grid grid-cols-5 bg-slate-300 p-2">
        <h2 className="font-bold col-span-2">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold hidden sm:block">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div className="grid grid-cols-5 bg-slate-50 p-2">
          <h2 className="col-span-2">{expenses.name}</h2>
          <h2>{expenses.amount}</h2>
          <h2 className="hidden sm:block">{expenses.createdAt}</h2>
          <h2>
            <TrashIcon
              onClick={() => deleteExpense(expenses)}
              className="text-red-600"
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
