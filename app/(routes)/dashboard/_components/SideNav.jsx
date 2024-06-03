"use client";
import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  const path = usePathname();
  const { user } = useUser();
  return (
    <div className="h-screen">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={"160"}
        height={"100"}
        className="p-3"
      />
      <div>
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 mb-1 items-center text-gray-400 font-med p-3 cursor-pointer rounded-md hover:text-gray-50 hover:bg-blue-800 ${
                path == menu.path && "text-gray-50 bg-blue-800"
              }`}
            >
              <menu.icon size={24} />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center  text-gray-400 hover:text-gray-50 ">
        <UserButton />
        {user?.fullName}
      </div>
    </div>
  );
}

export default SideNav;
