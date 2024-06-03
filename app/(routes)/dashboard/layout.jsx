"use client";
import { useEffect, React } from "react";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

function dashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result?.length == 0) {
      router.replace("/dashboard/budgets");
    }
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block  bg-blue-600">
        <SideNav />
      </div>
      <div className="md:ml-64  bg-blue-600">
        <DashboardHeader />
      </div>
      <div className="md:ml-64">{children}</div>
    </div>
  );
}

export default dashboardLayout;
