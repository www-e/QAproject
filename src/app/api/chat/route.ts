import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// Initialize the model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Use the latest model with better configuration
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
        responseMimeType: "text/plain",
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    })

    const prompt = `أنت مساعد ذكي متخصص في إدارة الجودة واختبار البرمجيات. 
    تعمل في شركة تقنية وتساعد فرق التطوير في تحسين جودة منتجاتهم.
    أجب باللغة العربية بطريقة مهنية ومفيدة ومختصرة.
    
    السؤال: ${message}`

    // Use generateContent with retry logic
    let result
    let attempts = 0
    const maxAttempts = 3
    
    while (attempts < maxAttempts) {
      try {
        result = await model.generateContent(prompt)
        break
      } catch (error: any) {
        attempts++
        if (error.message?.includes('503') && attempts < maxAttempts) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts))
          continue
        }
        throw error
      }
    }

    if (!result) {
      throw new Error('Failed to get response after retries')
    }

    const text = result.response.text()

    return NextResponse.json({ 
      content: text,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Gemini API Error:', error)
    
    // Enhanced fallback responses based on error type
    let fallbackMessage = "عذراً، أواجه صعوبة تقنية حالياً. يمكنك إعادة المحاولة خلال لحظات."
    
    if (error.message?.includes('503')) {
      fallbackMessage = "الخدمة مشغولة حالياً. يرجى المحاولة مرة أخرى بعد قليل."
    } else if (error.message?.includes('429')) {
      fallbackMessage = "تم تجاوز حد الاستخدام. يرجى الانتظار قليلاً قبل المحاولة مرة أخرى."
    } else if (error.message?.includes('API key')) {
      fallbackMessage = "مشكلة في الاعدادات. يرجى التواصل مع المطور."
    }
    
    return NextResponse.json({ 
      content: fallbackMessage,
      timestamp: new Date().toISOString(),
      error: true
    }, { status: 200 }) // Return 200 to avoid UI errors
  }
}
