// import { google } from '@ai-sdk/google';
// import { streamText } from 'ai';
// import { SYSTEM_PROMPT } from './prompt';
// import { getContact } from './tools/getContact';
// //import { getCrazy } from './tools/getCrazy';
// import { getFullTime } from './tools/getFullTime';
// import { getIntro } from './tools/getIntro';
// import { getProjects } from './tools/getProjects';
// import { getResume } from './tools/getResume';
// import { getSkills } from './tools/getSkills';
// //import { getSports } from './tools/getSport';

// export const maxDuration = 30;

// // we don't need to export the following function
// function errorHandler(error: unknown) {
//   if (error == null) {
//     return 'Unknown error';
//   }
//   if (typeof error === 'string') {
//     return error;
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   try {
//     return JSON.stringify(error);
//   } catch {
//     return 'Unserializable error';
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
//     console.log('[CHAT-API] Incoming messages:', messages);

//     messages.unshift(SYSTEM_PROMPT);

//     const tools = {
//       getProjects,
//       getIntro,
//       getResume,
//       getContact,
//       getSkills,
//       //getSports,
//       //getCrazy,
//       getFullTime,
//     };

//     const result = streamText({
//       model: google('gemini-2.5-flash-latest'),
//       messages,
//       //toolCallStreaming: true,
//       toolChoice: 'auto',
//       tools,
//       //maxSteps: 2,
//     });

//     // Return a UI Message stream for useChat in v5 (use this instead of `toDataStreamResponse` or `StreamingTextResponse`)
//     // return result.toTextStreamResponse({
//     //   getErrorMessage: errorHandler,
//     // });
//     return result.toTextStreamResponse();
//   } catch (err) {
//     console.error('Global error:', err);
//     const errorMessage = errorHandler(err);
//     return new Response(errorMessage, { status: 500 });
//   }
// }








// import { google } from '@ai-sdk/google';
// import { streamText, convertToModelMessages } from 'ai';
// import { SYSTEM_PROMPT } from './prompt';
// import { getContact } from './tools/getContact';
// //import { getCrazy } from './tools/getCrazy';
// import { getFullTime } from './tools/getFullTime';
// import { getIntro } from './tools/getIntro';
// import { getProjects } from './tools/getProjects';
// import { getResume } from './tools/getResume';
// import { getSkills } from './tools/getSkills';
// //import { getSports } from './tools/getSport';

// export const maxDuration = 30;

// // we don't need to export the following function
// function errorHandler(error: unknown) {
//   if (error == null) {
//     return 'Unknown error';
//   }
//   if (typeof error === 'string') {
//     return error;
//   }
//   if (error instanceof Error) {
//     return error.message;
//   }
//   try {
//     return JSON.stringify(error);
//   } catch {
//     return 'Unserializable error';
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
//     console.log('[CHAT-API] Incoming messages:', messages);

//     const validMessages = messages.filter((msg: any) => msg && msg.role && (msg.content || msg.parts));
    
//     // FIX 2: Create system message in proper UIMessage format to match the incoming messages
//     const systemMessage = {
//       role: 'system' as const,
//       parts: [{ type: 'text', text: SYSTEM_PROMPT }]
//     };

//     // FIX 2: Create system message in proper format and add to messages array
//     // const systemMessage = {
//     //   role: 'system' as const,
//     //   content: SYSTEM_PROMPT
//     // };
    
//     // FIX 3: Add system message to the beginning and convert UIMessages to ModelMessages
//     const allMessages = [systemMessage, ...validMessages];
//     console.log('[CHAT-API] All messages before conversion:', allMessages);

//     const convertedMessages = convertToModelMessages(allMessages);

//     const tools = {
//       getProjects,
//       getIntro,
//       getResume,
//       getContact,
//       getSkills,
//       //getSports,
//       //getCrazy,
//       getFullTime,
//     };

//     const result = streamText({
//       model: google('gemini-2.5-flash'),
//       messages: convertedMessages, // FIX 4: Use converted messages
//       //toolCallStreaming: true,
//       toolChoice: 'auto',
//       tools,
//       //maxSteps: 2,
//     });

//     // Return a UI Message stream for useChat in v5 (use this instead of `toDataStreamResponse` or `StreamingTextResponse`)
//     // return result.toTextStreamResponse({
//     //   getErrorMessage: errorHandler,
//     // });
//     //return result.toTextStreamResponse();
//     return result.toUIMessageStreamResponse();
//   } catch (err) {
//     console.error('Global error:', err);
//     const errorMessage = errorHandler(err);
//     return new Response(errorMessage, { status: 500 });
//   }
// }







// import { google } from '@ai-sdk/google';
// import { streamText, convertToModelMessages } from 'ai';
// import { SYSTEM_PROMPT } from './prompt';
// import { getContact } from './tools/getContact';
// import { getFullTime } from './tools/getFullTime';
// import { getIntro } from './tools/getIntro';
// import { getProjects } from './tools/getProjects';
// import { getResume } from './tools/getResume';
// import { getSkills } from './tools/getSkills';
// import { getPersonal } from './tools/getPersonal';

// export const maxDuration = 30;

// function errorHandler(error: unknown) {
//     if (error == null) {
//         return 'Unknown error';
//     }
//     if (typeof error === 'string') {
//         return error;
//     }
//     if (error instanceof Error) {
//         return error.message;
//     }
//     try {
//         return JSON.stringify(error);
//     } catch {
//         return 'Unserializable error';
//     }
// }

// export async function POST(req: Request) {
//     try {
//         const { messages } = await req.json();
//         console.log('[CHAT-API] Incoming messages:', messages);
        
//         const validMessages = messages.filter((msg: any) => msg && msg.role && (msg.content || msg.parts));
        
//         // Create system message in proper UIMessage format
//         const systemMessage = {
//             role: 'system' as const,
//             parts: [{ type: 'text', text: SYSTEM_PROMPT.content }]
//         };
        
//         // Add system message to the beginning and convert UIMessages to ModelMessages
//         const allMessages = [systemMessage, ...validMessages];
//         console.log('[CHAT-API] All messages before conversion:', allMessages);
        
//         const convertedMessages = convertToModelMessages(allMessages);
        
//         const tools = {
//             getProjects,
//             getIntro,
//             getResume,
//             getContact,
//             getSkills,
//             getFullTime,
//             getPersonal
//         };
        
//         const result = streamText({
//             model: google('gemini-2.5-flash'),
//             messages: convertedMessages,
//             toolChoice: 'auto',
//             tools,
//         });
        
//         return result.toUIMessageStreamResponse();
        
//     } catch (err) {
//         console.error('Global error:', err);
//         const errorMessage = errorHandler(err);
//         return new Response(errorMessage, { status: 500 });
//     }
// }


























import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getFullTime } from './tools/getFullTime';
import { getIntro } from './tools/getIntro';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getPersonal } from './tools/getPersonal';

