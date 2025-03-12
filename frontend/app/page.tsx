"use client"
import { createContext, useContext,  ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import { HelpCircle, Sparkles, History, Book, Star, ArrowRight } from "lucide-react"
import FileUpload from "@/components/file-upload"
import ToneSelector from "@/components/tone-selector"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils";
import { useData } from "@/context/DataContext"; // Import the context


export default function HomePage() {
  // Custom cursor state
  const router = useRouter();
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })
  const [isMoving, setIsMoving] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isOverInteractive, setIsOverInteractive] = useState(false)
  const [inkTrail, setInkTrail] = useState<Array<{ x: number; y: number; id: number; opacity: number }>>([])
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const trailIdCounter = useRef(0)
  const { setData } = useData(); // Get setData from context

  
  // Handle cursor movement and ink trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pageRef.current) return
      
      const x = e.clientX
      const y = e.clientY
      
      setCursorPosition({ x, y })
      setIsMoving(true)
      
      // Add ink drop to trail
      if (isHovering && Math.random() > 0.6) { // Only add drops occasionally for a more natural effect
        const newDrop = { 
          x, 
          y, 
          id: trailIdCounter.current++,
          opacity: 0.3 + Math.random() * 0.3 // Random opacity for natural look
        }
        
        setInkTrail(prev => [...prev.slice(-15), newDrop]) // Keep only last 15 drops
      }
      
      // Reset the moving state after a short delay
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
      
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }
    
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setInkTrail([]) // Clear trail when leaving
    }
    
    // Check for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a')
      
      setIsOverInteractive(!!isInteractive)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    
    const container = pageRef.current
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
    }
    
    // Clean up ink drops after they fade
    const cleanupInterval = setInterval(() => {
      setInkTrail(prev => prev.filter(drop => drop.opacity > 0.05).map(drop => ({
        ...drop,
        opacity: drop.opacity * 0.85 // Gradually reduce opacity
      })))
    }, 100)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
      
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current)
      }
      
      clearInterval(cleanupInterval)
    }
  }, [isHovering])
  
  const clickHandler=()=>{
    const getDatafromBackend=async()=>{
      try{
        console.log("try aakitind");
        const response=await fetch("http://127.0.0.1:8000/story",{
          method:"GET",
        });
        console.log("response kainj");
        if(!response.ok){
          console.log("error adichu ivdeded");
          throw new Error("Network response was not ok");
        }
        
        console.log("error adichilla ivdeded");
        const data=await response.json();
        setData(data);
        console.log("ithaaan nmmde data ",data);
      }catch(error){
        console.log("ithan nmmde error ",error);
      }
    };
    getDatafromBackend();
    router.push("/book");
  }

  return (
    <div 
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden flex flex-col cursor-none"
    >
      {/* Custom Pen Cursor */}
      {isHovering && (
        <div 
          className={cn(
            "fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2",
            isMoving && "scale-95",
            isOverInteractive && "rotate-[-15deg]"
          )}
          style={{ 
            left: `${cursorPosition.x}px`, 
            top: `${cursorPosition.y}px`,
            transition: isMoving ? 'transform 0.1s ease-out' : 'left 0.05s ease-out, top 0.05s ease-out, transform 0.1s ease-out'
          }}
        >
          {/* Pen cursor */}
          <div className="relative">
            <div className="text-4xl transform rotate-45 select-none">🖋️</div>
            {isMoving && (
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping-fast"></div>
            )}
          </div>
        </div>
      )}
      
      {/* Ink Trail */}
      {inkTrail.map((drop) => (
        <div 
          key={drop.id}
          className="fixed pointer-events-none rounded-full blur-[1px]"
          style={{ 
            left: `${drop.x}px`, 
            top: `${drop.y}px`,
            width: `${4 + Math.random() * 4}px`,
            height: `${4 + Math.random() * 4}px`,
            backgroundColor: Math.random() > 0.5 ? 'rgba(147, 51, 234, ' + drop.opacity + ')' : 'rgba(219, 39, 119, ' + drop.opacity + ')',
            transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.5})`,
            opacity: drop.opacity,
            transition: 'opacity 0.5s ease-out'
          }}
        />
      ))}

      {/* Decorative background elements - MOVED TO PAGE LEVEL */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Main background blobs with proper animations */}
        <div className="absolute top-[10%] left-[25%] w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-[5%] right-[25%] w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" style={{ animation: 'blob 7s infinite', animationDelay: '2s' }} />
        <div className="absolute bottom-[10%] left-[33%] w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" style={{ animation: 'blob 7s infinite', animationDelay: '4s' }} />
        
        {/* Additional blobs with explicit animations */}
        <div className="absolute top-[33%] right-[33%] w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ animation: 'blob 8s infinite', animationDelay: '3s' }} />
        <div className="absolute bottom-[25%] right-[20%] w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-20" style={{ animation: 'blob 9s infinite', animationDelay: '5s' }} />
        
        {/* Floating particles with explicit animations */}
        <div className="absolute top-[25%] left-[25%] w-3 h-3 bg-pink-400 rounded-full opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
        <div className="absolute top-[33%] right-[25%] w-2 h-2 bg-purple-400 rounded-full opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '1s' }} />
        <div className="absolute bottom-[25%] left-[33%] w-2 h-2 bg-blue-400 rounded-full opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '1.5s' }} />
        <div className="absolute bottom-[33%] right-[33%] w-3 h-3 bg-pink-400 rounded-full opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '2s' }} />
        <div className="absolute top-[66%] left-[20%] w-2 h-2 bg-purple-400 rounded-full opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '2.5s' }} />
        <div className="absolute top-[20%] right-[33%] w-3 h-3 bg-blue-400 rounded-full opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '3s' }} />
        
        {/* Decorative circles with pulse animations */}
        <div className="absolute top-[5%] left-[5%] w-32 h-32 border-2 border-pink-300 rounded-full opacity-30" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        <div className="absolute bottom-[5%] right-[5%] w-40 h-40 border-2 border-purple-300 rounded-full opacity-30" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s' }} />
        <div className="absolute top-[50%] right-[10%] w-24 h-24 border-2 border-blue-300 rounded-full opacity-30" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '2s' }} />
        <div className="absolute bottom-[33%] left-[10%] w-36 h-36 border-2 border-pink-300 rounded-full opacity-30" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1.5s' }} />
        
        {/* Floating icons with float animations */}
        <div className="absolute top-[25%] right-[16%]" style={{ animation: 'float 3s ease-in-out infinite' }}>
          <Book className="w-8 h-8 text-purple-400 opacity-70 rotate-12" />
        </div>
        
        <div className="absolute bottom-[25%] left-[16%]" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1.5s' }}>
          <Sparkles className="w-8 h-8 text-pink-400 opacity-70" />
        </div>
        
        <div className="absolute top-[66%] right-[25%]" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '2.5s' }}>
          <Star className="w-6 h-6 text-blue-400 opacity-70 rotate-45" />
        </div>
        
        <div className="absolute bottom-[33%] left-[33%]" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '3.5s' }}>
          <Sparkles className="w-7 h-7 text-purple-400 opacity-70 -rotate-12" />
        </div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm32-63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <main className="relative container max-w-6xl mx-auto px-4 py-16 md:py-24 z-10">
        {/* Streamlined Hero Section with larger privacy stamp in pink-purple theme */}
        <div className="flex flex-col items-center justify-center text-center mb-16 relative min-h-[600px] rounded-3xl overflow-hidden">
          {/* Background remains the same */}
          <div className="absolute inset-0 -z-10">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50" />
            
            {/* Image background with improved overlay */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url('/entekadha.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            
            {/* Gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/70" />
            
            {/* Decorative frame */}
            <div className="absolute inset-8 border-2 border-purple-300/50 rounded-2xl" />
          </div>
          
          {/* Keep decorative elements but reduce quantity */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Spotlight effect */}
            <div className="absolute -top-20 left-1/2 w-[150%] h-[150%] bg-gradient-radial from-pink-200/50 to-transparent opacity-80 transform -translate-x-1/2" />
            
            {/* Keep only the most visible animated elements */}
            <div className="absolute top-10 left-10 w-40 h-40 border-2 border-pink-400/60 rounded-full opacity-60 animate-pulse-fast" />
            <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-purple-400/60 rounded-full opacity-60 animate-pulse-fast" style={{ animationDelay: '1s' }} />
            
            {/* Brighter floating particles - keep only a few */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-pink-500 rounded-full opacity-80 animate-ping-bright" />
            <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-purple-500 rounded-full opacity-80 animate-ping-bright" style={{ animationDelay: '1s' }} />
            
            {/* Animated floating icons - keep only the most important */}
            <div className="absolute top-1/4 right-1/6 animate-float">
              <Book className="w-10 h-10 text-purple-500 opacity-80 rotate-12 drop-shadow-md" />
            </div>
            
            <div className="absolute bottom-1/4 left-1/6 animate-float" style={{ animationDelay: '1.5s' }}>
              <Sparkles className="w-10 h-10 text-pink-500 opacity-80 drop-shadow-md" />
            </div>
          </div>
          
          {/* Privacy Stamp in corner - larger with pink-purple theme */}
          <div className="absolute top-6 right-6 z-20 animate-fade-in-rotate" style={{ animationDelay: '1s' }}>
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-pink-500/70 animate-slow-spin"></div>
              
              {/* Inner stamp */}
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md shadow-lg flex flex-col items-center justify-center p-2 border border-purple-200">
                {/* Lock icon with pink-purple gradient */}
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-full mb-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                {/* Text in circular pattern */}
                <div className="text-center">
                  <p className="text-purple-700 text-[10px] md:text-xs font-bold uppercase tracking-tight">Privacy Assured</p>
                  <p className="text-gray-700 text-[8px] md:text-[10px] font-medium mt-1 px-2" style={{ fontFamily: "'Caveat', cursive" }}>
                    We don't store, save, or sneak a peek at your files
                  </p>
                </div>
                
                {/* Circular border inside */}
                <div className="absolute inset-3 rounded-full border border-pink-200/50 animate-pulse-slow"></div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
              </div>
              
              {/* Shine effect */}
              <div className="absolute top-0 left-1/2 w-full h-full bg-gradient-to-b from-white/40 to-transparent rounded-full transform -translate-x-1/2 rotate-45 animate-shine"></div>
              
              {/* Small decorative dots around the stamp */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-pink-400 rounded-full"></div>
              <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Streamlined content wrapper with less elements */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8 py-16 px-4 max-w-4xl mx-auto">
            {/* Enhanced main heading */}
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-600 animate-gradient-text tracking-tight drop-shadow-sm">
                Ninte കഥ
              </h1>
              
              {/* Subtle shadow for 3D effect */}
              <div className="absolute -bottom-2 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white/80 blur-md -z-10"></div>
            </div>
            
            {/* Simplified tagline */}
            <div className="relative max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="px-8 py-5 bg-white/70 backdrop-blur-md rounded-xl border border-purple-100/50 shadow-lg">
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700">
                  Transform your search history into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">beautiful personal story</span>
                </p>
              </div>
            </div>
            
            {/* Call to action button */}
            <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center">
                <Sparkles className="mr-2 h-5 w-5" /> 
                Get Started
              </button>
            </div>
          </div>
          
          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
            <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                fill="white" 
                fillOpacity="0.3"
                className="animate-wave"
              />
              <path 
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                fill="white" 
                fillOpacity="0.4"
                className="animate-wave-slow"
              />
            </svg>
          </div>
        </div>

        {/* Floating Notification */}
        <div className="fixed bottom-4 right-4 z-50 animate-bounce-slow">
          <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-3 cursor-pointer hover:scale-105 transition-transform duration-300 group">
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
              <HelpCircle className="w-6 h-6 text-purple-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {/* Main Story Generator Card */}
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-pink-100 transition-all duration-300 hover:shadow-pink-200/20 mb-24">
          <div className="space-y-12">
            <FileUpload />
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                Choose Your Story Tone
              </h2>
              <ToneSelector />
            </div>
            <div className="pt-6 flex flex-col items-center space-y-6">
              <Button className="w-full max-w-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-7 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]" onClick={clickHandler}>
                <Sparkles className="mr-2 h-5 w-5" /> Generate Your Story
              </Button>
               {/* <Link href="/help" className="group flex items-center text-purple-600 hover:text-pink-600 transition-colors duration-300 text-sm md:text-base">
                <HelpCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                <span>How to get your search history</span>
              </Link> */}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-800">
            Transform Your Digital Footprint
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <History className="h-8 w-8" />,
                title: "Search History",
                description: "Import your browsing history and watch it transform into a narrative.",
              },
              {
                icon: <Book className="h-8 w-8" />,
                title: "Story Generation",
                description: "AI-powered storytelling that creates unique, personalized narratives.",
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Multiple Styles",
                description: "Choose from various tones and styles to match your personality.",
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                  <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800 group-hover:text-pink-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Export History", desc: "Download your search history from Google" },
              { step: "2", title: "Upload File", desc: "Upload the JSON file to our platform" },
              { step: "3", title: "Choose Style", desc: "Select your preferred storytelling tone" },
              { step: "4", title: "Get Story", desc: "Receive your personalized narrative" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-purple-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {i < 3 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-5 w-6 h-6 text-purple-400 transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <footer className="relative mt-auto border-t border-purple-100">
          <div className="relative z-10 max-w-6xl mx-auto py-8 px-4">
            {/* Main footer content */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              {/* Logo and Description */}
              <div className="max-w-xs">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  Ninte Kadha
                </h3>
                <p className="text-gray-600 text-sm">
                  Transform your digital footprints into meaningful stories.
                </p>
                {/* Social Links */}
                <div className="flex gap-3 mt-4">
                  {[
                    { name: 'twitter', icon: 'X' },
                    { name: 'github', icon: 'GH' },
                    { name: 'discord', icon: 'DC' },
                    { name: 'mail', icon: '@' }
                  ].map((social) => (
                    <Link 
                      key={social.name}
                      href="#"
                      className="w-8 h-8 rounded-full bg-purple-50 hover:bg-pink-50 flex items-center justify-center text-sm font-medium text-purple-600 hover:text-pink-600 transition-all duration-300 hover:scale-110"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex gap-12">
                {/* Quick Links Column */}
                <div>
                  <h4 className="text-sm font-semibold text-purple-800 mb-3">Quick Links</h4>
                  <ul className="space-y-2">
                    {['About', 'Features', 'How it Works', 'Privacy'].map((item) => (
                      <li key={item}>
                        <Link 
                          href={`/${item.toLowerCase().replace(' ', '-')}`}
                          className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Column */}
                <div>
                  <h4 className="text-sm font-semibold text-purple-800 mb-3">Support</h4>
                  <ul className="space-y-2">
                    {['Help Center', 'Contact Us', 'FAQ'].map((item) => (
                      <li key={item}>
                        <Link 
                          href="#"
                          className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 mt-6 border-t border-purple-100">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} Ninte Kadha. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {['Terms', 'Privacy', 'Cookies'].map((item) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Subtle background decoration */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-100 to-transparent rounded-full mix-blend-multiply filter blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-100 to-transparent rounded-full mix-blend-multiply filter blur-2xl" />
          </div>
        </footer>
      </main>
      
      {/* Add styles for the new animations */}
      <style jsx global>{`
        /* Hide default cursor */
        .cursor-none, 
        .cursor-none * {
          cursor: none !important;
        }
        
        /* Fast ping animation for the ink drop effect */
        @keyframes ping-fast {
          0% {
            transform: scale(0.2);
            opacity: 1;
          }
          80%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ping-fast {
          animation: ping-fast 0.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        /* Blob animation */
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
        
        /* Float animation */
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
        
        /* Wave animations */
        @keyframes wave {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }

        @keyframes wave-slow {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.9); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }

        .animate-wave {
          animation: wave 15s linear infinite;
        }

        .animate-wave-slow {
          animation: wave-slow 20s linear infinite;
        }

        /* Add these new animations */
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 4s ease infinite;
        }
        
        /* Radial gradient for spotlight effect */
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          50% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }

        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');
        
        @keyframes slow-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fade-in-rotate {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-15deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(-5deg);
          }
        }
        
        @keyframes shine {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
        
        .animate-fade-in-rotate {
          animation: fade-in-rotate 1s ease-out forwards;
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Keep your existing animations
export const dynamic = 'force-dynamic';

const styles = `
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes wave {
  0% { transform: translateX(0) translateZ(0) scaleY(1); }
  50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
  100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
}

@keyframes wave-slow {
  0% { transform: translateX(0) translateZ(0) scaleY(1); }
  50% { transform: translateX(-25%) translateZ(0) scaleY(0.9); }
  100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-wave {
  animation: wave 15s linear infinite;
}

.animate-wave-slow {
  animation: wave-slow 20s linear infinite;
}
`;

