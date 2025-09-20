'use client';

import { motion, easeOut } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export function Intro() {
    // Personal information
    const profile = {
        name: 'Pranav Prabhu',
        age: '23 years old',
        location: 'Virginia, USA 🇺🇸',
        description:
        "Hey 👋\nI'm Pranav. I'm a Software Engineer at CloudWave in Virginia, US. I'm full-stack developer passionate about building truly innovative SaaS products specializing in AI. I'm passionate about AI/ML, SaaS, and Entrepreneurship.",
        src: '/pranav.jpg',
    };

    // Animation variants for text elements
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: easeOut },
        },
    };

    // Animation for the entire paragraph rather than word-by-word
    const paragraphAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut,
                delay: 0.2,
            },
        },
    };

    return (
        <div className="mx-auto w-full max-w-5xl py-6 font-sans">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                {/* Image section */}
                {/* <div className="relative mx-auto w-full max-w-sm aspect-square">
                <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-xl">
                    <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="h-full w-full"
                    >
                    <Image
                        src={profile.src}
                        alt={profile.name}
                        fill
                        sizes="(min-width: 768px) 24rem, 100vw"
                        className="object-cover"
                        style={{ objectPosition: '50% 5%' }} // tweak 10–30% as needed
                        priority
                    />
                    </motion.div>
                </div>
                </div> */}

                <div className="relative mx-auto w-full max-w-xs aspect-square">
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        className="rounded-3xl overflow-hidden"
                    >
                        <Image
                            src={profile.src}
                            alt={profile.name}
                            width={500}
                            height={700}
                            className="w-full h-auto"
                            priority
                        />
                    </motion.div>
                </div>


                {/* Text content section */}
                <div className="flex flex-col space-y">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={textVariants}
                    >
                        <h1 className="from-foreground to-muted-foreground bg-gradient-to-r bg-clip-text text-xl font-semibold text-transparent md:text-3xl">
                        {profile.name}
                        </h1>
                        <div className="mt-1 flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
                            <p className="text-muted-foreground">{profile.age}</p>
                            <div className="bg-border hidden h-1.5 w-1.5 rounded-full md:block" />
                            <p className="text-muted-foreground">{profile.location}</p>
                        </div>
                    </motion.div>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={paragraphAnimation}
                        className="text-foreground mt-6 leading-relaxed whitespace-pre-line"
                    >
                        {profile.description}
                    </motion.p>

                    {/* Tags/Keywords */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mt-4 flex flex-wrap gap-2"
                    >
                        {['ML Enthusiast', 'Software Developer', 'Full-Stack', 'Cloud Architect', 'SaaS Builder'].map(
                            (tag) => (
                                <span key={tag} className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                                    {tag}
                                </span>
                            )
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Intro;