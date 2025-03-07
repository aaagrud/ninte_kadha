"use client"

import { useState } from "react"
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-2">{sampleBookData.title}</h1>
          <p className="text-purple-700">Your personal story, based on your digital footprints</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-3xl aspect-[3/2] mb-8">
            <div className="absolute inset-0 bg-white rounded-lg shadow-2xl overflow-hidden">
              <BookPageContent
                content={sampleBookData.pages[currentPage].content}
                pageNumber={sampleBookData.pages[currentPage].pageNumber}
                isFlipping={isFlipping}
                flipDirection={flipDirection}
              />
            </div>

            {/* Page navigation controls */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 0 || isFlipping}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-3 py-1 rounded-full text-sm text-purple-700">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              onClick={handleShare}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-full py-6"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Story
            </Button>

            <Button
              onClick={handleDownload}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-full py-6"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

