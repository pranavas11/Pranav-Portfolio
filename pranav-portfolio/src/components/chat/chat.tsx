// 'use client';
// import { useChat } from '@ai-sdk/react';
// import { AnimatePresence, motion } from 'framer-motion';
// import dynamic from 'next/dynamic';
// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { toast } from 'sonner';

// // Component imports
// import ChatBottombar from '@/components/chat/chat-bottombar';
// import ChatLanding from '@/components/chat/chat-landing';
// import ChatMessageContent from '@/components/chat/chat-message-content';
// import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
// import {
//   ChatBubble,
//   ChatBubbleMessage,
// } from '@/components/ui/chat/chat-bubble';
// import Welcome from '@/components/welcome';
// import { Info } from 'lucide-react';
// import { GithubButton } from '../ui/github-button';
// import HelperBoost from './HelperBoost';

// // ClientOnly component for client-side rendering
// // @ts-ignore
// const ClientOnly = ({ children }) => {
//     const [hasMounted, setHasMounted] = useState(false);

//     useEffect(() => {
//         setHasMounted(true);
//     }, []);

//     if (!hasMounted) {
//         return null;
//     }

//     return <>{children}</>;
// };

// // Define Avatar component props interface
// interface AvatarProps {
//     hasActiveTool: boolean;
//     videoRef: React.RefObject<HTMLVideoElement | null>;
//     isTalking: boolean;
// }

// // Dynamic import of Avatar component
// const Avatar = dynamic<AvatarProps>(
//     () =>
//         Promise.resolve(({ hasActiveTool, videoRef, isTalking }: AvatarProps) => {
//         // This function will only execute on the client
//         const isIOS = () => {
//             // Multiple detection methods
//             const userAgent = window.navigator.userAgent;
//             const platform = window.navigator.platform;             // DEPRECATED
//             const maxTouchPoints = window.navigator.maxTouchPoints || 0;

//             // Avoid `window.MSStream` type error by reading via `any` and caching a boolean.
//             // TS doesn't know about `MSStream` on `window`. We safely probe at runtime.
//             const hasMSStream = Boolean((window as any).MSStream); // <-- MSStream guard

//             // UserAgent-based check (@ts-ignore)
//             const isIOSByUA = /iPad|iPhone|iPod/.test(userAgent) && !hasMSStream;

//             // Platform-based check
//             const isIOSByPlatform = /iPad|iPhone|iPod/.test(platform);

//             // iPad Pro check (@ts-ignore)
//             const isIPadOS = platform === 'MacIntel' && maxTouchPoints > 1 && !hasMSStream;

//             // Safari check
//             const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

//             return isIOSByUA || isIOSByPlatform || isIPadOS || isSafari;
//         };

//         // Conditional rendering based on detection
//         return (
//             <div className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}>
//                 <div className="relative cursor-pointer" onClick={() => (window.location.href = '/')}>
//                     {isIOS() ? (
//                         <img
//                             src="/icon.png"
//                             alt="iOS avatar"
//                             className="h-full w-full scale-[1.8] object-contain"
//                         />
//                         ) : (
//                         <video
//                             ref={videoRef}
//                             className="h-full w-full scale-[1.8] object-contain"
//                             muted
//                             playsInline
//                             loop
//                         >
//                             <source src="/memoji.webm" type="video/webm" />
//                             <source src="/memoji_ios.mp4" type="video/mp4" />
//                         </video>
//                     )}
//                 </div>
//             </div>
//         );
//     }),
//     { ssr: false }
// );

// const MOTION_CONFIG = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: 20 },
//     transition: {
//         duration: 0.3,
//         //ease: 'easeOut',
//         ease: 'easeOut' as const,
//     },
// };

// const Chat = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const searchParams = useSearchParams();
//     const initialQuery = searchParams.get('query');
//     const [autoSubmitted, setAutoSubmitted] = useState(false);
//     const [loadingSubmit, setLoadingSubmit] = useState(false);
//     const [isTalking, setIsTalking] = useState(false);
//     const [input, setInput] = useState('');

