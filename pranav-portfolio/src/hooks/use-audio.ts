// // hooks/use-audio.ts
// 'use client';

// import { useEffect, useRef, useState, useCallback } from 'react';

// export function useAudio() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   // Initialize audio
//   useEffect(() => {
//     // Create audio element
//     const audio = new Audio('/calm-space-music.mp3');
//     audio.loop = true;
//     audio.volume = 0.3; // Set to 30% volume for background music
//     audioRef.current = audio;
    
//     // Audio event listeners
//     const handleCanPlay = () => {
//       setIsLoaded(true);
//       // Auto-play when loaded (browsers may block this)
//       audio.play().catch((error) => {
//         console.log('Auto-play prevented:', error);
//         // Auto-play was prevented, user will need to interact first
//       });
//     };
    
//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleError = (error: any) => {
//       console.error('Audio error:', error);
//     };
    
//     audio.addEventListener('canplay', handleCanPlay);
//     audio.addEventListener('play', handlePlay);
//     audio.addEventListener('pause', handlePause);
//     audio.addEventListener('error', handleError);
    
//     return () => {
//       audio.removeEventListener('canplay', handleCanPlay);
//       audio.removeEventListener('play', handlePlay);
//       audio.removeEventListener('pause', handlePause);
//       audio.removeEventListener('error', handleError);
//       audio.pause();
//       audio.src = '';
//     };
//   }, []);
  
//   // Handle tab visibility change
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!audioRef.current) return;
      
//       if (document.hidden) {
//         // Tab is not visible, pause audio
//         if (isPlaying) {
//           audioRef.current.pause();
//         }
//       } else {
//         // Tab is visible, resume audio if it was playing and not muted
//         if (isPlaying && !isMuted) {
//           audioRef.current.play().catch(console.error);
//         }
//       }
//     };
    
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [isPlaying, isMuted]);
  
//   const togglePlayPause = useCallback(() => {
//     if (!audioRef.current || !isLoaded) return;
    
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play().catch(console.error);
//     }
//   }, [isPlaying, isLoaded]);
  
//   const toggleMute = useCallback(() => {
//     if (!audioRef.current) return;
    
//     const newMutedState = !isMuted;
//     audioRef.current.muted = newMutedState;
//     setIsMuted(newMutedState);
    
//     // If unmuting and should be playing, start playback
//     if (!newMutedState && !isPlaying && isLoaded) {
//       audioRef.current.play().catch(console.error);
//     }
//   }, [isMuted, isPlaying, isLoaded]);
  
//   const setVolume = useCallback((volume: number) => {
//     if (!audioRef.current) return;
//     audioRef.current.volume = Math.max(0, Math.min(1, volume));
//   }, []);
  
//   return {
//     isPlaying,
//     isMuted,
//     isLoaded,
//     togglePlayPause,
//     toggleMute,
//     setVolume,
//   };
// }













// hooks/use-audio.ts
// 'use client';

// import { useEffect, useRef, useState, useCallback } from 'react';

// let globalAudio: HTMLAudioElement | null = null;
// let globalListeners: Set<(state: any) => void> = new Set();

// export function useAudio() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const wasPlayingBeforeHidden = useRef(false);
  
//   // Notify all listeners about state changes
//   const notifyListeners = useCallback((state: any) => {
//     globalListeners.forEach(listener => listener(state));
//   }, []);
  
//   // Initialize global audio (only once)
//   useEffect(() => {
//     if (!globalAudio) {
//       globalAudio = new Audio('/calm-space-music.mp3');
//       globalAudio.loop = true;
//       globalAudio.volume = 0.3;
//       globalAudio.preload = 'auto';
      
//       // Auto-play as soon as it's loaded
//       const handleCanPlay = () => {
//         setIsLoaded(true);
//         notifyListeners({ type: 'loaded', isLoaded: true });
        
