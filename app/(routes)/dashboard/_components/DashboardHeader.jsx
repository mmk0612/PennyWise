import { UserButton } from "@clerk/nextjs";
import React from "react";
import SearchBar from "./SearchBar";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sql } from "drizzle-orm";

function DashboardHeader() {
  const router = useRouter();
  const handleSearch = async (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const result = await db
      .select()
      .from(Budgets)
      .where(sql`LOWER(${Budgets.name}) = ${lowerCaseQuery}`);

    console.log(lowerCaseQuery, result);
    if (!result || result[0].id === undefined) {
      toast.error("Oops! No Budget found");
    } else {
      router.push(`/dashboard/expenses/${result[0].id}`);
    }
  };
  return (
    <div className="p-5 shadow-md border-bt flex justify-between">
      <div className="flex-grow">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div clas>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;