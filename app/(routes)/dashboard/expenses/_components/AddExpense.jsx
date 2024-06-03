"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Expenses, Budgets } from "@/utils/schema";
import { toast, Toaster } from "sonner";
import moment from "moment";
import { db } from "@/utils/dbConfig";
import { Loader } from "lucide-react";
function AddExpense({ budgetId, user, refreshData }) {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });

    setAmount("");
    setName("");
    console.log(result);
    if (result) {
      setLoading(false);
      refreshData();
      toast.success("Expense Added Successfully");
    }
    setLoading(false);
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          value={name}
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          value={amount}
          placeholder="e.g. Rs. 1000"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        className="mt-3 w-full bg-blue-800"
        onClick={() => addNewExpense()}
      >
        {loading ? <Loader className="animate spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