export const maxDuration = 30;

function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unserializable error';
  }
}

// Helper function to determine if a message should trigger specific tools
function shouldCallTool(messageContent: string): string | null {
  const content = messageContent.toLowerCase();
  
  // Resume triggers - be very specific
  if (content.includes('resume') || content.includes('cv') || 
      content.includes('can i see your resume') ||
      content.includes('show me your resume') ||
      content.includes('download') && content.includes('resume')) {
    return 'getResume';
  }
  
  // Project triggers
  if (content.includes('project') && (content.includes('show') || content.includes('see') || content.includes('portfolio'))) {
    return 'getProjects';
  }
  
  // Skills triggers
  if (content.includes('skill') && (content.includes('show') || content.includes('display') || content.includes('what are your'))) {
    return 'getSkills';
  }
  
  // Contact triggers
  if ((content.includes('contact') || content.includes('reach')) && (content.includes('how') || content.includes('show'))) {
    return 'getContact';
  }
  
  // Intro triggers
  if ((content.includes('who are you') || content.includes('about you') || content.includes('introduction')) && 
      (content.includes('show') || content.includes('tell me'))) {
    return 'getIntro';
  }
  
  return null;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('[CHAT-API] Incoming messages:', messages);

    const validMessages = messages.filter((msg: any) => msg && msg.role && (msg.content || msg.parts));
    
    // Get the last user message to check for tool triggers
    const lastUserMessage = validMessages.findLast((msg: any) => msg.role === 'user');
    let forcedTool = null;
    
    if (lastUserMessage) {
      const messageText = lastUserMessage.parts?.[0]?.text || lastUserMessage.content || '';
      forcedTool = shouldCallTool(messageText);
      console.log('[CHAT-API] Checking for forced tool:', messageText, '-> Tool:', forcedTool);
    }

    // Create system message in proper UIMessage format
    const systemMessage = {
      role: 'system' as const,
      parts: [{ type: 'text', text: SYSTEM_PROMPT.content }]
    };

    // Add system message to the beginning and convert UIMessages to ModelMessages
    const allMessages = [systemMessage, ...validMessages];
    console.log('[CHAT-API] All messages before conversion:', allMessages);
    const convertedMessages = convertToModelMessages(allMessages);

    const tools = {
      getProjects,
      getIntro,
      getResume,
      getContact,
      getSkills,
      getFullTime,
      getPersonal
    };

    // Use forced tool choice if detected
    const toolChoice = forcedTool ? { type: 'tool' as const, toolName: forcedTool } : 'auto';
    
    console.log('[CHAT-API] Using tool choice:', toolChoice);

    const result = streamText({
      model: google('gemini-2.5-flash'),
      messages: convertedMessages,
      toolChoice: 'auto',
      tools,
      temperature: 0.7,
      // Add this to make tool calling more reliable
      maxRetries: 2,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}