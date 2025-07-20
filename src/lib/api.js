const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export const api = {
  async createTranscript(data) {
    const response = await fetch(`${API_BASE}/api/transcripts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create transcript: ${response.status} - ${errorText}`)
    }
    return response.json()
  },

  async getTranscripts() {
    try {
      const response = await fetch(`${API_BASE}/api/transcripts`)
      
      if (!response.ok) {
        const errorText = await response.text()
       
        throw new Error(`Failed to fetch transcripts: ${response.status} - ${errorText}`)
      }
      
      return response.json()
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.')
      }
      throw error
    }
  },

  async createLinkedInInsight(data) {
    const response = await fetch(`${API_BASE}/api/linkedin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to create LinkedIn insight: ${response.status} - ${errorText}`)
    }
    return response.json()
  },

  async getLinkedInInsights() {
    try {
      
      const response = await fetch(`${API_BASE}/api/linkedin`)
      
     
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('LinkedIn API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          errorText: errorText
        })
        throw new Error(`Failed to fetch LinkedIn insights: ${response.status} - ${errorText}`)
      }
      
      const data = await response.json()
      return data
      
    } catch (error) {
      
      // Handle network errors (server not running, etc.)
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check if the backend is running.')
      }
      
      // Re-throw other errors
      throw error
    }
  }
}