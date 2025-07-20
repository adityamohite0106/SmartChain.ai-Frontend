'use client'

import { useState } from 'react'
import TranscriptForm from '@/components/TranscriptForm'
import LinkedInForm from '@/components/LinkedInForm'
import Feed from '@/components/Feed'
import { Sparkles, Bot, Zap, TrendingUp } from 'lucide-react'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
    

      <div className="relative">
        {/* Hero Header */}
        <div className="text-center py-16 px-6">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8">
            <Bot className="w-5 h-5 text-cyan-300" />
            <span className="text-white font-medium">AI-Powered Business Intelligence</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
            SmartChain AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Transform conversations and connections into actionable insights with cutting-edge AI analysis
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Real-time Analysis</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm font-medium">Smart Insights</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-white text-sm font-medium">AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          {/* Input Forms Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Your Analysis
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Choose your input method to generate powerful AI-driven insights
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Transcript Form Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-2 hover:bg-white/10 transition-all duration-500 group">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6 border border-blue-500/20 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl">
                      <Zap className="w-6 h-6 text-blue-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Call Transcript Analysis</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Upload meeting transcripts and get AI-powered insights about key decisions, action items, and participant engagement.
                  </p>
                  <div className="rounded-2xl overflow-hidden">
                    <TranscriptForm onSuccess={handleSuccess} />
                  </div>
                </div>
              </div>

              {/* LinkedIn Form Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-2 hover:bg-white/10 transition-all duration-500 group">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <Sparkles className="w-6 h-6 text-purple-300" />
                    </div>
                    <h3 className="text-xl font-bold text-white">LinkedIn Outreach</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Analyze LinkedIn profiles and generate personalized icebreaker strategies for effective cold outreach campaigns.
                  </p>
                  <div className="rounded-2xl overflow-hidden">
                    <LinkedInForm onSuccess={handleSuccess} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Your AI Insights
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                View and manage all your generated insights in one powerful dashboard
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <Feed key={refreshKey} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative text-center py-12 px-6 border-t border-white/10">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <Bot className="w-4 h-4" />
            <span>
  Powered by SmartChain AI • Built for modern businesses • Developed by 
  <a href="https://github.com/adityamohite0106" target="_blank">Aditya Mohite</a>
</span>

          </div>
        </div>
      </div>
    </div>
  )
}