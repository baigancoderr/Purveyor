import { Target, Rocket, ShieldCheck, Globe, Zap, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import coinImg from '../assets/COIN.png';

const WHY_ITEMS = [
  {
    icon: Zap,
    title: 'Utility First',
    desc: 'Focused on developing practical applications around PVR for real ecosystem use.',
  },
  {
    icon: Building2,
    title: 'RWA Focused',
    desc: 'Designed around the growing opportunity of Real-World Asset infrastructure.',
  },
  {
    icon: ShieldCheck,
    title: 'Blockchain Powered',
    desc: 'Built on the BNB Smart Chain ecosystem for speed, security, and accessibility.',
  },
  {
    icon: Globe,
    title: 'Community Driven',
    desc: 'Community participation is central to long-term ecosystem growth and governance.',
  },
];

const MISSION_POINTS = [
  'Fintech applications',
  'RWA-related utilities',
  'Digital asset services',
  'Ecosystem partnerships',
  'Community participation',
  'Future decentralized applications',
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const About = () => (
  <section id="about" className="py-10 sm:py-12 bg-[#171717] overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">

      {/* Section label */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-label">About Us</p>
        <div className="section-divider mt-2" />
        <p className="text-gray-400 text-base sm:text-lg mt-5 max-w-2xl mx-auto Gregular leading-relaxed">
          Building a Bridge Between Blockchain &amp; Real-World Value
        </p>
      </motion.div>

      {/* Main content — two columns */}
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 mb-10">

        {/* Left — visual */}
        <motion.div
          className="relative flex-shrink-0 flex items-center justify-center w-full lg:w-[500px]"
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute w-40 h-40 " />
          <div className="relative z-10 p-4 md:p-10 flex flex-col items-center gap-6 ">
            <img src={coinImg} alt="PVR" className="w-30 h-30 object-contain " />
          </div>
        </motion.div>

        {/* Right — text */}
        <motion.div
          className="flex-1 flex flex-col gap-7"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} custom={0}>
            <h2 className="text-3xl sm:text-4xl Gsemibold text-white leading-tight mb-4">
              A <span className="text-gradient">Next-Generation</span> Blockchain Ecosystem
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed Gregular mb-4">
              Purveyor is designed as a next-generation blockchain ecosystem focused on the
              intersection of financial technology and Real-World Assets.
            </p>
            <p className="text-gray-400 text-base leading-relaxed Gregular">
              Rather than positioning PVR as simply another digital token, Purveyor is focused
              on building an ecosystem around utility, accessibility, partnerships, and long-term
              development that creates tangible value.
            </p>
          </motion.div>

          {/* Vision & Mission */}
          <div className="grid sm:grid-cols-2 gap-4">
            <motion.div variants={fadeUp} custom={1} className="pvr-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target size={20} className="text-[#FFA200]" />
                <h3 className="text-[#FFA200] Gsemibold text-lg">Our Vision</h3>
              </div>
              <p className="text-gray-400 text-md Gregular leading-relaxed">
                To connect real-world economic value with the opportunities of digital finance,
                leveraging scalable blockchain technology to create a more accessible, transparent,
                and efficient financial ecosystem for the future.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} className="pvr-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Rocket size={20} className="text-[#FFA200]" />
                <h3 className="text-[#FFA200] Gsemibold text-lg">Our Mission</h3>
              </div>
              <ul className="flex flex-col gap-1.5">
                {MISSION_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-gray-400 text-md Gregular">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFA200] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Why Purveyor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-center text-2xl section-label Gsemibold text-white mb-2">Why Purveyor?</h3>
        <div className="section-divider !mb-10" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {WHY_ITEMS.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.92 },
              show: {
                opacity: 1, y: 0, scale: 1,
                transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="pvr-card p-6 flex flex-col items-start gap-4 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-[#FFA200]/10 border border-[#FFA200]/20 flex items-center justify-center group-hover:bg-[#FFA200]/20 transition-colors">
              <Icon size={22} className="text-[#FFA200]" />
            </div>
            <div>
              <h4 className="text-white Gsemibold text-lg mb-2">{title}</h4>
              <p className="text-gray-400 text-md Gregular leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default About;
