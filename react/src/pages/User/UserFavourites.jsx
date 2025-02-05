import { Link } from "react-router-dom";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import useFavorites from "./hooks/useFavorites";
function UserFavourites() {
  const { favourites, loading, error } = useFavorites();

  //console.log(favourites);
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className="p-2 sm:p-3 md:p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">My Favourites</h2>
      {favourites.length === 0 ? (
        <p>You have no favorite items yet.</p>
      ) : (
        <div className="space-y-4 flex flex-col items-center text-left">
          {favourites.map((fav) => (
            <div
              key={fav.id}
              className="border p-4 rounded-lg shadow-md flex items-center justify-between w-full lg:w-2/3"
            >
              <div>
                <p className="font-semibold">{fav.name}</p>
                <p>Category: {fav.category.name}</p>
                <p>Price: {fav.price} €</p>
              </div>

              <div className="flex items-center gap-4">
                {fav.image_file_path && (
                  <img
                    src={fav.image_file_path}
                    alt={fav.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <Link
                  to={`/products/${fav.category.name}/${fav.slug}`}
                  className="icon-button"
                >
                  <HiOutlineArrowTopRightOnSquare size={26} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserFavourites;
