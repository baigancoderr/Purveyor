import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fintechImg    from '../assets/usecase/fintech.png';
import realEstateImg from '../assets/usecase/realestate.png';
import ecosystemImg  from '../assets/usecase/ecosytem.png';
import rewardImg     from '../assets/usecase/reward.png';
import partnershipImg from '../assets/usecase/partnership.png';

const USE_CASES = [
  {
    id: 'fintech',
    title: 'Fintech',
    tagline: 'Digital Financial Services',
    color: '#FFA200',
    image: fintechImg,
    desc: 'PVR can support future fintech-oriented applications and digital financial services within the ecosystem.',
    note: 'Actual fintech product offerings, integrations, and service deployment will depend on platform requirements,  and applicable regulatory considerations.',
    points: ['Platform access', 'Ecosystem transactions', 'Financial technology integrations', 'Digital service utilities', 'User incentives', 'Partner services'],
  },
  {
    id: 'rwa',
    title: 'Real-World Assets',
    tagline: 'Tokenized Asset Infrastructure',
    color: '#FFD996',
    image: realEstateImg,
    desc: "Real-World Assets represent one of Purveyor's primary areas of focus. The future ecosystem may explore blockchain infrastructure for eligible real-world assets.",
    note: 'Actual RWA products and offerings will depend on applicable regulations, asset structures, custody, compliance, and jurisdiction.',
    points: ['Real estate', 'Commodities', 'Business assets', 'Financial assets', 'Infrastructure', 'Other tokenizable economic assets'],
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem Access',
    tagline: 'PVR-Powered Services',
    color: '#FFCB71',
    image: ecosystemImg,
    desc: 'PVR can provide utility across future Purveyor products and services. As the ecosystem expands, additional utility can be introduced around the PVR token.',
    note: 'Ecosystem access, service availability, and product rollout will depend on operational readiness, infrastructure design, and market conditions.',
    points: ['PVR → Platform → Services → Ecosystem', 'Future platform integrations', 'Service layer access', 'Utility expansion over time', 'Cross-product compatibility'],
  },
  {
    id: 'community',
    title: 'Community Rewards',
    tagline: 'Participation Programs',
    color: '#FFA200',
    image: rewardImg,
    desc: 'PVR can be used within future community reward and participation programs, incentivizing engagement across the ecosystem.',
    note: 'Community rewards, referral incentives, and participation structures may vary based on campaign rules, region, and compliance requirements.',
    points: ['Community campaigns', 'Contributor rewards', 'Referral initiatives', 'Ecosystem participation', 'Promotional programs'],
  },
  {
    id: 'partners',
    title: 'Partner Integrations',
    tagline: 'Strategic Ecosystem Partners',
    color: '#FFD996',
    image: partnershipImg,
    desc: 'Purveyor aims to connect with fintech, RWA, blockchain, and technology partners to expand the PVR ecosystem.',
    note: 'Any future partner integrations, commercial arrangements, and ecosystem collaborations will be subject to agreement terms, applicable laws, and due diligence review.',
    points: ['Fintech platforms', 'RWA businesses', 'Web3 applications', 'Payment technology', 'Digital asset infrastructure', 'Strategic business partners'],
  },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const UseCases = () => {
  const [active, setActive] = useState('fintech');
  const current = USE_CASES.find((u) => u.id === active);

  return (
    <section id="usecases" className="overflow-hidden bg-[#1E1E1E] py-6 sm:py-10">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">Use Cases</p>
          <div className="section-divider mt-2" />
          <h2 className="mt-6 mb-3 text-3xl sm:text-4xl Gsemibold text-white">
            One Token. <span className="text-gradient">Multiple Possibilities.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg Gregular">
            PVR is designed to become a utility layer across the Purveyor ecosystem.
          </p>
        </motion.div>

        {/* Tab buttons with stagger */}
        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {USE_CASES.map(({ id, title }) => (
            <motion.button
              key={id}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 12 },
                show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActive(id)}
              className={`rounded-full border px-4 py-2.5 text-sm Gsemibold transition-all duration-200 sm:px-5 ${
                active === id
                  ? 'border-[#FFA200] bg-[#FFA200] text-black shadow-[0_0_20px_rgba(255,162,0,0.35)]'
                  : 'border-gray-700 bg-transparent text-gray-400 hover:border-[#FFA200]/50 hover:text-[#FFD996]'
              }`}
            >
              {title}
            </motion.button>
          ))}
        </motion.div>

        {/* Active use-case card */}
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[28px] border border-[#FFA200]/20 bg-gradient-to-br from-[#2E2921] to-[#1A1A1A] shadow-[0_0_40px_rgba(255,162,0,0.04)]"
            >
              <div
                className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full blur-[60px] opacity-20"
                style={{ background: current.color }}
              />

              <div className="relative z-10 grid grid-cols-1 gap-0 lg:grid-cols-[1.05fr_1.35fr]">
                {/* Left image panel */}
                <div className="relative min-h-[200px] md:min-h-[400px] overflow-hidden">
                  <motion.img
                    key={current.id + '-img'}
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span
                      className="mb-3 inline-block rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] Gsemibold"
                      style={{ color: current.color, borderColor: `${current.color}55`, background: `${current.color}12` }}
                    >
                      {current.tagline}
                    </span>
                    <h3 className="text-3xl text-white Gbold sm:text-4xl">{current.title}</h3>
                  </div>
                </div>

                {/* Right content panel */}
                <motion.div
                  className="flex flex-col justify-center p-6 sm:p-8 lg:p-10"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
                >
                  <motion.p
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                    className="mb-6 text-md leading-relaxed text-gray-300 Gregular sm:text-xl"
                  >
                    {current.desc}
                  </motion.p>

                  {current.note && (
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                      className="mb-6 border-l-2 border-[#FFA200]/30 pl-4 text-sm leading-relaxed text-gray-500 Gregular sm:text-lg"
                    >
                      {current.note}
                    </motion.p>
                  )}

                  <motion.div
                    className="grid gap-3 sm:grid-cols-2"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                  >
                    {current.points.map((point) => (
                      <motion.div
                        key={point}
                        variants={{
                          hidden: { opacity: 0, x: -12 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                        }}
                        whileHover={{ y: -2, transition: { duration: 0.15 } }}
                        className="rounded-2xl border border-[#FFA200]/10 bg-[#111111]/60 p-3 transition-all duration-200 hover:border-[#FFA200]/30 hover:bg-[#111111]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: current.color }} />
                          <span className="text-sm text-gray-200 Gregular">{point}</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UseCases;
