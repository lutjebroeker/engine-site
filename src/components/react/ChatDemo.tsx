import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Message {
  sender: 'engine' | 'user';
  text: string;
  delay: number;
}

const morningMessages: Message[] = [
  { sender: 'engine', text: "Good morning. What are your top 3 priorities today?", delay: 0 },
  { sender: 'user', text: "1. Finish partner proposal\n2. Review hiring pipeline\n3. Block Friday for strategy work", delay: 1200 },
  { sender: 'engine', text: "Locked in. Priority #2 has been pushed 3 times in 4 weeks. Want to time-block it before 11am?", delay: 2400 },
  { sender: 'user', text: "Yes, blocking 9-10:30am for pipeline review.", delay: 3600 },
  { sender: 'engine', text: "Done. I'll check back at 5pm. Execute well.", delay: 4500 },
];

const eveningMessages: Message[] = [
  { sender: 'engine', text: "It's 5pm. You committed to 3 priorities today.\n\n1. Finish partner proposal\n2. Review hiring pipeline\n3. Block Friday for strategy\n\nWhat did you actually do?", delay: 0 },
  { sender: 'user', text: "Did 1 and 3. Pipeline got pushed by an escalation.", delay: 1500 },
  { sender: 'engine', text: "Noted. 2 of 3 executed → 67% today.\n\nPipeline review has been deferred 4 times in 4 weeks. This is a pattern, not a one-off.\n\nRecommendation: delegate the first-pass review or make it your #1 priority tomorrow.", delay: 3000 },
];

function TypeWriter({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 18);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="whitespace-pre-wrap">
      {displayed}
      {!done && <span className="inline-block w-0.5 h-4 bg-emerald ml-0.5 animate-pulse" />}
    </span>
  );
}

function ChatBubble({ message, animate }: { message: Message; animate: boolean }) {
  const isEngine = message.sender === 'engine';

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 10, scale: 0.95 } : {}}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isEngine ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isEngine
            ? 'bg-void-card border border-void-border text-off-white rounded-tl-md'
            : 'bg-emerald/10 border border-emerald/20 text-emerald rounded-tr-md'
        }`}
      >
        {isEngine && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-full bg-emerald/20 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-7" stroke="#2AF598" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-emerald">Engine</span>
          </div>
        )}
        {animate ? (
          <TypeWriter text={message.text} />
        ) : (
          <span className="whitespace-pre-wrap">{message.text}</span>
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="bg-void-card border border-void-border rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald/50"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ChatSequence({ messages, title, time }: { messages: Message[]; title: string; time: string }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    let current = 0;
    const showNext = () => {
      if (current >= messages.length) return;

      setShowTyping(true);
      const typingDelay = messages[current].sender === 'engine' ? 800 : 500;

      setTimeout(() => {
        setShowTyping(false);
        setVisibleCount(current + 1);
        current++;

        if (current < messages.length) {
          setTimeout(showNext, 600);
        }
      }, typingDelay);
    };

    setTimeout(showNext, 400);
  }, [isInView, messages]);

  return (
    <div ref={ref} className="bg-void rounded-2xl border border-void-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-void-border bg-void-card/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-xs font-medium text-off-white font-sans">{title}</span>
        </div>
        <span className="text-xs text-text-dim font-mono">{time}</span>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 min-h-[200px]">
        <AnimatePresence mode="popLayout">
          {messages.slice(0, visibleCount).map((msg, i) => (
            <ChatBubble key={i} message={msg} animate={i === visibleCount - 1} />
          ))}
          {showTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ChatDemo() {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="flex gap-2 p-1 bg-void-card rounded-xl border border-void-border w-fit mx-auto">
        <button
          onClick={() => setActiveTab('morning')}
          className={`px-4 py-2 rounded-lg text-sm font-medium font-sans transition-all ${
            activeTab === 'morning'
              ? 'bg-emerald/10 text-emerald border border-emerald/20'
              : 'text-text-muted hover:text-off-white'
          }`}
        >
          ☀️ Morning Check-in
        </button>
        <button
          onClick={() => setActiveTab('evening')}
          className={`px-4 py-2 rounded-lg text-sm font-medium font-sans transition-all ${
            activeTab === 'evening'
              ? 'bg-emerald/10 text-emerald border border-emerald/20'
              : 'text-text-muted hover:text-off-white'
          }`}
        >
          🌙 Evening Review
        </button>
      </div>

      {/* Chat windows */}
      <AnimatePresence mode="wait">
        {activeTab === 'morning' ? (
          <motion.div
            key="morning"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatSequence
              messages={morningMessages}
              title="Morning Priorities"
              time="07:30"
            />
          </motion.div>
        ) : (
          <motion.div
            key="evening"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatSequence
              messages={eveningMessages}
              title="Evening Accountability"
              time="17:00"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
