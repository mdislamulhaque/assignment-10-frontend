import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SliderComponent from "../components/Slider";
import RecipeSections from "../components/RecipeSections";

const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchTopRecipes = async () => {
    try {
      const res = await fetch(
        "https://recipe-book-server-seven-blush.vercel.app/recipes"
      );
      const data = await res.json();
      // sort by likeCount descending & take top 6
      const top = data.sort((a, b) => b.likeCount - a.likeCount).slice(0, 6);
      setTopRecipes(top);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTopRecipes();
  }, []);

  return (
    <div>
      {/* Slider / Banner */}
      <div className="flex items-center justify-center mb-6">
        <SliderComponent />
      </div>

      {/* Top Recipes */}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Top Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topRecipes.map((recipe) => (
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
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                <strong>Likes:</strong> {recipe.likeCount || 0}
              </p>

              <button
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="w-full bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/all-recipes")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            See All Recipes
          </button>
        </div>
      </div>

      {/* Extra Static Sections */}
      <div className="max-w-7xl mx-auto px-6 mt-12 gap-6">
        <RecipeSections />
      </div>
    </div>
  );
};

export default Home;
