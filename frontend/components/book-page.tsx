"use client"

import { cn } from "@/lib/utils"

interface BookPageProps {
  content: string
  pageNumber: number
  isFlipping: boolean
  flipDirection: "next" | "prev"
}

export default function BookPage({ content, pageNumber, isFlipping, flipDirection }: BookPageProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-[url('/paper-texture.jpg')] bg-cover p-8 md:p-12 transition-transform duration-500 flex flex-col",
        isFlipping && flipDirection === "next" && "animate-page-flip-right",
        isFlipping && flipDirection === "prev" && "animate-page-flip-left",
      )}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="prose prose-pink mx-auto max-w-none">
          <p className="text-lg md:text-xl leading-relaxed text-gray-800 first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-pink-600 first-letter:mr-1 first-letter:float-left">
            {content}
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-4">
        <span className="italic">~ {pageNumber} ~</span>
      </div>
    </div>
  )
}

