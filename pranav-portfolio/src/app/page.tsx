'use client';

import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/ui/github-button';
import { GlobalThemeToggle } from '@/components/ui/global-theme-toggle';
import WelcomeModal from '@/components/welcome';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/* ---------- quick-question data ---------- */
const questions = {
  Me: 'Who are you? Tell me more about yourself.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: 'What are your hobbies?',
  Contact: 'How can I contact you?',
} as const;

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

/* ---------- component ---------- */
export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToChat = (query: string) => router.push(`/chat?query=${encodeURIComponent(query)}`);

  // Define an easing cubic-bezier tuple (typed) to satisfy Transition<Easing>.
  //const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

  /* hero animations (unchanged) */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      //transition: { type: 'ease', duration: 0.8 },
      //transition: { type: 'tween', duration: 0.8, ease: easeOutExpo },
      transition: { 
        type: 'tween' as const, 
        ease: 'easeOut' as const,
        duration: 0.8 
      },
    },
  };

  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      //transition: { type: 'ease', duration: 0.8, delay: 0.2 },
      //transition: { type: 'tween', duration: 0.8, delay: 0.2, ease: easeOutExpo },
      transition: { 
        type: 'tween' as const, 
        ease: 'easeOut' as const,
        duration: 0.8, 
        delay: 0.2 
      },
    },
  };

  useEffect(() => {
    // Preload chat assets (images and videos) in the background
    const img = new window.Image();
    img.src = '/icon.png';

    const linkWebm = document.createElement('link');
    linkWebm.rel = 'preload';
    linkWebm.as = 'video';
    linkWebm.href = '/memoji.webm';
    document.head.appendChild(linkWebm);

    const linkMp4 = document.createElement('link');
    linkMp4.rel = 'prefetch';
    linkMp4.as = 'video';
    linkMp4.href = '/memoji_ios.mp4';
    document.head.appendChild(linkMp4);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem] dark:from-neutral-400/10"
          style={{ marginBottom: '-2.5rem' }}
        >
          Pranav
        </div>
      </div>

      {/* Theme and GitHub buttons */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-3">
        <GlobalThemeToggle />
        <GithubButton
          //targetStars={68}
          animationDuration={1.5}
          label="Star"
          size={'sm'}
          repoUrl="https://github.com/pranavas11/Pranav-Portfolio"
        />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => goToChat('Are you looking for a full-time?')}
          className="relative flex cursor-pointer items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          {/* Green pulse dot */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          Looking for a talent?
        </button>
      </div>

      {/* header */}
      <motion.div
        className="z-1 mt-24 mb-8 flex flex-col items-center text-center md:mt-4 md:mb-12"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <WelcomeModal />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I'm Pranav! 👋
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome To My AI Portfolio! 😎
        </h1>
      </motion.div>

      {/* centre memoji */}
      <div className="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72">
        <Image
          src="/icon.png"
          alt="Hero memoji"
          width={2000}
          height={2000}
          priority
          className="translate-y-14 scale-[2] object-cover"
        />
      </div>

      {/* input + quick buttons */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="z-10 mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        {/* free-form questions */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) goToChat(input.trim());
          }}
          className="relative w-full max-w-lg"
        >
          <div className="mx-auto flex items-center rounded-full border border-neutral-200 bg-white/30 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="w-full border-none bg-transparent text-base text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Submit question"
              className="flex items-center justify-center rounded-full bg-[#0171E3] p-2.5 text-white transition-colors hover:bg-blue-600 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <ArrowRight  className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* quick-question grid */}
        <div className="mt-4 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {questionConfig.map(({ key, color, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => goToChat(questions[key])}
              variant="outline"
              className="border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 shadow-none backdrop-blur-lg active:scale-95 md:p-10"
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                <Icon size={25} strokeWidth={2} color={color} />
                <span className="text-xs font-medium sm:text-sm">{key}</span>
              </div>
            </Button>
          ))}
        </div>
      </motion.div>
      <FluidCursor />
    </div>
  );
}