//     const {
//         id,
//         messages,
//         status,                             // derive loading from status
//         sendMessage,                        // replaces `append`/`handleSubmit`
//         regenerate,                         // FIX 2: Use regenerate (not reload) in v5
//         stop,
//         setMessages,
//         addToolResult,                      // FIX 3: Use addToolResult directly, not renamed
//         clearError,
//         resumeStream,
//     } = useChat({
//         onFinish: () => {
//             setLoadingSubmit(false);
//             setIsTalking(false);
//             if (videoRef.current) {
//                 videoRef.current.pause();
//             }
//         },
//         onError: (error) => {
//             setLoadingSubmit(false);
//             setIsTalking(false);
//             if (videoRef.current) {
//                 videoRef.current.pause();
//             }
//             console.error('Chat error:', error.message, error.cause);
//             toast.error(`Error: ${error.message}`);
//         },
//         onToolCall: (tool) => {
//             const toolName = tool.toolCall.toolName;
//             console.log('Tool call:', toolName);
//         },
//     });

//     // FIX 4: Update status check for v5 - use correct status values
//     const isLoading = status === 'submitted' || status === 'streaming';

//     // Provide a typed `reload` function expected by SimplifiedChatView.
//     // Its type is `() => Promise<string | null | undefined>`. We call `regenerate()` and return `null`.
//     const reload = async () => {
//         regenerate();
//         return null;
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

//     const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
//         const latestAIMessageIndex = messages.findLastIndex((m) => m.role === 'assistant');
//         const latestUserMessageIndex = messages.findLastIndex((m) => m.role === 'user');

//         const result = {
//             currentAIMessage: latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
//             latestUserMessage: latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
//             hasActiveTool: false,
//         };

//         if (result.currentAIMessage) {
//             // FIX 5: Update hasActiveTool detection for v5 - check for 'call' state
//             result.hasActiveTool = result.currentAIMessage.parts?.some((part) =>
//                 typeof part.type === 'string' && part.type.startsWith('tool-') && (part as any).state === 'call'
//             ) || false;
//         }

//         if (latestAIMessageIndex < latestUserMessageIndex) {
//             result.currentAIMessage = null;
//         }

//         return result;
//     }, [messages]);

//     const isToolInProgress = messages.some((m) =>
//         m.role === 'assistant' && m.parts?.some((part) =>
//             typeof part.type === 'string' &&
//             part.type.startsWith('tool-') &&
//             //(part as any).state === 'call'
//             (part as any).state && ['input-streaming', 'input-available'].includes((part as any).state)
//         )
//     );

//     //@ts-ignore
//     const submitQuery = (query) => {
//         if (!query.trim() || isToolInProgress) return;
//         setLoadingSubmit(true);
//         setIsTalking(true);
        
//         // Try to play the video as soon as we start submitting
//         if (videoRef.current) {
//             videoRef.current
//             .play()
//             .catch((error) => console.error('Failed to play video:', error));
//         }
        
//         // FIX 4: v5 uses sendMessage with CreateUIMessage format
//         sendMessage({
//             role: 'user',
//             parts: [{ type: 'text', text: query }]
//         });
//         setInput('');
//     };

//     useEffect(() => {
//         if (videoRef.current) {
//             videoRef.current.loop = true;
//             videoRef.current.muted = true;
//             videoRef.current.playsInline = true;
//             videoRef.current.pause();
//         }

//         if (initialQuery && !autoSubmitted) {
//             setAutoSubmitted(true);
//             setInput('');
//             submitQuery(initialQuery);
//         }
//     }, [initialQuery, autoSubmitted]);

//     useEffect(() => {
//         if (videoRef.current) {
//             if (isTalking) {
//                 videoRef.current.play().catch((error) => {
//                 console.error('Failed to play video:', error);
//                 });
//             } else {
//                 videoRef.current.pause();
//             }
//         }
//     }, [isTalking]);

//     //@ts-ignore
//     const onSubmit = (e) => {
//         e.preventDefault();
//         if (!input.trim() || isToolInProgress) return;
//         submitQuery(input);
//         setInput('');
//     };

//     const handleStop = () => {
//         stop();
//         setLoadingSubmit(false);
//         setIsTalking(false);
//         if (videoRef.current) {
//             videoRef.current.pause();
//         }
//     };

//     // Check if this is the initial empty state (no messages)
//     const isEmptyState = !currentAIMessage && !latestUserMessage && !loadingSubmit;

//     // Calculate header height based on hasActiveTool
//     const headerHeight = hasActiveTool ? 100 : 180;

