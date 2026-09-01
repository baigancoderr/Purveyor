import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import coinImg from '../assets/COIN.png';

const HIGHLIGHTS = [
  { value: '1 Billion PVR', label: 'Total Supply' },
  { value: 'BNB Smart Chain', label: 'Blockchain Network' },
  { value: 'Fintech + RWA', label: 'Core Focus' },
  { value: '7 Decimals', label: 'Token Precision' },
];

const MARQUEE_ITEMS = [
  'BNB Smart Chain', 'Fintech & RWA', '1B Total Supply', '$0.05 Listing Price',
  'Decentralized Finance', 'Real-World Assets', 'Token Utility', 'BscScan Verified',
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const containerStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const Hero = () => (
  <section
    id="hero"
    className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#111111] pt-20"
  >
    {/* ── Background grid ── */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(#FFA200 1px, transparent 1px), linear-gradient(90deg, #FFA200 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />

    {/* ── Radial glow orbs ── */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#FFA200]/5 blur-[120px] pointer-events-none" />
    <div className="absolute top-1/2 left-[15%] w-[300px] h-[300px] rounded-full bg-[#FFD996]/4 blur-[80px] pointer-events-none" />
    <div className="absolute top-1/3 right-[10%] w-[250px] h-[250px] rounded-full bg-[#FFA200]/4 blur-[80px] pointer-events-none" />

    {/* ── Main content ── */}
    <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-5 lg:px-6 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 py-14 lg:py-16">

        {/* Left — Text */}
        <motion.div
          className="w-full lg:w-[65%] flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
          variants={containerStagger}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA200]/10 border border-[#FFA200]/25 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFA200] animate-pulse" />
            <span className="text-[#FFD996] text-xs Gsemibold tracking-widest uppercase">
              Fintech &amp; Real-World Asset Ecosystem
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl Gbold leading-[1.1] tracking-tight"
          >
            <span className="text-white">Powering the Future</span>
            <br />
            <span className="text-white"> of</span>
            <span className="text-gradient"> Digital Finance</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed Gregular"
          >
            Connecting Real-World Value with Digital Finance.
            Purveyor (PVR) is a blockchain-powered ecosystem built on BNB Smart Chain,
            designed to bridge digital assets, financial technology, and real-world economic value.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <Link to="/presale">
              <button className="btn-gold px-8 py-3.5 text-sm">
                Buy PVR Now
              </button>
            </Link>
            <Link to="/presale">
              <button className="btn-gold px-8 py-3.5 text-sm">
                whitepaper
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — Coin visual */}
        <motion.div
          className="w-full lg:w-[55%] relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer glow ring */}
          <div className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full border border-[#FFA200]/15 animate-rotate-slow" />
          <div className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] lg:w-[430px] lg:h-[430px] rounded-full border border-[#FFD996]/10 animate-[rotate-slow_15s_linear_infinite_reverse]" />
          {/* Glow bg */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-[320px] lg:h-[320px] rounded-full bg-[#FFA200]/10 blur-3xl" />
          {/* Coin */}
          <img
            src={coinImg}
            alt="PVR Coin"
            className="relative z-10 w-52 h-52 sm:w-72 sm:h-72 lg:w-[22rem] lg:h-[22rem] object-contain animate-float drop-shadow-[0_0_40px_rgba(255,162,0,0.3)]"
          />
        </motion.div>
      </div>
    </div>

    {/* ── Key Highlights ── */}
    <motion.div
      className="relative z-10 w-full border-t border-b border-[#FFA200]/15 bg-[#171717]/60 backdrop-blur-sm"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerStagger}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HIGHLIGHTS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              custom={i}
              className="text-center py-2"
            >
              <p className="text-gradient Gbold text-xl sm:text-2xl lg:text-3xl leading-tight">{value}</p>
              <p className="text-gray-400 text-xs sm:text-sm Gregular mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* ── Marquee ticker ── */}
    <div className="relative z-10 bg-[#FFA200]/8 border-b border-[#FFA200]/20 py-3 overflow-hidden">
      <Marquee gradient={false} speed={50} className="marquee-fade-left">
        {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, i) => (
          <span key={i} className="flex items-center gap-3 mx-6 text-sm Gsemibold text-[#FFD996]/70 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA200] inline-block" />
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  </section>
);

export default Hero;
