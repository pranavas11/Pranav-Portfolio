import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
    description: 'This tool shows my contact information.',
    inputSchema: z.object({}),
    outputSchema: z.string(),  // optional but recommended
    execute: async () => {
        return "Above is my contact information. Feel free to contact me with any questions! 😉";
    },
});



// import { tool } from 'ai';
// import { z } from 'zod';

// export const getContact = tool({
//   description: 'This tool returns comprehensive contact information and project preferences for Pranav Prabhu.',
//   inputSchema: z.object({}),
//   execute: async () => {
//     return {
//       contactMethods: {
//         email: "ppranavas@gmail.com",
//         linkedin: "https://linkedin.com/in/pranavas11/",
//         github: "https://github.com/pranavas11",
//         location: "Virginia, USA"
//       },
//       projectPreferences: {
//         immediateYes: [
//           "AI-powered SaaS applications",
//           "Full-stack web applications using React/Next.js",
//           "Machine learning integration projects", 
//           "Blockchain and Web3 applications",
//           "Startup collaboration opportunities",
//           "Innovation-focused development work",
//           "Open-source contributions",
//         ],
//         technologies: [
//           "React/Next.js",
//           "Node.js", 
//           "Python",
//           "AI/ML frameworks",
//           "Cloud platforms",
//           "Blockchain technologies",
//           "Database management systems",
//         ],
//         workArrangements: [
//           "Remote collaboration",
//           "Project-based work",
//           "Startup partnerships",
//           "Innovation labs",
//           "Tech consulting"
//         ]
//       },
//       availability: {
//         status: "Open to new opportunities",
//         responseTime: "Usually responds within 24 hours",
//         meetingPreference: "Happy to hop on a call to discuss exciting projects"
//       },
//       idealProjects: [
//         "Projects that push the boundaries of what's possible with AI",
//         "SaaS products that solve real-world problems",
//         "Startups looking for technical co-founders or early employees",
//         "Companies building the next generation of web applications",
//         "Innovative tech solutions that leverage cutting-edge technologies"
//       ]
//     };
//   },
// });