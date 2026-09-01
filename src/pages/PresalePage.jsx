import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Copy, CheckCircle, ExternalLink, Wallet, ArrowRight, Info, Coins, ClipboardList, Zap, Landmark, PencilLine, Rocket } from 'lucide-react';
import logo from '../assets/Logo Horizontal.png';
import coinImg from '../assets/COIN.png';

const CONTRACT   = '0x594bf3E0d6e297f0178d5daa1700B39f3d54f2fB';
const BSCSCAN    = `https://bscscan.com/address/${CONTRACT}`;
const LISTING_PRICE = 0.05;

/* ── Countdown target (6 weeks from now — placeholder) ── */
const TARGET_DATE = new Date(Date.now() + 42 * 24 * 60 * 60 * 1000);

const pad = (n) => String(n).padStart(2, '0');

const useCountdown = (target) => {
  const calc = useCallback(() => {
    const diff = Math.max(0, target - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000)  / 60000),
      seconds: Math.floor((diff % 60000)    / 1000),
    };
  }, [target]);

  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return time;
};

const STEPS = [
  { icon: <Wallet size={20} />, label: 'Connect Wallet', desc: 'Connect your Web3 wallet (MetaMask, Trust Wallet, etc.)' },
  { icon: <Coins size={20} />, label: 'Select Payment', desc: 'Choose BNB or USDT as your payment currency' },
  { icon: <PencilLine size={20} />, label: 'Enter Amount', desc: 'Enter the amount you wish to contribute' },
  { icon: <ArrowRight size={20} />, label: 'Receive PVR', desc: 'Your PVR allocation is calculated per presale terms' },
];

const PRESALE_BENEFITS = [
  { icon: Rocket, title: 'Early Ecosystem Participation', desc: 'Gain early access to the PVR ecosystem before public listing.' },
  { icon: ClipboardList, title: 'Transparent Distribution', desc: 'PVR distribution details are clearly communicated to all participants.' },
  { icon: Landmark, title: 'BNB Smart Chain', desc: 'Fast and accessible blockchain infrastructure with low transaction costs.' },
  { icon: Zap, title: 'Future Utility', desc: 'PVR is designed to support future fintech, RWA, and ecosystem applications.' },
];

