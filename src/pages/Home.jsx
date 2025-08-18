import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="h-64 bg-green-600 dark:bg-gray-700 flex items-center justify-center text-white text-4xl font-bold mb-6">
        Welcome to Recipe Book
      </div>

      {/* Top Recipes */}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Top Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRecipes.map((recipe) => (
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
      <div className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-yellow-100 rounded shadow">
          <h3 className="text-2xl font-bold mb-2">Cooking Tips</h3>
          <p>
            Learn new cooking techniques and tips from top chefs around the
            world.
          </p>
        </div>
        <div className="p-6 bg-yellow-100 rounded shadow">
          <h3 className="text-2xl font-bold mb-2">Healthy Eating</h3>
          <p>
            Discover healthy recipes to maintain a balanced diet without
            compromising taste.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
