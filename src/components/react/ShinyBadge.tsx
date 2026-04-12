import { motion } from 'framer-motion';

interface ShinyBadgeProps {
  text: string;
}

export default function ShinyBadge({ text }: ShinyBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald/20 bg-emerald/5"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
      </span>
      <span className="text-emerald text-xs font-medium font-sans tracking-wide uppercase">
        {text}
      </span>
    </motion.div>
  );
}