//     return (
//         <div className="relative h-screen overflow-hidden">
//             <div className="absolute top-6 right-8 z-51 flex flex-col-reverse items-center justify-center gap-1 md:flex-row">
//                 <Welcome
//                 trigger={
//                     <div className="hover:bg-accent cursor-pointer rounded-2xl px-3 py-1.5">
//                     <Info className="text-accent-foreground h-8" />
//                     </div>
//                 }
//                 />
//                 <div className="">
//                     <GithubButton
//                         animationDuration={1.5}
//                         label="Star"
//                         size={'sm'}
//                         repoUrl="https://github.com/pranavas11/Pranav-Portfolio"
//                     />
//                 </div>
//             </div>

//             {/* Fixed Avatar Header with Gradient */}
//             <div
//                 className="fixed top-0 right-0 left-0 z-50"
//                 style={{
//                 background:
//                     'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
//                 }}
//             >
//                 <div className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}>
//                     <div className="flex justify-center">
//                         <ClientOnly>
//                             <Avatar
//                                 hasActiveTool={hasActiveTool}
//                                 videoRef={videoRef}
//                                 isTalking={isTalking}
//                             />
//                         </ClientOnly>
//                     </div>

//                     <AnimatePresence>
//                         {latestUserMessage && !currentAIMessage && (
//                             <motion.div
//                                 {...MOTION_CONFIG}
//                                 className="mx-auto flex max-w-3xl px-4"
//                             >
//                                 <ChatBubble variant="sent">
//                                     <ChatBubbleMessage>
//                                         <ChatMessageContent
//                                         message={latestUserMessage}
//                                         isLast={true}
//                                         isLoading={false}
//                                         reload={() => Promise.resolve(null)}
//                                         />
//                                     </ChatBubbleMessage>
//                                 </ChatBubble>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>

//             {/* Main Content Area */}
//             <div className="container mx-auto flex h-full max-w-3xl flex-col">
//                 {/* Scrollable Chat Content */}
//                 <div className="flex-1 overflow-y-auto px-2" style={{ paddingTop: `${headerHeight}px` }}>
//                     <AnimatePresence mode="wait">
//                         {isEmptyState ? (
//                             <motion.div
//                                 key="landing"
//                                 className="flex min-h-full items-center justify-center"
//                                 {...MOTION_CONFIG}
//                             >
//                                 <ChatLanding submitQuery={submitQuery} />
//                             </motion.div>
//                         ) : currentAIMessage ? (
//                             <div className="pb-4">
//                                 <SimplifiedChatView
//                                 message={currentAIMessage}
//                                 isLoading={isLoading}
//                                 reload={reload}
//                                 // FIX 6: Create wrapper function to match expected signature
//                                 addToolResult={({ toolCallId, result }) => 
//                                     addToolResult({ tool: 'unknown', toolCallId, output: result })
//                                 }
//                                 />
//                             </div>
//                         ) : (
//                             loadingSubmit && (
//                                 <motion.div
//                                 key="loading"
//                                 {...MOTION_CONFIG}
//                                 className="px-4 pt-18"
//                                 >
//                                     <ChatBubble variant="received">
//                                         <ChatBubbleMessage isLoading />
//                                     </ChatBubble>
//                                 </motion.div>
//                             )
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* Fixed Bottom Bar */}
//                 <div className="sticky bottom-0 bg-white px-2 pt-3 md:px-0 md:pb-4">
//                     <div className="relative flex flex-col items-center gap-3">
//                         <HelperBoost submitQuery={submitQuery} setInput={setInput} />
//                         <ChatBottombar
//                         input={input}
//                         handleInputChange={handleInputChange}
//                         handleSubmit={onSubmit}
//                         isLoading={isLoading}
//                         stop={handleStop}
//                         isToolInProgress={isToolInProgress}
//                         />
//                     </div>
//                 </div>
//                 <a
//                 href="https://linkedin.com/in/pranavas11/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="fixed right-3 bottom-0 z-10 mb-4 hidden cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm hover:underline md:block"
//                 >
//                 @pranavas11
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default Chat;














































// 'use client';

// import { useChat } from '@ai-sdk/react';
// import { AnimatePresence, motion } from 'framer-motion';
// import dynamic from 'next/dynamic';
// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { toast } from 'sonner';

