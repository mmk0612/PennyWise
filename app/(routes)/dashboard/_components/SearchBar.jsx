import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center mx-5">
      <Input
        type="text"
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-200"
        placeholder="Search Budget..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button
        className="p-2 text-white  bg-blue-700 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        onClick={handleSearch}
      >
        <Search size={24} />
      </Button>
    </div>
  );
}

export default SearchBar;
