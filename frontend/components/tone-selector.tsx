"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type ToneOption = {
  id: string
  emoji: string
  label: string
  color: string
  hoverColor: string
  activeColor: string
}

const toneOptions: ToneOption[] = [
  {
    id: "roasting",
    emoji: "🔥",
    label: "Roasting",
    color: "bg-orange-100 border-orange-200",
    hoverColor: "hover:bg-orange-200 hover:border-orange-300",
    activeColor: "bg-orange-200 border-orange-400",
  },
  {
    id: "lovely",
    emoji: "❤️",
    label: "Lovely",
    color: "bg-pink-100 border-pink-200",
    hoverColor: "hover:bg-pink-200 hover:border-pink-300",
    activeColor: "bg-pink-200 border-pink-400",
  },
  {
    id: "tragedy",
    emoji: "🎭",
    label: "Tragedy",
    color: "bg-blue-100 border-blue-200",
    hoverColor: "hover:bg-blue-200 hover:border-blue-300",
    activeColor: "bg-blue-200 border-blue-400",
  },
  {
    id: "humor",
    emoji: "😂",
    label: "Humor",
    color: "bg-yellow-100 border-yellow-200",
    hoverColor: "hover:bg-yellow-200 hover:border-yellow-300",
    activeColor: "bg-yellow-200 border-yellow-400",
  },
]

export default function ToneSelector() {
  const [selectedTone, setSelectedTone] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {toneOptions.map((tone) => (
        <button
          key={tone.id}
          onClick={() => setSelectedTone(tone.id)}
          className={cn(
            "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200",
            tone.color,
            tone.hoverColor,
            selectedTone === tone.id ? tone.activeColor : "",
            selectedTone === tone.id ? "ring-2 ring-offset-2 ring-purple-300" : "",
          )}
        >
          <span className="text-3xl mb-2" role="img" aria-label={tone.label}>
            {tone.emoji}
          </span>
          <span className="font-medium text-gray-700">{tone.label}</span>
        </button>
      ))}
    </div>
  )
}

