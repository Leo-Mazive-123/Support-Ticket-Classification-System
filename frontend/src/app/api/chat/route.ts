import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or 'gpt-4', 'gpt-3.5-turbo', etc.
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error }, { status: response.status });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message;

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    return NextResponse.json({ error: 'OpenAI request failed' }, { status: 500 });
  }
}
