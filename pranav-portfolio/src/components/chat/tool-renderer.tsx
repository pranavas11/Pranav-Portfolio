// import { Contact } from '../contact';
// //import Crazy from '../crazy';
// import FullTimeCard from '../FullTimeCard';
// import { Intro } from '../Intro';
// import AllProjects from '../projects/AllProjects';
// import Resume from '../resume';
// import Skills from '../skills';

// interface ToolRendererProps {
//     toolInvocations: any[];
//     messageId: string;
// }

// export default function ToolRenderer({
//     toolInvocations,
//     messageId,
// }: ToolRendererProps) {
//     console.log('ToolRenderer - Tool invocations:', toolInvocations);

//     return (
//         <div className="w-full transition-all duration-300">
//             {toolInvocations.map((tool) => {
//                 const { toolCallId, toolName } = tool;

//                 // Return specialized components based on tool name
//                 switch (toolName) {
//                     case 'getProjects':
//                         return (
//                             <div key={toolCallId} className="w-full overflow-hidden rounded-lg">
//                                 <AllProjects />
//                             </div>
//                         );

//                     case 'getIntro':
//                         return (
//                             <div key={toolCallId} className="w-full overflow-hidden rounded-lg">
//                                 <Intro />
//                             </div>
//                         );

//                     case 'getResume':
//                         return (
//                             <div key={toolCallId} className="w-full rounded-lg">
//                                 <Resume />
//                             </div>
//                         );

//                     case 'getContact':
//                         return (
//                             <div key={toolCallId} className="w-full rounded-lg">
//                                 <Contact />
//                             </div>
//                         );

//                     case 'getSkills':
//                         return (
//                             <div key={toolCallId} className="w-full rounded-lg">
//                                 <Skills />
//                             </div>
//                         );

//                     // case 'getCrazy':
//                     //     return (
//                     //         <div key={toolCallId} className="w-full rounded-lg">
//                     //             <Crazy />
//                     //         </div>
//                     //     );

//                     case 'getFullTime':
//                         return (
//                             <div key={toolCallId} className="w-full rounded-lg">
//                                 <FullTimeCard />
//                             </div>
//                         );

//                     // Default renderer for other tools
//                     default:
//                         return (
//                             <div key={toolCallId} className="bg-secondary/10 w-full rounded-lg p-4">
//                                 <div className="mb-2 flex items-center justify-between">
//                                     <h3 className="text-lg font-medium">{toolName}</h3>
//                                     <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-100">
//                                         Tool Result
//                                     </span>
//                                 </div>
//                                 <div className="mt-2">
//                                     {typeof tool.result === 'object' ? (
//                                         <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-sm">
//                                             {JSON.stringify(tool.result, null, 2)}
//                                         </pre>
//                                     ) : (
//                                         <p>{String(tool.result)}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                 }
//             })}
//         </div>
//     );
// }









// src/components/chat/tool-renderer.tsx
import { Contact } from '../contact';
import FullTimeCard from '../FullTimeCard';
import { Intro } from '../Intro';
import AllProjects from '../projects/AllProjects';
import Resume from '../resume';
import Skills from '../skills';
import Personal from '../personal';

interface ToolRendererProps {
    toolInvocations: any[];
    messageId: string;
}

export default function ToolRenderer({
    toolInvocations,
    messageId,
}: ToolRendererProps) {
    console.log('ToolRenderer - Tool invocations:', toolInvocations);

    return (
        <div className="w-full transition-all duration-300">
            {toolInvocations.map((tool, index) => {
                console.log('ToolRenderer - Processing tool:', tool);
                
                // Extract tool information from different possible structures
                let toolName = '';
                let toolCallId = '';
                
                if (tool.type && tool.type.startsWith('tool-')) {
                    // Structure: { type: 'tool-getProjects', toolCallId, ... }
                    // Extract tool name from type by removing 'tool-' prefix
                    toolName = tool.type.replace('tool-', '');
                    toolCallId = tool.toolCallId || `tool-${index}`;
                } else if (tool.toolCallId && tool.toolName) {
                    // Structure: { toolCallId, toolName, ... }
                    toolCallId = tool.toolCallId;
                    toolName = tool.toolName;
                } else if (tool.toolCall) {
                    // Nested structure: { toolCall: { toolName, toolCallId } }
                    toolName = tool.toolCall.toolName;
                    toolCallId = tool.toolCall.toolCallId || tool.toolCall.id || `tool-${index}`;
                } else {
                    console.warn('ToolRenderer - Unknown tool structure:', tool);
                    toolName = 'unknown';
                    toolCallId = `tool-${index}`;
                }

                console.log('ToolRenderer - Extracted:', { toolName, toolCallId });

                // Return specialized components based on tool name
                switch (toolName) {
                    case 'getProjects':
                        return (
                            <div key={toolCallId} className="w-full overflow-hidden rounded-lg">
                                <AllProjects />
                            </div>
                        );
                        
                    case 'getIntro':
                        return (
                            <div key={toolCallId} className="w-full overflow-hidden rounded-lg">
                                <Intro />
                            </div>
                        );

                    case 'getResume':
                        return (
                            <div key={toolCallId} className="w-full rounded-lg">
                                <Resume />
                            </div>
                        );

                    case 'getContact':
                        return (
                            <div key={toolCallId} className="w-full rounded-lg">
                                <Contact />
                            </div>
                        );

                    case 'getSkills':
                        return (
                            <div key={toolCallId} className="w-full rounded-lg">
                                <Skills />
                            </div>
                        );

                    case 'getFullTime':
                        return (
                            <div key={toolCallId} className="w-full rounded-lg">
                                <FullTimeCard />
                            </div>
                        );

                    case 'getPersonal':
                        return (
                            <div key={toolCallId} className="w-full rounded-lg">
                                <Personal />
                            </div>
                        );

                    // Default renderer for debugging
                    default:
                        return (
                            <div key={toolCallId} className="bg-secondary/10 w-full rounded-lg p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h3 className="text-lg font-medium">
                                        Debug Tool: {toolName || 'Unknown'}
                                    </h3>
                                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                                        Unknown Tool
                                    </span>
                                </div>
                                <div className="mt-2">
                                    <pre className="bg-secondary/20 overflow-x-auto rounded p-3 text-xs">
                                        {JSON.stringify(tool, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        );
                }
            })}
        </div>
    );
}