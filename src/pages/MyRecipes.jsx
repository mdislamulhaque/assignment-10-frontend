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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
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
              <strong>Prep Time:</strong> {recipe.preparationTime} mins
            </p>
            <p>
              <strong>Categories:</strong> {recipe.categories.join(", ")}
            </p>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p>
              <strong>Likes:</strong> {recipe.likeCount}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDelete(recipe._id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>

              <button
                onClick={() => handleViewDetails(recipe._id)}
                className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
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
