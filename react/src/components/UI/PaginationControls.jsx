import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaginationButton from "./PaginationButton";

function PaginationControls({ currentPage, lastPage, setCurrentPage }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <PaginationButton
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <FaChevronLeft className="text-xl" />
      </PaginationButton>

      <span className="text-lg font-bold">
        Page {currentPage} of {lastPage}
      </span>

      <PaginationButton
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
        disabled={currentPage === lastPage}
      >
        <FaChevronRight className="text-xl" />
      </PaginationButton>
    </div>
  );
}

export default PaginationControls;
