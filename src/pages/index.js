'use client'

import { useState } from 'react'
import TranscriptForm from '@/components/TranscriptForm'
import LinkedInForm from '@/components/LinkedInForm'
import Feed from '@/components/Feed'
import { MessageSquare, Link2, RefreshCw } from 'lucide-react'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">MyBizSherpa AI</h1>
          <button
            onClick={handleSuccess}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Input Section */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-gray-600">Generate Insights</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Transcript */}
            <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium">Call Transcript</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Paste a meeting transcript to get AI insights.
              </p>
              <TranscriptForm onSuccess={handleSuccess} />
            </div>

            {/* LinkedIn */}
            <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <Link2 className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium">LinkedIn + Deck</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Analyze profile and pitch deck for outreach.
              </p>
              <LinkedInForm onSuccess={handleSuccess} />
            </div>
          </div>
        </section>

        {/* Results Feed */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-gray-600">Your Insights</h2>
          <div className="border border-gray-300 rounded-lg bg-gray-50 p-4">
            <Feed key={refreshKey} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 px-6 py-6 text-center">
        <p className="text-xs text-gray-500">
          Built with <span className="text-red-500">love</span> by{' '}
          <a href="https://github.com/adityamohite0106" target="_blank" className="underline hover:text-gray-900">
            Aditya Mohite
          </a>
        </p>
      </footer>
    </div>
  )
}