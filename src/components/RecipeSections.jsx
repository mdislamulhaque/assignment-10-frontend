export default function RecipeSections() {
  return (
    <div className="space-y-20">
      {/* --- Section 1: Popular Recipes --- */}
      <section className="max-w-full mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          🍲 Popular Recipes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/vxRZcrXj/bbq-with-variety-meats-complete-with-tomatoes-bell-peppers-white-plate.jpg"
              alt="Recipe 1"
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold">Chicken Curry</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Spicy and delicious chicken curry with fresh spices.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/fdCdWJxS/deep-fried-fhicken-roll-dark-surface.jpg"
              alt="Recipe 2"
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold">Veggie Salad</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                A healthy mix of fresh vegetables with lemon dressing.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/dsCRdpt5/stuffed-zucchini-with-chicken-tomatoes-olives-with-cheese-crust.jpg"
              alt="Recipe 3"
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold">Pasta Alfredo</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Creamy pasta with Alfredo sauce and cheese.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2: Cooking Tips --- */}
      <section className="bg-green-50 dark:bg-gray-900 py-16">
        <div className="max-w-full mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">👩‍🍳 Cooking Tips</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how to improve your cooking with simple tips from expert
            chefs. From knife skills to seasoning hacks, make your meals more
            delicious and fun.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Use Fresh Ingredients</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Fresh vegetables and spices always make a big difference in
                flavor.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Balance the Flavors</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Always balance sweet, salty, sour, and spicy for perfect taste.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Cook on Medium Heat</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Cooking on medium heat keeps food tasty without burning.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
