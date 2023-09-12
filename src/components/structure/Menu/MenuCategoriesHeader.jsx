import React from "react";
import Button from "../../elements/Button";

function MenuCategoriesHeader({ activeCategory, setActiveCategory, categories }) {
    return (
        <div className="flex justify-center bg-white p-2 shadow-md sticky top-0 w-screen">
            <div className="flex space-x-2">
                {categories.map((category) => (
                    <Button
                        key={category}
                        className={`px-2 rounded-lg hover:bg-marigold-500 focus:ring-white text-black ${activeCategory === category ? "bg-marigold-600" : ""}`}
                        variant="white"
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default MenuCategoriesHeader;