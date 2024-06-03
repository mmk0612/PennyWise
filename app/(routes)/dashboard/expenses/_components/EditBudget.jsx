"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader, PenBox } from "lucide-react";
import { db } from "@/utils/dbConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { eq } from "drizzle-orm";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";

function EditBudget({ budget, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budget?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budget?.name);
  const [amount, setAmount] = useState(budget?.amount);

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (budget) {
      setEmojiIcon(budget?.icon);
      setName(budget?.name);
      setAmount(budget?.amount);
    }
  }, [budget]);
  const onUpdateBudget = async () => {
    setLoading(true);
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budget.id))
      .returning();

    if (result) {
      setLoading(false);
      refreshData();
      toast.success("Budget Updated Successfully");
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            {" "}
            <PenBox /> Edit Budget
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Existing Budget?</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                  className="text-lg"
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Groceries"
                    defaultValue={budget?.name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    defaultValue={budget?.amount}
                    placeholder="e.g. Rs.5000"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                onClick={() => onUpdateBudget()}
                disabled={!(name && amount)}
                className="mt-5 w-full"
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Update Budget"
                )}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
