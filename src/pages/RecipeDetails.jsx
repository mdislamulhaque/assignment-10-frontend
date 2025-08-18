import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const fetchRecipe = async () => {
    try {
      const res = await fetch(
        `https://recipe-book-server-seven-blush.vercel.app/recipes/${id}`
      );
      const data = await res.json();
      setRecipe(data);
      setLikeCount(data.likeCount || 0);
      if (user && data.likedBy?.includes(user.email)) setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [user]);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like the recipe");
      return;
    }
    if (recipe.userEmail === user.email) {
      alert("You can't like your own recipe!");
      return;
    }

    try {
      const res = await fetch(
        `https://recipe-book-server-seven-blush.vercel.app/recipes/${id}/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: user.email }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.likeCount);
        setLiked(data.likedBy.includes(user.email));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!recipe) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>

      <img
        src={recipe.image || "https://via.placeholder.com/400"}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <p className="mb-2">
        <strong>Cuisine:</strong> {recipe.cuisine}
      </p>
      <p className="mb-2">
        <strong>Preparation Time:</strong> {recipe.preparationTime} mins
      </p>
      <p className="mb-2">
        <strong>Categories:</strong> {recipe.categories.join(", ")}
      </p>
      <p className="mb-2">
        <strong>Ingredients:</strong> {recipe.ingredients}
      </p>
      <p className="mb-2">
        <strong>Instructions:</strong> {recipe.instructions}
      </p>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleLike}
          className={`text-2xl ${liked ? "text-red-600" : "text-gray-400"}`}
        >
          like
        </button>
        <span>{likeCount} people interested in this recipe</span>
      </div>
    </div>
  );
};

export default RecipeDetails;
