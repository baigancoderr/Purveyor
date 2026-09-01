import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, Landmark, MonitorSmartphone, Handshake, Globe, Zap, Store, Plug, Trophy, BarChart3 } from 'lucide-react';
import ecosystemImage from '../assets/ecosystem.png';

const LAYERS = [
  { icon: Coins,            title: 'PVR Token',   desc: 'The foundation of the ecosystem.',                                                     accent: '#FFA200' },
  { icon: TrendingUp,       title: 'Fintech',      desc: 'Financial technology applications and digital services.',                               accent: '#FFD996' },
  { icon: Landmark,         title: 'RWA',          desc: 'Real-World Asset infrastructure and potential tokenization applications.',               accent: '#FFCB71' },
  { icon: MonitorSmartphone,title: 'PVR Platform', desc: 'Future utility platform connecting users with ecosystem services.',                     accent: '#FFA200' },
  { icon: Handshake,        title: 'Partners',     desc: 'Fintech, RWA, Web3, technology, and strategic partners.',                               accent: '#FFD996' },
  { icon: Globe,            title: 'Community',    desc: 'A growing network of users, contributors, builders, and ecosystem participants.',        accent: '#FFCB71' },
];

const FUTURE_COMPONENTS = [
  { icon: Zap,      title: 'PVR Utility Platform', desc: 'A dedicated platform designed to bring together PVR-powered services and ecosystem utilities.' },
  { icon: Store,    title: 'RWA Marketplace',       desc: 'A potential future marketplace for eligible tokenized real-world assets.' },
  { icon: Plug,     title: 'Partner Hub',           desc: 'A platform layer for ecosystem partners and integrations.' },
  { icon: Trophy,   title: 'Rewards Center',        desc: 'A dedicated area for community campaigns, incentives, and participation programs.' },
  { icon: BarChart3,title: 'Analytics',             desc: 'Future dashboards for ecosystem and token information.' },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const Ecosystem = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const mobileSlides = FUTURE_COMPONENTS.map((component) => [component]);

  return (
    <section id="ecosystem" className="py-6 sm:py-10 bg-[#1E1E1E] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-4 lg:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">Ecosystem</p>
          <div className="section-divider mt-2" />
          <h2 className="text-3xl sm:text-4xl Gsemibold text-white mt-6 mb-3">
            The <span className="text-gradient">Purveyor Ecosystem</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto Gregular">
            Purveyor is designed around multiple interconnected layers that can evolve over time.
          </p>
        </motion.div>

        {/* Ecosystem pyramid / funnel visual */}
        <div className="flex flex-col lg:flex-row gap-14 items-center mb-20">

          {/* Left — vertical layer flow with stagger */}
          <motion.div
            className="flex-1 w-full max-w-lg mx-auto lg:mx-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <div className="flex flex-col gap-0 relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-10 bottom-10 w-px bg-gradient-to-b from-[#FFA200] via-[#FFD996] to-[#FFA200] opacity-30" />

              {LAYERS.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.title}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      show: {
                        opacity: 1, x: 0,
                        transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="relative flex items-center gap-4 py-2 group"
                  >
                    {/* Node */}
                    <div
                      className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${layer.accent}12`,
                        borderColor: `${layer.accent}30`,
                      }}
                    >
                      <Icon size={24} className="text-[#FFA200]" />
                      {i < LAYERS.length - 1 && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#FFA200]/40 text-xl select-none">↓</div>
                      )}
                    </div>
                    {/* Text */}
                    <div className="ml-2">
                      <h4
                        className="Gsemibold text-base transition-colors group-hover:text-[#FFA200]"
                        style={{ color: i === 0 ? layer.accent : 'white' }}
                      >
                        {layer.title}
                      </h4>
                      <p className="text-gray-400 text-sm Gregular">{layer.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — ecosystem image */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[#FFA200]/4 rounded-3xl blur-3xl" />
            <div className="relative z-10 overflow-hidden rounded-3xl border border-[#FFA200]/15 bg-[#171717] p-3 shadow-[0_0_30px_rgba(255,162,0,0.05)] sm:p-5">
              <img
                src={ecosystemImage}
                alt="Purveyor Ecosystem"
                className="w-full h-auto max-h-[460px] object-contain rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Future Ecosystem Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-center text-2xl section-label Gsemibold text-white mb-2">Future Ecosystem Components</h3>
          <div className="section-divider !mb-10" />
        </motion.div>

        <div className="desktop-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {FUTURE_COMPONENTS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                show: {
                  opacity: 1, y: 0, scale: 1,
                  transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="pvr-card p-5 flex flex-col gap-3 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFA200]/10 border border-[#FFA200]/20 flex items-center justify-center group-hover:bg-[#FFA200]/20 transition-colors">
                <Icon size={18} className="text-[#FFA200]" />
              </div>
              <h4 className="text-white Gsemibold text-lg">{title}</h4>
              <p className="text-gray-500 text-md Gregular leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mobile-slider">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {mobileSlides.map((slide, slideIndex) => (
                <div key={`mobile-slide-${slideIndex}`} className="min-w-full">
                  {slide.map(({ icon: Icon, title, desc }) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      className="pvr-card p-5 flex flex-col gap-3 group cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#FFA200]/10 border border-[#FFA200]/20 flex items-center justify-center group-hover:bg-[#FFA200]/20 transition-colors">
                        <Icon size={18} className="text-[#FFA200]" />
                      </div>
                      <h4 className="text-white Gsemibold text-lg">{title}</h4>
                      <p className="text-gray-500 text-md Gregular leading-relaxed">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
              disabled={activeSlide === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA200]/40 bg-[#1E1E1E] text-lg text-[#FFA200] transition disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous ecosystem cards"
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
                  aria-label={`Go to ecosystem slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveSlide((prev) => Math.min(mobileSlides.length - 1, prev + 1))}
              disabled={activeSlide === mobileSlides.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFA200]/40 bg-[#1E1E1E] text-lg text-[#FFA200] transition disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next ecosystem cards"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
