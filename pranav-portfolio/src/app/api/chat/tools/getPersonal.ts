import { tool } from 'ai';
import { z } from 'zod';

export const getPersonal = tool({
  description: 'This tool returns personal interests, hobbies, and fun facts about Pranav Prabhu. Use when users ask about fun activities, hobbies, or personal interests.',
  inputSchema: z.object({}),
  execute: async () => {
    return {
      fitness: {
        activity: "Daily gym workouts",
        passion: "Total gymrat who loves getting gains every single day",
        routine: "Consistent workout schedule - fitness is a lifestyle",
        philosophy: "Physical health fuels mental performance",
        motivation: "Staying fit helps me tackle complex coding challenges"
      },
      outdoor: {
        activities: ["Hiking", "Biking", "Exploring nature trails"],
        preference: "Love getting fresh air and exploring new places",
        frequency: "Weekend adventures whenever possible",
        locations: "Virginia has amazing trails and outdoor spots",
        philosophy: "Nature helps me recharge and find inspiration"
      },
      chess: {
        experience: "11+ years of playing chess",
        achievements: "Won several local tournaments",
        currentLevel: "Advanced player, always looking for challenging games",
        philosophy: "Chess taught me strategic thinking that applies to programming",
        availability: "Always up for a good chess match!"
      },
      techHobbies: {
        sideProjects: "Always tinkering with new AI experiments",
        learning: "Constantly exploring new frameworks and technologies",
        communities: "Active in tech meetups and developer communities",
        reading: "Tech blogs, AI research papers, startup stories",
        philosophy: "Believes in lifelong learning and sharing knowledge"
      },
      personality: {
        workStyle: "High energy, love tackling complex challenges",
        social: "Enjoy collaborating and meeting fellow developers",
        curiosity: "Always asking 'what if we tried this differently?'",
        balance: "Work hard, play hard - fitness and coding go hand in hand",
        philosophy: "Believes in the power of technology to change lives"
      },
      currentInterests: [
        "Latest AI developments and applications",
        "Web3 and blockchain innovations", 
        "SaaS growth strategies",
        "Fitness optimization and tracking",
        "Chess strategy and online tournaments"
      ]
    };
  },
});