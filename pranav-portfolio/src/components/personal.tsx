'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Personal = () => {
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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl mb-4">
            What I Do for Fun
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            When I'm not coding, I'm all about living life to the fullest! Here's what keeps me energized and inspired outside of work.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card rounded-lg p-6 border">
          <h3 className="text-foreground text-xl font-semibold mb-3 flex items-center">
            💪 Fitness & Gym Life
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            I'm a total gym rat who loves getting gains every single day! Daily workouts aren't just a routine for me – they're a lifestyle. 
            I believe physical health fuels mental performance, and staying fit helps me tackle complex coding challenges with more energy and focus. 
            There's something incredibly satisfying about pushing your limits both in the gym and in code.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card rounded-lg p-6 border">
          <h3 className="text-foreground text-xl font-semibold mb-3 flex items-center">
            🏞️ Outdoor Adventures
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Virginia has amazing trails and outdoor spots, and I love exploring them through hiking and biking. 
            Weekend adventures are my way of recharging – there's nothing like getting fresh air and exploring new places to find inspiration. 
            Nature helps me step back from screens and gain perspective, often leading to those "aha!" moments for whatever project I'm working on.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card rounded-lg p-6 border">
          <h3 className="text-foreground text-xl font-semibold mb-3 flex items-center">
            ♟️ Chess Strategy
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            With 11+ years of chess experience and several local tournament wins under my belt, chess is more than just a game for me. 
            As an advanced player always looking for challenging matches, I've found that chess taught me strategic thinking that directly applies to programming. 
            The pattern recognition, planning ahead, and tactical problem-solving skills translate perfectly to software architecture and debugging. 
            Always up for a good chess match if you're interested!
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card rounded-lg p-6 border">
          <h3 className="text-foreground text-xl font-semibold mb-3 flex items-center">
            🚀 Tech Exploration
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Even in my free time, I can't help but tinker with new AI experiments and explore emerging frameworks. 
            I'm constantly reading tech blogs, AI research papers, and startup stories. Being active in tech meetups and developer communities 
            keeps me connected with fellow innovators. I'm passionate about lifelong learning and sharing knowledge – 
            there's always something new to discover in the rapidly evolving world of technology.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-secondary/20 rounded-lg p-6">
          <h3 className="text-foreground text-xl font-semibold mb-3">
            Current Obsessions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">🤖 Latest AI developments and applications</div>
              <div className="text-sm text-muted-foreground">🌐 Web3 and blockchain innovations</div>
              <div className="text-sm text-muted-foreground">📈 SaaS growth strategies</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">📊 Fitness optimization and tracking</div>
              <div className="text-sm text-muted-foreground">♖ Chess strategy and online tournaments</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-muted-foreground italic">
            "Work hard, play hard – fitness and coding go hand in hand. I believe in the power of technology to change lives, 
            and I'm always asking 'what if we tried this differently?'"
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Personal;