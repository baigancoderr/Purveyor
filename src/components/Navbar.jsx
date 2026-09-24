import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Logo Horizontal.png';
import whitepaper from '../assets/whitepaper.pdf';

const NAV_LINKS = [
  { label: 'Home',        href: '#hero' },
  { label: 'About',       href: '#about' },
  { label: 'Use Cases',   href: '#usecases' },
  { label: 'Roadmap',     href: '#roadmap' },
  { label: 'Ecosystem',   href: '#ecosystem' },
  { label: 'Tokenomics',  href: '#tokenomics' },
  { label: 'FAQ',         href: '#faq' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-lg border-b border-[#FFA200]/20 shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-2 xl:px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <motion.a
            href="#hero"
            onClick={() => handleNav('#hero')}
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={logo} alt="Purveyor PVR" className="h-16 !xl:h-16 !xl:h-20 w-auto" />
          </motion.a>

          {/* Desktop links */}
          <motion.ul
            className="hidden lg:flex items-center gap-1 Gsemibold"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
            }}
          >
            {NAV_LINKS.map((link) => (
              <motion.li
                key={link.label}
                variants={{
                  hidden: { opacity: 0, y: -12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <button
                  onClick={() => handleNav(link.href)}
                  className="px-3 py-2 text-sm xl:text-md text-gray-300 hover:text-[#FFA200] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FFA200] to-[#FFD996] group-hover:w-full transition-all duration-300 rounded-full" />
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right CTAs */}
          <motion.div
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/presale">
              <button className="nav-btn-gold px-6 py-2.5 text-sm">Buy Now</button>
            </Link>
            <a href={whitepaper} target="_blank" rel="noopener noreferrer">
              <button className="nav-btn-gold px-6 py-2.5 text-sm">Whitepaper</button>
            </a>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-[#FFA200] border border-[#FFA200]/30 rounded-lg hover:bg-[#FFA200]/10 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-lg border-b border-[#FFA200]/20"
          >
            <motion.div
              className="px-4 py-4 flex flex-col gap-1 Gsemibold"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  onClick={() => handleNav(link.href)}
                  className="text-center px-3 py-3 text-gray-300 hover:text-[#FFA200] hover:bg-[#FFA200]/5 rounded-lg transition-colors text-sm border-b border-gray-800/50 w-full"
                >
                  {link.label}
                </motion.button>
              ))}


           


            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </motion.nav>
  );
};

export default Navbar;
