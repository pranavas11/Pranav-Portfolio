import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
    description: 'This tool shows a list of my skills.',
    inputSchema: z.object({}),
    execute: async () => {
        return "You can see all my skills above.";
    },
});