"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getTableColumns } from "drizzle-orm";
import { useState } from "react";
import { useEffect } from "react";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import { Loader } from "lucide-react";
export default function page() {
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    setLoading(true);
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

    console.log(result);
    setBudgetList(result);
    getAllExpenses();
    setLoading(false);
  };

  const getAllExpenses = async () => {
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

    setExpensesList(result);
  };
  return loading ? (
    <Loader
      className="animate-spin mx-auto my-[250px] flex justify-between items-center"
      size={50}
    />
  ) : (
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌️</h2>
      <p className="text-gray-500">
        Here's what is happening with your money. Lets Manage your expenses and
        increase your smart savings.
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid sm:grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2 ">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="gap-5">
          <h2 className="font-bold text-lg">Your Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <div className="my-3">
              <BudgetItem budgetInfo={budget} key={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
