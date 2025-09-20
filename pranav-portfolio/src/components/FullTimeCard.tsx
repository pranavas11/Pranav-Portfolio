'use client';

import { motion } from 'framer-motion';
import { Code2, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FullTimeCard = () => {
    const openMail = () => {
        window.open('mailto:ppranavas@gmail.com', '_blank');
    };
    
    const router = useRouter();

    return (
        <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
        >
        
        {/* Header */}
        <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="bg-muted h-16 w-16 overflow-hidden rounded-full shadow-md">
                    <img
                    src="/pranav.jpg"
                    alt="Pranav's avatar"
                    className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-foreground text-2xl font-semibold">
                    Pranav Prabhu
                    </h2>
                    <p className="text-muted-foreground text-sm">
                    Full-Time Application
                    </p>
                </div>
            </div>

            {/* Live badge */}
            <div className="mt-4 flex items-center gap-2 sm:mt-0">
                <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
                    <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    Live
                </span>
            </div>
        </div>

        {/* Full-time Info */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
                <span className="mt-1 h-5 w-5 text-blue-500">📈</span>
                <div>
                    <p className="text-foreground text-sm font-medium">Career Goal</p>
                    <p className="text-muted-foreground text-sm">
                    Long-term full-time role in cutting-edge software development — with a focus on AI/ML, cloud systems, and shipping real-world impact at scale!
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-3">
                <Globe className="mt-1 h-5 w-5 text-green-500" />
                <div>
                    <p className="text-foreground text-sm font-medium">Location</p>
                    <p className="text-muted-foreground text-sm">
                    Preferably in California or Washington, but open to relocation anywhere in the US 🇺🇸
                    </p>
                </div>
            </div>

            {/* Tech stack */}
            <div className="flex items-start gap-3 sm:col-span-2">
                <Code2 className="mt-1 h-5 w-5 text-purple-500" />
                <div className="w-full">
                    <p className="text-foreground text-sm font-medium">Tech stack</p>
                    <div className="text-muted-foreground grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
                        <ul className="decoration-none list-disc pl-4">
                            <li>Python, Java, React.js, Next.js, HTML/CSS</li>
                            <li>MySQL, SQLite, SQL Server, MongoDB</li>
                            <li>Docker, Jenkins, AWS</li>
                            <li>Vercel AI SDK, Supabase, Firebase</li>
                            <li>OpenAI, Mistral, Claude, Whisper</li>
                        </ul>
                        <ul className="list-disc pl-4">
                            <li>Linux (Debian, Ubuntu, Fedora)</li>
                            <li>R, Express.js, Node.js, Git/GitHub</li>
                            <li>Pandas, NumPy, Scikit-Learn</li>
                            <li>OpenVPN, Cisco Packet Tracer, Wireshark</li>
                            <li>Hackathons + AI agent workflows</li>
                            <li>
                                <a
                                    href="/chat?query=What%20are%20your%20skills%3F%20Give%20me%20a%20list%20of%20your%20soft%20and%20hard%20skills."
                                    className="cursor-pointer items-center text-blue-500 underline"
                                >
                                    See more
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* What I bring */}
        <div className="mt-10">
            <p className="text-foreground mb-2 text-lg font-semibold">
            What I bring
            </p>
            <p className="text-foreground text-sm">
            1+ years of real-world software dev experience from GSA.<br />
            SaaS app builder, AI researcher and enthusiast, and 1x hackathon win (VT Marketplace).<br />
            I ship fast, and lovebuilding useful things that actually work.
            </p>
        </div>

        {/* Goal */}
        <div className="mt-8">
            <p className="text-foreground mb-2 text-lg font-semibold">Goal</p>
            <p className="text-foreground text-sm">
            Join a bold and innovative team building AI-powered tools that matter. I want to learn more, improve fast, contribute hard, and leave an impression! I’m fast, flexible, and HUNGRYYYYY to learn and thrive! 🔥
            </p>
        </div>

        {/* Contact button */}
        <div className="mt-10 flex justify-center">
            <button
            onClick={openMail}
            className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800"
            >
            Contact me
            </button>
        </div>
        </motion.div>
    );
};

export default FullTimeCard;