//         // Try to auto-play immediately
//         globalAudio!.play()
//           .then(() => {
//             setIsPlaying(true);
//             notifyListeners({ type: 'playing', isPlaying: true });
//           })
//           .catch((error) => {
//             console.log('Auto-play prevented, waiting for user interaction:', error);
//             // Try to play on first user interaction
//             const startOnInteraction = () => {
//               globalAudio!.play()
//                 .then(() => {
//                   setIsPlaying(true);
//                   notifyListeners({ type: 'playing', isPlaying: true });
//                 })
//                 .catch(console.error);
              
//               // Remove listeners after first interaction
//               document.removeEventListener('click', startOnInteraction);
//               document.removeEventListener('keydown', startOnInteraction);
//               document.removeEventListener('touchstart', startOnInteraction);
//             };
            
//             document.addEventListener('click', startOnInteraction);
//             document.addEventListener('keydown', startOnInteraction);
//             document.addEventListener('touchstart', startOnInteraction);
//           });
//       };
      
//       const handlePlay = () => {
//         setIsPlaying(true);
//         notifyListeners({ type: 'playing', isPlaying: true });
//       };
      
//       const handlePause = () => {
//         setIsPlaying(false);
//         notifyListeners({ type: 'playing', isPlaying: false });
//       };
      
//       globalAudio.addEventListener('canplay', handleCanPlay);
//       globalAudio.addEventListener('play', handlePlay);
//       globalAudio.addEventListener('pause', handlePause);
//       globalAudio.addEventListener('loadeddata', handleCanPlay);
//     }
    
//     // Register this component as a listener
//     const stateListener = (state: any) => {
//       if (state.type === 'loaded') setIsLoaded(state.isLoaded);
//       if (state.type === 'playing') setIsPlaying(state.isPlaying);
//       if (state.type === 'muted') setIsMuted(state.isMuted);
//     };
    
//     globalListeners.add(stateListener);
    
//     return () => {
//       globalListeners.delete(stateListener);
//     };
//   }, [notifyListeners]);
  
//   // Handle tab visibility change
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!globalAudio) return;
      
//       if (document.hidden) {
//         // Tab is not visible, remember if we were playing and pause
//         wasPlayingBeforeHidden.current = !globalAudio.paused;
//         if (!globalAudio.paused) {
//           globalAudio.pause();
//         }
//       } else {
//         // Tab is visible, resume if we were playing before and not muted
//         if (wasPlayingBeforeHidden.current && !isMuted) {
//           globalAudio.play().catch(console.error);
//         }
//       }
//     };
    
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [isMuted]);
  
//   const toggleMute = useCallback(() => {
//     if (!globalAudio || !isLoaded) return;
    
//     const newMutedState = !isMuted;
//     globalAudio.muted = newMutedState;
//     setIsMuted(newMutedState);
//     notifyListeners({ type: 'muted', isMuted: newMutedState });
    
//     // If unmuting, ensure audio plays
//     if (!newMutedState && globalAudio.paused) {
//       globalAudio.play().catch(console.error);
//     }
//     // If muting, pause the audio
//     else if (newMutedState && !globalAudio.paused) {
//       globalAudio.pause();
//     }
//   }, [isMuted, isLoaded, notifyListeners]);
  
//   const setVolume = useCallback((volume: number) => {
//     if (!globalAudio) return;
//     globalAudio.volume = Math.max(0, Math.min(1, volume));
//   }, []);
  
//   return {
//     isPlaying: isPlaying && !isMuted,
//     isMuted,
//     isLoaded,
//     toggleMute,
//     setVolume,
//   };
// }













// hooks/use-audio.ts
// 'use client';

// import { useEffect, useRef, useState, useCallback } from 'react';

// let globalAudio: HTMLAudioElement | null = null;
// let globalListeners: Set<(state: any) => void> = new Set();
// let hasUserInteracted = false;
// let shouldAutoPlay = true;

// export function useAudio() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [showPlayPrompt, setShowPlayPrompt] = useState(false);
//   const wasPlayingBeforeHidden = useRef(false);
  
//   // Notify all listeners about state changes
//   const notifyListeners = useCallback((state: any) => {
//     globalListeners.forEach(listener => listener(state));
//   }, []);
  
