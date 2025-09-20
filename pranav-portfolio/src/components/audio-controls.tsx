// // components/audio-controls.tsx
// 'use client';

// import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAudio } from '@/hooks/use-audio';

// export function AudioControls() {
//   const { isPlaying, isMuted, isLoaded, togglePlayPause, toggleMute } = useAudio();
  
//   if (!isLoaded) {
//     return null; // Don't show controls until audio is loaded
//   }
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ delay: 1, duration: 0.5 }}
//       className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
//     >
//       {/* Mute/Unmute Button */}
//       <Button
//         onClick={toggleMute}
//         size="sm"
//         variant="outline"
//         className="h-12 w-12 rounded-full border bg-white/30 p-0 shadow-lg backdrop-blur-lg transition-all hover:bg-white/40 dark:border-white/20 dark:bg-black/30 dark:hover:bg-black/40"
//         aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
//       >
//         <AnimatePresence mode="wait">
//           {isMuted ? (
//             <motion.div
//               key="muted"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.3 }}
//             >
//               <VolumeX className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="unmuted"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </Button>
      
//       {/* Play/Pause Button (Optional - mainly for debugging or manual control) */}
//       <Button
//         onClick={togglePlayPause}
//         size="sm"
//         variant="outline"
//         className="h-12 w-12 rounded-full border bg-white/30 p-0 shadow-lg backdrop-blur-lg transition-all hover:bg-white/40 dark:border-white/20 dark:bg-black/30 dark:hover:bg-black/40"
//         aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
//       >
//         <AnimatePresence mode="wait">
//           {isPlaying ? (
//             <motion.div
//               key="pause"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Pause className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="play"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Play className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </Button>
      
//       {/* Floating music note indicator */}
//       <AnimatePresence>
//         {isPlaying && !isMuted && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="absolute -top-12 left-1/2 -translate-x-1/2 transform"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -5, 0],
//                 scale: [1, 1.1, 1],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="text-xl"
//             >
//               🎵
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

















// components/audio-controls.tsx
// 'use client';

// import { Volume2, VolumeX } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAudio } from '@/hooks/use-audio';

// export function AudioControls() {
//   const { isPlaying, isMuted, isLoaded, toggleMute } = useAudio();
  
//   if (!isLoaded) {
//     return null; // Don't show controls until audio is loaded
//   }
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8, x: -20 }}
//       animate={{ opacity: 1, scale: 1, x: 0 }}
//       transition={{ delay: 1, duration: 0.5 }}
//       className="fixed bottom-6 left-6 z-50"
//     >
//       {/* Single Mute/Unmute Button */}
//       <Button
//         onClick={toggleMute}
//         size="sm"
//         variant="outline"
//         className="h-14 w-14 rounded-full border bg-white/30 p-0 shadow-xl backdrop-blur-lg transition-all hover:bg-white/50 hover:scale-110 dark:border-white/20 dark:bg-black/30 dark:hover:bg-black/40"
//         aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
//       >
//         <AnimatePresence mode="wait">
//           {isMuted ? (
//             <motion.div
//               key="muted"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.3 }}
//             >
//               <VolumeX className="h-6 w-6 text-red-500 dark:text-red-400" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="unmuted"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Volume2 className="h-6 w-6 text-blue-500 dark:text-blue-400" />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </Button>
      
//       {/* Floating music note indicator */}
//       <AnimatePresence>
//         {isPlaying && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, x: 10 }}
//             animate={{ opacity: 1, y: 0, x: 0 }}
//             exit={{ opacity: 0, y: -10, x: -10 }}
//             className="absolute -top-12 left-1/2 -translate-x-1/2 transform"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -8, 0],
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 10, -10, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="text-2xl filter drop-shadow-lg"
//             >
//               🎵
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* Subtle pulsing ring when playing */}
//       <AnimatePresence>
//         {isPlaying && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="absolute inset-0 -z-10"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.3, 0.1, 0.3],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="h-full w-full rounded-full bg-blue-400 dark:bg-blue-500"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }






// components/audio-controls.tsx
// 'use client';

// import { Volume2, VolumeX, Play } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAudio } from '@/hooks/use-audio';

