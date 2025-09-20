// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { cn } from '@/lib/utils';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@radix-ui/react-tooltip';
// import { motion } from 'framer-motion';
// import {
//   BriefcaseBusiness,
//   BriefcaseIcon,
//   ChevronDown,
//   ChevronRight,
//   ChevronUp,
//   CircleEllipsis,
//   CodeIcon,
//   GraduationCapIcon,
//   Laugh,
//   Layers,
//   MailIcon,
//   PartyPopper,
//   Sparkles,
//   UserRoundSearch,
//   UserSearch,
// } from 'lucide-react';
// import { useState } from 'react';
// import { Drawer } from 'vaul';

// interface HelperBoostProps {
//   submitQuery?: (query: string) => void;
//   setInput?: (value: string) => void;
// }

// const questions = {
//     Me: 'Who are you? I want to know more about you.',
//     Projects: 'What are your projects? What are you working on right now?',
//     Skills: 'What are your skills? Give me a list of your soft and hard skills.',
//     Fun: "What do you like to do for fun? What are your hobbies/interests? ",
//     Contact: 'How can I reach you? What kind of projects would make you say "yes" immediately?',
// };

// const questionConfig = [
//     { key: 'Me', color: '#329696', icon: Laugh },
//     { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
//     { key: 'Skills', color: '#856ED9', icon: Layers },
//     { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
//     { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
// ];

// // Helper drawer data
// const specialQuestions = [
//     'Who are you?',
//     'Can I see your resume?',
//     'What projects are you most proud of?',
//     'What are your skills?',
//     'How can I reach you?',
// ];

// const questionsByCategory = [
//     {
//         id: 'me',
//         name: 'Me',
//         icon: UserSearch,
//         questions: [
//             'Who are you?',
//             'What are your passions?',
//             'How did you get started in tech?',
//             'What are your strengths and weaknesses?',
//             'What are your long-term goals?',
//             'Tell me about a time you most successfully hacked some (non-computer) system to your advantage.',
//             'List any entrepreneurship programs, clubs, or hacker houses you have participated in or are currently participating in.',
//             'Tell me the most impressive thing that you have built or achieved.',
//             'Why did you decide to build an AI portfolio?',
//         ],
//     },
//     {
//         id: 'professional',
//         name: 'Professional',
//         icon: BriefcaseIcon,
//         questions: [
//             'Can I see your resume?',
//             'What is your work experience?',
//             'What makes you a valuable team member?',
//             'Where are you working now?',
//             'Why should I hire you?',
//             "What's your educational background?",
//             "Tell me about a time you failed or overcame a challenge.",
//             "Lonewolf or team player?",
//             "How do you set priorities or manage time?",
//             "Describe a time where you had to learn a new skill.",
//             "How do you deal with stressful situations?",
//             "What is your greatest achievement?",
//         ],
//     },
//     {
//         id: 'projects',
//         name: 'Projects',
//         icon: CodeIcon,
//         questions: ['Tell me about your projects. What projects are you most proud of?'],
//     },
//     {
//         id: 'skills',
//         name: 'Skills',
//         icon: GraduationCapIcon,
//         questions: [
//             'What are your skills?',
//             'How was your experience at CloudWave?',
//             'What new skills have you learned recently, and how did you go about learning them?',
//             'What is your favorite programming language and why?',
//             'How do you approach problem-solving in your work?',
//         ],
//     },
//     {
//         id: 'fun',
//         name: 'Fun',
//         icon: PartyPopper,
//         questions: [
//             'What’s a hobby or interest that helps you recharge outside of work?',
//             'Mac or PC?',
//             'What are you certain about that 90% get wrong?',
//         ],
//     },
//     {
//         id: 'contact',
//         name: 'Contact & Future',
//         icon: MailIcon,
//         questions: [
//             'How can I reach you?',
//             "What kind of project would make you say 'yes' immediately?",
//             'Where are you located?',
//         ],
//     },
// ];

// // Animated Chevron component
// const AnimatedChevron = () => {
//     return (
//         <motion.div
//         animate={{
//             y: [0, -4, 0], // Subtle up and down motion
//         }}
//         transition={{
//             duration: 1.5,
//             ease: 'easeInOut',
//             repeat: Infinity,
//             repeatType: 'loop',
//         }}
//         className="text-primary mb-1.5"
//         >
//             <ChevronUp size={16} />
//         </motion.div>
//     );
// };

