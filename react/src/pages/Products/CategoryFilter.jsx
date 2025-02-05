import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const [fileTypes, setFileTypes] = useState([
    { id: "obj", name: "OBJ" },
    { id: "fbx", name: "FBX" },
    { id: "glb", name: "GLB" },
    { id: "blend", name: "Blender (.blend)" },
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleFilterChange = (filterKey, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(filterKey, value);
    } else {
      newParams.delete(filterKey);
    }
    setSearchParams(newParams);
    navigate(`/products?${newParams.toString()}`);
  };

  return (
    <div className=" w-full mt-5 rounded-lg bg-white shadow-md p-4 z-50">
      <div className="flex flex-wrap justify-center gap-4">
        <select
          className="p-2 border rounded-full"
          onChange={(e) => handleFilterChange("category", e.target.value)}
          defaultValue=""
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-full"
          onChange={(e) => handleFilterChange("polycount", e.target.value)}
          defaultValue=""
        >
          <option value="">Polycount</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="p-2 border rounded-full"
          onChange={(e) => handleFilterChange("file_type", e.target.value)}
          defaultValue=""
        >
          <option value="">File Type</option>
          {fileTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CategoryFilter;