// export function AudioControls() {
//   const { isPlaying, isMuted, isLoaded, showPlayPrompt, toggleMute } = useAudio();
  
//   if (!isLoaded) {
//     return null; // Don't show controls until audio is loaded
//   }
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8, x: -20 }}
//       animate={{ opacity: 1, scale: 1, x: 0 }}
//       transition={{ delay: 1, duration: 0.5 }}
//       className="fixed bottom-8 left-6 z-50"
//     >
//       {/* Play Prompt for First-Time Users */}
//       <AnimatePresence>
//         {showPlayPrompt && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -20, scale: 0.9 }}
//             className="absolute -top-16 left-1/2 -translate-x-1/2 transform"
//           >
//             <div className="relative rounded-lg bg-black/80 px-3 py-2 text-sm text-white shadow-lg backdrop-blur-sm">
//               <div className="flex items-center gap-2">
//                 <Play className="h-4 w-4" />
//                 <span>Click anywhere to start ambient music</span>
//               </div>
//               {/* Arrow pointing down */}
//               <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black/80"></div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Single Mute/Unmute Button */}
//       <Button
//         onClick={toggleMute}
//         size="sm"
//         variant="outline"
//         className={`h-14 w-14 rounded-full border p-0 shadow-xl backdrop-blur-lg transition-all hover:scale-110 ${
//           showPlayPrompt 
//             ? 'animate-pulse bg-yellow-100/90 border-yellow-300 hover:bg-yellow-200/90 dark:bg-yellow-900/80 dark:border-yellow-600 dark:hover:bg-yellow-800/90' 
//             : 'bg-white/30 hover:bg-white/50 dark:border-white/20 dark:bg-black/30 dark:hover:bg-black/40'
//         }`}
//         aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
//       >
//         <AnimatePresence mode="wait">
//           {isMuted ? (
//             <motion.div
//               key="muted"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.3 }}
//             >
//               <VolumeX className="h-6 w-6 text-red-500 dark:text-red-400" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="unmuted"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Volume2 className={`h-6 w-6 ${showPlayPrompt ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-500 dark:text-blue-400'}`} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </Button>
      
//       {/* Floating music note indicator */}
//       <AnimatePresence>
//         {isPlaying && (
//           <motion.div
//             initial={{ opacity: 0, y: 10, x: 10 }}
//             animate={{ opacity: 1, y: 0, x: 0 }}
//             exit={{ opacity: 0, y: -10, x: -10 }}
//             className="absolute -top-12 left-1/2 -translate-x-1/2 transform"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -8, 0],
//                 scale: [1, 1.2, 1],
//                 rotate: [0, 10, -10, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="text-2xl filter drop-shadow-lg"
//             >
//               🎵
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       {/* Subtle pulsing ring when playing */}
//       <AnimatePresence>
//         {isPlaying && !showPlayPrompt && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="absolute inset-0 -z-10"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.3, 0.1, 0.3],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//               className="h-full w-full rounded-full bg-blue-400 dark:bg-blue-500"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }














// components/audio-controls.tsx
'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/hooks/use-audio';

export function AudioControls() {
  const { isPlaying, isMuted, isLoaded, toggleMute } = useAudio();
  
  if (!isLoaded) {
    return null; // Don't show controls until audio is loaded
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-20 left-6 z-50"
    >
      {/* Single Mute/Unmute Button */}
      <Button
        onClick={toggleMute}
        size="sm"
        variant="outline"
        className="h-14 w-14 rounded-full border p-0 shadow-xl backdrop-blur-lg transition-all hover:scale-110 bg-white/30 hover:bg-white/50 dark:border-white/20 dark:bg-black/30 dark:hover:bg-black/40"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        <AnimatePresence mode="wait">
          {isMuted ? (
            <motion.div
              key="muted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <VolumeX className="h-6 w-6 text-red-500 dark:text-red-400" />
            </motion.div>
          ) : (
            <motion.div
              key="unmuted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Volume2 className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      
      {/* Floating music note indicator */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: 10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: -10 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 transform"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-2xl filter drop-shadow-lg"
            >
              🎵
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle pulsing ring when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 -z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full rounded-full bg-blue-400 dark:bg-blue-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}