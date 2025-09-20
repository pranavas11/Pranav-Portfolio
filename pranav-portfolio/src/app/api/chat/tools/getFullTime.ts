import { tool } from 'ai';
import { z } from 'zod';

export const getFullTime = tool({
    description: "Gives a summary of what kind of full-time I'm looking for plus my contact info for reaching out. Use this tool when the user asks about my full-time search or how to contact me for opportunities.",
    inputSchema: z.object({}),
    execute: async () => {
        return `Here’s what I’m looking for 👇
        - 📅 **Job-type**: Full-time role in Software Development (preferably on a focus enriching my skills in Cloud and AI/ML)
        - 🌍 **Location**: Preferably in **California** or **Washington** or anywhere in the **United States**
        - 🧑‍💻 **Focus**: AI development, full-stack web apps, cloud infrastructure, SaaS, agentic workflows
        - 🛠️ **Stack**: Python, React/Next.js, CSS, Docker, SQL, MERN, GPT, etc.
        - ✅ **What I bring**: Strong full-stack experience with knowledge of Cloud and AI technologies and a passion in tech
        - 🤝 **Looking for:** Collaborative teams where I can contribute meaningfully, grow alongside talented engineers, and help ship impactful products
        - 🔥 I move fast, learn faster, and I’m HUNGRYYYYY for big challenges!!!

        📬 **Contact me** via:
        - Email: ppranavas@gmail.com
        - LinkedIn: [linkedin.com/in/pranavas11](https://www.linkedin.com/in/pranavas11/)
        - GitHub: [github.com/pranavas11](https://github.com/pranavas11)

        Let's build cool stuff together!
    `;
    },
});