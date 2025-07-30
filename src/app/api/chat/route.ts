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
      contents: `أنت مساعد ذكي متخصص في إدارة الجودة واختبار البرمجيات. 
      تعمل في شركة تقنية وتساعد فرق التطوير في تحسين جودة منتجاتهم.
      أجب باللغة العربية بطريقة مهنية ومفيدة ومختصرة.
      
      السؤال: ${message}`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      }
    })

    console.log('Gemini response:', response.text)

    return NextResponse.json({ 
      content: response.text,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Gemini API Error:', error)
    
    return NextResponse.json({ 
      content: "عذراً، أواجه صعوبة تقنية حالياً. يمكنك إعادة المحاولة خلال لحظات.",
      timestamp: new Date().toISOString(),
      error: true
    }, { status: 500 })
  }
}
