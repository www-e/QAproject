import { GoogleGenAI } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
})

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' }, 
        { status: 400 }
      )
    }

    console.log('Received message:', message)

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        parts: [{
          text: `أنت مساعد ذكي متخصص في إدارة الجودة واختبار البرمجيات. 
          تعمل في شركة تقنية وتساعد فرق التطوير في تحسين جودة منتجاتهم.
          أجب باللغة العربية بطريقة مهنية ومفيدة ومختصرة.
          
          السؤال: ${message}`
        }]
      }],
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      }
    })

    // Correct way to access text in new SDK
    let responseText = ''
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0]
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        responseText = candidate.content.parts[0].text || ''
      }
    }

    console.log('Gemini response:', responseText)

    if (!responseText) {
      throw new Error('Empty response from Gemini')
    }

    return NextResponse.json({ 
      content: responseText,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Gemini API Error:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    
    return NextResponse.json({ 
      content: "عذراً، أواجه صعوبة تقنية حالياً. يمكنك إعادة المحاولة خلال لحظات.",
      timestamp: new Date().toISOString(),
      error: true
    }, { status: 500 })
  }
}
