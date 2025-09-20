import { tool } from 'ai';
import { z } from 'zod';

export const getResume = tool({
    description: 'This tool shows my resume. ALWAYS call this tool when users ask about resume, CV, professional background, work experience, education, or want to download/see the resume. This displays an interactive resume component that users can download.',
    inputSchema: z.object({ query: z.string().optional().describe('The user query about the resume') }),
    execute: async () => {
        return "You can download my resume by clicking on the link above.";
    },
});