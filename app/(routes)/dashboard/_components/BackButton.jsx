import React from "react";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="my-5">
      <Button className="p-5 text-xl" onClick={handleBack}>
        Back
      </Button>
    </div>
  );
};

export default BackButton;
