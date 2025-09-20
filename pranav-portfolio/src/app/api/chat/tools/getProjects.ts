import { tool } from "ai";
import { z } from "zod";

export const getProjects = tool({
    description: "This tool will show a list of all projects made by Pranav",
    inputSchema: z.object({}),
    execute: async () => {
        return "Here are all the projects made by Pranav (above). Hit me up to learn more about them or if you have any questions!";
    },
});