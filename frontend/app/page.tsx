import Link from "next/link"
import { HelpCircle, Sparkles, History, Book, Star, ArrowRight } from "lucide-react"
import FileUpload from "@/components/file-upload"
import ToneSelector from "@/components/tone-selector"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden flex flex-col">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <main className="relative container max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 animate-fade-in">
            Ninte Kadha
          </h1>
          <p className="text-lg md:text-2xl text-purple-700/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Turn your search history into a beautiful, personalized story that captures your digital journey.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button 
              variant="outline" 
              className="rounded-full px-6 py-6 text-lg hover:bg-pink-50 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Book className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Learn More
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
            <Button 
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
            </Button>
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
              <Button className="w-full max-w-md bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-7 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
                <Sparkles className="mr-2 h-5 w-5" /> Generate Your Story
              </Button>
              <Link href="/help" className="group flex items-center text-purple-600 hover:text-pink-600 transition-colors duration-300 text-sm md:text-base">
                <HelpCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                <span>How to get your search history</span>
              </Link>
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
                      <svg className="absolute -inset-1 rotate-0 group-hover:rotate-180 transition-transform duration-1000" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="48" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1" 
                          className="text-purple-200" 
                        />
                      </svg>
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
    </div>
  )
}

