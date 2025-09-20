// import { tool } from 'ai';
// import { z } from 'zod';

// export const getIntro = tool({
//     description: 'This tool returns a concise personal introduction of Pranav Prabhu. It is used to answer questions like "Who are you?" or "Tell me about yourself."',
//     inputSchema: z.object({}),
//     execute: async () => {
//         return {
//             intro: "Here's my introduction displayed above! I'm Pranav Prabhu, a 23-year-old Software Engineer at CloudWave in Virginia, US. I'm a full-stack developer passionate about building truly innovative SaaS products specializing in AI. I'm passionate about AI/ML, SaaS, and Entrepreneurship.",
//         };
//     },
// });


import { tool } from 'ai';
import { z } from 'zod';

export const getIntro = tool({
    description: 'This tool returns comprehensive personal information about Pranav Prabhu. Use this when users ask about who he is, his background, interests, or want a general introduction.',
    inputSchema: z.object({}),
    execute: async () => {
        return {
            intro: "Here's my introduction displayed above! I'm Pranav Prabhu, a 23-year-old Software Engineer at CloudWave in Virginia, US. I'm a full-stack developer passionate about building truly innovative SaaS products specializing in AI. I'm passionate about AI/ML, SaaS, and Entrepreneurship.",
            // personalInfo: {
            //     name: "Pranav Prabhu",
            //     age: 23,
            //     location: "Virginia, USA",
            //     currentRole: "Software Engineer at CloudWave",
            //     education: "Virginia Tech alum"
            // },
            // background: {
            //     experience: "Full-stack web developer specializing in AI",
            //     passions: ["AI/ML", "SaaS development", "Blockchain", "Entrepreneurship"],
            //     workStyle: "Building truly innovative SaaS products that solve real problems"
            // },
            // personalityTraits: [
            //     "Passionate about cutting-edge technology",
            //     "Loves building products that make a difference", 
            //     "Always learning new technologies",
            //     "Enjoys collaborating on innovative projects",
            //     "Believes in the power of AI to transform industries"
            // ],
            // currentFocus: "Working on AI-powered SaaS solutions and exploring the intersection of technology and entrepreneurship",
            // funFacts: [
            //     "Transitioned from academic studies to hands-on industry work",
            //     "Believes in the power of AI to transform how we work and live",
            //     "Always excited to discuss the latest tech trends and startup ideas"
            // ],
            // availability: "Open to discussing exciting projects and collaboration opportunities"
        };
    },
});