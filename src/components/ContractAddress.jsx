import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import bscscanLogo from '../assets/bscscan.png';
import { PVR_TOKEN_ADDRESS } from '../config/contracts';

const CONTRACT = PVR_TOKEN_ADDRESS;
const BSCSCAN_URL = `https://bscscan.com/address/${CONTRACT}`;

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const ContractAddress = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTRACT);
      } else {
        const el = document.createElement('textarea');
        el.value = CONTRACT;
        el.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <section id="contract" className="py-6 sm:py-12 bg-[#1E1E1E] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">Contract Address</p>
          <div className="section-divider mt-2" />
          <p className="text-gray-400 text-base Gregular mt-4 max-w-lg mx-auto">
            PVR is deployed on the BNB Smart Chain. Always verify the official contract address
            before purchasing or interacting with PVR.
          </p>
        </motion.div>

        {/* Contract card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border border-[#FFA200]/25 bg-gradient-to-br from-[#2E2921] to-[#1E1E1E] p-6 sm:p-10 text-center overflow-hidden"
          style={{ boxShadow: '0 0 60px 8px rgba(255, 170, 0, 0.08)' }}
        >
          <div className="absolute inset-0 bg-[#FFA200]/3 rounded-2xl pointer-events-none" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA200]/10 border border-[#FFA200]/25 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFA200] animate-pulse" />
              <span className="text-[#FFD996] text-xs Gsemibold tracking-widest uppercase">BNB Smart Chain</span>
            </motion.div>

            {/* Contract address row */}
            <motion.div
              variants={fadeUp}
              className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#FFA200]/20 bg-[#111111] px-3 sm:px-4 py-3 group"
            >
              <p className="min-w-0 flex-1 text-[#FFA200] font-mono text-[10px] sm:text-lg md:text-xl break-all text-center leading-relaxed">
                {CONTRACT}
              </p>
              <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                className={`flex items-center justify-center h-10 w-10 rounded-lg border transition-all duration-300 shrink-0 ${
                  copied
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                    : 'bg-[#FFA200]/10 border-[#FFA200]/30 text-[#FFD996] hover:bg-[#FFA200]/15'
                }`}
                aria-label="Copy contract address"
                title={copied ? 'Copied' : 'Copy contract address'}
              >
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </motion.button>
            </motion.div>

            {/* BscScan button */}
            <motion.div variants={fadeUp} className="flex items-center justify-center">
              <motion.a
                href={BSCSCAN_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center bg-[#fff] gap-2.5 px-6 py-3 rounded-xl border border-[#FFA200]/30 text-[#FFA200] hover:bg-[#FFA200]/10 hover:border-[#FFA200]/60 transition-all duration-200 Gsemibold text-sm"
              >
                <img src={bscscanLogo} alt="BscScan" className="h-4 w-4 sm:h-5 sm:w-5 object-contain" />
                View on BscScan
              </motion.a>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              variants={fadeUp}
              className="text-gray-500 text-md Gregular max-w-sm mx-auto leading-relaxed"
            >
              Always verify the official contract address before purchasing or interacting with PVR.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContractAddress;
