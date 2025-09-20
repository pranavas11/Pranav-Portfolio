import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
    // {
    //     title: 'Cosmo AI',
    //     description: 'Cosmo is an AI-powered interface that transforms complex blockchain interactions into simple, natural language commands. Whether you want to send tokens, stake assets, swap coins, or even create NFTs or liquidity pools, just tell Synto what to do — no manual wallet interactions, no technical jargon. One of my biggest projects yet',
    //     techStack: [
    //         'Next.js',
    //         'TailwindCSS',
    //         'Web3.js',
    //         'shadcn-ui',
    //         'TypeScript',
    //         'Phantom Wallet',
    //         'OpenAI API',
    //         'Vercel AI SDK',
    //         'Solana Agent kit',
    //         'Neon',
    //         'Prisma'
    //     ],
    //     date: '2025',
    //     links: [
    //         {
    //             name: 'Website',
    //             url: 'Coming Soon...',
    //         },
    //         {
    //             name: 'Launch Video',
    //             url: 'https://www.youtube.com/watch?v=4QUE2KgKDUw',
    //         },
    //         {
    //             name: 'X',
    //             url: 'https://x.com/chainSynto',
    //         },
    //         {
    //             name: 'Technical Video',
    //             url: 'https://www.youtube.com/watch?v=1CjBLKPUwtA&feature=youtu.be',
    //         },
    //         {
    //             name: 'Pitch Deck',
    //             url: 'https://drive.google.com/file/d/1B3m44mEgv81rJHfjNfTKi147yX4raQed/view?usp=sharing',
    //         },
    //         {
    //             name: 'Usage tutorial',
    //             url: 'https://www.youtube.com/watch?v=PRu1cfvT2bA',
    //         }
    //     ],
    //     images: [
    //         {
    //             src: '/cosmo1.png',
    //             alt: 'Synto landing page',
    //         },
    //         {
    //             src: '/cosmo2.png',
    //             alt: 'Synto chat interface',
    //         },
    //         {
    //             src: '/cosmo3.png',
    //             alt: 'Synto chat interface',
    //         },
    //         {
    //             src: '/cosmo4.png',
    //             alt: 'Synto chat interface',
    //         },
    //         {
    //             src: '/cosmo5.png',
    //             alt: 'Synto chat interface',
    //         },
    //         {
    //             src: '/cosmo6.png',
    //             alt: 'Synto chat interface',
    //         },
    //     ],
    // },
    {
        title: 'Bragi',
        description: "Bragi is a real-time audio advertisement recognition web app built with React.js, Python, and Bash scripting that uses a deep learning CNN model to detect ads in audio streams with high precision. It captures and analyzes both live and uploaded audio in real time, automatically adjusting volume levels during ads and providing visual detection feedback. Designed for platforms like Spotify and YouTube, Bragi is built with scalability in mind for future streaming platform integration.",
        techStack: ['Html', 'CSS', 'Javascript', 'ReactJS', 'Python', 'Bash Scripting'],
        date: '2024',
        links: [
            {
                name: 'website',
                url: 'https://bragi-ai.vercel.app/',
            },
            {
                name: 'github',
                url: 'https://github.com/pranavas11/Bragi',
            },
        ],
        images: [
            {
                src: '/bragi_preview.png',
                alt: 'Bragi Logo',
            },
            {
                src: '/bragi_predictions_graph.png',
                alt: 'Ad Predictions Graph',
            },
            {
                src: '/bragi_realtime_graph.png',
                alt: 'Realtime Ad Predictions Graph',
            },
        ],
    },
    {
        title: 'AutoDoc AI',
        description: "AutoDoc AI is a multi-agent system powered by large language models that automates in-code and external documentation, boosting developer productivity. Using LangChain, LangGraph, and Tree-Sitter, it parses and documents Python, JavaScript, and Swift codebases with precision. Its dynamic code analysis and iterative refinement ensure clear, consistent, and up-to-date documentation across the software lifecycle.",
        techStack: [
            'Python',
            'LangChain',
            'LangGraph',
            'Tree-Sitter',
            'OpenAI API',
            'JavaScript',
            'Swift',
            'Jupyter Notebooks',            
        ],
        date: '2024',
        links: [
            {
                name: 'github',
                url: 'https://github.com/pranavas11/AutoDoc-AI',
            },
            {
                name: 'Youtube Video',
                url: 'https://www.youtube.com/watch?v=N8VddvuwXcs&t=5s',
            }
        ],
        images: [
            {
                src: '/autodoc1.png',
                alt: 'AutoDoc Flowchart',
            },
            {
                src: '/autodoc2.png',
                alt: 'Code Documentation Example',
            },
            {
                src: '/autodoc3.png',
                alt: 'Markdown Documentation Example',
            },
        ],
    },
    {
        title: 'Automatic Video Captioner',
        description: 'Automatic Video Captioner is a web application that automatically generates captions for videos using AI. It uses OpenAI\'s Whisper model to transcribe audio and then generates captions in various languages. The app supports multiple video formats and provides an easy-to-use interface for users to upload videos and download caption files.',
        techStack: ['Python', 'OpenAI API', 'Jupyter Notebooks'],
        date: '2024',
        links: [
            {
                name: 'github',
                url: 'https://github.com/pranavas11/Automatic-Video-Captioning',
            },
        ],
        images: [
            {
                src: '/adc1.gif',
                alt: 'Automatic Video Captioner Demo',
            },
            {
                src: '/adc2.gif',
                alt: 'Automatic Video Captioner Demo',
            },
            {
                src: '/adc3.png',
                alt: 'Automatic Video Captioner Metrics',
            },
        ],
    },
    {
        title: 'Credit Card Fraud Detector',
        description: 'Credit Card Fraud Detector is a machine learning application that detects fraudulent transactions using a dataset of credit card transactions. It uses various algorithms to classify transactions as fraudulent or legitimate, providing insights into the effectiveness of different models.',
        techStack: ['Python', 'Jupyter Notebooks'],
        date: '2024',
        links: [
            {
                name: 'github',
                url: 'https://github.com/pranavas11/Credit-Card-Fraud-Detector',
            },
        ],
        images: [
            {
                src: '/ccfd1.png',
                alt: 'Credit Card Fraud Detector Model Accuracy & Loss',
            },
            {
                src: '/ccfd2.png',
                alt: 'ROC Curve',
            },
            {
                src: '/ccfd3.png',
                alt: 'Focal loss on oversampled data',
            },
        ],
    },
    // {
    //     title: 'Datai',
    //     description: "DATAI is an AI-powered agent that lets non-technical users query a database using natural language without writing SQL. Built using Next.js, TailwindCSS, shadcn-ui, and Anthropic's Claude API, this project focuses on simplicity, speed, and user-friendly design.",
    //     techStack: [
    //         'Next.js',
    //         'TailwindCSS',
    //         'shadcn-ui',
    //         'Claude API',
    //         'TypeScript',
    //     ],
    //     date: '2024',
    //     links: [
    //         {
    //             name: 'GitHub',
    //             url: 'https://github.com/toukoum/datai',
    //         },
    //         {
    //             name: 'Youtube Video Demo',
    //             url: 'https://youtu.be/iE0RXjdbQsw',
    //         }
    //     ],
    //     images: [
    //         {
    //             src: '/datai1.png',
    //             alt: 'Datai landing page',
    //         },
    //         {
    //             src: '/datai2.png',
    //             alt: 'Datai chatbot',
    //         },
    //         {
    //             src: '/datai3.png',
    //             alt: 'Datai chatbot',
    //         },
    //         {
    //             src: '/datai4.png',
    //             alt: 'Datai chatbot',
    //         }
    //     ],
    // },
    {
        title: 'Cryptoverse',
        description: "Cryptoverse is a dynamic cryptocurrency web application that provides comprehensive and up-to-date information about various cryptocurrencies. It features real-time price tracking, detailed coin information, and a user-friendly interface for exploring the crypto market.",
        techStack: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js'],
        date: '2024',
        links: [
            {
                name: 'website',
                url: 'https://cryptoverse-showcase.vercel.app/',
            },
            {
                name: 'GitHub',
                url: 'https://github.com/pranavas11/Cryptoverse',
            },
        ],
        images: [
            {
                src: '/cryptoverse1.png',
                alt: 'Cryptoverse landing page',
            },
            {
                src: '/cryptoverse2.png',
                alt: 'List of cryptocurrencies',
            },
            {
                src: '/cryptoverse3.png',
                alt: 'Cryptocurrency exchanges',
            },
            {
                src: '/cryptoverse4.png',
                alt: 'Cryptocurrency news',
            },
            {
                src: '/cryptoverse5.png',
                alt: 'Cryptocurrency details and graphs/trends',
            },
        ],
    },
    {
        title: 'VT Marketplace',
        description: 'VT Marketplace is a MERN stack–based online platform exclusive to the Virginia Tech community for local buying and selling, featuring secure authentication, real-time messaging, advanced search, and a seller analytics dashboard. It supports diverse product categories, ratings, reviews, and customizable user settings, creating a safe and interactive marketplace experience. The project earned third place for Best Overall Hackathon Project of the Year at Virginia Tech.',
        techStack: ['HTML', 'CSS', 'JavaScript', 'MongoDB', 'Express.js', 'React.js', 'Node.js'],
        date: '2023',
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/pranavas11/vt-marketplace',
            },
        ],
        images: [
            {
                src: '/vtm1.jpg',
                alt: 'VT Marketplace',
            },
        ],
    },
];

