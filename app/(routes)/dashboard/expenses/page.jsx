"use client";
import React from "react";
import ExpenseListTable from "./_components/ExpenseListTable";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BackButton from "../_components/BackButton";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

function page() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
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
      .orderBy(desc(Budgets.id));

    getAllExpenses();
  };
  const [loading, setLoading] = useState(false);
  const getAllExpenses = async () => {
    setLoading(true);
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.createdAt));

    setLoading(false);
    setExpensesList(result);
  };
  return (
    <div className="ml-8 w-[80%]">
      <div>
        <BackButton />
        <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList()}
        />
        {loading && <Loader className="mx-auto my-20" size="50" />}
      </div>
    </div>
  );
}

export default page;
