import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const res = await fetch(
        "https://recipe-book-server-seven-blush.vercel.app/recipes"
      );
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const filteredRecipes = filter
    ? recipes.filter((r) => r.cuisine === filter)
    : recipes;

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h2 className="text-3xl font-bold mb-4">All Recipes</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Cuisine:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="border rounded p-4 shadow">
            <img
              src={recipe.image || "https://via.placeholder.com/150"}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p>
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <p>
              <strong>Likes:</strong> {recipe.likeCount}
            </p>
            <button
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded mt-2 hover:bg-blue-700"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
