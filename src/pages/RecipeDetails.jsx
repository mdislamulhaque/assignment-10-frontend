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

   // ✅ Optimistic UI Update
   setLikeCount((prev) => prev + 1);

   try {
     const res = await fetch(
       `https://recipe-book-server-seven-blush.vercel.app/recipes/${id}/like`,
       {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ userEmail: user.email }),
       }
     );

     if (res.ok) {
       const data = await res.json();
       setLikeCount(data.likeCount);
     }
   } catch (err) {
     console.error(err);
     // rollback হলে চাইলে কমিয়ে দিতে পারো
     setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
   }
 };


  if (!recipe) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-5xl mt-12 mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col md:flex-row justify-around items-center">
      <div>
        <img
          src={recipe.image || "https://via.placeholder.com/400"}
          alt={recipe.title}
          className="w-full h-72 object-center rounded-xl mb-4 transition-transform duration-300"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {recipe.title}
        </h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong>Preparation Time:</strong> {recipe.preparationTime} mins
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong>Categories:</strong> {recipe.categories.join(", ")}
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong>Instructions:</strong> {recipe.instructions}
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleLike}
            className={`text-xl bg-emerald-600 px-3 py-1  transition-colors duration-300 rounded cursor-pointer ${
              liked ? "text-red-600" : "text-gray-100 dark:text-gray-100"
            }`}
            title={liked ? "Unlike" : "Like"}
          >
            Like
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            {likeCount} {likeCount === 1 ? "person likes" : "people like"} this
            recipe
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
