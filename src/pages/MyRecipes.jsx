import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { useNavigate } from "react-router-dom";

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchMyRecipes = async () => {
    try {
      const res = await fetch(
        `https://recipe-book-server-seven-blush.vercel.app/recipes?userEmail=${user.email}`
      );
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchMyRecipes();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this recipe?")) return;
    try {
      await fetch(
        `https://recipe-book-server-seven-blush.vercel.app/recipes/${id}`,
        { method: "DELETE" }
      );
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Recipes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={recipe.image || "https://via.placeholder.com/300"}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {recipe.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              <strong>Prep Time:</strong> {recipe.preparationTime} mins
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              <strong>Categories:</strong> {recipe.categories.join(", ")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              <strong>Likes:</strong> {recipe.likeCount || 0}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(recipe._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Delete
              </button>

              <button
                onClick={() => handleViewDetails(recipe._id)}
                className="flex-1 bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
