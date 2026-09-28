import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import coinImg from '../assets/token.png';

const TOKEN_INFO = [
  { label: 'Token Name',      value: 'Purveyor' },
  { label: 'Symbol',          value: 'PVR' },
  { label: 'Network',         value: 'BNB Smart Chain' },
  { label: 'Total Supply',    value: '1,000,000,000 PVR' },
  { label: 'Decimals',        value: '18' },
  { label: 'Reference Price', value: '$0.05' },
  { label: 'Sector',          value: 'Fintech + RWA' },
];

const AnimatedBar = ({ pct, color, visible }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setWidth(pct), 200);
      return () => clearTimeout(t);
    }
  }, [visible, pct]);
  return (
    <div className="w-full h-2 bg-[#2E2921] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: color }}
      />
    </div>
  );
};

const pillVariants = {
  hidden: { opacity: 0, x: -40 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Tokenomics = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tokenomics" className="py-6 sm:py-10 bg-[#171717] overflow-hidden" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">Tokenomics</p>
          <div className="section-divider mt-2" />
          <h2 className="text-3xl sm:text-4xl Gsemibold text-white mt-6 mb-3">
            Simple. Strategic. <span className="text-gradient">Built for Growth.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left — Token info pills with stagger */}
          <motion.div
            className="flex flex-col gap-3 w-full max-w-[620px] mx-auto lg:mx-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {TOKEN_INFO.map(({ label, value }, i) => (
              <motion.div
                key={`${label}-${i}`}
                custom={i}
                variants={pillVariants}
                className="flex items-center justify-between gap-4 rounded-full border border-[#FFA200]/20 bg-[#1E1E1E] px-5 py-3.5 shadow-[0_0_24px_rgba(255,162,0,0.06)]"
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,162,0,0.4)', transition: { duration: 0.2 } }}
              >
                <span className="text-gray-400 text-sm sm:text-base Gregular whitespace-nowrap">{label}</span>
                <span className="text-[#FFD996] Gsemibold text-sm sm:text-base text-right whitespace-nowrap">{value}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Token image */}
          <motion.div
            className="flex flex-col gap-4 items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-[780px] flex items-center justify-center p-4 overflow-hidden mx-auto">
              <div className="absolute inset-0" />
              <img
                src={coinImg}
                alt="PVR Token"
                className="relative z-10 block mx-auto w-full max-w-[420px] sm:max-w-[920px] object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
