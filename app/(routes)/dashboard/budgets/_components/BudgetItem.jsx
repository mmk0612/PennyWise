import Link from "next/link";
import React from "react";

function BudgetItem({ budgetInfo }) {
  console.log(budgetInfo);
  const calculateProgressPercentage = () => {
    if (budgetInfo.totalSpent >= budgetInfo.amount) return 100;
    const percentage = (budgetInfo.totalSpent / budgetInfo.amount) * 100;
    return percentage.toFixed(2);
  };
  return (
    <Link href={`/dashboard/expenses/${budgetInfo?.id}`}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl p-3 bg-slate-100 rounded-full">
              {budgetInfo?.icon}
            </h2>
            <div>
              <h2 className="font-bold ">{budgetInfo.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budgetInfo.totalCount} Items
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-blue-800 text-lg">
            Rs.{budgetInfo.amount}
          </h2>
        </div>
        <div className="mt-5 ">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              Rs {budgetInfo.totalSpent ? budgetInfo.totalSpent : 0} Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              Rs{" "}
              {budgetInfo.totalSpent &&
                (budgetInfo.amount > budgetInfo.totalSpent
                  ? `${budgetInfo.amount - budgetInfo.totalSpent} Remaining`
                  : `${budgetInfo.totalSpent - budgetInfo.amount} OverSpent`)}
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className="bg-blue-800 h-2 rounded-full"
              style={{ width: `${calculateProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
