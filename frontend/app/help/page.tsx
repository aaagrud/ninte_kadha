import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">How to Get Your Search History</h1>
          <p className="text-lg text-purple-700 max-w-2xl mx-auto">
            Follow these simple steps to download your Google search history JSON file
          </p>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-pink-600">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">Go to Google Takeout</h2>
                <p className="text-gray-700 mb-4">
                  Visit{" "}
                  <a
                    href="https://takeout.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800 underline"
                  >
                    takeout.google.com
                  </a>{" "}
                  and sign in with your Google account.
                </p>
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=200&width=500"
                    alt="Google Takeout screenshot"
                    width={500}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-pink-400 rotate-90" />
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-pink-600">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  Deselect All & Select Only Search History
                </h2>
                <p className="text-gray-700 mb-4">
                  Click "Deselect all" first, then scroll down and only select "My Activity" or "Search History".
                </p>
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=200&width=500"
                    alt="Select search history screenshot"
                    width={500}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-pink-400 rotate-90" />
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-pink-600">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">Choose JSON Format</h2>
                <p className="text-gray-700 mb-4">
                  Click "Next step", then select "JSON" as the export format and click "Create export".
                </p>
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=200&width=500"
                    alt="Select JSON format screenshot"
                    width={500}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-pink-400 rotate-90" />
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-pink-600">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">Download & Extract Your File</h2>
                <p className="text-gray-700 mb-4">
                  Google will prepare your export. Once ready, download the ZIP file and extract it. Look for the JSON
                  file containing your search history.
                </p>
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="/placeholder.svg?height=200&width=500"
                    alt="Download file screenshot"
                    width={500}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-pink-400 rotate-90" />
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-pink-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 text-2xl font-bold text-pink-600">
                5
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">Upload to Ninte Kadha</h2>
                <p className="text-gray-700 mb-4">
                  Return to Ninte Kadha and upload your JSON file. We'll transform your search history into a beautiful
                  story!
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

