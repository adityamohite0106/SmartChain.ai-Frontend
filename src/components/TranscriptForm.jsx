'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Phone, Users, Calendar, FileText, Sparkles, ArrowRight, TrendingUp, Target, Lightbulb, BarChart3 } from 'lucide-react'

export default function TranscriptForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    company_name: '',
    attendees: '',
    date: '',
    transcript_text: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeField, setActiveField] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    // Basic validation
    if (formData.transcript_text.length < 200) {
      setError('Transcript seems too short. Please provide a more complete conversation.')
      setLoading(false)
      return
    }

    if (!formData.attendees.includes(',') && formData.attendees.split(' ').length < 2) {
      setError('Please include at least 2 attendees (you and the prospect).')
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setFormData({ company_name: '', attendees: '', date: '', transcript_text: '' })
      onSuccess?.()
    } catch (error) {
      
      setError('Failed to create transcript analysis. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6">
     

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-6">
            <Phone className="w-5 h-5 text-cyan-300" />
            <span className="text-white font-medium">AI Sales Call Analysis</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            Transcript Insight Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Turn your sales calls into actionable insights with AI-powered performance analysis
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 mb-8">
          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/20 text-red-200" variant="destructive">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-8">
            {/* Company Name Field */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-xl">
                  <Target className="w-5 h-5 text-cyan-300" />
                </div>
                <label className="text-lg font-semibold text-white">
                  Company Information
                </label>
              </div>
              
              <div className={`relative transition-all duration-300 ${activeField === 'company' ? 'transform scale-[1.02]' : ''}`}>
                <Input
                  placeholder="e.g., Acme Corp, TechStart Inc, Enterprise Solutions LLC"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  onFocus={() => setActiveField('company')}
                  onBlur={() => setActiveField('')}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl px-6 py-4 text-base focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 h-14"
                />
              </div>
            </div>

            {/* Attendees Field */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-xl">
                  <Users className="w-5 h-5 text-indigo-300" />
                </div>
                <label className="text-lg font-semibold text-white">
                  Meeting Participants
                </label>
              </div>
              
              <div className={`relative transition-all duration-300 ${activeField === 'attendees' ? 'transform scale-[1.02]' : ''}`}>
                <Input
                  placeholder="John Smith (you), Sarah Johnson (VP Sales), Mike Chen (CTO)"
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  onFocus={() => setActiveField('attendees')}
                  onBlur={() => setActiveField('')}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl px-6 py-4 text-base focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300 h-14"
                />
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-3">
                  <div className={`w-2 h-2 rounded-full ${formData.attendees.includes(',') || formData.attendees.split(' ').length >= 2 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                  Separate names with commas • Include roles for better insights
                </div>
              </div>
            </div>

            {/* Date Field */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-xl">
                  <Calendar className="w-5 h-5 text-purple-300" />
                </div>
                <label className="text-lg font-semibold text-white">
                  Meeting Date
                </label>
              </div>
              
              <div className={`relative transition-all duration-300 ${activeField === 'date' ? 'transform scale-[1.02]' : ''}`}>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  onFocus={() => setActiveField('date')}
                  onBlur={() => setActiveField('')}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl px-6 py-4 text-base focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 h-14"
                />
              </div>
            </div>

            {/* Transcript Field */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <FileText className="w-5 h-5 text-emerald-300" />
                </div>
                <label className="text-lg font-semibold text-white">
                  Call Transcript
                </label>
              </div>
              
              <div className={`relative transition-all duration-300 ${activeField === 'transcript' ? 'transform scale-[1.02]' : ''}`}>
                <Textarea
                  placeholder="Paste your full call transcript here...

📞 Example format:
John: Thanks for taking the time today. I'd love to understand your current challenges with project management.

Sarah: We're drowning in spreadsheets honestly. With 30+ team members now, tracking everything manually is becoming impossible.

John: That's exactly the pain point our platform solves. We've helped companies your size reduce admin overhead by 60%...

💡 Pro tip: Include the complete conversation from tools like Zoom, Teams, Otter.ai, or Rev.com for best results"
                  value={formData.transcript_text}
                  onChange={(e) => setFormData({ ...formData, transcript_text: e.target.value })}
                  onFocus={() => setActiveField('transcript')}
                  onBlur={() => setActiveField('')}
                  required
                  rows={12}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl p-6 text-base leading-relaxed focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 min-h-[280px] resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${formData.transcript_text.length >= 200 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                    {formData.transcript_text.length >= 200 ? 'Perfect length for analysis' : 'Need 200+ characters'}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{formData.transcript_text.length}/∞</span>
                    <span className="flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      Longer = Better insights
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={loading || formData.transcript_text.length < 200 || !formData.company_name || !formData.attendees || !formData.date} 
                className="w-full h-16 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-lg rounded-2xl border-0 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>AI is analyzing your sales conversation...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-6 h-6" />
                    <span>Generate Sales Insight</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* What You'll Get Section */}
          <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-cyan-300" />
              <h4 className="font-semibold text-white text-lg">What You'll Discover</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="p-3 bg-green-500/20 rounded-xl w-fit mx-auto mb-3">
                  <TrendingUp className="w-5 h-5 text-green-300" />
                </div>
                <h5 className="font-medium text-white mb-2">What You Did Well</h5>
                <p className="text-sm text-gray-300">Specific strengths and winning moments</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-orange-500/20 rounded-xl w-fit mx-auto mb-3">
                  <Target className="w-5 h-5 text-orange-300" />
                </div>
                <h5 className="font-medium text-white mb-2">Growth Opportunities</h5>
                <p className="text-sm text-gray-300">Actionable feedback for better results</p>
              </div>
              <div className="text-center">
                <div className="p-3 bg-purple-500/20 rounded-xl w-fit mx-auto mb-3">
                  <Lightbulb className="w-5 h-5 text-purple-300" />
                </div>
                <h5 className="font-medium text-white mb-2">Next Time Tactics</h5>
                <p className="text-sm text-gray-300">Proven strategies to test in future calls</p>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="mt-6 bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-sm text-gray-300 text-center">
              <span className="font-medium text-white">Supported transcript sources:</span> Zoom auto-transcript • Microsoft Teams • Otter.ai • Rev.com • Gong • Manual notes
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-green-500/20 rounded-xl w-fit mb-4">
              <TrendingUp className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Performance Metrics</h3>
            <p className="text-sm text-gray-400">Talk time, questions asked, objection handling</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-cyan-500/20 rounded-xl w-fit mb-4">
              <Target className="w-6 h-6 text-cyan-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Conversion Analysis</h3>
            <p className="text-sm text-gray-400">Key moments that moved the deal forward</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-indigo-500/20 rounded-xl w-fit mb-4">
              <Lightbulb className="w-6 h-6 text-indigo-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Smart Recommendations</h3>
            <p className="text-sm text-gray-400">AI-powered suggestions for improvement</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
              <BarChart3 className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Benchmarking</h3>
            <p className="text-sm text-gray-400">Compare against top performers</p>
          </div>
        </div>
      </div>
    </div>
  )
}