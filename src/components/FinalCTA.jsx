import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import whitepaper from '../assets/whitepaper.pdf';

const STATS = [
  { value: '1B',   label: 'PVR Total Supply' },
  { value: '$0.05',label: 'Listing Price' },
  { value: 'BSC',  label: 'Blockchain' },
  { value: '18',    label: 'Token Decimals' },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const FinalCTA = () => (
  <section className="relative py-6 sm:py-10 bg-[#171717] overflow-hidden">
    {/* Background orb */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFA200]/6 blur-[100px]" />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA200]/10 border border-[#FFA200]/25 rounded-full mb-6"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="w-2 h-2 rounded-full bg-[#FFA200] animate-pulse" />
        <span className="text-[#FFD996] text-xs Gsemibold tracking-widest uppercase">Join the Ecosystem</span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        className="text-3xl sm:text-5xl lg:text-6xl Gbold text-white leading-tight mb-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        The Future of Digital Finance{' '}
        <span className="text-gradient">Starts Here</span>
      </motion.h2>

      {/* Sub */}
      <motion.p
        className="text-gray-300 text-base sm:text-lg Gregular max-w-2xl mx-auto mb-10 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        Purveyor is building an ecosystem designed to connect blockchain technology,
        fintech, and real-world value. Join the PVR ecosystem today.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Link to="/presale">
            <button className="btn-gold px-10 py-2 text-base">Buy PVR</button>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <a href={whitepaper} target="_blank" rel="noopener noreferrer">
            <button className="btn-gold px-10 py-2 text-base">whitepaper</button>
          </a>
        </motion.div>
      </motion.div>

      {/* Stats strip with stagger */}
      {/* <motion.div
        className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {STATS.map(({ value, label }) => (
          <motion.div
            key={label}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.88 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
            whileHover={{ y: -4, scale: 1.04, transition: { duration: 0.2 } }}
            className="text-center py-4 border border-[#FFA200]/15 rounded-xl bg-[#1E1E1E]/60"
          >
            <p className="text-gradient Gbold text-2xl sm:text-3xl">{value}</p>
            <p className="text-gray-500 text-xs Gregular mt-1">{label}</p>
          </motion.div>
        ))}
      </motion.div> */}
    </div>
  </section>
);

export default FinalCTA;
