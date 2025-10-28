'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { RefreshCw, Phone, Linkedin, Clock, CheckCircle2 } from 'lucide-react'
export default function Feed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      setError(null)

      const results = await Promise.allSettled([
        api.getTranscripts(),
        api.getLinkedInInsights()
      ])

      const [transcriptsResult, linkedinResult] = results
      let feedItems = []

      if (transcriptsResult.status === 'fulfilled') {
        feedItems.push(...transcriptsResult.value.map(t => ({
          id: t.id,
          type: 'transcript',
          icon: Phone,
          title: t.company_name || 'Call Transcript',
          subtitle: t.attendees?.length ? `${t.attendees.join(', ')} • ${t.date}` : t.date,
          content: t.transcript_text?.substring(0, 200) + '...',
          result: t.insight_result,
          created_at: t.created_at,
          status: t.insight_result ? 'completed' : 'processing',
          color: 'blue'
        })))
      }

      if (linkedinResult.status === 'fulfilled') {
        feedItems.push(...linkedinResult.value.map(l => ({
          id: l.id,
          type: 'linkedin',
          icon: Linkedin,
          title: 'LinkedIn Icebreaker',
          subtitle: 'Cold outreach strategy',
          content: l.linkedin_bio?.substring(0, 200) + '...',
          result: l.icebreaker_result,
          created_at: l.created_at,
          status: l.icebreaker_result ? 'completed' : 'processing',
          color: 'purple'
        })))
      }

      // Sort by date
      feedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      setItems(feedItems)

    } catch (err) {
      setError(err.message || 'Failed to load insights.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Auto-refresh if any item is processing
  useEffect(() => {
    const hasProcessing = items.some(i => i.status === 'processing')
    if (hasProcessing) {
      const interval = setInterval(() => fetchData(true), 30000)
      return () => clearInterval(interval)
    }
  }, [items])

  const getStatusIcon = (status) => {
    return status === 'completed'
      ? <CheckCircle2 className="w-4 h-4 text-green-600" />
      : <Clock className="w-4 h-4 text-amber-600" />
  }

  // Loading
  if (loading && items.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading insights...</p>
      </div>
    )
  }

  // Error
  if (error && items.length === 0) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={() => fetchData()} size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  // Empty
  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
       
        <h3 className="text-lg font-medium text-gray-900 mb-2">No insights yet</h3>
        <p className="text-gray-600">Submit a transcript or LinkedIn profile to get started.</p>
      </div>
    )
  }

  // Main Feed
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Your Insights ({items.length})</h2>
        <Button
          onClick={() => fetchData(true)}
          size="sm"
          variant="outline"
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => {
          const Icon = item.icon
          return (
            <Card key={item.id} className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                      <Icon className={`w-5 h-5 ${item.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      {item.subtitle && (
                        <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {getStatusIcon(item.status)}
                    <span>{item.status}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                {/* Source */}
                <div>
                  <p className="font-medium text-gray-700 mb-1">Source</p>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md font-mono text-xs">
                    {item.content}
                  </p>
                </div>

                {/* Result */}
                {item.result ? (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">AI Analysis</p>
                    <div className="bg-green-50 border border-green-200 p-3 rounded-md text-green-800 whitespace-pre-wrap">
                      {item.result}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600">
                    <Clock className="w-4 h-4" />
                    <span>Processing... (30–60s)</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Refreshing */}
      {refreshing && (
        <div className="text-center text-sm text-gray-500 py-4">
          Refreshing insights...
        </div>
      )}
    </div>
  )
}