// export default function HelperBoost({
//     submitQuery,
//     setInput,
// }: HelperBoostProps) {
//     const [isVisible, setIsVisible] = useState(true);
//     const [open, setOpen] = useState(false);

//     const handleQuestionClick = (questionKey: string) => {
//         if (submitQuery) {
//             submitQuery(questions[questionKey as keyof typeof questions]);
//         }
//     };

//     const handleDrawerQuestionClick = (question: string) => {
//         if (submitQuery) {
//             submitQuery(question);
//         }
//         setOpen(false);
//     };

//     const toggleVisibility = () => {
//         setIsVisible(!isVisible);
//     };

//     return (
//         <>
//             <Drawer.Root open={open} onOpenChange={setOpen}>
//                 <div className="w-full">
//                     {/* Toggle Button */}
//                     <div
//                         className={
//                         isVisible
//                             ? 'mb-2 flex justify-center'
//                             : 'mb-0 flex justify-center'
//                         }
//                     >
//                         <button
//                         onClick={toggleVisibility}
//                         className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700"
//                         >
//                         {isVisible ? (
//                             <>
//                             <ChevronDown size={14} />
//                             Hide quick questions
//                             </>
//                         ) : (
//                             <>
//                             <ChevronUp size={14} />
//                             Show quick questions
//                             </>
//                         )}
//                         </button>
//                     </div>

//                     {/* HelperBoost Content */}
//                     {isVisible && (
//                         <div className="w-full">
//                             <div
//                                 className="flex w-full flex-wrap gap-1 md:gap-3"
//                                 style={{ justifyContent: 'safe center' }}
//                             >
//                                 {questionConfig.map(({ key, color, icon: Icon }) => (
//                                 <Button
//                                     key={key}
//                                     onClick={() => handleQuestionClick(key)}
//                                     variant="outline"
//                                     className="border-border hover:bg-border/30 h-auto min-w-[100px] flex-shrink-0 cursor-pointer rounded-xl border bg-white/80 px-4 py-3 shadow-none backdrop-blur-sm transition-none active:scale-95"
//                                 >
//                                     <div className="flex items-center gap-3 text-gray-700">
//                                     <Icon size={18} strokeWidth={2} color={color} />
//                                     <span className="text-sm font-medium">{key}</span>
//                                     </div>
//                                 </Button>
//                                 ))}

//                                 {/* Need Inspiration Button */}
//                                 <TooltipProvider>
//                                     <Tooltip delayDuration={0}>
//                                         <TooltipTrigger asChild>
//                                             <Drawer.Trigger className="group relative flex flex-shrink-0 items-center justify-center">
//                                                 <motion.div
//                                                 className="hover:bg-border/30 flex h-auto cursor-pointer items-center space-x-1 rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900"
//                                                 whileHover={{ scale: 1 }}
//                                                 whileTap={{ scale: 0.98 }}
//                                                 >
//                                                 <div className="flex items-center gap-3 text-gray-700">
//                                                     <CircleEllipsis
//                                                     className="h-[20px] w-[18px]"
//                                                     //style={{ color: '#3B82F6' }}
//                                                     strokeWidth={2}
//                                                     />
//                                                     {/*<span className="text-sm font-medium">More</span>*/}
//                                                 </div>
//                                                 </motion.div>
//                                             </Drawer.Trigger>
//                                         </TooltipTrigger>
//                                         <TooltipContent>
//                                             <AnimatedChevron />
//                                         </TooltipContent>
//                                     </Tooltip>
//                                 </TooltipProvider>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Drawer Content */}
//                 <Drawer.Portal>
//                     <Drawer.Overlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs" />
//                     <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-gray-100 outline-none lg:h-[60%]">
//                         <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-white p-4">
//                             <div className="mx-auto max-w-md space-y-4">
//                                 <div
//                                 aria-hidden
//                                 className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
//                                 />
//                                 <div className="mx-auto w-full max-w-md">
//                                     <div className="space-y-8 pb-16">
//                                         {questionsByCategory.map((category) => (
//                                         <CategorySection
//                                             key={category.id}
//                                             name={category.name}
//                                             Icon={category.icon}
//                                             questions={category.questions}
//                                             onQuestionClick={handleDrawerQuestionClick}
//                                         />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </Drawer.Content>
//                 </Drawer.Portal>
//             </Drawer.Root>
//         </>
//     );
// }

