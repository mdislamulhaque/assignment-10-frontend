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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={recipe.image || "https://via.placeholder.com/300"}
                alt={recipe.title}
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {recipe.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              <strong>Likes:</strong> {recipe.likeCount || 0}
            </p>

            <button
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="w-full bg-emerald-800 dark:bg-gray-500 text-white py-2 rounded-lg hover:bg-emerald-700 dark:hover:bg-gray-600 transition-colors duration-300"
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