// Define interface for project prop
interface ProjectProps {
    title: string;
    description?: string;
    techStack?: string[];
    date?: string;
    links?: { name: string; url: string }[];
    images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
    // Find the matching project data
    const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

    if (!projectData) {
        return <div>Project details not available</div>;
    }

    return (
        <div className="space-y-10">
            {/* Header section with description */}
            <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <span>{projectData.date}</span>
                    </div>

                    <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
                        {projectData.description}
                    </p>

                    {/* Tech stack */}
                    <div className="pt-4">
                        <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {projectData.techStack.map((tech, index) => (
                                <span
                                key={index}
                                className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                                >
                                {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Links section */}
            {projectData.links && projectData.links.length > 0 && (
                <div className="mb-24">
                    <div className="px-6 mb-4 flex items-center gap-2">
                        <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
                            Links
                        </h3>
                        <Link className="text-muted-foreground w-4" />
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                        {projectData.links.map((link, index) => (
                            <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                            >
                            <span className="font-light capitalize">{link.name}</span>
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Images gallery */}
            {projectData.images && projectData.images.length > 0 && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        {projectData.images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-video overflow-hidden rounded-2xl"
                            >
                                <Image src={image.src} alt={image.alt} className="object-cover transition-transform" fill />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Main data export with updated content
export const data = [
    // {
    //     category: 'Startup Project',
    //     title: 'Cosmo AI',
    //     src: '/cosmopreview.png',
    //     content: <ProjectContent project={{ title: 'Synto' }} />,
    // },
    {
        category: 'Fun Tool',
        title: 'Bragi',
        src: '/bragi_logo.png',
        content: <ProjectContent project={{ title: 'Bragi' }} />,
    },
    {
        category: 'Fun ML Project',
        title: 'AutoDoc AI',
        src: '/autodoc_logo.png',
        content: <ProjectContent project={{ title: 'AutoDoc AI' }} />,
    },
    {
        category: 'Research Project',
        title: 'Automatic Video Captioner',
        src: '/adc_preview.png',
        content: <ProjectContent project={{ title: 'Automatic Video Captioner' }} />,
    },
    {
        category: 'Research Project',
        title: 'Credit Card Fraud Detector',
        src: '/ccfd_preview.jpg',
        content: <ProjectContent project={{ title: 'Credit Card Fraud Detector' }} />,
    },
    {
        category: 'Fun Project',
        title: 'Cryptoverse',
        src: '/cryptoverse_preview.jpg',
        content: <ProjectContent project={{ title: 'Cryptoverse' }} />,
    },
    {
        category: 'Hackathon Project',
        title: 'VT Marketplace',
        src: '/vt.png',
        content: <ProjectContent project={{ title: 'VT Marketplace' }} />,
    },
];