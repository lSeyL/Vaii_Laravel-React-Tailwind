import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

function SearchBar({ onSearchIconClick, isOpen, iconSize = 24 }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!query) {
            return;
        }
        navigate(`/products/${query}`);
        setQuery("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={`flex items-center ${isOpen ? "space-x-2" : ""}`}
        >
            {/* Icon Button */}
            <button
                type="button"
                onClick={onSearchIconClick}
                className="text-stone-800 hover:text-black focus:outline-none"
            >
                <HiMagnifyingGlass size={iconSize} />
            </button>

            {/* Expanding Search Input */}
            <input
                type="text"
                className={`
                    ${isOpen ? "w-28 sm:w-64 sm:focus:w-72" : " hidden w-0"}
                    transition-all duration-300
                    overflow-hidden 
                    rounded-full bg-neutral px-4 py-2
                    focus:outline-none focus:ring focus:ring-stone-800 focus:ring-opacity-50
                  `}
                placeholder="Search products.."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </form>
    );
}

export default SearchBar;
