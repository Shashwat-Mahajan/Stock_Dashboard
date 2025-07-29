"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-background to-muted text-foreground transition">
      <section className="max-w-5xl mx-auto text-center">
        <div className="flex justify-end mb-4">
          <ModeToggle />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-teal-400 text-transparent bg-clip-text"
        >
          Indian Stock Market Visualizer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Explore historical trends of Indian stock indices with interactive
          charts powered by clean CSV data. Built with Next.js, Chart.js, and
          love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10"
        >
          <Link href="/stocks">
            <Button className="text-lg px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 shadow-lg transition">
              View Stocks →
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="mt-24 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-green-400">
          📊 Key Features
        </h2>
        <div className="grid sm:grid-cols-2 gap-8">
          {features.map((f, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
            >
              <FeatureBox title={f.title} desc={f.desc} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "📁 CSV-Based Data",
    desc: "Load stock market data directly from CSV for fast, reliable access without API calls.",
  },
  {
    title: "📈 Interactive Charts",
    desc: "Visualize closing index values over time with dynamic, responsive line graphs.",
  },
  {
    title: "🏢 Company-Wise Filtering",
    desc: "Easily switch between different stock indices to get instant insights.",
  },
  {
    title: "⚙️ Built with Next.js",
    desc: "Optimized for performance with SSR, modular styling, and easy routing.",
  },
];

function FeatureBox({ title, desc }) {
  return (
    <div className="group relative p-[2px] rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-teal-400 hover:shadow-lg transition duration-300">
      <div className="h-full w-full bg-background p-6 rounded-[10px] group-hover:bg-muted transition duration-300">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}