// // Component imports
// import ChatBottombar from '@/components/chat/chat-bottombar';
// import ChatLanding from '@/components/chat/chat-landing';
// import ChatMessageContent from '@/components/chat/chat-message-content';
// import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
// import {
//   ChatBubble,
//   ChatBubbleMessage,
// } from '@/components/ui/chat/chat-bubble';
// import Welcome from '@/components/welcome';
// import { Info } from 'lucide-react';
// import { GithubButton } from '../ui/github-button';
// import HelperBoost from './HelperBoost';

// // ClientOnly component for client-side rendering
// // @ts-ignore
// const ClientOnly = ({ children }) => {
//     const [hasMounted, setHasMounted] = useState(false);

//     useEffect(() => {
//         setHasMounted(true);
//     }, []);

//     if (!hasMounted) {
//         return null;
//     }

//     return <>{children}</>;
// };

// // Define Avatar component props interface
// interface AvatarProps {
//     hasActiveTool: boolean;
//     videoRef: React.RefObject<HTMLVideoElement | null>;
//     isTalking: boolean;
// }

// // Dynamic import of Avatar component
// const Avatar = dynamic<AvatarProps>(
//     () =>
//         Promise.resolve(({ hasActiveTool, videoRef, isTalking }: AvatarProps) => {
//         // This function will only execute on the client
//         const isIOS = () => {
//             // Multiple detection methods
//             const userAgent = window.navigator.userAgent;
//             const platform = window.navigator.platform;             // DEPRECATED
//             const maxTouchPoints = window.navigator.maxTouchPoints || 0;

//             // Avoid `window.MSStream` type error by reading via `any` and caching a boolean.
//             // TS doesn't know about `MSStream` on `window`. We safely probe at runtime.
//             const hasMSStream = Boolean((window as any).MSStream); // <-- MSStream guard

//             // UserAgent-based check (@ts-ignore)
//             const isIOSByUA = /iPad|iPhone|iPod/.test(userAgent) && !hasMSStream;

//             // Platform-based check
//             const isIOSByPlatform = /iPad|iPhone|iPod/.test(platform);

//             // iPad Pro check (@ts-ignore)
//             const isIPadOS = platform === 'MacIntel' && maxTouchPoints > 1 && !hasMSStream;

//             // Safari check
//             const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

//             return isIOSByUA || isIOSByPlatform || isIPadOS || isSafari;
//         };

//         // Conditional rendering based on detection
//         return (
//             <div className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}>
//                 <div className="relative cursor-pointer" onClick={() => (window.location.href = '/')}>
//                     {isIOS() ? (
//                         <img
//                             src="/icon.png"
//                             alt="iOS avatar"
//                             className="h-full w-full scale-[1.8] object-contain"
//                         />
//                         ) : (
//                         <video
//                             ref={videoRef}
//                             className="h-full w-full scale-[1.8] object-contain"
//                             muted
//                             playsInline
//                             loop
//                         >
//                             <source src="/memoji.webm" type="video/webm" />
//                             <source src="/memoji_ios.mp4" type="video/mp4" />
//                         </video>
//                     )}
//                 </div>
//             </div>
//         );
//     }),
//     { ssr: false }
// );

// const MOTION_CONFIG = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: 20 },
//     transition: {
//         duration: 0.3,
//         ease: 'easeOut' as const,
//     },
// };

// const Chat = () => {
//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const searchParams = useSearchParams();
//     const initialQuery = searchParams.get('query');
//     const [autoSubmitted, setAutoSubmitted] = useState(false);
//     const [loadingSubmit, setLoadingSubmit] = useState(false);
//     const [isTalking, setIsTalking] = useState(false);
//     const [input, setInput] = useState('');

//     const {
//         id,
//         messages,
//         status,
//         sendMessage,
//         regenerate,
//         stop,
//         setMessages,
//         addToolResult,
//         clearError,
//         resumeStream,
//     } = useChat({
//         onFinish: () => {
//             setLoadingSubmit(false);
//             setIsTalking(false);
//             if (videoRef.current) {
//                 videoRef.current.pause();
//             }
//         },
//         onError: (error) => {
//             setLoadingSubmit(false);
//             setIsTalking(false);
//             if (videoRef.current) {
//                 videoRef.current.pause();
//             }
//             console.error('Chat error:', error.message, error.cause);
//             toast.error(`Error: ${error.message}`);
//         },
//         onToolCall: (tool) => {
//             const toolName = tool.toolCall.toolName;
//             console.log('Tool call:', toolName);
//         },
//     });

//     const isLoading = status === 'submitted' || status === 'streaming';

