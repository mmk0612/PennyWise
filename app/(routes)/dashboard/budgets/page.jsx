"use client";
import React from "react";
import BudgetList from "./_components/BudgetList";
import BackButton from "../_components/BackButton";

function page() {
  return (
    <div className="p-10">
      <BackButton />
      <h2 className="font-bold text-3xl">My Budgets</h2>
      <BudgetList />
    </div>
  );
}

export default page;