const PresalePage = () => {
  const time      = useCountdown(TARGET_DATE);
  const [copied, setCopied]       = useState(false);
  const [bnbAmt,  setBnbAmt]      = useState('');
  const [payment, setPayment]     = useState('BNB');
  const [walletConnected, setWalletConnected] = useState(false);

  /* BNB price placeholder */
  const BNB_PRICE = 600;
  const pvrEstimate = bnbAmt
    ? (((parseFloat(bnbAmt) || 0) * (payment === 'BNB' ? BNB_PRICE : 1)) / LISTING_PRICE).toLocaleString()
    : '0';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = Object.assign(document.createElement('textarea'), { value: CONTRACT });
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-x-hidden">

      {/* ── Sticky mini-nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#FFA200]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Purveyor PVR" className="h-14 sm:h-16 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-400 hover:text-[#FFA200] text-sm Gsemibold transition-colors ">
              ←  Home
            </Link>
            <a
              href={BSCSCAN}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs Gsemibold text-[#FFA200] border border-[#FFA200]/30 rounded-lg hover:bg-[#FFA200]/10 transition-colors"
            >
              <ExternalLink size={12} />
              BscScan
            </a>
          </div>
        </div>
      </nav>

      <div className="pt-16">

        {/* ── Hero banner ── */}
        <div className="relative overflow-hidden py-8 sm:py-10 bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#FFA200 1px,transparent 1px),linear-gradient(90deg,#FFA200 1px,transparent 1px)', backgroundSize: '50px 50px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FFA200]/6 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            {/* <div className="flex justify-center mb-6">
              <img src={coinImg} alt="PVR" className="w-20 h-20 sm:w-28 sm:h-28 object-contain animate-float drop-shadow-[0_0_30px_rgba(255,162,0,0.4)]" />
            </div> */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA200]/12 border border-[#FFA200]/30 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FFA200] animate-pulse" />
              <span className="text-[#FFD996] text-xs Gsemibold tracking-widest uppercase">PVR Token Presale</span>
            </div>
            <h1 className="text-3xl sm:text-5xl Gbold text-white leading-tight mb-4">
              Get Early Access to the<br />
              <span className="text-gradient">Purveyor Ecosystem</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg Gregular max-w-2xl mx-auto leading-relaxed">
              Become an early participant in the Purveyor ecosystem and gain access to PVR during
              the token presale. PVR is designed around a long-term vision combining Fintech,
              Real-World Assets, blockchain infrastructure, and ecosystem utility.
            </p>
          </div>
        </div>

        {/* ── Main presale content ── */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* ── Left — Presale details ── */}
            <div className="flex flex-col gap-6">

              {/* Details card */}
              {/* <div className="rounded-2xl border border-[#FFA200]/20 bg-gradient-to-br from-[#1E1E1E] to-[#171717] overflow-hidden gold-glow">
                <div className="px-6 py-4 border-b border-[#FFA200]/15 bg-[#FFA200]/5">
                  <h2 className="text-white Gsemibold text-lg">Presale Details</h2>
                </div>
                <div className="divide-y divide-[#FFA200]/8">
                  {[
                    { label: 'Token',          value: 'Purveyor' },
                    { label: 'Symbol',         value: 'PVR' },
                    { label: 'Network',        value: 'BNB Smart Chain' },
                    { label: 'Total Supply',   value: '1,000,000,000 PVR' },
                    { label: 'Presale Price',  value: 'TBA', highlight: true },
                    { label: 'Listing Price',  value: '$0.05', highlight: true },
                    { label: 'Presale Allocation', value: 'TBA' },
                    { label: 'Payment',        value: 'BNB / USDT' },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className="flex items-center justify-between px-6 py-3.5">
                      <span className="text-gray-400 text-sm Gregular">{label}</span>
                      <span className={`text-sm Gsemibold ${highlight ? 'text-[#FFA200]' : 'text-white'}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Progress bar */}
              <div className="rounded-2xl border border-[#FFA200]/20 bg-[#1E1E1E] p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white Gsemibold text-sm">Presale Progress</span>
                  <span className="text-[#FFA200] text-sm Gsemibold">0%</span>
                </div>
                <div className="w-full h-3 bg-[#2E2921] rounded-full overflow-hidden mb-3">
                  <div className="h-full w-0 rounded-full bg-gradient-to-r from-[#FFA200] to-[#FFD996] transition-all duration-1000" />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 Gregular">
                  <span>0 Raised</span>
                  <span>Target: TBA</span>
                </div>
              </div>

              {/* Countdown */}
              <div className="rounded-2xl border border-[#FFA200]/25 bg-gradient-to-br from-[#2E2921] to-[#1E1E1E] p-6">
                <h3 className="text-center text-gray-400 text-sm Gsemibold uppercase tracking-widest mb-5">
                  Presale Ends In
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { val: pad(time.days),    label: 'Days' },
                    { val: pad(time.hours),   label: 'Hours' },
                    { val: pad(time.minutes), label: 'Minutes' },
                    { val: pad(time.seconds), label: 'Seconds' },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center bg-[#111111] border border-[#FFA200]/15 rounded-xl py-4">
                      <p className="text-gradient Gbold text-3xl sm:text-4xl leading-none tabular-nums">{val}</p>
                      <p className="text-gray-500 text-[11px] Gregular mt-1.5 uppercase tracking-wide">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

               <div className="rounded-2xl border border-gray-800/60 bg-[#1E1E1E] p-6">
                <h3 className="text-white Gsemibold text-base mb-5">How to Participate</h3>
                <div className="flex flex-col gap-3">
                  {STEPS.map((step, i) => (
                    <div key={step.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FFA200]/10 border border-[#FFA200]/25 flex items-center justify-center text-[#FFA200] shrink-0 text-sm">
                        {typeof step.icon === 'string' ? step.icon : step.icon}
                      </div>
                      <div>
                        <p className="text-white Gsemibold text-sm">{step.label}</p>
                        <p className="text-gray-500 text-xs Gregular mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract */}
              <div className="rounded-2xl border border-[#FFA200]/15 bg-[#1E1E1E] p-5">
                <p className="text-xs text-gray-500 Gregular mb-2 uppercase tracking-widest">Contract Address (BEP-20)</p>
                <div className="flex items-center gap-2">
                  <p className="text-[#FFA200] font-mono text-xs flex-1 break-all">{CONTRACT}</p>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 p-2 rounded-lg border border-[#FFA200]/25 hover:bg-[#FFA200]/10 text-[#FFA200] transition-colors"
                    title="Copy address"
                  >
                    {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  <a href={BSCSCAN} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-lg border border-[#FFA200]/25 hover:bg-[#FFA200]/10 text-[#FFA200] transition-colors">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right — Buy widget ── */}
            <div className="flex flex-col gap-6">

              {/* Buy card */}
              <div className="rounded-2xl border border-[#FFA200]/30 bg-gradient-to-br from-[#1E1E1E] to-[#171717] overflow-hidden"
                style={{ boxShadow: '0 0 50px rgba(255,162,0,0.08)' }}>

                <div className="px-6 py-5 border-b border-[#FFA200]/15 bg-gradient-to-r from-[#FFA200]/8 to-transparent">
                  <h2 className="text-white items-center text-center Gbold text-xl">Buy PVR</h2>
                  {/* <p className="text-gray-400 text-sm Gregular mt-1">Participate in the PVR presale</p> */}
                </div>

                <div className="p-6 flex flex-col gap-5">

                  {/* Step 1 — Connect Wallet */}
                  <div>
                    <label className="block text-sm Gsemibold text-gray-300 mb-2">
                      <span className="text-[#FFA200] mr-1">01.</span> Connect Your Wallet
                    </label>
                    <button
                      onClick={() => setWalletConnected(!walletConnected)}
                      className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border Gsemibold text-sm transition-all duration-200 ${
                        walletConnected
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                          : 'bg-[#FFA200]/10 border-[#FFA200]/40 text-[#FFA200] hover:bg-[#FFA200]/20 hover:border-[#FFA200]/70'
                      }`}
                    >
                      {walletConnected ? <CheckCircle size={18} /> : <Wallet size={18} />}
                      {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                    </button>
                    <p className="text-gray-500 text-xs Gregular mt-1.5">
                      Connect a compatible Web3 wallet (MetaMask, Trust Wallet, etc.)
                    </p>
                  </div>

                  {/* Step 2 — Payment token */}
                  <div>
                    <label className="block text-sm Gsemibold text-gray-300 mb-2">
                      <span className="text-[#FFA200] mr-1">02.</span> Select Payment Token
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['BNB', 'USDT'].map((tok) => (
                        <button
                          key={tok}
                          onClick={() => setPayment(tok)}
                          className={`py-3 rounded-xl border text-sm Gsemibold transition-all duration-200 ${
                            payment === tok
                              ? 'bg-[#FFA200] border-[#FFA200] text-black shadow-[0_0_20px_rgba(255,162,0,0.3)]'
                              : 'bg-transparent border-gray-700 text-gray-400 hover:border-[#FFA200]/50 hover:text-[#FFD996]'
                          }`}
                        >
                          {tok}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3 — Amount */}
                  <div>
                    <label className="block text-sm Gsemibold text-gray-300 mb-2">
                      <span className="text-[#FFA200] mr-1">03.</span> Enter Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder={`Enter ${payment} amount`}
                        value={bnbAmt}
                        onChange={(e) => setBnbAmt(e.target.value)}
                        className="w-full bg-[#111111] border border-gray-700 focus:border-[#FFA200] text-white Gregular text-sm rounded-xl px-4 py-3.5 pr-16 outline-none transition-colors placeholder-gray-600"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFA200] text-sm Gsemibold">
                        {payment}
                      </span>
                    </div>
                  </div>

                  {/* Step 4 — Estimate */}
                  <div className="rounded-xl bg-[#111111] border border-[#FFA200]/15 p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs Gregular">
                        <span className="text-[#FFA200] mr-1">04.</span> You Receive (Estimated)
                      </span>
                      <Info size={12} className="text-gray-600" />
                    </div>
                    <p className="text-gradient Gbold text-2xl">{pvrEstimate} PVR</p>
                    <p className="text-gray-500 text-xs Gregular mt-1">
                      Based on {LISTING_PRICE} listing price. Final allocation per presale terms.
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    className="btn-gold mx-auto w-full max-w-[360px] py-2 px-6 text-base flex items-center justify-center"
                    disabled={!walletConnected}
                    style={{ opacity: walletConnected ? 1 : 0.5, cursor: walletConnected ? 'pointer' : 'not-allowed' }}
                  >
                    {walletConnected ? 'Buy PVR Now' : 'Connect Wallet'}
                  </button>

                  {/* Disclaimer */}
                  <div className="flex gap-2 p-3 bg-[#FFA200]/5 border border-[#FFA200]/15 rounded-xl">
                    <Info size={14} className="text-[#FFA200] shrink-0 mt-0.5" />
                    <p className="text-gray-500 text-[15px] Gregular leading-relaxed">
                      Participation involves digital-asset and market risks. Presale terms, allocation,
                      pricing, vesting, eligibility, and availability may vary according to the official
                      sale structure and applicable laws. Conduct your own research before participating.
                    </p>
                  </div>
                </div>
              </div>

              {/* How to buy steps */}
             

            </div>
          </div>

          {/* ── Presale Benefits ── */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl Gsemibold text-white mb-2">
                Presale <span className="text-gradient">Benefits</span>
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRESALE_BENEFITS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="pvr-card p-6 flex flex-col gap-4 text-center items-center group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFA200]/10 border border-[#FFA200]/20 flex items-center justify-center group-hover:bg-[#FFA200]/20 transition-colors">
                    <Icon size={24} className="text-[#FFA200]" />
                  </div>
                  <h4 className="text-white Gsemibold text-lg leading-snug">{title}</h4>
                  <p className="text-gray-400 text-md Gregular leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Presale notice ── */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl border border-yellow-600/25 bg-yellow-500/5">
            <div className="flex gap-3">
              <Info size={18} className="text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 Gsemibold text-sm mb-1">Presale Notice</p>
                <p className="text-gray-400 text-sm Gregular leading-relaxed">
                  Participation in the PVR presale involves digital-asset and market risks. Presale terms,
                  allocation, pricing, vesting, eligibility, and availability may vary according to the
                  official sale structure and applicable laws. Users should review the official documentation
                  and conduct their own research before participating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default PresalePage;