//     const reload = async () => {
//         regenerate();
//         return null;
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

//     const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
//         const latestAIMessageIndex = messages.findLastIndex((m) => m.role === 'assistant');
//         const latestUserMessageIndex = messages.findLastIndex((m) => m.role === 'user');

//         const result = {
//             currentAIMessage: latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
//             latestUserMessage: latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
//             hasActiveTool: false,
//         };

//         if (result.currentAIMessage) {
//             // FIX: Check for tools that have completed execution (output-available state)
//             result.hasActiveTool = result.currentAIMessage.parts?.some((part) =>
//                 typeof part.type === 'string' && 
//                 part.type.startsWith('tool-') && 
//                 (part as any).state === 'output-available'
//             ) || false;
//         }

//         if (latestAIMessageIndex < latestUserMessageIndex) {
//             result.currentAIMessage = null;
//         }

//         return result;
//     }, [messages]);

//     const isToolInProgress = messages.some((m) =>
//         m.role === 'assistant' && m.parts?.some((part) =>
//             typeof part.type === 'string' &&
//             part.type.startsWith('tool-') &&
//             (part as any).state && ['input-streaming', 'input-available'].includes((part as any).state)
//         )
//     );

//     //@ts-ignore
//     const submitQuery = (query) => {
//         if (!query.trim() || isToolInProgress) return;
//         setLoadingSubmit(true);
//         setIsTalking(true);
        
//         // Try to play the video as soon as we start submitting
//         if (videoRef.current) {
//             videoRef.current
//             .play()
//             .catch((error) => console.error('Failed to play video:', error));
//         }
        
//         sendMessage({
//             role: 'user',
//             parts: [{ type: 'text', text: query }]
//         });
//         setInput('');
//     };

//     useEffect(() => {
//         if (videoRef.current) {
//             videoRef.current.loop = true;
//             videoRef.current.muted = true;
//             videoRef.current.playsInline = true;
//             videoRef.current.pause();
//         }

//         if (initialQuery && !autoSubmitted) {
//             setAutoSubmitted(true);
//             setInput('');
//             submitQuery(initialQuery);
//         }
//     }, [initialQuery, autoSubmitted]);

//     useEffect(() => {
//         if (videoRef.current) {
//             if (isTalking) {
//                 videoRef.current.play().catch((error) => {
//                 console.error('Failed to play video:', error);
//                 });
//             } else {
//                 videoRef.current.pause();
//             }
//         }
//     }, [isTalking]);

//     //@ts-ignore
//     const onSubmit = (e) => {
//         e.preventDefault();
//         if (!input.trim() || isToolInProgress) return;
//         submitQuery(input);
//         setInput('');
//     };

//     const handleStop = () => {
//         stop();
//         setLoadingSubmit(false);
//         setIsTalking(false);
//         if (videoRef.current) {
//             videoRef.current.pause();
//         }
//     };

//     // Check if this is the initial empty state (no messages)
//     const isEmptyState = !currentAIMessage && !latestUserMessage && !loadingSubmit;

//     // Calculate header height based on hasActiveTool
//     const headerHeight = hasActiveTool ? 100 : 180;

//     return (
//         <div className="relative h-screen overflow-hidden">
//             <div className="absolute top-6 right-8 z-51 flex flex-col-reverse items-center justify-center gap-1 md:flex-row">
//                 <Welcome
//                 trigger={
//                     <div className="hover:bg-accent cursor-pointer rounded-2xl px-3 py-1.5">
//                     <Info className="text-accent-foreground h-8" />
//                     </div>
//                 }
//                 />
//                 <div className="">
//                     <GithubButton
//                         animationDuration={1.5}
//                         label="Star"
//                         size={'sm'}
//                         repoUrl="https://github.com/pranavas11/Pranav-Portfolio"
//                     />
//                 </div>
//             </div>

//             {/* Fixed Avatar Header with Gradient */}
//             <div
//                 className="fixed top-0 right-0 left-0 z-50"
//                 style={{
//                 background:
//                     'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
//                 }}
//             >
//                 <div className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}>
//                     <div className="flex justify-center">
//                         <ClientOnly>
//                             <Avatar
//                                 hasActiveTool={hasActiveTool}
//                                 videoRef={videoRef}
//                                 isTalking={isTalking}
//                             />
//                         </ClientOnly>
//                     </div>