//   // Function to start playing audio
//   const startAudio = useCallback(async () => {
//     if (!globalAudio || !shouldAutoPlay) return;
    
//     try {
//       await globalAudio.play();
//       setIsPlaying(true);
//       setShowPlayPrompt(false);
//       notifyListeners({ type: 'playing', isPlaying: true });
//       notifyListeners({ type: 'showPrompt', showPrompt: false });
//       hasUserInteracted = true;
//     } catch (error) {
//       console.log('Autoplay prevented, waiting for user interaction');
//       if (!hasUserInteracted) {
//         setShowPlayPrompt(true);
//         notifyListeners({ type: 'showPrompt', showPrompt: true });
//       }
//     }
//   }, [notifyListeners]);
  
//   // Initialize global audio (only once)
//   useEffect(() => {
//     if (!globalAudio) {
//       globalAudio = new Audio('/calm-space-music.mp3');
//       globalAudio.loop = true;
//       globalAudio.volume = 0.3;
//       globalAudio.preload = 'auto';
      
//       const handleCanPlay = () => {
//         setIsLoaded(true);
//         notifyListeners({ type: 'loaded', isLoaded: true });
        
//         // Try to start playing immediately
//         startAudio();
//       };
      
//       const handlePlay = () => {
//         setIsPlaying(true);
//         notifyListeners({ type: 'playing', isPlaying: true });
//       };
      
//       const handlePause = () => {
//         setIsPlaying(false);
//         notifyListeners({ type: 'playing', isPlaying: false });
//       };
      
//       const handleLoadedData = () => {
//         setIsLoaded(true);
//         notifyListeners({ type: 'loaded', isLoaded: true });
//         startAudio();
//       };
      
//       globalAudio.addEventListener('canplay', handleCanPlay);
//       globalAudio.addEventListener('loadeddata', handleLoadedData);
//       globalAudio.addEventListener('play', handlePlay);
//       globalAudio.addEventListener('pause', handlePause);
//     }
    
//     // Register this component as a listener
//     const stateListener = (state: any) => {
//       if (state.type === 'loaded') setIsLoaded(state.isLoaded);
//       if (state.type === 'playing') setIsPlaying(state.isPlaying);
//       if (state.type === 'muted') setIsMuted(state.isMuted);
//       if (state.type === 'showPrompt') setShowPlayPrompt(state.showPrompt);
//     };
    
//     globalListeners.add(stateListener);
    
//     return () => {
//       globalListeners.delete(stateListener);
//     };
//   }, [notifyListeners, startAudio]);
  
//   // Set up user interaction listeners for autoplay fallback
//   useEffect(() => {
//     if (hasUserInteracted || !showPlayPrompt) return;
    
//     const handleUserInteraction = () => {
//       if (globalAudio && shouldAutoPlay && !hasUserInteracted) {
//         startAudio();
//       }
//     };
    
//     // Listen for any user interaction
//     const events = ['click', 'keydown', 'touchstart', 'mousedown'];
//     events.forEach(event => {
//       document.addEventListener(event, handleUserInteraction, { once: true });
//     });
    
//     return () => {
//       events.forEach(event => {
//         document.removeEventListener(event, handleUserInteraction);
//       });
//     };
//   }, [showPlayPrompt, startAudio]);
  
//   // Handle tab visibility change
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!globalAudio) return;
      
//       if (document.hidden) {
//         // Tab is not visible, remember if we were playing and pause
//         wasPlayingBeforeHidden.current = !globalAudio.paused && !isMuted;
//         if (!globalAudio.paused) {
//           globalAudio.pause();
//         }
//       } else {
//         // Tab is visible, resume if we were playing before and should auto play
//         if (wasPlayingBeforeHidden.current && shouldAutoPlay && !isMuted) {
//           globalAudio.play().catch(console.error);
//         }
//       }
//     };
    
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [isMuted]);
  
//   const toggleMute = useCallback(() => {
//     if (!globalAudio || !isLoaded) return;
    
//     const newMutedState = !isMuted;
    
