'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Added a trigger prop to accept custom triggers
interface WelcomeModalProps {
    trigger?: React.ReactNode;
}

export default function Welcome({ trigger }: WelcomeModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();   // Initialize the router with useRouter

    // Default trigger is the logo
    const defaultTrigger = (
        <Button
        variant="ghost"
        className="h-auto w-auto cursor-pointer rounded-2xl bg-white/30 p-3 shadow-lg backdrop-blur-lg hover:bg-white/60 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setIsOpen(true)}
        >
            <Image
                src="/og_brand.png"
                width={100}
                height={100}
                alt="Logo"
                className="w-6 md:w-9"
            />
            <span className="sr-only">About Pranav</span>
        </Button>
    );

    // Function that uses window.location to force a full reload
    const handleContactMe = () => {
        setIsOpen(false);
        // Force a full page reload with the query
        window.location.href = '/chat?query=How%20can%20I%20contact%20you%3F';
    };

    return (
        <>
        {/* Use custom trigger if provided, otherwise use default */}
        {trigger ? (
            <div onClick={() => setIsOpen(true)}>{trigger}</div>
        ) : (
            defaultTrigger
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-background z-52 max-h-[85vh] overflow-auto rounded-2xl border-none p-4 py-6 shadow-xl sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[1000px]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col"
                >
                    {/* Header */}
                    <DialogHeader className="relative flex flex-row items-start justify-between px-8 pt-8 pb-6">
                    <div>
                        <DialogTitle className="flex items-center gap-2 text-4xl font-bold tracking-tight">
                        Welcome To My AI Portfolio! 😎
                        </DialogTitle>
                        <DialogDescription className="mt-2 text-base">
                        {/*My interactive AI portfolio experience*/}
                        </DialogDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="sticky top-0 right-0 cursor-pointer rounded-full bg-black p-2 text-white hover:bg-black/90 hover:text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                    </DialogHeader>

                    {/* Content area */}
                    <div className="space-y-6 overflow-y-auto px-2 py-4 md:px-8">
                        <section className="bg-accent w-full space-y-8 rounded-2xl p-8">
                            {/* What section */}
                            <div className="space-y-3">
                                <h3 className="text-primary flex items-center gap-2 text-xl font-semibold">
                                    What is this?
                                </h3>
                                <p className="text-accent-foreground text-base leading-relaxed">
                                    I'm so excited to present my{' '}
                                    <strong>brand new AI Portfolio.</strong>
                                    It's me Pranav, but an AI version of myself! <br />
                                    Whether you're a recruiter, a friend, family member,
                                    or just curious, feel free to ask me anything about my
                                    work, skills, or even my personal interests.<br />
                                </p>
                            </div>

                            {/* Why section */}
                            <div className="space-y-3">
                                <h3 className="text-primary flex items-center gap-2 text-xl font-semibold">
                                    Why an AI portfolio???
                                </h3>
                                <p className="text-accent-foreground text-base leading-relaxed">
                                    Traditional portfolios, no matter how aesthetic they are. can be limiting and boring.<br />
                                    They can't adapt to every visitor's specific needs.<br />
                                    My AI portfolio is not just a portfolio,{' '}
                                    <strong>
                                    it's an AI version of myself offering an interactive experience to answer your questions.
                                    </strong>
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col items-center px-8 pt-4 pb-0 md:pb-8">
                        <Button
                            onClick={() => setIsOpen(false)}
                            className="h-auto rounded-full px-4 py-3"
                            size="sm"
                        >
                            Start Chatting
                        </Button>
                        <div
                            className="mt-6 flex cursor-pointer flex-wrap gap-1 text-center text-sm"
                            onClick={handleContactMe}
                        >
                            <p className="text-muted-foreground">
                                If you love it, please share it! Feedback is always welcome!
                            </p>
                            <div className="flex cursor-pointer items-center text-blue-500 hover:underline">
                                Contact me
                            </div>
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
        </>
    );
}