//                     <AnimatePresence>
//                         {latestUserMessage && !currentAIMessage && (
//                             <motion.div
//                                 {...MOTION_CONFIG}
//                                 className="mx-auto flex max-w-3xl px-4"
//                             >
//                                 <ChatBubble variant="sent">
//                                     <ChatBubbleMessage>
//                                         <ChatMessageContent
//                                         message={latestUserMessage}
//                                         isLast={true}
//                                         isLoading={false}
//                                         reload={() => Promise.resolve(null)}
//                                         />
//                                     </ChatBubbleMessage>
//                                 </ChatBubble>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>

//             {/* Main Content Area */}
//             <div className="container mx-auto flex h-full max-w-3xl flex-col">
//                 {/* Scrollable Chat Content */}
//                 <div className="flex-1 overflow-y-auto px-2" style={{ paddingTop: `${headerHeight}px` }}>
//                     <AnimatePresence mode="wait">
//                         {isEmptyState ? (
//                             <motion.div
//                                 key="landing"
//                                 className="flex min-h-full items-center justify-center"
//                                 {...MOTION_CONFIG}
//                             >
//                                 <ChatLanding submitQuery={submitQuery} />
//                             </motion.div>
//                         ) : currentAIMessage ? (
//                             <div className="pb-4">
//                                 <SimplifiedChatView
//                                 message={currentAIMessage}
//                                 isLoading={isLoading}
//                                 reload={reload}
//                                 addToolResult={({ toolCallId, result }) => 
//                                     addToolResult({ tool: 'unknown', toolCallId, output: result })
//                                 }
//                                 />
//                             </div>
//                         ) : (
//                             loadingSubmit && (
//                                 <motion.div
//                                 key="loading"
//                                 {...MOTION_CONFIG}
//                                 className="px-4 pt-18"
//                                 >
//                                     <ChatBubble variant="received">
//                                         <ChatBubbleMessage isLoading />
//                                     </ChatBubble>
//                                 </motion.div>
//                             )
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* Fixed Bottom Bar */}
//                 <div className="sticky bottom-0 bg-white px-2 pt-3 md:px-0 md:pb-4">
//                     <div className="relative flex flex-col items-center gap-3">
//                         <HelperBoost submitQuery={submitQuery} setInput={setInput} />
//                         <ChatBottombar
//                         input={input}
//                         handleInputChange={handleInputChange}
//                         handleSubmit={onSubmit}
//                         isLoading={isLoading}
//                         stop={handleStop}
//                         isToolInProgress={isToolInProgress}
//                         />
//                     </div>
//                 </div>
//                 <a
//                 href="https://linkedin.com/in/pranavas11/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="fixed right-3 bottom-0 z-10 mb-4 hidden cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm hover:underline md:block"
//                 >
//                 @pranavas11
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default Chat;




















'use client';

import { useChat } from '@ai-sdk/react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

// Component imports
import ChatBottombar from '@/components/chat/chat-bottombar';
import ChatLanding from '@/components/chat/chat-landing';
import ChatMessageContent from '@/components/chat/chat-message-content';
import { SimplifiedChatView } from '@/components/chat/simple-chat-view';
import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import Welcome from '@/components/welcome';
import { Info } from 'lucide-react';
import { GithubButton } from '../ui/github-button';
import HelperBoost from './HelperBoost';

// ClientOnly component for client-side rendering
// @ts-ignore
const ClientOnly = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
};

// Define Avatar component props interface
interface AvatarProps {
    hasActiveTool: boolean;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    isTalking: boolean;
}

