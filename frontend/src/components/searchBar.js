import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex justify-center items-center h-20 w-full fixed top-4 left-0 z-50">
      <div className="relative w-[90%] md:w-[80%] md:mx-[10%]">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg shadow-lg rounded-full"></div>

        <div className="relative flex items-center p-3">
          <input
            type="text"
            placeholder="Search for a ringtone or movie"
            value={search}
            onChange={handleChange}
            className="w-full bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none pl-4 pr-10"
          />
          <SearchIcon className="text-gray-400 absolute right-3 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
