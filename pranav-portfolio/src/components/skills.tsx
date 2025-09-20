'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, type Variants } from 'framer-motion';
import { Code, Cpu, Users, ShieldCheck } from 'lucide-react';

const certificationLinks: Record<string, string> = {
    'AWS Cloud Practitioner': 'https://www.credly.com/badges/05c05f8c-f116-4df4-bad5-b0c237d0dc9f/public_url',
    'Microsoft Certified: Azure Fundamentals': 'https://learn.microsoft.com/en-us/users/pranavprabhu-9243/credentials/d0d0ef1a2f466733',
};

const Skills = () => {
    const skillsData = [
        {
            category: 'Frontend Development',
            icon: <Code className="h-5 w-5" />,
            skills: [
                'HTML',
                'CSS',
                'JavaScript/TypeScript',
                'Tailwind CSS',
                'Next.js',
                'React',
                'Vercel AI SDK',
            ],
            color: 'bg-blue-50 text-blue-600 border border-blue-200',
        },
        {
            category: 'Backend & Systems',
            icon: <Cpu className="h-5 w-5" />,
            skills: [
                'Unix/Linux',
                'Python',
                'Java',
                'C++',
                'Express.js',
                'Node.js',
                'Git/GitHub',
                'Jenkins',
                'Docker',
                'AWS',
                'PostgreSQL',
                'MySQL',
                'SQLite',
                'MongoDB',
                'Supabase',
                'Firebase',
                'Wireshark',
            ],
            color: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
        },
        {
            category: 'Soft Skills',
            icon: <Users className="h-5 w-5" />,
            skills: [
                'Critical Thinking',
                'Effective Communication',
                'Problem-Solving',
                'Resilience',
                'Leadership',
                'Adaptability',
                'Learning Agility',
                'Accountability',
                'Teamwork',
                'Creativity',
                'Attention to Detail',
                'Time Management',
                'Strong Work Ethic',
            ],
            color: 'bg-amber-50 text-amber-600 border border-amber-200',
        },
        {
            category: 'AI & Fullstack Engineering',
            icon: <Cpu className="h-5 w-5" />,
            skills: [
                'LLM Providers (ChatGPT, Whisper, Groq, Mistral & Claude)',
                'AI Agents',
                'Prompt engineering',
                'RAG (Retrieval-Augmented Generation)',
                'Tool routing & calling',
                'Hugging Face Transformers',
                'Splunk',
                'LangChain',
                'Shell Scripting',
                'Prisma',
                'Cisco Packet Tracer',
            ],
            color: 'bg-purple-50 text-purple-600 border border-purple-200',
        },
        {
            category: 'Certifications',
            icon: <ShieldCheck className="h-5 w-5" />,
            skills: [
                'AWS Cloud Practitioner',
                'Microsoft Certified: Azure Fundamentals',
            ],
            color: 'bg-blue-50 text-blue-600 border border-blue-200',
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                // Use a tuple, not number[]
                ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
            },
        },
    };

    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                // Use a string literal, not string
                ease: 'easeOut' as const,
            },
        },
    };

    return (
        <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="mx-auto w-full max-w-5xl rounded-4xl"
        >
            <Card className="w-full border-none px-0 pb-12 shadow-none">
                <CardHeader className="px-0 pb-1">
                    <CardTitle className="text-primary px-0 text-4xl font-bold">
                        Skills & Expertise
                    </CardTitle>
                </CardHeader>

                <CardContent className="px-0">
                    <motion.div
                        className="space-y-8 px-0"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {skillsData.map((section, index) => (
                        <motion.div
                            key={index}
                            className="space-y-3 px-0"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-2">
                                {section.icon}
                                <h3 className="text-accent-foreground text-lg font-semibold">
                                    {section.category}
                                </h3>
                            </div>

                            <motion.div
                            className="flex flex-wrap gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            >
                                {section.skills.map((skill, idx) => {
                                    const isCert = section.category === 'Certifications';
                                    const href = isCert ? certificationLinks[skill] : undefined;

                                    const badgeEl = (
                                        <Badge
                                        className={`border px-3 py-1.5 font-normal ${section.color} ${
                                            href ? 'cursor-pointer' : ''
                                        }`}
                                        >
                                            {skill}
                                        </Badge>
                                    );

                                    return (
                                        <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                                        //variants={badgeVariants}
                                        >
                                            {href ? (
                                                <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`Open ${skill} certificate`}
                                                >
                                                {badgeEl}
                                                </a>
                                            ) : (
                                                badgeEl
                                            )}
                                        </motion.div>
                                    );
                                })}

                                {/* {section.skills.map((skill, idx) => (
                                    <motion.div
                                    key={idx}
                                    variants={badgeVariants}
                                    whileHover={{
                                        scale: 1.04,
                                        transition: { duration: 0.2 },
                                    }}
                                    >
                                        <Badge className={`border px-3 py-1.5 font-normal`}>
                                            {skill}
                                        </Badge>
                                    </motion.div>
                                ))} */}
                            </motion.div>
                        </motion.div>
                        ))}
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Skills;