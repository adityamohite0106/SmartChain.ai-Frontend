'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { RefreshCw, Phone, Linkedin, Clock, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Zap, ArrowRight } from 'lucide-react'

export default function Feed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)
      
      
      const results = await Promise.allSettled([
        api.getTranscripts(),
        api.getLinkedInInsights()
      ])
      
      const [transcriptsResult, linkedinResult] = results
      
      let feedItems = []
      
      if (transcriptsResult.status === 'fulfilled') {
        const transcripts = transcriptsResult.value
        feedItems.push(...transcripts.map((t) => ({
          id: t.id,
          type: 'transcript',
          icon: Phone,
          title: t.company_name || 'Transcript Analysis',
          subtitle: t.attendees?.length ? `${t.attendees.join(', ')} • ${t.date}` : t.date || 'Recent call',
          content: t.transcript_text?.substring(0, 200) + '...' || 'Transcript content',
          result: t.insight_result,
          created_at: t.created_at,
          status: t.insight_result ? 'completed' : 'processing',
          color: 'blue'
        })))
       
      } else {
       
      }
      
      if (linkedinResult.status === 'fulfilled') {
        const linkedinInsights = linkedinResult.value
        feedItems.push(...linkedinInsights.map((l) => ({
          id: l.id,
          type: 'linkedin',
          icon: Linkedin,
          title: l.company_name || 'LinkedIn Icebreaker',
          subtitle: 'Cold outreach strategy',
          content: l.linkedin_bio?.substring(0, 200) + '...' || 'LinkedIn bio analysis',
          result: l.icebreaker_result,
          created_at: l.created_at,
          status: l.icebreaker_result ? 'completed' : 'processing',
          color: 'purple'
        })))
      } else {
       
      }
      
      if (transcriptsResult.status === 'rejected' && linkedinResult.status === 'rejected') {
        throw new Error('Failed to load both transcripts and LinkedIn insights. Please check your server connection.')
      }
      
      if (linkedinResult.status === 'rejected' && transcriptsResult.status === 'fulfilled') {
        setError(`Warning: Could not load LinkedIn insights (${linkedinResult.reason.message}). Showing transcripts only.`)
      }
      
      if (transcriptsResult.status === 'rejected' && linkedinResult.status === 'fulfilled') {
        setError(`Warning: Could not load transcripts (${transcriptsResult.reason.message}). Showing LinkedIn insights only.`)
      }

      feedItems.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      setItems(feedItems)
      
    } catch (error) {
     
      setError(error.message || 'Failed to load insights. Please try again.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const hasProcessingItems = items.some(item => item.status === 'processing')
    if (hasProcessingItems) {
      const interval = setInterval(() => fetchData(true), 30000)
      return () => clearInterval(interval)
    }
  }, [items])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'processing':
        return <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        {/* Background Effects */}
        

        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-400"></div>
            <Sparkles className="w-10 h-10 text-purple-400 absolute top-5 left-5 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Loading your insights...</h3>
          <p className="text-gray-300 text-center max-w-md">Gathering the latest data from your sources</p>
        </div>
      </div>
    )
  }

  if (error && items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-6">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-8">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Something went wrong</h3>
          <p className="text-red-300 mb-8 text-center max-w-md">{error}</p>
          <Button 
            onClick={() => fetchData()} 
            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-2xl transform transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-6">Ready to generate insights</h3>
          <p className="text-gray-300 text-center max-w-md mb-12 text-lg">
            Submit a transcript or LinkedIn analysis to see your first AI-powered insight appear here!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl transform transition-all duration-300 hover:scale-105">
              <Phone className="w-5 h-5 mr-2" />
              Add Transcript
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-2xl transform transition-all duration-300 hover:scale-105">
              <Linkedin className="w-5 h-5 mr-2" />
              Analyze LinkedIn
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">AI-Powered Insights</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
            Insights Dashboard
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <p className="text-xl text-gray-300">Your latest transcripts and LinkedIn analyses</p>
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <TrendingUp className="w-4 h-4 text-purple-300" />
                <span className="text-white font-medium">{items.length} insights</span>
              </div>
              <Button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 p-6 bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-200 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Feed Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const IconComponent = item.icon
            
            return (
              <div 
                key={item.id} 
                className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 transition-all duration-500 hover:bg-white/10 hover:transform hover:scale-[1.02] hover:border-white/20"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${item.color === 'blue' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}>
                      <IconComponent className={`w-6 h-6 ${item.color === 'blue' ? 'text-blue-300' : 'text-purple-300'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(item.status)}
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          item.status === 'completed' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-gray-100">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
                    {new Date(item.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {item.subtitle && (
                  <p className="text-gray-300 font-medium mb-6">{item.subtitle}</p>
                )}

                {/* Content Sections */}
                <div className="space-y-6">
                  {/* Source Content */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Source Content
                    </h4>
                    <div className="text-sm text-gray-300 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                      {item.content}
                    </div>
                  </div>
                  
                  {/* AI Analysis */}
                  {item.result ? (
                    <div>
                      <h4 className="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        AI Analysis
                      </h4>
                      <div className="text-sm text-white bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-6 rounded-2xl backdrop-blur-md whitespace-pre-wrap shadow-inner">
                        {item.result}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl backdrop-blur-md">
                      <div className="w-8 h-8 border-3 border-amber-400/50 rounded-full animate-spin border-t-amber-400"></div>
                      <div>
                        <p className="text-amber-200 font-semibold">Processing analysis</p>
                        <p className="text-xs text-amber-300">This usually takes 30-60 seconds</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Loading more indicator */}
        {refreshing && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
              <span className="text-white font-medium">Refreshing insights...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}