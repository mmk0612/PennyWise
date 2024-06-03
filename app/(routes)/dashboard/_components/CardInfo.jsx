import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    budgetList && calculateCardInfo();
  }, [budgetList]);

  const calculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpent_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount);
      totalSpent_ += Number(element.totalSpent);
    });
    setTotalBudget(totalBudget_);
    setTotalSpent(totalSpent_);
  };
  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-l flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">Rs. {totalBudget}</h2>
            </div>
            <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-l flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spent</h2>
              <h2 className="font-bold text-2xl">Rs. {totalSpent}</h2>
            </div>
            <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-l flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. of Budgets</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
