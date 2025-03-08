"use client";
import { useState,useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Share2, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import BookPageContent from "@/components/book-page"

// Sample data - in a real app, this would come from processing the JSON file
const sampleBookData = {
  title: "The Curious Adventures of a Digital Explorer",
  pages: [
    {
      content:
        "It all began on a Tuesday afternoon. You were searching for 'best pasta recipes' and 'how to cook al dente pasta'. Your culinary journey was just beginning, but little did you know where it would lead you...",
      pageNumber: 1,
    },
    {
      content:
        "Two days later, your searches shifted dramatically. 'How to remove tomato sauce stains' and 'can pasta sauce stain permanently?' suggested that your cooking adventure had taken an unexpected turn.",
      pageNumber: 2,
    },
    {
      content:
        "By the weekend, you were searching 'restaurants that deliver pasta near me'. Sometimes the best pasta is the one you don't have to cook yourself. A wise decision indeed!",
      pageNumber: 3,
    },
    {
      content:
        "Your journey continued with searches for 'Italian cooking classes' and 'simple carbonara recipe'. Your determination was admirable, showing the true spirit of someone who doesn't give up easily.",
      pageNumber: 4,
    },
  ],
}

export default function BookPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const [bookData, setBookData] = useState<any>(null);
  let data;

  useEffect(() => {
    // ✅ Retrieve data from localStorage
    const storedData = localStorage.getItem("bookData");
    data = storedData;
    if (storedData) {
        setBookData(JSON.parse(storedData));
    }
}, []);  

  console.log(data);

  const totalPages = sampleBookData.pages.length

  const goToNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection("next")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1)
        setIsFlipping(false)
      }, 500)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1)
        setIsFlipping(false)
      }, 500)
    }
  }

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    alert("Sharing functionality would be implemented here!")
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Download functionality would be implemented here!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Enhanced Back to Home link */}
        <div className="mb-10">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-purple-600 hover:text-pink-600 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          {/* Decorative element above title */}
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4"></div>
          
          {/* Enhanced heading with gradient text and animation */}
          <h1 className="relative text-3xl md:text-5xl font-bold mb-4 inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 animate-gradient-text drop-shadow-sm tracking-tight">
              {sampleBookData.title}
            </span>
            
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-70"></div>
          </h1>
          
          {/* Enhanced tagline with card-like styling */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-purple-100/50 inline-block">
              <p className="text-purple-700 font-medium">
                <span className="text-pink-600">Your personal story</span>, crafted from your digital footprints
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced book container with subtle shadow and border */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-3xl aspect-[3/2] mb-10 rounded-2xl overflow-hidden shadow-xl border border-purple-100/50 bg-white/90 backdrop-blur-sm">
            <div className="absolute inset-0 overflow-hidden">
              <BookPageContent
                content={sampleBookData.pages[currentPage].content}
                pageNumber={sampleBookData.pages[currentPage].pageNumber}
                isFlipping={isFlipping}
                flipDirection={flipDirection}
              />
            </div>

            {/* Enhanced page navigation controls */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0 || isFlipping}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110 active:scale-95"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>

            {/* Enhanced page indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-purple-700 font-medium shadow-sm border border-purple-100/30">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full py-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Story
            </Button>

            <Button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full py-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
      
      {/* Add the animation styles */}
      <style jsx global>{`
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 4s ease infinite;
        }
      `}</style>
    </div>
  )
}

