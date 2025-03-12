"use client";
import { useState } from "react";
import { useData } from "@/context/DataContext"; // Ensure this import is correct

// Sample book data
const sampleBookData = {
  pages: [
    "Page 1 content",
    "Page 2 content",
    "Page 3 content",
    "Page 4 content",
  ],
};

export default function BookPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
  const totalPages = sampleBookData.pages.length;
  const { data } = useData(); // Ensure this hook is used correctly

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection("next");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev");
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Ensure this is inside the return block */}
        <h1>Book Page</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>

        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Page {currentPage + 1}</h2>
          <p className="text-gray-700">{sampleBookData.pages[currentPage]}</p>

          <div className="mt-4 flex justify-between">
            <button
              className={`px-4 py-2 rounded-md text-white ${
                currentPage === 0 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
              }`}
              onClick={goToPrevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            <button
              className={`px-4 py-2 rounded-md text-white ${
                currentPage === totalPages - 1
                  ? "bg-gray-400"
                  : "bg-green-500 hover:bg-green-700"
              }`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