//     if (newMutedState) {
//       // Muting: pause the audio and mute
//       if (!globalAudio.paused) {
//         globalAudio.pause();
//       }
//       globalAudio.muted = true;
//       shouldAutoPlay = false;
//     } else {
//       // Unmuting: unmute and play
//       globalAudio.muted = false;
//       shouldAutoPlay = true;
//       if (globalAudio.paused) {
//         globalAudio.play().catch(console.error);
//       }
//     }
    
//     setIsMuted(newMutedState);
//     notifyListeners({ type: 'muted', isMuted: newMutedState });
//   }, [isMuted, isLoaded, notifyListeners]);
  
//   const setVolume = useCallback((volume: number) => {
//     if (!globalAudio) return;
//     globalAudio.volume = Math.max(0, Math.min(1, volume));
//   }, []);
  
//   return {
//     isPlaying: isPlaying && !isMuted,
//     isMuted,
//     isLoaded,
//     showPlayPrompt,
//     toggleMute,
//     setVolume,
//   };
// }














// hooks/use-audio.ts
// 'use client';

// import { useEffect, useRef, useState, useCallback } from 'react';

// let globalAudio: HTMLAudioElement | null = null;
// let globalListeners: Set<(state: any) => void> = new Set();
// let hasUserInteracted = false;
// let shouldAutoPlay = true;

// export function useAudio() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const wasPlayingBeforeHidden = useRef(false);
  
//   // Notify all listeners about state changes
//   const notifyListeners = useCallback((state: any) => {
//     globalListeners.forEach(listener => listener(state));
//   }, []);
  
//   // Function to start playing audio - bypass autoplay restrictions
//   const startAudio = useCallback(async () => {
//     if (!globalAudio || !shouldAutoPlay) return;
    
//     try {
//       // Reset audio properties
//       globalAudio.volume = 0.3;
//       globalAudio.muted = false;
      
//       // Force play with user gesture simulation
//       const playPromise = globalAudio.play();
      
//       if (playPromise !== undefined) {
//         await playPromise;
//       }
      
//       setIsPlaying(true);
//       notifyListeners({ type: 'playing', isPlaying: true });
//       hasUserInteracted = true;
//     } catch (error) {
//       console.log('Initial autoplay blocked, setting up user interaction listener');
      
//       // Add one-time click listener to start audio
//       const handleFirstInteraction = async () => {
//         if (globalAudio && shouldAutoPlay) {
//           try {
//             await globalAudio.play();
//             setIsPlaying(true);
//             notifyListeners({ type: 'playing', isPlaying: true });
//             hasUserInteracted = true;
//           } catch (e) {
//             console.error('Failed to start audio after interaction:', e);
//           }
//         }
//       };
      
//       // Listen for any user interaction
//       const events = ['click', 'keydown', 'touchstart', 'mousedown'];
//       events.forEach(event => {
//         document.addEventListener(event, handleFirstInteraction, { once: true });
//       });
//     }
//   }, [notifyListeners]);
  
//   // Initialize global audio (only once)
//   useEffect(() => {
//     if (!globalAudio) {
//       globalAudio = new Audio('/calm-space-music.mp3');
//       globalAudio.loop = true;
//       globalAudio.volume = 0.3;
//       globalAudio.preload = 'auto';
      
//       const handleCanPlay = () => {
//         setIsLoaded(true);
//         notifyListeners({ type: 'loaded', isLoaded: true });
//         startAudio();
//       };
      
//       const handleLoadedData = () => {
//         setIsLoaded(true);
//         notifyListeners({ type: 'loaded', isLoaded: true });
//         startAudio();
//       };
      
//       const handleLoadedMetadata = () => {
//         startAudio();
//       };
      
//       const handlePlay = () => {
//         setIsPlaying(true);
//         notifyListeners({ type: 'playing', isPlaying: true });
//       };
      
//       const handlePause = () => {
//         setIsPlaying(false);
//         notifyListeners({ type: 'playing', isPlaying: false });
//       };
      
