'use client';

import {
  ChatBubble,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import type { ChatRequestOptions, UIMessage, UIMessagePart, UIDataTypes, UITools } from 'ai';
import { motion } from 'framer-motion';
import ChatMessageContent from './chat-message-content';
import ToolRenderer from './tool-renderer';

interface SimplifiedChatViewProps {
    message: UIMessage;
    //message: UIMessage<UIDataTypes, UITools>;
    isLoading: boolean;
    reload: (
        chatRequestOptions?: ChatRequestOptions
    ) => Promise<string | null | undefined>;
    addToolResult?: (args: { toolCallId: string; result: string }) => void;
}

// Use a cubic-bezier array for `ease` to satisfy TS in all setups (this avoids the “string not assignable to Easing” error)
const MOTION_CONFIG = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: {
        duration: 0.3,
        //ease: 'easeOut',
        ease: 'easeOut' as const, // Use 'as const' to ensure it's treated as a string literal
        //ease: [0.17, 0.55, 0.55, 1] as [number, number, number, number],
    },
};

export function SimplifiedChatView({
    message,
    isLoading,
    reload,
    addToolResult,
}: SimplifiedChatViewProps) {
    if (message.role !== 'assistant') return null;

    console.log('SimplifiedChatView - Full message:', message);
    console.log('SimplifiedChatView - Message parts:', message.parts);

    // const toolParts = message.parts?.filter(
    //     (part: any) =>
    //       part.type.startsWith('tool-') &&
    //       'state' in part &&
    //       //part.state === 'result'
    //       part.state === 'output-available'
    //   ) || [];

    const toolParts = message.parts?.filter((part: any) => {
        const isToolPart = part.type && part.type.startsWith('tool-');
        const hasValidState = part.state && (
            part.state === 'result' || 
            part.state === 'output-available' || 
            part.state === 'done'
        );
        
        console.log('Tool part check:', {
            type: part.type,
            state: part.state,
            isToolPart,
            hasValidState,
            fullPart: part
        });
        
        return isToolPart && hasValidState;
    }) || [];

    // Only display the first tool (if any)
    const currentTool = toolParts.length > 0 ? [toolParts[0]] : [];

    // Get text content from text parts
    // const textParts = message.parts?.filter(
    //     (part: UIMessagePart<UIDataTypes, UITools>) => part.type === 'text'
    // ) || [];
    const textParts = message.parts?.filter(
        (part: any) => part.type === 'text'
      ) || [];
    
    const textContent = textParts
        //.map((part) => ('text' in part ? part.text : ''))
        .map((part: any) => part.text || '').join('');
    
    const hasTextContent = textContent.trim().length > 0;
    const hasTools = currentTool.length > 0;

    console.log('currentTool', currentTool);
    console.log('message.parts', message.parts);
    console.log('SimplifiedChatView - Analysis:', {
        toolPartsCount: toolParts.length,
        currentToolCount: currentTool.length,
        hasTextContent,
        hasTools,
        textContent: textContent.substring(0, 100) + '...'
    });

    return (
        <motion.div {...MOTION_CONFIG} className="flex h-full w-full flex-col px-4">
            {/* Single scrollable container for both tool and text content */}
            <div className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto">
                {/* Tool invocation result - displayed at the top */}
                {hasTools && (
                    <div className="mb-4 w-full">
                        <ToolRenderer
                        toolInvocations={currentTool}
                        messageId={message.id || 'current-msg'}
                        />
                    </div>
                )}

                {/* Text content */}
                {hasTextContent && (
                    <div className="w-full">
                        <ChatBubble variant="received" className="w-full">
                            <ChatBubbleMessage className="w-full">
                                <ChatMessageContent
                                message={message}
                                isLast={true}
                                isLoading={isLoading}
                                reload={reload}
                                addToolResult={addToolResult}
                                skipToolRendering={true}
                                />
                            </ChatBubbleMessage>
                        </ChatBubble>
                    </div>
                )}

                {/* Show loading state if we're still waiting for content */}
                {!hasTextContent && !hasTools && isLoading && (
                    <div className="w-full">
                        <ChatBubble variant="received" className="w-full">
                            <ChatBubbleMessage isLoading className="w-full" />
                        </ChatBubble>
                    </div>
                )}

                {/* Add some padding at the bottom for better scrolling experience */}
                <div className="pb-4"></div>
            </div>
        </motion.div>
    );
}