// Dynamic import of Avatar component
const Avatar = dynamic<AvatarProps>(
    () =>
        Promise.resolve(({ hasActiveTool, videoRef, isTalking }: AvatarProps) => {
        // This function will only execute on the client
        const isIOS = () => {
            // Multiple detection methods
            const userAgent = window.navigator.userAgent;
            const platform = window.navigator.platform;             // DEPRECATED
            const maxTouchPoints = window.navigator.maxTouchPoints || 0;

            // Avoid `window.MSStream` type error by reading via `any` and caching a boolean.
            // TS doesn't know about `MSStream` on `window`. We safely probe at runtime.
            const hasMSStream = Boolean((window as any).MSStream); // <-- MSStream guard

            // UserAgent-based check (@ts-ignore)
            const isIOSByUA = /iPad|iPhone|iPod/.test(userAgent) && !hasMSStream;

            // Platform-based check
            const isIOSByPlatform = /iPad|iPhone|iPod/.test(platform);

            // iPad Pro check (@ts-ignore)
            const isIPadOS = platform === 'MacIntel' && maxTouchPoints > 1 && !hasMSStream;

            // Safari check
            const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

            return isIOSByUA || isIOSByPlatform || isIPadOS || isSafari;
        };

        // Conditional rendering based on detection
        return (
            <div className={`flex items-center justify-center rounded-full transition-all duration-300 ${hasActiveTool ? 'h-20 w-20' : 'h-28 w-28'}`}>
                <div className="relative cursor-pointer" onClick={() => (window.location.href = '/')}>
                    {isIOS() ? (
                        <img
                            src="/icon.png"
                            alt="iOS avatar"
                            className="h-full w-full scale-[1.8] object-contain"
                        />
                        ) : (
                        <video
                            ref={videoRef}
                            className="h-full w-full scale-[1.8] object-contain"
                            muted
                            playsInline
                            loop
                        >
                            <source src="/memoji.webm" type="video/webm" />
                            <source src="/memoji_ios.mp4" type="video/mp4" />
                        </video>
                    )}
                </div>
            </div>
        );
    }),
    { ssr: false }
);

const MOTION_CONFIG = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
    },
};

