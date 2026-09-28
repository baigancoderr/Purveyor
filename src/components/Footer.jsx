import { Link } from 'react-router-dom';
import { Facebook, Twitter, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/Logo Horizontal.png';
import whitepaper from '../assets/whitepaper.pdf';
import { PVR_TOKEN_ADDRESS } from '../config/contracts';

const CONTRACT = PVR_TOKEN_ADDRESS;

const socialLinks = [
  { label: 'Facebook', href: '#',                                        icon: Facebook    },
  { label: 'Twitter',  href: '#',                                        icon: Twitter     },
  { label: 'Telegram', href: '#',                                        icon: MessageCircle },
  { label: 'BscScan',  href: `https://bscscan.com/address/${CONTRACT}`,  icon: ArrowUpRight },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] border-t border-[#FFA200]/20 mt-0">

      {/* Top gradient stripe */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#FFA200] to-transparent opacity-40" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">

        <motion.div
          className="grid grid-cols-1 gap-10 mb-12 lg:grid-cols-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-5 text-center lg:col-span-2 lg:items-start lg:text-left"
          >
            <a href="#hero" onClick={() => scrollTo('#hero')} className="inline-flex justify-center lg:justify-start">
              <img src={logo} alt="Purveyor PVR" className="h-20 w-auto" />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed w-full max-w-2xl lg:max-w-sm Gregular">
              Purveyor (PVR) is a blockchain-powered ecosystem focused on Fintech and
              Real-World Assets — connecting digital assets with real-world economic value
              through scalable infrastructure on BNB Smart Chain.
            </p>
            <div className="flex items-center justify-center gap-2 mt-1 lg:justify-start">
              <span className="text-xs text-gray-500 Gregular">Network:</span>
              <span className="text-xs text-[#FFA200] Gsemibold bg-[#FFA200]/10 px-2 py-0.5 rounded-full border border-[#FFA200]/20">
                BNB Smart Chain
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:contents">
            {/* Quick Links */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-4 text-center lg:col-span-1 lg:items-start lg:text-left"
            >
              <h3 className="text-white Gsemibold text-base">Quick Links</h3>
              <ul className="flex flex-col items-center gap-2.5 lg:items-start">
                {[
                  { label: 'Home',       href: '#hero' },
                  { label: 'Use Cases',  href: '#usecases' },
                  { label: 'Roadmap',    href: '#roadmap' },
                  { label: 'Ecosystem',  href: '#ecosystem' },
                  { label: 'Tokenomics', href: '#tokenomics' },
                  { label: 'FAQ',        href: '#faq' },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <button
                      onClick={() => scrollTo(href)}
                      className="text-gray-400 hover:text-[#FFA200] transition-colors text-sm Gregular text-center lg:text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center gap-4 text-center lg:col-span-1 lg:items-start lg:text-left"
            >
              <h3 className="text-white Gsemibold text-base">Resources</h3>
              <ul className="flex flex-col items-center gap-2.5 lg:items-start">
                <li>
                  <a href={whitepaper} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFA200] transition-colors text-sm Gregular">
                    Whitepaper
                  </a>
                </li>
                <li>
                  <button onClick={() => scrollTo('#contract')} className="text-gray-400 hover:text-[#FFA200] transition-colors text-sm Gregular text-center">
                    Contract Address
                  </button>
                </li>
                <li>
                  <a
                    href={`https://bscscan.com/address/${CONTRACT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#FFA200] transition-colors text-sm Gregular"
                  >
                    BscScan
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-4 text-center col-span-2 md:col-span-2 lg:col-span-1 lg:items-start lg:text-left"
            >
              <h3 className="text-white Gsemibold text-base">Social</h3>
              <ul className="flex items-center justify-center gap-3 flex-wrap mx-auto lg:mx-0 lg:justify-start">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center h-10 w-10 rounded-full border border-[#FFA200]/20 bg-[#FFA200]/5 text-[#FFA200] hover:bg-[#FFA200]/10 hover:border-[#FFA200]/40 transition-colors"
                      aria-label={label}
                      title={label}
                    >
                      <Icon size={16} />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#FFA200]/30 to-transparent mb-8" />

        {/* Risk Disclaimer */}
        <motion.div
          className="mb-8 p-4 bg-[#1E1E1E]/60 rounded-xl border border-gray-800/60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-gray-500 text-xs md:text-md leading-relaxed Gregular">
            <span className="text-gray-400 text-sm lg:text-lg Gsemibold">Risk Disclaimer: </span>
            Digital assets involve risk and may experience significant price volatility.
            Nothing on this website should be interpreted as financial, investment, legal, or tax advice.
            Future products, services, partnerships, RWA offerings, exchange listings, and ecosystem features
            are subject to development, availability, regulatory requirements, and third-party decisions.
            Users should conduct independent research and assess the risks before participating.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm Gregular text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span>© {year} Purveyor (PVR). All Rights Reserved.</span>
          <span className="text-center">
            <span className="text-gray-600">Fintech</span>
            <span className="mx-2 text-[#FFA200]/40">•</span>
            <span className="text-gray-600">Real-World Assets</span>
            <span className="mx-2 text-[#FFA200]/40">•</span>
            <span className="text-gray-600">Digital Finance</span>
          </span>
          <a href="https://purveyorpvr.com" className="hover:text-[#FFA200] transition-colors">
            purveyorpvr.com
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
