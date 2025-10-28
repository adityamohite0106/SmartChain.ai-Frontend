'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Linkedin, FileText, ArrowRight, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react'
import { api } from '@/lib/api'

export default function LinkedInForm({ onSuccess }) {
  const [form, setForm] = useState({
    linkedin_bio: '',
    pitch_deck_content: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    if (form.linkedin_bio.length < 50) {
      setError('LinkedIn bio must be at least 50 characters.')
      setLoading(false)
      return
    }
    if (form.pitch_deck_content.length < 100) {
      setError('Pitch deck summary must be at least 100 characters.')
      setLoading(false)
      return
    }

    try {
      await api.createLinkedInInsight({
        linkedin_bio: form.linkedin_bio,
        pitch_deck_content: form.pitch_deck_content,
      })

      setForm({ linkedin_bio: '', pitch_deck_content: '' })
      onSuccess?.()
    } catch (e) {
      setError(e.message || 'Failed to generate insight. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <Linkedin className="w-4 h-4 text-blue-600" />
          AI Cold Outreach
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">
          LinkedIn Icebreaker Generator
        </h1>
        <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
          Paste a LinkedIn bio + your pitch to get a personalized outreach strategy.
        </p>
      </div>

      <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg p-6 bg-gray-50">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Linkedin className="w-4 h-4 text-blue-600" />
              LinkedIn Bio
            </label>
            <Textarea
              placeholder="Paste the full 'About' section..."
              value={form.linkedin_bio}
              onChange={(e) => setForm({ ...form, linkedin_bio: e.target.value })}
              rows={6}
              className="resize-none"
            />
            <div className="mt-1 text-xs text-gray-500">
              {form.linkedin_bio.length >= 50 ? (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              ) : (
                `${form.linkedin_bio.length}/50`
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 text-blue-600" />
              Pitch Deck Summary
            </label>
            <Textarea
              placeholder="Summarize your product, value, pricing..."
              value={form.pitch_deck_content}
              onChange={(e) => setForm({ ...form, pitch_deck_content: e.target.value })}
              rows={8}
              className="resize-none"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>
                {form.pitch_deck_content.length >= 100 ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Good
                  </span>
                ) : (
                  `${form.pitch_deck_content.length}/100`
                )}
              </span>
              <span className="flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                More detail = better
              </span>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading || form.linkedin_bio.length < 50 || form.pitch_deck_content.length < 100}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Generating...
              </>
            ) : (
              <>
                Generate Icebreaker <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

     
    </div>
  )
}