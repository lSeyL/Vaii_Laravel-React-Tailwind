import Loader from "../../components/UI/Loader";
import ProductItem from "./ProductItem";
import useProducts from "./hooks/useProducts";
import CategoryFilter from "./CategoryFilter";
import PaginationControls from "./../../components/UI/PaginationControls";

function Products() {
  const { products, isLoading, currentPage, lastPage, setCurrentPage } =
    useProducts();

  return (
    <div className="mt-2 flex flex-col items-center my-4 mx-auto max-w-screen-xl px-4">
      <CategoryFilter />

      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <>
          <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full lg:mt-10 lg:mb-10">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            lastPage={lastPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default Products;
