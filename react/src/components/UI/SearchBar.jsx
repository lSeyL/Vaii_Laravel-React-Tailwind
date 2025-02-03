import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

function SearchBar({ onSearchIconClick, isOpen, iconSize = 24 }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) {
      return;
    }
    const newParams = new URLSearchParams();
    newParams.set("name", query);
    navigate(`/products?${newParams.toString()}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="text"
        className={`absolute right-10 top-0 md:top-1
                ${
                  isOpen
                    ? "w-52 sm:w-[360px] lg:w-[260px] xl:w-[260px] sm:focus:w-72 opacity-100"
                    : "w-0 opacity-0"
                }
                transition-all duration-300
                rounded-full bg-neutral px-4 py-2
                focus:outline-none
              `}
        placeholder="Search products.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        onClick={onSearchIconClick}
        className="text-stone-800 hover:text-black focus:outline-none"
      >
        {isOpen ? (
          <HiXMark size={iconSize} />
        ) : (
          <HiMagnifyingGlass size={iconSize} />
        )}
      </button>
    </form>
  );
}

export default SearchBar;