// // Component for each category section
// interface CategorySectionProps {
//     name: string;
//     Icon: React.ElementType;
//     questions: string[];
//     onQuestionClick: (question: string) => void;
// }

// function CategorySection({
//     name,
//     Icon,
//     questions,
//     onQuestionClick,
// }: CategorySectionProps) {
//     return (
//         <div className="space-y-3">
//             <div className="flex items-center gap-2.5 px-1">
//                 <Icon className="h-5 w-5" />
//                 <Drawer.Title className="text-[22px] font-medium text-gray-900">
//                 {name}
//                 </Drawer.Title>
//             </div>

//             <Separator className="my-4" />

//             <div className="space-y-3">
//                 {questions.map((question, index) => (
//                 <QuestionItem
//                     key={index}
//                     question={question}
//                     onClick={() => onQuestionClick(question)}
//                     isSpecial={specialQuestions.includes(question)}
//                 />
//                 ))}
//             </div>
//         </div>
//     );
// }

// // Component for each question item with animated chevron
// interface QuestionItemProps {
//     question: string;
//     onClick: () => void;
//     isSpecial: boolean;
// }

// function QuestionItem({ question, onClick, isSpecial }: QuestionItemProps) {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <motion.button
//         className={cn(
//             'flex w-full items-center justify-between rounded-[10px]',
//             'text-md px-6 py-4 text-left font-normal',
//             'transition-all',
//             'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
//             isSpecial ? 'bg-black' : 'bg-[#F7F8F9]'
//         )}
//         onClick={onClick}
//         onHoverStart={() => setIsHovered(true)}
//         onHoverEnd={() => setIsHovered(false)}
//         whileHover={{
//             backgroundColor: isSpecial ? undefined : '#F0F0F2',
//         }}
//         whileTap={{
//             scale: 0.98,
//             backgroundColor: isSpecial ? undefined : '#E8E8EA',
//         }}
//         >
//             <div className="flex items-center">
//                 {isSpecial && <Sparkles className="mr-2 h-4 w-4 text-white" />}
//                 <span className={isSpecial ? 'font-medium text-white' : ''}>
//                 {question}
//                 </span>
//             </div>
//             <motion.div
//                 animate={{ x: isHovered ? 4 : 0 }}
//                 transition={{
//                 type: 'spring',
//                 stiffness: 400,
//                 damping: 25,
//                 }}
//             >
//                 <ChevronRight
//                 className={cn(
//                     'h-5 w-5 shrink-0',
//                     isSpecial ? 'text-white' : 'text-primary'
//                 )}
//                 />
//             </motion.div>
//         </motion.button>
//     );
// }













import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleEllipsis,
  CodeIcon,
  GraduationCapIcon,
  Laugh,
  Layers,
  MailIcon,
  PartyPopper,
  Sparkles,
  UserRoundSearch,
  UserSearch,
} from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
  setInput?: (value: string) => void;
}

const questions = {
    Me: 'Who are you? I want to know more about you.',
    Projects: 'What are your projects? What are you working on right now?',
    Skills: 'What are your skills? Give me a list of your soft and hard skills.',
    Fun: "What do you like to do for fun? What are your hobbies/interests? ",
    Contact: 'How can I reach you? What kind of projects would make you say "yes" immediately?',
};

