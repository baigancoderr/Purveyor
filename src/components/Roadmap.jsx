import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  {
    num: '01',
    title: 'Foundation',
    subtitle: 'Building the Core',
    goal: 'Establish the technical and digital foundation of Purveyor.',
    items: [
      'PVR smart contract development',
      'BSC Testnet testing',
      'Mainnet deployment',
      'Website development',
      'Whitepaper',
      'Official social-media channels',
    ],
    status: 'completed',
  },
  {
    num: '02',
    title: 'Launch',
    subtitle: 'Introducing PVR to the Market',
    goal: 'Establish a transparent and secure token launch.',
    items: [
      'Initial token distribution',
      'Liquidity creation',
      'Contract verification',
      'Community building',
      'Security review / audit',
    ],
    status: 'active',
  },
  {
    num: '03',
    title: 'Growth',
    subtitle: 'Expanding the PVR Community',
    goal: 'Increase awareness, adoption, and ecosystem participation.',
    items: [
      'DEX trading',
      'Community reward programs',
      'Strategic partnerships',
      'Marketing campaigns',
      'Holder expansion',
      'Community growth',
    ],
    status: 'upcoming',
  },
  {
    num: '04',
    title: 'Ecosystem',
    subtitle: 'Building Real Utility',
    goal: 'Develop PVR into a broader fintech and RWA-oriented ecosystem.',
    items: [
      'PVR utility platform',
      'Partner integrations',
      'Additional community features',
      'Expanded ecosystem services',
      'Larger exchange listing applications',
    ],
    status: 'upcoming',
  },
];

const STATUS_STYLES = {
  completed: {
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400',
    ring: 'border-emerald-500/50',
    label: 'Completed',
  },
  active: {
    badge: 'bg-[#FFA200]/15 text-[#FFA200] border-[#FFA200]/30',
    dot: 'bg-[#FFA200] animate-pulse',
    ring: 'border-[#FFA200]',
    label: 'In Progress',
  },
  upcoming: {
    badge: 'bg-gray-700/50 text-gray-400 border-gray-600/30',
    dot: 'bg-gray-500',
    ring: 'border-gray-600',
    label: 'Upcoming',
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Roadmap = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderCard = (phase, cardIndex = 0) => {
    const styles = STATUS_STYLES[phase.status];
    return (
      <motion.div
        key={phase.num}
        custom={cardIndex}
        variants={cardVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className={`relative h-full rounded-2xl p-6 sm:p-8 border bg-gradient-to-br from-[#1E1E1E] to-[#171717] transition-all duration-300 ${
          phase.status === 'active'
            ? 'border-[#FFA200]/40 shadow-[0_0_40px_rgba(255,162,0,0.08)]'
            : 'border-gray-800/60 hover:border-[#FFA200]/25'
        }`}
      >
        <span className="absolute top-4 right-6 text-7xl Gbold text-white/[0.03] select-none pointer-events-none leading-none">
          {phase.num}
        </span>

        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full border-2 ${styles.ring} flex items-center justify-center`}>
              <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
            </div>
            <div>
              <span className="text-gradient Gbold text-2xl sm:text-3xl leading-none">Phase {phase.num}</span>
              <p className="text-white Gsemibold text-lg mt-0.5">{phase.title}</p>
            </div>
          </div>
          <span className={`shrink-0 px-3 py-1 text-xs Gsemibold rounded-full border ${styles.badge}`}>
            {styles.label}
          </span>
        </div>

        <p className="text-[#FFD996] Gsemibold text-md mb-4">{phase.subtitle}</p>

        <ul className="flex flex-col gap-2 mb-5">
          {phase.items.map((item, idx) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx + cardIndex * 0.1, duration: 0.35 }}
              className="flex items-start gap-2.5 text-gray-300 text-md Gregular"
            >
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`} />
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="border-t border-[#FFA200]/10 pt-4">
          <p className="text-sm text-gray-500 Gregular">
            <span className="text-[#FFA200]/70 Gsemibold">Goal: </span>
            {phase.goal}
          </p>
        </div>

        {phase.status === 'active' && (
          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#FFA200] to-transparent opacity-60" />
        )}
      </motion.div>
    );
  };

  const desktopSlides = [];
  for (let i = 0; i < PHASES.length; i += 2) {
    desktopSlides.push(PHASES.slice(i, i + 2));
  }
  const mobileSlides = PHASES.map((phase) => [phase]);

  return (
    <section id="roadmap" className="py-6 sm:py-10 bg-[#171717] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">Roadmap</p>
          <div className="section-divider mt-2" />
          <h2 className="text-3xl sm:text-4xl Gsemibold text-white mt-6 mb-3">
            From <span className="text-gradient">Foundation</span> to Ecosystem
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto Gregular">
            Our roadmap is structured around four development phases.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop prev/next arrows */}
          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
              disabled={activeSlide === 0}
              className="absolute left-[-18px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#FFA200]/40 bg-[#1E1E1E] text-2xl text-[#FFA200] shadow-lg shadow-black/20 transition disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous roadmap cards"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => Math.min(desktopSlides.length - 1, prev + 1))}
              disabled={activeSlide === desktopSlides.length - 1}
              className="absolute right-[-18px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#FFA200]/40 bg-[#1E1E1E] text-2xl text-[#FFA200] shadow-lg shadow-black/20 transition disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next roadmap cards"
            >
              →
            </button>
          </div>

          {/* Desktop slider */}
          <div className="overflow-hidden rounded-2xl md:block hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {desktopSlides.map((slide, slideIndex) => (
                <div key={`desktop-slide-${slideIndex}`} className="min-w-full">
                  <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                    {slide.map((phase, idx) => (
                      <div key={phase.num} className="min-w-0">
                        {renderCard(phase, slideIndex * 2 + idx)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile slider */}
          <div className="overflow-hidden rounded-2xl md:hidden block">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {mobileSlides.map((slide, slideIndex) => (
                <div key={`mobile-slide-${slideIndex}`} className="min-w-full">
                  {slide.map((phase) => (
                    <div key={phase.num} className="min-w-0">
                      {renderCard(phase, slideIndex)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="mt-6 flex items-center justify-between gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            disabled={activeSlide === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA200]/40 bg-[#1E1E1E] text-lg text-[#FFA200] transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous roadmap cards"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            {mobileSlides.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index ? 'w-8 bg-[#FFA200]' : 'w-2.5 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to roadmap slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => Math.min(mobileSlides.length - 1, prev + 1))}
            disabled={activeSlide === mobileSlides.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA200]/40 bg-[#1E1E1E] text-lg text-[#FFA200] transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next roadmap cards"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