//       globalAudio.addEventListener('canplay', handleCanPlay);
//       globalAudio.addEventListener('loadeddata', handleLoadedData);
//       globalAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
//       globalAudio.addEventListener('play', handlePlay);
//       globalAudio.addEventListener('pause', handlePause);
      
//       // Try to load and play immediately
//       globalAudio.load();
//     } else {
//       // If audio already exists but we're initializing a new component instance
//       // (like when navigating back to home page), try to play again
//       if (shouldAutoPlay && globalAudio.paused && !globalAudio.muted) {
//         startAudio();
//       }
//     }
    
//     // Register this component as a listener
//     const stateListener = (state: any) => {
//       if (state.type === 'loaded') setIsLoaded(state.isLoaded);
//       if (state.type === 'playing') setIsPlaying(state.isPlaying);
//       if (state.type === 'muted') setIsMuted(state.isMuted);
//     };
    
//     globalListeners.add(stateListener);
    
//     return () => {
//       globalListeners.delete(stateListener);
//     };
//   }, [notifyListeners, startAudio]);
  
//   // More aggressive autoplay attempts
//   useEffect(() => {
//     if (!globalAudio || !isLoaded) return;
    
//     const attemptAutoplay = async () => {
//       if (globalAudio && shouldAutoPlay && globalAudio.paused && !globalAudio.muted) {
//         // Try direct autoplay first
//         try {
//           await globalAudio.play();
//           hasUserInteracted = true;
//         } catch (error) {
//           // If that fails, try with a slight delay
//           setTimeout(async () => {
//             if (globalAudio && shouldAutoPlay && globalAudio.paused && !globalAudio.muted) {
//               try {
//                 await globalAudio.play();
//                 hasUserInteracted = true;
//               } catch (e) {
//                 console.log('Autoplay still blocked, waiting for user interaction');
//               }
//             }
//           }, 500);
//         }
//       }
//     };
    
//     // Multiple attempts at different timings
//     attemptAutoplay();
//     const timeout1 = setTimeout(attemptAutoplay, 100);
//     const timeout2 = setTimeout(attemptAutoplay, 500);
//     const timeout3 = setTimeout(attemptAutoplay, 1000);
    
//     return () => {
//       clearTimeout(timeout1);
//       clearTimeout(timeout2);
//       clearTimeout(timeout3);
//     };
//   }, [isLoaded]);
  
//   // Handle focus/visibility changes - pause when out of focus (tabs, windows, etc.)
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!globalAudio) return;
      
//       if (document.hidden) {
//         // Tab/window is not visible, remember if we were playing and pause
//         wasPlayingBeforeHidden.current = !globalAudio.paused && !isMuted;
//         if (!globalAudio.paused) {
//           globalAudio.pause();
//         }
//       } else {
//         // Tab/window is visible, resume if we were playing before and should auto play
//         if (wasPlayingBeforeHidden.current && shouldAutoPlay && !isMuted) {
//           globalAudio.play().catch(console.error);
//         }
//       }
//     };
    
//     const handleWindowBlur = () => {
//       if (!globalAudio) return;
//       // Window lost focus (switched to different window/app)
//       wasPlayingBeforeHidden.current = !globalAudio.paused && !isMuted;
//       if (!globalAudio.paused) {
//         globalAudio.pause();
//       }
//     };
    
//     const handleWindowFocus = () => {
//       if (!globalAudio) return;
//       // Window gained focus, resume if we were playing before
//       if (wasPlayingBeforeHidden.current && shouldAutoPlay && !isMuted) {
//         globalAudio.play().catch(console.error);
//       }
//     };
    
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('blur', handleWindowBlur);
//     window.addEventListener('focus', handleWindowFocus);
    
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('blur', handleWindowBlur);
//       window.removeEventListener('focus', handleWindowFocus);
//     };
//   }, [isMuted]);
  
//   const toggleMute = useCallback(() => {
//     if (!globalAudio || !isLoaded) return;
    
//     const newMutedState = !isMuted;
    
