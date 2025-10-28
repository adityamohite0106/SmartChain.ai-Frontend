'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Phone,
  Users,
  Calendar,
  FileText,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Target, // ← Added
} from 'lucide-react'
import { api } from '@/lib/api'

export default function TranscriptForm({ onSuccess }) {
  const [form, setForm] = useState({
    company_name: '',
    attendees: '',
    date: '',
    transcript_text: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    // ---- validation -------------------------------------------------
    if (form.transcript_text.length < 200) {
      setError('Transcript must be at least 200 characters.')
      setLoading(false)
      return
    }
    if (!form.attendees.includes(',') && form.attendees.trim().split(' ').length < 2) {
      setError('Please list at least two attendees (you + prospect).')
      setLoading(false)
      return
    }
    if (!form.company_name || !form.date) {
      setError('Company name and date are required.')
      setLoading(false)
      return
    }

    try {
      await api.createTranscript({
        company_name: form.company_name,
        attendees: form.attendees.split(',').map((s) => s.trim()),
        date: form.date,
        transcript_text: form.transcript_text,
      })

      setForm({ company_name: '', attendees: '', date: '', transcript_text: '' })
      onSuccess?.()
    } catch (e) { // ← Removed `: any`
      setError(e.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <Phone className="w-4 h-4 text-blue-600" />
          AI Sales Call Analysis
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Transcript Insight Generator
        </h1>
        <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
          Paste a call transcript and get AI-powered insights.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto border border-gray-200 rounded-lg p-6 bg-gray-50">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Company */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Target className="w-4 h-4 text-blue-600" />
              Company
            </label>
            <Input
              placeholder="Acme Corp"
              value={form.company_name}
              onChange={(e) => setForm({ ...form, company_name: e.target.value })}
              className="h-11"
            />
          </div>

          {/* Attendees */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Users className="w-4 h-4 text-blue-600" />
              Attendees (comma-separated)
            </label>
            <Input
              placeholder="John Smith, Sarah Johnson"
              value={form.attendees}
              onChange={(e) => setForm({ ...form, attendees: e.target.value })}
              className="h-11"
            />
            <p className="mt-1 text-xs text-gray-500">
              {form.attendees.includes(',') || form.attendees.trim().split(' ').length >= 2 ? (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              ) : (
                'Need at least 2 names'
              )}
            </p>
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              Meeting Date
            </label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="h-11"
            />
          </div>

          {/* Transcript */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 text-blue-600" />
              Call Transcript
            </label>
            <Textarea
              placeholder="Paste the full conversation here..."
              value={form.transcript_text}
              onChange={(e) => setForm({ ...form, transcript_text: e.target.value })}
              rows={10}
              className="resize-none"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>
                {form.transcript_text.length >= 200 ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ready
                  </span>
                ) : (
                  `${form.transcript_text.length}/200`
                )}
              </span>
              <span className="flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Longer = better insights
              </span>
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={
              loading ||
              form.transcript_text.length < 200 ||
              !form.company_name ||
              !form.attendees ||
              !form.date
            }
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                Generate Insight <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

    
    </div>
  )
}