import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import whitepaper from '../assets/whitepaper.pdf';
import { PVR_TOKEN_ADDRESS } from '../config/contracts';

const FAQS = [
  {
    q: 'What is Purveyor?',
    a: "Purveyor is a blockchain-based ecosystem focused on Fintech and Real-World Assets, with PVR serving as the ecosystem's native utility token. It is designed to connect digital assets, financial technology, and real-world economic value through scalable blockchain infrastructure.",
  },
  {
    q: 'What is the PVR token?',
    a: 'PVR is the native utility token of the Purveyor ecosystem. It is designed to power future fintech applications, RWA-related utilities, digital asset services, ecosystem partnerships, community participation, and decentralized applications within the Purveyor ecosystem.',
  },
  {
    q: 'Which blockchain does PVR use?',
    a: 'PVR operates on the BNB Smart Chain (BSC). It is a BEP-20 standard token, benefiting from fast transaction speeds, low fees, and broad ecosystem compatibility.',
  },
  {
    q: 'What is the total supply of PVR?',
    a: 'The total supply is 1,000,000,000 PVR, equivalent to 100 Crore PVR. This supply is strategically distributed across liquidity, ecosystem development, community rewards, treasury, marketing, team, public sale, and private/strategic allocations.',
  },
  {
    q: 'What does Real-World Asset (RWA) mean in this context?',
    a: "Real-World Assets refer to tangible or financial assets — such as real estate, commodities, business assets, financial instruments, and infrastructure — that can potentially be represented or tokenized on a blockchain. Purveyor's future ecosystem may explore infrastructure for eligible RWA applications, subject to regulatory requirements and applicable compliance standards.",
  },
  {
    q: 'How many decimals does PVR have?',
    a: 'PVR has 7 decimals, which allows for precise fractional token amounts in transactions and ecosystem interactions.',
  },
  {
    q: 'What is the reference listing price for PVR?',
    a: 'The reference listing price for PVR is $0.05. This represents the anticipated listing price on exchanges and DEX platforms.',
  },
  {
    q: 'Where can I buy PVR?',
    a: `Always verify the official contract address (${PVR_TOKEN_ADDRESS}) before purchasing.`,
  },
];

const FAQItem = ({ q, a, isOpen, onToggle, index }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] },
      },
    }}
    className={`faq-item overflow-hidden transition-all duration-300 ${isOpen ? 'open' : ''}`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left"
      aria-expanded={isOpen}
    >
      <span className="text-white Gsemibold text-md sm:text-lg leading-snug pr-4">{q}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`shrink-0 w-8 h-8 rounded-full border border-[#FFA200]/30 flex items-center justify-center text-[#FFA200] ${
          isOpen ? 'bg-[#FFA200]/15' : 'bg-transparent'
        }`}
      >
        <ChevronDown size={16} />
      </motion.span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="px-5 sm:px-7 pb-5 border-t border-[#FFA200]/10 pt-4">
            <p className="text-gray-400 text-md Gregular leading-relaxed">{a}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-6 sm:py-10 bg-[#111111] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">FAQ</p>
          <div className="section-divider mt-2" />
          <h2 className="text-3xl sm:text-4xl Gsemibold text-white mt-6 mb-3">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400 text-base Gregular max-w-lg mx-auto">
            Everything you need to know about Purveyor and the PVR token.
          </p>
        </motion.div>

        {/* Accordion with stagger */}
        <motion.div
          className="flex flex-col gap-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              index={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm Gregular">
            Have more questions?{' '}
            <a href={whitepaper} target="_blank" rel="noopener noreferrer" className="text-[#FFA200] hover:underline transition-colors">
              Read the Whitepaper
            </a>{' '}
            for detailed information.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
