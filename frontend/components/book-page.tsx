"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Sparkles, Book, History, Star, ChevronLeft, ChevronRight, Feather } from "lucide-react"
import Image from "next/image"

interface BookPageProps {
  content: string[]
  title?: string
  author?: string
}

export default function BookPage({ content, title = "Ninte കഥ", author = "Your Digital Journey" }: BookPageProps) {
  const [currentPage, setCurrentPage] = useState(0) // 0 is cover
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const [showSparkle, setShowSparkle] = useState(false)
  
  const totalPages = content.length
  
  useEffect(() => {
    if (isFlipping) {
      setShowSparkle(true)
      const timer = setTimeout(() => setShowSparkle(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isFlipping])

  const handleNextPage = () => {
    if (currentPage < totalPages && !isFlipping) {
      setFlipDirection("next")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setIsFlipping(false)
      }, 700)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection("prev")
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(prev => prev - 1)
        setIsFlipping(false)
      }, 700)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto perspective-1000">
      {/* Enhanced background with layered design */}
      <div className="relative w-full aspect-[1.6/1] rounded-3xl overflow-hidden shadow-2xl">
        {/* Improved decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50" />
          
          {/* Animated blobs with improved aesthetics */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" style={{ animationDelay: '4s' }} />
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 right-1/3 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" />
          <div className="absolute bottom-1/4 left-1/5 w-48 h-48 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '3s' }} />
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>
        
        {/* Book content with enhanced styling */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Book structure with improved aesthetics */}
          <div className="relative w-[90%] h-[90%] flex bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-pink-100 transition-all duration-300 hover:shadow-pink-200/30">
            {/* Enhanced spiral binding */}
            <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-gradient-to-r from-purple-600 to-pink-600 z-10">
              {/* Improved spiral holes with shadow effect */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 shadow-inner"
                  style={{ 
                    top: `${(i + 1) * 7}%`,
                    boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)'
                  }}
                />
              ))}
            </div>
            
            {/* Page content area with enhanced styling */}
            <div className="relative w-full h-full ml-[5%]">
              {currentPage === 0 ? (
                // Enhanced cover page design
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 overflow-hidden">
                  {/* Improved background with texture */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100" />
                    <div className="absolute inset-0 opacity-5" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      backgroundSize: '30px 30px'
                    }} />
                  </div>
                  
                  {/* Enhanced decorative elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-pink-300 rounded-full opacity-30 animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-purple-300 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
                    
                    {/* Decorative corner flourishes */}
                    <div className="absolute top-4 left-4 w-16 h-16 opacity-20" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(0deg)'
                    }} />
                    <div className="absolute top-4 right-4 w-16 h-16 opacity-20" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(90deg)'
                    }} />
                    <div className="absolute bottom-4 left-4 w-16 h-16 opacity-20" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(270deg)'
                    }} />
                    <div className="absolute bottom-4 right-4 w-16 h-16 opacity-20" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(180deg)'
                    }} />
                    
                    <div className="absolute top-1/4 right-1/6">
                      <Book className="w-8 h-8 text-purple-400 opacity-70 rotate-12 animate-float" />
                    </div>
                    
                    <div className="absolute bottom-1/4 left-1/6">
                      <Sparkles className="w-8 h-8 text-pink-400 opacity-70 animate-float" style={{ animationDelay: '1.5s' }} />
                    </div>
                    
                    <div className="absolute top-1/3 left-1/4">
                      <Feather className="w-6 h-6 text-purple-300 opacity-60 rotate-45 animate-float" style={{ animationDelay: '2.5s' }} />
                    </div>
                  </div>
                  
                  {/* Enhanced content wrapper */}
                  <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
                    {/* Decorative ornament above title */}
                    <div className="w-32 h-4 bg-no-repeat bg-center" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='10' viewBox='0 0 120 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,5 C20,0 40,10 60,5 C80,0 100,10 120,5' stroke='%23d946ef' stroke-width='2' fill='none' /%3E%3C/svg%3E")`,
                      backgroundSize: 'contain'
                    }} />
                    
                    {/* Enhanced title with text shadow */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 drop-shadow-sm">
                      {title}
                    </h1>
                    
                    {/* Enhanced tagline card */}
                    <div className="relative max-w-md mx-auto">
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg blur opacity-30 animate-pulse"></div>
                      <div className="relative px-6 py-4 bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100 shadow-sm">
                        <p className="text-lg font-medium leading-relaxed">
                          <span className="text-pink-600 font-semibold">Your</span> personal digital journey, 
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold"> transformed into a story</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced author text */}
                    <p className="text-purple-700/80 italic font-serif">by {author}</p>
                    
                    {/* Decorative ornament below text */}
                    <div className="w-32 h-4 bg-no-repeat bg-center" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='10' viewBox='0 0 120 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,5 C20,10 40,0 60,5 C80,10 100,0 120,5' stroke='%23d946ef' stroke-width='2' fill='none' /%3E%3C/svg%3E")`,
                      backgroundSize: 'contain'
                    }} />
                    
                    {/* Enhanced turn page indicator */}
                    <div className="absolute bottom-8 right-8 text-purple-600/70 text-sm flex items-center animate-pulse">
                      <span className="font-serif italic">Turn page</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                // Enhanced content pages
                <div 
                  className={cn(
                    "absolute inset-0 transform-style-3d",
                    isFlipping && flipDirection === "next" && "animate-page-flip-right",
                    isFlipping && flipDirection === "prev" && "animate-page-flip-left"
                  )}
                >
                  {/* Enhanced page background with texture */}
                  <div className="absolute inset-0 bg-[#fff9f5]">
                    {/* Subtle paper texture */}
                    <div className="absolute inset-0 opacity-5" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                      backgroundSize: '100px 100px'
                    }} />
                    
                    {/* Page edge shadow */}
                    <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[rgba(0,0,0,0.03)] to-transparent" />
                  </div>
                  
                  {/* Page content with enhanced styling */}
                  <div className="relative h-full flex flex-col p-8 md:p-10">
                    {/* Enhanced decorative elements */}
                    <div className="absolute top-4 left-4 w-16 h-16 border border-pink-200 rounded-full opacity-20" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 border border-purple-200 rounded-full opacity-20" />
                    
                    {/* Enhanced corner decorations */}
                    <div className="absolute top-2 left-2 w-12 h-12 opacity-10" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(0deg)'
                    }} />
                    <div className="absolute top-2 right-2 w-12 h-12 opacity-10" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(90deg)'
                    }} />
                    <div className="absolute bottom-2 left-2 w-12 h-12 opacity-10" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(270deg)'
                    }} />
                    <div className="absolute bottom-2 right-2 w-12 h-12 opacity-10" style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23a855f7' d='M0,0 C40,15 60,15 100,0 L100,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      transform: 'rotate(180deg)'
                    }} />
                    
                    {/* Sparkle effect when flipping */}
                    {showSparkle && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <Sparkles className={cn(
                          "w-12 h-12 text-pink-400 opacity-0",
                          flipDirection === "next" ? "animate-sparkle-right" : "animate-sparkle-left"
                        )} />
                      </div>
                    )}
                    
                    {/* Enhanced content styling */}
                    <div className="flex-1 overflow-auto prose prose-pink max-w-none">
                      <p className="text-lg leading-relaxed text-gray-800 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-pink-600 first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:drop-shadow-sm">
                        {content[currentPage - 1] || ""}
                      </p>
                    </div>
                    
                    {/* Enhanced page number with decorative elements */}
                    <div className="text-center mt-6 relative">
                      <div className="w-24 h-2 bg-no-repeat bg-center mx-auto mb-2" style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='8' viewBox='0 0 100 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,4 C15,1 30,7 50,4 C70,1 85,7 100,4' stroke='%23d8b4fe' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
                        backgroundSize: 'contain'
                      }} />
                      <span className="inline-block px-6 py-1 text-gray-600 font-serif italic relative">
                        <span className="relative z-10">~ {currentPage} ~</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-purple-100/30 rounded-full blur-sm" />
                      </span>
                      <div className="w-24 h-2 bg-no-repeat bg-center mx-auto mt-2" style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='8' viewBox='0 0 100 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,4 C15,7 30,1 50,4 C70,7 85,1 100,4' stroke='%23d8b4fe' stroke-width='1' fill='none' /%3E%3C/svg%3E")`,
                        backgroundSize: 'contain'
                      }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Enhanced navigation buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isFlipping}
            className={cn(
              "w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center",
              "text-purple-600 shadow-lg transition-all duration-300",
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:bg-white hover:shadow-pink-200/50"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage >= totalPages || isFlipping}
            className={cn(
              "w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center",
              "text-purple-600 shadow-lg transition-all duration-300",
              currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:bg-white hover:shadow-pink-200/50"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Page count indicator */}
        <div className="absolute bottom-4 right-4 text-xs text-white/70 bg-purple-500/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {currentPage === 0 ? "Cover" : `${currentPage} / ${totalPages}`}
        </div>
      </div>
      
      {/* Add CSS for animations in your global CSS or a CSS module */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        
        @keyframes page-flip-right {
          0% {
            transform: rotateY(0);
            z-index: 10;
          }
          100% {
            transform: rotateY(-180deg);
            z-index: 10;
          }
        }
        
        @keyframes page-flip-left {
          0% {
            transform: rotateY(0);
            z-index: 10;
          }
          100% {
            transform: rotateY(180deg);
            z-index: 10;
          }
        }
        
        .animate-page-flip-right {
          animation: page-flip-right 0.7s ease-in-out forwards;
          transform-origin: left center;
        }
        
        .animate-page-flip-left {
          animation: page-flip-left 0.7s ease-in-out forwards;
          transform-origin: right center;
        }
        
        @keyframes sparkle-right {
          0% {
            opacity: 0;
            transform: translateX(-50px) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateX(0) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateX(50px) scale(0.5);
          }
        }
        
        @keyframes sparkle-left {
          0% {
            opacity: 0;
            transform: translateX(50px) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translateX(0) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateX(-50px) scale(0.5);
          }
        }
        
        .animate-sparkle-right {
          animation: sparkle-right 0.7s ease-out forwards;
        }
        
        .animate-sparkle-left {
          animation: sparkle-left 0.7s ease-out forwards;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  )
}