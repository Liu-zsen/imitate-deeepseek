import { createDeepSeek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';
// 后端的API接收到user 点击提交之后给收到的消息 给到DeepSeek
// DeepSeek给出result的流式输出, 给到前端    
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.BASE_URL
})

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: deepseek('deepseek-v3'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}