//     if (newMutedState) {
//       // Muting: pause the audio and mute
//       if (!globalAudio.paused) {
//         globalAudio.pause();
//       }
//       globalAudio.muted = true;
//       shouldAutoPlay = false;
//     } else {
//       // Unmuting: unmute and play
//       globalAudio.muted = false;
//       shouldAutoPlay = true;
//       if (globalAudio.paused) {
//         globalAudio.play().catch(console.error);
//       }
//     }
    
//     setIsMuted(newMutedState);
//     notifyListeners({ type: 'muted', isMuted: newMutedState });
//   }, [isMuted, isLoaded, notifyListeners]);
  
//   const setVolume = useCallback((volume: number) => {
//     if (!globalAudio) return;
//     globalAudio.volume = Math.max(0, Math.min(1, volume));
//   }, []);
  
//   return {
//     isPlaying: isPlaying && !isMuted,
//     isMuted,
//     isLoaded,
//     toggleMute,
//     setVolume,
//   };
// }
















// hooks/use-audio.ts
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

let globalAudio: HTMLAudioElement | null = null;
let globalListeners: Set<(state: any) => void> = new Set();
let hasUserInteracted = false;
let shouldAutoPlay = true;

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const wasPlayingBeforeHidden = useRef(false);
  
  // Notify all listeners about state changes
  const notifyListeners = useCallback((state: any) => {
    globalListeners.forEach(listener => listener(state));
  }, []);
  
  // Function to start playing audio - bypass autoplay restrictions
  const startAudio = useCallback(async () => {
    if (!globalAudio || !shouldAutoPlay) return;
    
    try {
      // Reset audio properties
      globalAudio.volume = 0.3;
      globalAudio.muted = false;
      
      // Force play with user gesture simulation
      const playPromise = globalAudio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
      }
      
      setIsPlaying(true);
      notifyListeners({ type: 'playing', isPlaying: true });
      hasUserInteracted = true;
    } catch (error) {
      // Only log if it's not the expected autoplay blocking error
      if (error instanceof Error && error.name !== 'NotAllowedError') {
        console.log('Unexpected autoplay error:', error);
      }
      
      // Add one-time click listener to start audio
      const handleFirstInteraction = async () => {
        if (globalAudio && shouldAutoPlay) {
          try {
            await globalAudio.play();
            setIsPlaying(true);
            notifyListeners({ type: 'playing', isPlaying: true });
            hasUserInteracted = true;
          } catch (e) {
            console.error('Failed to start audio after interaction:', e);
          }
        }
      };
      
      // Listen for any user interaction
      const events = ['click', 'keydown', 'touchstart', 'mousedown'];
      events.forEach(event => {
        document.addEventListener(event, handleFirstInteraction, { once: true });
      });
    }
  }, [notifyListeners]);
  
  // Initialize global audio (only once)
  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio('/calm-space-music.mp3');
      globalAudio.loop = true;
      globalAudio.volume = 0.3;
      globalAudio.preload = 'auto';
      
      const handleCanPlay = () => {
        setIsLoaded(true);
        notifyListeners({ type: 'loaded', isLoaded: true });
        startAudio();
      };
      
      const handleLoadedData = () => {
        setIsLoaded(true);
        notifyListeners({ type: 'loaded', isLoaded: true });
        startAudio();
      };
      
      const handleLoadedMetadata = () => {
        startAudio();
      };
      
      const handlePlay = () => {
        setIsPlaying(true);
        notifyListeners({ type: 'playing', isPlaying: true });
      };
      
      const handlePause = () => {
        setIsPlaying(false);
        notifyListeners({ type: 'playing', isPlaying: false });
      };
      
      globalAudio.addEventListener('canplay', handleCanPlay);
      globalAudio.addEventListener('loadeddata', handleLoadedData);
      globalAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
      globalAudio.addEventListener('play', handlePlay);
      globalAudio.addEventListener('pause', handlePause);
      
      // Try to load and play immediately
      globalAudio.load();
    } else {
      // If audio already exists but we're initializing a new component instance
      // (like when navigating back to home page), try to play again
      if (shouldAutoPlay && globalAudio.paused && !globalAudio.muted) {
        startAudio();
      }
    }
    
    // Register this component as a listener
    const stateListener = (state: any) => {
      if (state.type === 'loaded') setIsLoaded(state.isLoaded);
      if (state.type === 'playing') setIsPlaying(state.isPlaying);
      if (state.type === 'muted') setIsMuted(state.isMuted);
    };
    
    globalListeners.add(stateListener);
    
    return () => {
      globalListeners.delete(stateListener);
    };
  }, [notifyListeners, startAudio]);
  
  // More aggressive autoplay attempts
  useEffect(() => {
    if (!globalAudio || !isLoaded) return;
    
    const attemptAutoplay = async () => {
      if (globalAudio && shouldAutoPlay && globalAudio.paused && !globalAudio.muted) {
        // Try direct autoplay first
        try {
          await globalAudio.play();
          hasUserInteracted = true;
        } catch (error) {
          // Suppress expected NotAllowedError - this is normal browser autoplay blocking
          // If that fails, try with a slight delay
          setTimeout(async () => {
            if (globalAudio && shouldAutoPlay && globalAudio.paused && !globalAudio.muted) {
              try {
                await globalAudio.play();
                hasUserInteracted = true;
              } catch (e) {
                // Suppress expected autoplay blocking - this is normal browser behavior
                if (e instanceof Error && e.name !== 'NotAllowedError') {
                  console.log('Unexpected audio error:', e);
                }
              }
            }
          }, 500);
        }
      }
    };
    
    // Multiple attempts at different timings
    attemptAutoplay();
    const timeout1 = setTimeout(attemptAutoplay, 100);
    const timeout2 = setTimeout(attemptAutoplay, 500);
    const timeout3 = setTimeout(attemptAutoplay, 1000);
    
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isLoaded]);
  
  // Handle focus/visibility changes - pause when out of focus (tabs, windows, etc.)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!globalAudio) return;
      
      if (document.hidden) {
        // Tab/window is not visible, remember if we were playing and pause
        wasPlayingBeforeHidden.current = !globalAudio.paused && !isMuted;
        if (!globalAudio.paused) {
          globalAudio.pause();
        }
      } else {
        // Tab/window is visible, ALWAYS resume if not muted and should autoplay
        if (shouldAutoPlay && !isMuted && hasUserInteracted) {
          globalAudio.play().catch(console.error);
          wasPlayingBeforeHidden.current = false; // Reset the flag
        }
      }
    };
    
    const handleWindowBlur = () => {
      if (!globalAudio) return;
      // Window lost focus (switched to different window/app)
      wasPlayingBeforeHidden.current = !globalAudio.paused && !isMuted;
      if (!globalAudio.paused) {
        globalAudio.pause();
      }
    };
    
    const handleWindowFocus = () => {
      if (!globalAudio) return;
      // Window gained focus, ALWAYS resume if not muted and should autoplay
      if (shouldAutoPlay && !isMuted && hasUserInteracted) {
        globalAudio.play().catch(console.error);
        wasPlayingBeforeHidden.current = false; // Reset the flag
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [isMuted]);
  
  const toggleMute = useCallback(() => {
    if (!globalAudio || !isLoaded) return;
    
    const newMutedState = !isMuted;
    
    if (newMutedState) {
      // Muting: pause the audio and mute
      if (!globalAudio.paused) {
        globalAudio.pause();
      }
      globalAudio.muted = true;
      shouldAutoPlay = false;
    } else {
      // Unmuting: unmute and play
      globalAudio.muted = false;
      shouldAutoPlay = true;
      if (globalAudio.paused) {
        globalAudio.play().catch(console.error);
      }
    }
    
    setIsMuted(newMutedState);
    notifyListeners({ type: 'muted', isMuted: newMutedState });
  }, [isMuted, isLoaded, notifyListeners]);
  
  const setVolume = useCallback((volume: number) => {
    if (!globalAudio) return;
    globalAudio.volume = Math.max(0, Math.min(1, volume));
  }, []);
  
  return {
    isPlaying: isPlaying && !isMuted,
    isMuted,
    isLoaded,
    toggleMute,
    setVolume,
  };
}