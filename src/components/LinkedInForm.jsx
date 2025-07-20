'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Linkedin, Zap, Target, MessageCircle, Sparkles, ArrowRight, User, FileText } from 'lucide-react'

export default function LinkedInForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    linkedin_bio: '',
    pitch_deck_content: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeField, setActiveField] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic validation
    if (formData.linkedin_bio.length < 50) {
      setError('LinkedIn bio seems too short. Please provide more detail.')
      setLoading(false)
      return
    }

    if (formData.pitch_deck_content.length < 100) {
      setError('Pitch deck content seems too short. Please provide more detail.')
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setFormData({ linkedin_bio: '', pitch_deck_content: '' })
      onSuccess?.()
    } catch (error) {
     
      setError('Failed to create LinkedIn insight. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Background Effects */}
     
      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-medium">AI-Powered Cold Outreach</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
            LinkedIn Icebreaker Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform LinkedIn profiles into personalized outreach strategies that convert
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
            {/* LinkedIn Bio Field */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-xl">
                  <User className="w-5 h-5 text-blue-300" />
                </div>
                <label className="text-lg font-semibold text-white">
                  LinkedIn Profile Analysis
                </label>
              </div>
              
              <div className={`relative transition-all duration-300 ${activeField === 'bio' ? 'transform scale-[1.02]' : ''}`}>
                <Textarea
                  placeholder="Paste their LinkedIn 'About' section here...

🎯 Example:
VP of Operations at TechStart Inc. Passionate about scaling operations and building efficient systems. Previously led ops at 2 unicorn startups, managed teams of 50+ across 3 countries. Love optimizing processes and seeing 10x growth. Always looking for tools that can eliminate manual work and boost team productivity..."
                  value={formData.linkedin_bio}
                  onChange={(e) => setFormData({ ...formData, linkedin_bio: e.target.value })}
                  onFocus={() => setActiveField('bio')}
                  onBlur={() => setActiveField('')}
                  required
                  rows={7}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl p-6 text-base leading-relaxed focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 min-h-[180px] resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${formData.linkedin_bio.length >= 50 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                    {formData.linkedin_bio.length >= 50 ? 'Perfect length' : 'Need 50+ characters'}
                  </div>
                  <span className="text-sm text-gray-400">
                    {formData.linkedin_bio.length}/∞
                  </span>
                </div>
              </div>
            </div>

            {/* Pitch Deck Field */}
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/20 rounded-xl">
                  <FileText className="w-5 h-5 text-purple-300" />
                </div>
                <label className="text-lg font-semibold text-white">
                  Your Pitch Deck Summary
                </label>
              </div>
              
              <div className={`relative transition-all duration-300 ${activeField === 'pitch' ? 'transform scale-[1.02]' : ''}`}>
                <Textarea
                  placeholder="Summarize your key value propositions...

🚀 Example:
• AI-Powered Project Management Tool
• 40% faster project delivery for scaling teams
• Used by 500+ startups including Y Combinator companies
• Seamless integration with Slack, Asana, Jira, Monday.com
• Case study: TechCorp reduced meeting overhead by 65%
• Smart automation eliminates 80% of status update emails
• Pricing: $10/user/month with 14-day free trial
• ROI typically pays for itself in first month"
                  value={formData.pitch_deck_content}
                  onChange={(e) => setFormData({ ...formData, pitch_deck_content: e.target.value })}
                  onFocus={() => setActiveField('pitch')}
                  onBlur={() => setActiveField('')}
                  required
                  rows={9}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-2xl p-6 text-base leading-relaxed focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 min-h-[220px] resize-none"
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${formData.pitch_deck_content.length >= 100 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
                    {formData.pitch_deck_content.length >= 100 ? 'Great detail level' : 'Need 100+ characters'}
                  </div>
                  <span className="text-sm text-gray-400">
                    {formData.pitch_deck_content.length}/∞
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={loading || formData.linkedin_bio.length < 50 || formData.pitch_deck_content.length < 100} 
                className="w-full h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-lg rounded-2xl border-0 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>AI is analyzing & crafting your strategy...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6" />
                    <span>Generate Icebreaker Strategy</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-green-500/20 rounded-xl w-fit mb-4">
              <Target className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Buying Signals</h3>
            <p className="text-sm text-gray-400">Identify key decision triggers</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
              <MessageCircle className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Smart Questions</h3>
            <p className="text-sm text-gray-400">Discovery questions that convert</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-purple-500/20 rounded-xl w-fit mb-4">
              <Linkedin className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Pitch Matching</h3>
            <p className="text-sm text-gray-400">Relevant value propositions</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
            <div className="p-3 bg-pink-500/20 rounded-xl w-fit mb-4">
              <Sparkles className="w-6 h-6 text-pink-300" />
            </div>
            <h3 className="font-semibold text-white mb-2">Personalized Copy</h3>
            <p className="text-sm text-gray-400">Ready-to-send messages</p>
          </div>
        </div>
      </div>
    </div>
  )
}