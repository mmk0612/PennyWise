"use client";
import React, { useEffect } from "react";
import { db } from "@/utils/dbConfig";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { Expenses, Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { PenBox, Trash, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "../../_components/BackButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen({ params }) {
  const { user } = useUser();

  const [budgetInfo, setBudgetInfo] = useState();

  const [expensesList, setExpensesList] = useState([]);
  const [overSpent, setOverSpent] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const route = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  useEffect(() => {
    overSpent && setIsDialogOpen(true);
  }, [overSpent]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpent: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalCount: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .where(eq(Budgets.id, params.id));

    if (result[0].totalSpent > result[0].amount) {
      toast.error("You have overspent your budget");
      setOverSpent(true);
    }
    setBudgetInfo(result[0]);
    getExpensesList();
  };

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));

    console.log(result);
    setExpensesList(result);
  };

  const deleteBudget = async () => {
    const deleteExpenses = await db
      .delete(Expenses)
      .where(eq(params.id, Expenses.budgetId))
      .returning();

    if (deleteExpenses) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();

      toast.success("Budget Deleted Successfully");
      route.replace("/dashboard/budgets");
    }
  };
  return (
    <div className="p-10">
      <BackButton />
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <div />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  You have overspent your Budget.
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You have spent more than your budget. Please consider editing
                  or creating a new budget.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button className="flex">
                  <EditBudget
                    budget={budgetInfo}
                    refreshData={() => getBudgetInfo()}
                  />
                </Button>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  <Button className="flex">
                    <TrashIcon />
                    Delete Budget
                  </Button>
                </AlertDialogAction>
                <AlertDialogCancel className="bg-black text-white">
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <EditBudget budget={budgetInfo} refreshData={() => getBudgetInfo()} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                <TrashIcon />
                Delete Budget
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  Budget and all the expenses associated with it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel></AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-l md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budgetInfo={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
