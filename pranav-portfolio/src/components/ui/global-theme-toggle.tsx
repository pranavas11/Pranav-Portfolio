// "use client";

// import * as React from "react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";
// import { cn } from "@/lib/utils";

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = React.useState(false);

//   // Avoid hydration mismatch
//   React.useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return (
//       <div className="relative flex h-10 w-20 items-center justify-center rounded-full border border-neutral-200 bg-white/30 backdrop-blur-lg dark:border-neutral-700 dark:bg-neutral-800/30">
//         <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-600" />
//       </div>
//     );
//   }

//   const isDark = theme === "dark";

//   return (
//     <button
//       onClick={() => setTheme(isDark ? "light" : "dark")}
//       className={cn(
//         "relative flex h-10 w-20 items-center rounded-full border transition-all duration-300 ease-out",
//         "border-neutral-200 bg-white/30 backdrop-blur-lg hover:border-neutral-300",
//         "dark:border-neutral-700 dark:bg-neutral-800/30 dark:hover:border-neutral-600",
//         "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2",
//         "shadow-lg hover:shadow-xl"
//       )}
//       aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//     >
//       {/* Background gradient */}
//       <div
//         className={cn(
//           "absolute inset-0 rounded-full opacity-20 transition-all duration-300",
//           isDark
//             ? "bg-gradient-to-r from-blue-600 to-purple-600"
//             : "bg-gradient-to-r from-yellow-400 to-orange-500"
//         )}
//       />
      
//       {/* Sliding indicator */}
//       <div
//         className={cn(
//           "absolute top-1 h-8 w-8 rounded-full shadow-md transition-all duration-300 ease-out",
//           "bg-white dark:bg-neutral-900",
//           "border border-neutral-200 dark:border-neutral-700",
//           isDark ? "translate-x-11" : "translate-x-1"
//         )}
//       >
//         {/* Icon container */}
//         <div className="flex h-full w-full items-center justify-center">
//           {isDark ? (
//             <Moon className="h-4 w-4 text-blue-600 transition-colors duration-200" />
//           ) : (
//             <Sun className="h-4 w-4 text-orange-500 transition-colors duration-200" />
//           )}
//         </div>
//       </div>

//       {/* Background icons */}
//       <div className="flex w-full items-center justify-between px-2">
//         <Sun 
//           className={cn(
//             "h-4 w-4 transition-all duration-300",
//             !isDark ? "text-orange-500 opacity-100" : "text-neutral-400 opacity-50"
//           )} 
//         />
//         <Moon 
//           className={cn(
//             "h-4 w-4 transition-all duration-300",
//             isDark ? "text-blue-600 opacity-100" : "text-neutral-400 opacity-50"
//           )} 
//         />
//       </div>
//     </button>
//   );
// }















"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface GlobalThemeToggleProps {
  className?: string;
}

export function GlobalThemeToggle({ className }: GlobalThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("fixed right-4 top-1/2 z-50 -translate-y-1/2", className)}>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white/30 backdrop-blur-lg shadow-lg dark:border-neutral-700 dark:bg-neutral-800/30">
          <div className="h-6 w-6 animate-pulse rounded-full bg-neutral-300 dark:bg-neutral-600" />
        </div>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className={cn("fixed right-4 top-1/2 z-50 -translate-y-1/2", className)}>
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ease-out",
          "border-neutral-200 bg-white/40 backdrop-blur-lg hover:border-neutral-300 hover:bg-white/60",
          "dark:border-neutral-700 dark:bg-neutral-800/40 dark:hover:border-neutral-600 dark:hover:bg-neutral-700/60",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2",
          "shadow-lg hover:shadow-xl hover:scale-105",
          "group"
        )}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {/* Background gradient */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-20 transition-all duration-300 group-hover:opacity-30",
            isDark
              ? "bg-gradient-to-br from-blue-600 to-purple-600"
              : "bg-gradient-to-br from-yellow-400 to-orange-500"
          )}
        />
        
        {/* Icon with rotation animation */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {isDark ? (
            <Moon className="h-5 w-5 text-blue-600 transition-all duration-300" />
          ) : (
            <Sun className="h-5 w-5 text-orange-500 transition-all duration-300" />
          )}
        </div>

        {/* Subtle pulse effect on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-20",
            "animate-pulse",
            isDark ? "bg-blue-500" : "bg-orange-400"
          )}
        />
      </button>
    </div>
  );
}