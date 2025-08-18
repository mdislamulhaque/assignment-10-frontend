import { useState, useContext } from "react";
import { AuthContext } from "../context/authProvider";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cuisine, setCuisine] = useState("Italian");
  const [preparationTime, setPreparationTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

  const handleCheckbox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategories([...categories, value]);
    } else {
      setCategories(categories.filter((c) => c !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      ingredients,
      instructions,
      cuisine,
      preparationTime,
      categories,
      image,
      likeCount: 0,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
    };

    try {
      const res = await fetch(
        "https://recipe-book-server-seven-blush.vercel.app/recipes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecipe),
        }
      );
      const data = await res.json();
      setMessage("Recipe added successfully!");
      // Clear form
      setTitle("");
      setIngredients("");
      setInstructions("");
      setPreparationTime("");
      setCategories([]);
      setImage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add Recipe</h2>
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Preparation Time (mins)"
          value={preparationTime}
          onChange={(e) => setPreparationTime(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Italian</option>
          <option>Mexican</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Others</option>
        </select>

        <div className="flex gap-4 flex-wrap">
          {categoryOptions.map((cat) => (
            <label key={cat} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={cat}
                checked={categories.includes(cat)}
                onChange={handleCheckbox}
              />
              {cat}
            </label>
          ))}
        </div>

        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
