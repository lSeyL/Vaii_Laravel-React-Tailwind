function PaginationButton({ onClick, disabled, children }) {
  return (
    <button
      className="p-2 rounded-full bg-gray-100 border-2 border-stone-800 hover:bg-gray-300 transition duration-300 disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