const Chat = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('query');
    const [autoSubmitted, setAutoSubmitted] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [input, setInput] = useState('');

    const {
        id,
        messages,
        status,
        sendMessage,
        regenerate,
        stop,
        setMessages,
        addToolResult,
        clearError,
        resumeStream,
    } = useChat({
        onFinish: () => {
            setLoadingSubmit(false);
            setIsTalking(false);
            if (videoRef.current) {
                videoRef.current.pause();
            }
        },
        onError: (error) => {
            setLoadingSubmit(false);
            setIsTalking(false);
            if (videoRef.current) {
                videoRef.current.pause();
            }
            console.error('Chat error:', error.message, error.cause);
            toast.error(`Error: ${error.message}`);
        },
        onToolCall: (tool) => {
            const toolName = tool.toolCall.toolName;
            console.log('Tool call:', toolName);
        },
    });

    const isLoading = status === 'submitted' || status === 'streaming';

    const reload = async () => {
        regenerate();
        return null;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const { currentAIMessage, latestUserMessage, hasActiveTool } = useMemo(() => {
        const latestAIMessageIndex = messages.findLastIndex((m) => m.role === 'assistant');
        const latestUserMessageIndex = messages.findLastIndex((m) => m.role === 'user');

        const result = {
            currentAIMessage: latestAIMessageIndex !== -1 ? messages[latestAIMessageIndex] : null,
            latestUserMessage: latestUserMessageIndex !== -1 ? messages[latestUserMessageIndex] : null,
            hasActiveTool: false,
        };

        if (result.currentAIMessage) {
            // FIX: Check for tools that have completed execution (output-available state)
            result.hasActiveTool = result.currentAIMessage.parts?.some((part) =>
                typeof part.type === 'string' && 
                part.type.startsWith('tool-') && 
                (part as any).state === 'output-available'
            ) || false;
        }

        if (latestAIMessageIndex < latestUserMessageIndex) {
            result.currentAIMessage = null;
        }

        return result;
    }, [messages]);

    const isToolInProgress = messages.some((m) =>
        m.role === 'assistant' && m.parts?.some((part) =>
            typeof part.type === 'string' &&
            part.type.startsWith('tool-') &&
            (part as any).state && ['input-streaming', 'input-available'].includes((part as any).state)
        )
    );

    //@ts-ignore
    const submitQuery = (query) => {
        if (!query.trim() || isToolInProgress) return;
        setLoadingSubmit(true);
        setIsTalking(true);
        
        // Try to play the video as soon as we start submitting
        if (videoRef.current) {
            videoRef.current
            .play()
            .catch((error) => console.error('Failed to play video:', error));
        }
        
        sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: query }]
        });
        setInput('');
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.loop = true;
            videoRef.current.muted = true;
            videoRef.current.playsInline = true;
            videoRef.current.pause();
        }

        if (initialQuery && !autoSubmitted) {
            setAutoSubmitted(true);
            setInput('');
            submitQuery(initialQuery);
        }
    }, [initialQuery, autoSubmitted]);

    useEffect(() => {
        if (videoRef.current) {
            if (isTalking) {
                videoRef.current.play().catch((error) => {
                console.error('Failed to play video:', error);
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isTalking]);

    //@ts-ignore
    const onSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isToolInProgress) return;
        submitQuery(input);
        setInput('');
    };

    const handleStop = () => {
        stop();
        setLoadingSubmit(false);
        setIsTalking(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    // Check if this is the initial empty state (no messages)
    const isEmptyState = !currentAIMessage && !latestUserMessage && !loadingSubmit;

    // Calculate header height based on hasActiveTool
    const headerHeight = hasActiveTool ? 100 : 180;

    return (
        <div className="relative h-screen overflow-hidden">
            <div className="absolute top-6 right-8 z-51 flex flex-col-reverse items-center justify-center gap-1 md:flex-row">
                <Welcome
                trigger={
                    <div className="hover:bg-accent cursor-pointer rounded-2xl px-3 py-1.5">
                    <Info className="text-accent-foreground h-8" />
                    </div>
                }
                />
                <div className="">
                    <GithubButton
                        animationDuration={1.5}
                        label="Star"
                        size={'sm'}
                        repoUrl="https://github.com/pranavas11/Pranav-Portfolio"
                    />
                </div>
            </div>

            {/* Fixed Avatar Header with Gradient */}
            <div
                className="fixed top-0 right-0 left-0 z-50"
                style={{
                background:
                    'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)',
                }}
            >
                <div className={`transition-all duration-300 ease-in-out ${hasActiveTool ? 'pt-6 pb-0' : 'py-6'}`}>
                    <div className="flex justify-center">
                        <ClientOnly>
                            <Avatar
                                hasActiveTool={hasActiveTool}
                                videoRef={videoRef}
                                isTalking={isTalking}
                            />
                        </ClientOnly>
                    </div>

                    <AnimatePresence>
                        {latestUserMessage && !currentAIMessage && (
                            <motion.div
                                {...MOTION_CONFIG}
                                className="mx-auto flex max-w-3xl px-4"
                            >
                                <ChatBubble variant="sent">
                                    <ChatBubbleMessage>
                                        <ChatMessageContent
                                        message={latestUserMessage}
                                        isLast={true}
                                        isLoading={false}
                                        reload={() => Promise.resolve(null)}
                                        />
                                    </ChatBubbleMessage>
                                </ChatBubble>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto flex h-full max-w-3xl flex-col">
                {/* Scrollable Chat Content */}
                <div className="flex-1 overflow-y-auto px-2" style={{ paddingTop: `${headerHeight}px` }}>
                    <AnimatePresence mode="wait">
                        {isEmptyState ? (
                            <motion.div
                                key="landing"
                                className="flex min-h-full items-center justify-center"
                                {...MOTION_CONFIG}
                            >
                                <ChatLanding submitQuery={submitQuery} />
                            </motion.div>
                        ) : currentAIMessage ? (
                            <div className="pb-4">
                                <SimplifiedChatView
                                message={currentAIMessage}
                                isLoading={isLoading}
                                reload={reload}
                                addToolResult={({ toolCallId, result }) => 
                                    addToolResult({ tool: 'unknown', toolCallId, output: result })
                                }
                                />
                            </div>
                        ) : (
                            loadingSubmit && (
                                <motion.div
                                key="loading"
                                {...MOTION_CONFIG}
                                className="px-4 pt-18"
                                >
                                    <ChatBubble variant="received">
                                        <ChatBubbleMessage isLoading />
                                    </ChatBubble>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>

                {/* Fixed Bottom Bar - MODIFIED: Added dark mode support */}
                <div className="sticky bottom-0 bg-white dark:bg-gray-900 px-2 pt-3 md:px-0 md:pb-4">
                    <div className="relative flex flex-col items-center gap-3">
                        <HelperBoost submitQuery={submitQuery} setInput={setInput} />
                        <ChatBottombar
                        input={input}
                        handleInputChange={handleInputChange}
                        handleSubmit={onSubmit}
                        isLoading={isLoading}
                        stop={handleStop}
                        isToolInProgress={isToolInProgress}
                        />
                    </div>
                </div>
                <a
                href="https://linkedin.com/in/pranavas11/"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed right-3 bottom-0 z-10 mb-4 hidden cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm hover:underline md:block"
                >
                @pranavas11
                </a>
            </div>
        </div>
    );
};

export default Chat;