const questionConfig = [
    { key: 'Me', color: '#329696', icon: Laugh },
    { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
    { key: 'Skills', color: '#856ED9', icon: Layers },
    { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
    { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
];

// Helper drawer data
const specialQuestions = [
    'Who are you?',
    'Can I see your resume?',
    'What projects are you most proud of?',
    'What are your skills?',
    'How can I reach you?',
];

const questionsByCategory = [
    {
        id: 'me',
        name: 'Me',
        icon: UserSearch,
        questions: [
            'Who are you?',
            'What are your passions?',
            'How did you get started in tech?',
            'What are your strengths and weaknesses?',
            'What are your long-term goals?',
            'Tell me about a time you most successfully hacked some (non-computer) system to your advantage.',
            'List any entrepreneurship programs, clubs, or hacker houses you have participated in or are currently participating in.',
            'Tell me the most impressive thing that you have built or achieved.',
            'Why did you decide to build an AI portfolio?',
        ],
    },
    {
        id: 'professional',
        name: 'Professional',
        icon: BriefcaseIcon,
        questions: [
            'Can I see your resume?',
            'What is your work experience?',
            'What makes you a valuable team member?',
            'Where are you working now?',
            'Why should I hire you?',
            "What's your educational background?",
            "Tell me about a time you failed or overcame a challenge.",
            "Lonewolf or team player?",
            "How do you set priorities or manage time?",
            "Describe a time where you had to learn a new skill.",
            "How do you deal with stressful situations?",
            "What is your greatest achievement?",
        ],
    },
    {
        id: 'projects',
        name: 'Projects',
        icon: CodeIcon,
        questions: ['Tell me about your projects. What projects are you most proud of?'],
    },
    {
        id: 'skills',
        name: 'Skills',
        icon: GraduationCapIcon,
        questions: [
            'What are your skills?',
            'How was your experience at CloudWave?',
            'What new skills have you learned recently, and how did you go about learning them?',
            'What is your favorite programming language and why?',
            'How do you approach problem-solving in your work?',
        ],
    },
    {
        id: 'fun',
        name: 'Fun',
        icon: PartyPopper,
        questions: [
            'What is a hobby or interest that helps you recharge outside of work?',
            'Mac or PC?',
            'What are you certain about that 90% get wrong?',
        ],
    },
    {
        id: 'contact',
        name: 'Contact & Future',
        icon: MailIcon,
        questions: [
            'How can I reach you?',
            "What kind of project would make you say 'yes' immediately?",
            'Where are you located?',
        ],
    },
];

// Animated Chevron component
const AnimatedChevron = () => {
    return (
        <motion.div
        animate={{
            y: [0, -4, 0], // Subtle up and down motion
        }}
        transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
        }}
        className="text-primary mb-1.5"
        >
            <ChevronUp size={16} />
        </motion.div>
    );
};

export default function HelperBoost({
    submitQuery,
    setInput,
}: HelperBoostProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [open, setOpen] = useState(false);

    const handleQuestionClick = (questionKey: string) => {
        if (submitQuery) {
            submitQuery(questions[questionKey as keyof typeof questions]);
        }
    };

    const handleDrawerQuestionClick = (question: string) => {
        if (submitQuery) {
            submitQuery(question);
        }
        setOpen(false);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <Drawer.Root open={open} onOpenChange={setOpen}>
                <div className="w-full">
                    {/* Toggle Button */}
                    <div
                        className={
                        isVisible
                            ? 'mb-2 flex justify-center'
                            : 'mb-0 flex justify-center'
                        }
                    >
                        <button
                        onClick={toggleVisibility}
                        className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" // MODIFIED: Added dark mode text colors
                        >
                        {isVisible ? (
                            <>
                            <ChevronDown size={14} />
                            Hide quick questions
                            </>
                        ) : (
                            <>
                            <ChevronUp size={14} />
                            Show quick questions
                            </>
                        )}
                        </button>
                    </div>

                    {/* HelperBoost Content */}
                    {isVisible && (
                        <div className="w-full">
                            <div
                                className="flex w-full flex-wrap gap-1 md:gap-3"
                                style={{ justifyContent: 'safe center' }}
                            >
                                {questionConfig.map(({ key, color, icon: Icon }) => (
                                <Button
                                    key={key}
                                    onClick={() => handleQuestionClick(key)}
                                    variant="outline"
                                    className="border-border hover:bg-border/30 h-auto min-w-[100px] flex-shrink-0 cursor-pointer rounded-xl border bg-white/80 px-4 py-3 shadow-none backdrop-blur-sm transition-none active:scale-95 dark:border-neutral-700 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/50" // MODIFIED: Added dark mode background and border colors
                                >
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300"> {/* MODIFIED: Added dark mode text color */}
                                    <Icon size={18} strokeWidth={2} color={color} />
                                    <span className="text-sm font-medium">{key}</span>
                                    </div>
                                </Button>
                                ))}

                                {/* Need Inspiration Button */}
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Drawer.Trigger className="group relative flex flex-shrink-0 items-center justify-center">
                                                <motion.div
                                                className="hover:bg-border/30 flex h-auto cursor-pointer items-center space-x-1 rounded-xl border border-neutral-200 bg-white/80 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-200 dark:border-neutral-700 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/50" // MODIFIED: Added dark mode background, border, and hover colors
                                                whileHover={{ scale: 1 }}
                                                whileTap={{ scale: 0.98 }}
                                                >
                                                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300"> {/* MODIFIED: Added dark mode text color */}
                                                    <CircleEllipsis
                                                    className="h-[20px] w-[18px]"
                                                    //style={{ color: '#3B82F6' }}
                                                    strokeWidth={2}
                                                    />
                                                    {/*<span className="text-sm font-medium">More</span>*/}
                                                </div>
                                                </motion.div>
                                            </Drawer.Trigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <AnimatedChevron />
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    )}
                </div>

                {/* Drawer Content */}
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs" />
                    <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-gray-100 dark:bg-neutral-900 outline-none lg:h-[60%]"> {/* MODIFIED: Added dark mode background */}
                        <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-white dark:bg-neutral-900 p-4"> {/* MODIFIED: Added dark mode background */}
                            <div className="mx-auto max-w-md space-y-4">
                                <div
                                aria-hidden
                                className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300 dark:bg-neutral-600" // MODIFIED: Added dark mode color for the drag handle
                                />
                                <div className="mx-auto w-full max-w-md">
                                    <div className="space-y-8 pb-16">
                                        {questionsByCategory.map((category) => (
                                        <CategorySection
                                            key={category.id}
                                            name={category.name}
                                            Icon={category.icon}
                                            questions={category.questions}
                                            onQuestionClick={handleDrawerQuestionClick}
                                        />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </>
    );
}

// Component for each category section
interface CategorySectionProps {
    name: string;
    Icon: React.ElementType;
    questions: string[];
    onQuestionClick: (question: string) => void;
}

function CategorySection({
    name,
    Icon,
    questions,
    onQuestionClick,
}: CategorySectionProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2.5 px-1">
                <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" /> {/* MODIFIED: Added dark mode text color */}
                <Drawer.Title className="text-[22px] font-medium text-gray-900 dark:text-gray-100"> {/* MODIFIED: Added dark mode text color */}
                {name}
                </Drawer.Title>
            </div>

            <Separator className="my-4 bg-gray-200 dark:bg-neutral-700" /> {/* MODIFIED: Added dark mode color */}

            <div className="space-y-3">
                {questions.map((question, index) => (
                <QuestionItem
                    key={index}
                    question={question}
                    onClick={() => onQuestionClick(question)}
                    isSpecial={specialQuestions.includes(question)}
                />
                ))}
            </div>
        </div>
    );
}

// Component for each question item with animated chevron
interface QuestionItemProps {
    question: string;
    onClick: () => void;
    isSpecial: boolean;
}

function QuestionItem({ question, onClick, isSpecial }: QuestionItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.button
        className={cn(
            'flex w-full items-center justify-between rounded-[10px]',
            'text-md px-6 py-4 text-left font-normal',
            'transition-all',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            isSpecial 
                ? 'bg-black dark:bg-blue-900' // MODIFIED: Added dark mode special question background
                : 'bg-[#F7F8F9] dark:bg-neutral-800' // MODIFIED: Added dark mode normal question background
        )}
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
            backgroundColor: isSpecial ? undefined : undefined, // Let CSS handle hover colors
        }}
        whileTap={{
            scale: 0.98,
            backgroundColor: isSpecial ? undefined : undefined, // Let CSS handle tap colors
        }}
        style={{
            // MODIFIED: Added hover styles for better dark mode support
            ...(isHovered && !isSpecial && {
                backgroundColor: 'var(--hover-bg, #F0F0F2)',
            }),
        }}
        onMouseEnter={(e) => {
            if (!isSpecial) {
                e.currentTarget.style.setProperty('--hover-bg', 
                    document.documentElement.classList.contains('dark') ? '#404040' : '#F0F0F2'
                );
            }
        }}
        >
            <div className="flex items-center">
                {isSpecial && <Sparkles className="mr-2 h-4 w-4 text-white" />}
                <span className={isSpecial ? 'font-medium text-white' : 'text-gray-900 dark:text-gray-100'}> {/* MODIFIED: Added dark mode text color for normal questions */}
                {question}
                </span>
            </div>
            <motion.div
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
                }}
            >
                <ChevronRight
                className={cn(
                    'h-5 w-5 shrink-0',
                    isSpecial ? 'text-white' : 'text-primary dark:text-blue-400' // MODIFIED: Added dark mode color for chevron
                )}
                />
            </motion.div>
        </motion.button>
    );
}