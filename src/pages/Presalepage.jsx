
import { useState, useEffect, useCallback, createElement } from 'react';
import { Link } from 'react-router-dom';
import {
  Copy,
  CheckCircle,
  ExternalLink,
  Wallet,
  ArrowRight,
  Info,
  Coins,
  ClipboardList,
  Zap,
  Landmark,
  PencilLine,
  Rocket,
  Loader2,
  X,
} from 'lucide-react';
import { ethers } from 'ethers';
import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit/react';

import logo from '../assets/Logo Horizontal.png';
import { PRESALE_CONTRACT_ADDRESS } from '../config/contracts';

const PRESALE_CONTRACT = PRESALE_CONTRACT_ADDRESS;

const BSCSCAN = `https://bscscan.com/address/${PRESALE_CONTRACT}`;

const CHAIN_ID = '0x38';
const CHAIN_ID_NUMBER = 56n;
const BSC_RPC_URL = 'https://bsc-dataseed.bnbchain.org';

const PRESALE_ABI = [
  'function buyWithUSDT(uint256 usdtAmount) external returns (uint256)',
  'function getPvrAmount(uint256 usdtAmount) view returns (uint256)',
  'function pvrPrice() view returns (uint256)',
  'function pvrToken() view returns (address)',
  'function usdtToken() view returns (address)',
  'function presaleActive() view returns (bool)',
  'function purchasedPvr(address buyer) view returns (uint256)',
  'function maxPurchasePerWallet() view returns (uint256)',
];

const TOKEN_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
];

const formatNumber = (value, decimals = 2) => {
  const num = Number(value);

  if (!Number.isFinite(num)) return '0';

  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

const formatCompact = (value) => {
  const num = Number(value);

  if (!Number.isFinite(num)) return '0';

  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }

  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }

  return num.toFixed(2);
};

const getErrorMessage = (error) => {
  if (!error) return 'Transaction failed. Please try again.';

  if (error.code === 4001 || error.code === 'ACTION_REJECTED') {
    return 'Transaction rejected by user.';
  }

  if (error.shortMessage) {
    return error.shortMessage;
  }

  if (error.reason) {
    return error.reason;
  }

  if (error.message?.includes('insufficient funds')) {
    return 'Insufficient USDT balance for this transaction.';
  }

  return 'Transaction failed. Please try again.';
};

const STEPS = [
  {
    icon: <Wallet size={20} />,
    label: 'Connect Wallet',
    desc: 'Connect your MetaMask or compatible Web3 wallet.',
  },
  {
    icon: <Coins size={20} />,
    label: 'Pay With USDT',
    desc: 'Approve USDT on BNB Smart Chain to purchase PVR.',
  },
  {
    icon: <PencilLine size={20} />,
    label: 'Enter Amount',
    desc: 'Enter the amount of USDT you want to contribute.',
  },
  {
    icon: <ArrowRight size={20} />,
    label: 'Receive PVR',
    desc: 'PVR is transferred directly to your wallet after purchase.',
  },
];

const PRESALE_BENEFITS = [
  {
    icon: Rocket,
    title: 'Early Ecosystem Participation',
    desc: 'Gain early access to the Purveyor ecosystem before public listing.',
  },
  {
    icon: ClipboardList,
    title: 'Transparent Distribution',
    desc: 'PVR distribution is handled directly through the presale smart contract.',
  },
  {
    icon: Landmark,
    title: 'BNB Smart Chain',
    desc: 'Built on BNB Smart Chain with fast and accessible transactions.',
  },
  {
    icon: Zap,
    title: 'Future Utility',
    desc: 'PVR is designed to support future fintech, RWA, and ecosystem applications.',
  },
];

const PresalePage = () => {
  const { open } = useAppKit();
  const { address: connectedAddress, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const [walletAddress, setWalletAddress] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);

  const [usdtBalance, setUsdtBalance] = useState('0');
  const [usdtDecimals, setUsdtDecimals] = useState(18);
  const [pvrDecimals, setPvrDecimals] = useState(7);
  const [pvrBalance, setPvrBalance] = useState('0');

  const [pvrPrice, setPvrPrice] = useState(0);

  const [maxPurchase, setMaxPurchase] = useState('0');
  const [saleActive, setSaleActive] = useState(false);

  const [userPurchased, setUserPurchased] = useState('0');

  const [usdtAmt, setUsdtAmt] = useState('');

  const [estimatedPVR, setEstimatedPVR] = useState('0');

  const [copied, setCopied] = useState(false);

  const [loadingWallet, setLoadingWallet] = useState(false);
  const [buying, setBuying] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  /*
   * ---------------------------------------------------------
  * Switch connected wallet to BSC Mainnet
   * ---------------------------------------------------------
   */
  const switchToBSC = async (activeWalletProvider) => {
    if (!activeWalletProvider?.request) {
      throw new Error('Wallet provider is unavailable.');
    }

    try {
      await activeWalletProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }],
      });
    } catch (error) {
      if (error.code !== 4902) {
        throw error;
      }

      await activeWalletProvider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: CHAIN_ID,
              chainName: 'BNB Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: [
                'https://bsc-dataseed.bnbchain.org',
              ],
              blockExplorerUrls: [
                'https://bscscan.com',
              ],
            },
          ],
      });

      await activeWalletProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN_ID }],
      });
    }
  };

  /*
   * ---------------------------------------------------------
   * Connect Wallet
   * ---------------------------------------------------------
   */
  const connectWallet = async () => {
    try {
      setLoadingWallet(true);
      setMessage('');
      setMessageType('');

      await open();
    } catch (error) {
      console.error(error);

      setMessage(getErrorMessage(error));
      setMessageType('error');
    } finally {
      setLoadingWallet(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * Load Blockchain Data
   * ---------------------------------------------------------
   */
  const loadData = useCallback(
    async (currentProvider = provider, currentAddress = walletAddress) => {
      try {
        const activeProvider =
          currentProvider ||
          new ethers.JsonRpcProvider(BSC_RPC_URL);

        const presale = new ethers.Contract(
          PRESALE_CONTRACT,
          PRESALE_ABI,
          activeProvider
        );

        const [
          priceRaw,
          active,
          maxPurchaseRaw,
          usdtAddress,
          pvrAddress,
        ] = await Promise.all([
          presale.pvrPrice(),
          presale.presaleActive(),
          presale.maxPurchasePerWallet(),
          presale.usdtToken(),
          presale.pvrToken(),
        ]);

        const usdt = new ethers.Contract(
          usdtAddress,
          TOKEN_ABI,
          activeProvider
        );

        const [tokenDecimals, pvrTokenDecimals] = await Promise.all([
          usdt.decimals(),
          new ethers.Contract(
            pvrAddress,
            TOKEN_ABI,
            activeProvider
          ).decimals(),
        ]);

        setUsdtDecimals(Number(tokenDecimals));
        setPvrDecimals(Number(pvrTokenDecimals));

        setPvrPrice(Number(ethers.formatUnits(priceRaw, 18)));

        setMaxPurchase(
          ethers.formatUnits(maxPurchaseRaw, Number(pvrTokenDecimals))
        );
        setSaleActive(active);

        if (currentAddress) {
          const pvrToken = new ethers.Contract(
            pvrAddress,
            TOKEN_ABI,
            activeProvider
          );

          const [usdtBal, pvrBal, purchased] = await Promise.all([
            usdt.balanceOf(currentAddress),
            pvrToken.balanceOf(currentAddress),
            presale.purchasedPvr(currentAddress),
          ]);

          setUsdtBalance(
            ethers.formatUnits(usdtBal, Number(tokenDecimals))
          );

          setPvrBalance(
            ethers.formatUnits(pvrBal, Number(pvrTokenDecimals))
          );

          setUserPurchased(
            ethers.formatUnits(purchased, Number(pvrTokenDecimals))
          );
        }
      } catch (error) {
        console.error('Load blockchain data error:', error);
      }
    },
    [provider, walletAddress]
  );

  /*
   * ---------------------------------------------------------
   * Initial Blockchain Data
   * ---------------------------------------------------------
   */
  useEffect(() => {
    loadData();
  }, [loadData]);

  /*
   * ---------------------------------------------------------
   * Sync Reown wallet connection
   * ---------------------------------------------------------
   */
  useEffect(() => {
    let cancelled = false;

    const syncWallet = async () => {
      if (!isConnected || !connectedAddress || !walletProvider) {
        setProvider(null);
        setSigner(null);
        setWalletAddress('');
        setWalletConnected(false);
        setUsdtBalance('0');
        setPvrBalance('0');
        setUserPurchased('0');
        return;
      }

      try {
        const initialProvider = new ethers.BrowserProvider(walletProvider);
        const network = await initialProvider.getNetwork();

        if (network.chainId !== CHAIN_ID_NUMBER) {
          await switchToBSC(walletProvider);
        }

        const browserProvider = new ethers.BrowserProvider(walletProvider);
        const walletSigner = await browserProvider.getSigner(connectedAddress);

        if (cancelled) return;

        setProvider(browserProvider);
        setSigner(walletSigner);
        setWalletAddress(connectedAddress);
        setWalletConnected(true);
        setMessage('Wallet connected successfully.');
        setMessageType('success');
      } catch (error) {
        console.error(error);
        if (cancelled) return;

        setProvider(null);
        setSigner(null);
        setWalletAddress(connectedAddress);
        setWalletConnected(false);
        setMessage('Please switch your wallet to BNB Smart Chain.');
        setMessageType('error');
      }
    };

    syncWallet();
    return () => {
      cancelled = true;
    };
  }, [connectedAddress, isConnected, walletProvider]);

  /*
   * ---------------------------------------------------------
   * Calculate PVR from smart contract
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const calculateEstimate = async () => {
      try {
        if (!usdtAmt || Number(usdtAmt) <= 0) {
          setEstimatedPVR('0');
          return;
        }

        const amount = ethers.parseUnits(usdtAmt, usdtDecimals);

        const browserProvider =
          provider || new ethers.JsonRpcProvider(BSC_RPC_URL);

        const presale = new ethers.Contract(
          PRESALE_CONTRACT,
          PRESALE_ABI,
          browserProvider
        );

        const tokenAmount = await presale.getPvrAmount(amount);

        setEstimatedPVR(
          ethers.formatUnits(tokenAmount, pvrDecimals)
        );
      } catch (error) {
        console.error('Estimate error:', error);
        setEstimatedPVR('0');
      }
    };

    calculateEstimate();
  }, [usdtAmt, usdtDecimals, pvrDecimals, provider]);

  /*
   * ---------------------------------------------------------
   * Copy Presale Contract
   * ---------------------------------------------------------
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        PRESALE_CONTRACT
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      const el = Object.assign(
        document.createElement('textarea'),
        {
          value: PRESALE_CONTRACT,
        }
      );

      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };

  /*
   * ---------------------------------------------------------
   * Buy PVR
   * ---------------------------------------------------------
   */
  const handleBuy = async () => {
    try {
      setMessage('');
      setMessageType('');

      if (!walletConnected || !signer) {
        await connectWallet();
        return;
      }

      if (!usdtAmt || Number(usdtAmt) <= 0) {
        setMessage('Please enter USDT amount.');
        setMessageType('error');
        return;
      }

      if (!saleActive) {
        setMessage('Presale is not active right now.');
        setMessageType('error');
        return;
      }

      if (pvrDecimals !== 18) {
        setMessage(
          'PVR token decimals do not match the presale contract. Purchases are disabled.'
        );
        setMessageType('error');
        return;
      }

      if (Number(usdtAmt) > Number(usdtBalance)) {
        setMessage('Insufficient USDT balance.');
        setMessageType('error');
        return;
      }

      setBuying(true);

      const presale = new ethers.Contract(
        PRESALE_CONTRACT,
        PRESALE_ABI,
        signer
      );

      const usdtAddress = await presale.usdtToken();
      const usdt = new ethers.Contract(
        usdtAddress,
        TOKEN_ABI,
        signer
      );
      const amount = ethers.parseUnits(usdtAmt, usdtDecimals);
      const allowance = await usdt.allowance(
        walletAddress,
        PRESALE_CONTRACT
      );

      if (allowance < amount) {
        setMessage('Approve USDT in your wallet to continue...');
        setMessageType('success');

        const approvalTx = await usdt.approve(
          PRESALE_CONTRACT,
          amount
        );

        await approvalTx.wait();
      }

      const tx = await presale.buyWithUSDT(amount);

      setMessage(
        'Transaction submitted. Waiting for confirmation...'
      );
      setMessageType('success');

      await tx.wait();

      setMessage(
        'PVR purchased successfully! Tokens have been sent to your wallet.'
      );
      setMessageType('success');

      setUsdtAmt('');

      await loadData(provider, walletAddress);
    } catch (error) {
      console.error('Buy error:', error);

      setMessage(getErrorMessage(error));
      setMessageType('error');
    } finally {
      setBuying(false);
    }
  };

  const shortWallet = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '';

  const countdownTitle = saleActive
    ? 'Presale Active'
    : 'Presale Not Active';

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-x-hidden">

      {message && (
        <div
          role="status"
          className={`fixed top-20 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md ${
            messageType === 'success'
              ? 'border-emerald-500/30 bg-emerald-950/90 text-emerald-300'
              : 'border-red-500/30 bg-red-950/90 text-red-300'
          }`}
        >
          {messageType === 'success' ? (
            <CheckCircle size={18} className="mt-0.5 shrink-0" />
          ) : (
            <Info size={18} className="mt-0.5 shrink-0" />
          )}

          <p className="flex-1 text-sm leading-relaxed">
            {message}
          </p>

          <button
            type="button"
            onClick={() => {
              setMessage('');
              setMessageType('');
            }}
            className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-[#FFA200]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          <Link to="/">
            <img
              src={logo}
              alt="Purveyor PVR"
              className="h-14 sm:h-16 w-auto"
            />
          </Link>

          <div className="flex items-center gap-3">

            <Link
              to="/"
              className="text-gray-400 hover:text-[#FFA200] text-sm Gsemibold transition-colors"
            >
              ← Home
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

        {/* Hero */}
        <div className="relative overflow-hidden py-8 sm:py-10 bg-gradient-to-b from-[#0a0a0a] to-[#111111]">

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#FFA200 1px,transparent 1px),linear-gradient(90deg,#FFA200 1px,transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FFA200]/6 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFA200]/12 border border-[#FFA200]/30 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FFA200] animate-pulse" />

              <span className="text-[#FFD996] text-xs Gsemibold tracking-widest uppercase">
                PVR Token Presale
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl Gbold text-white leading-tight mb-4">
              Get Early Access to the
              <br />
              <span className="text-gradient">
                Purveyor Ecosystem
              </span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg Gregular max-w-5xl mx-auto leading-relaxed">
              Become an early participant in the Purveyor ecosystem
              and gain access to PVR during the token presale.
              
            </p>

          </div>
        </div>

        {/* Main */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* LEFT */}
            <div className="flex flex-col gap-6">
                <div className="rounded-2xl border border-[#FFA200]/25 bg-gradient-to-br from-[#2E2921] to-[#1E1E1E] p-6">

                <h3 className="text-center text-gray-400 text-sm Gsemibold uppercase tracking-widest ">
                  {countdownTitle}
                </h3>

                {/* <div className="bg-[#111111] border border-[#FFA200]/15 rounded-xl py-6 text-center">
                  <p className="text-gradient Gbold text-1xl sm:text-2xl leading-none">
                    {saleActive ? 'OPEN' : 'CLOSED'}
                  </p>
                  <p className="text-gray-500 text-[11px] Gregular mt-2 uppercase tracking-wide">
                    Read from presale contract
                  </p>
                </div> */}

              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4">

                <div className="rounded-2xl border border-gray-800/60 bg-[#1E1E1E] p-5">

                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    PVR Price
                  </p>

                  <p className="text-[#FFA200] Gbold text-xl mt-2">
                    ${formatNumber(pvrPrice, 4)}
                  </p>

                </div>

              </div>

              {/* Countdown */}
            

              {/* How to Participate */}
              <div className="rounded-2xl border border-gray-800/60 bg-[#1E1E1E] p-6">

                <h3 className="text-white Gsemibold text-base mb-5">
                  How to Participate
                </h3>

                <div className="flex flex-col gap-3">

                  {STEPS.map((step) => (

                    <div
                      key={step.label}
                      className="flex items-start gap-3"
                    >

                      <div className="w-8 h-8 rounded-full bg-[#FFA200]/10 border border-[#FFA200]/25 flex items-center justify-center text-[#FFA200] shrink-0">
                        {step.icon}
                      </div>

                      <div>

                        <p className="text-white Gsemibold text-sm">
                          {step.label}
                        </p>

                        <p className="text-gray-500 text-xs Gregular mt-0.5 leading-relaxed">
                          {step.desc}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Contract */}
              <div className="rounded-2xl border border-[#FFA200]/15 bg-[#1E1E1E] p-5">

                <p className="text-xs text-gray-500 Gregular mb-2 uppercase tracking-widest">
                  Presale Contract Address
                </p>

                <div className="flex items-center gap-2">

                  <p className="text-[#FFA200] font-mono text-xs flex-1 break-all">
                    {PRESALE_CONTRACT}
                  </p>

                  <button
                    onClick={handleCopy}
                    className="shrink-0 p-2 rounded-lg border border-[#FFA200]/25 hover:bg-[#FFA200]/10 text-[#FFA200] transition-colors"
                    title="Copy address"
                  >
                    {copied ? (
                      <CheckCircle
                        size={14}
                        className="text-emerald-400"
                      />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>

                  <a
                    href={BSCSCAN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-lg border border-[#FFA200]/25 hover:bg-[#FFA200]/10 text-[#FFA200] transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-6">

              <div
                className="rounded-2xl border border-[#FFA200]/30 bg-gradient-to-br from-[#1E1E1E] to-[#171717] overflow-hidden"
                style={{
                  boxShadow:
                    '0 0 50px rgba(255,162,0,0.08)',
                }}
              >

                <div className="px-6 py-5 border-b border-[#FFA200]/15 bg-gradient-to-r from-[#FFA200]/8 to-transparent">

                  <h2 className="text-white text-center Gbold text-xl">
                    Buy PVR
                  </h2>

                  {/* <p className="text-gray-500 text-center text-xs mt-1">
                    BNB Smart Chain Mainnet
                  </p> */}

                </div>

                <div className="p-6 flex flex-col gap-5">

                  {/* Wallet */}
                  <div>

                    <label className="block text-sm Gsemibold text-gray-300 mb-2">
                      <span className="text-[#FFA200] mr-1">
                        01.
                      </span>
                      Connect Your Wallet
                    </label>

                    <button
                      onClick={connectWallet}
                      disabled={loadingWallet}
                      className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl border Gsemibold text-sm transition-all duration-200 ${
                        walletConnected
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                          : 'bg-[#FFA200]/10 border-[#FFA200]/40 text-[#FFA200] hover:bg-[#FFA200]/20 hover:border-[#FFA200]/70'
                      }`}
                    >

                      {loadingWallet ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : walletConnected ? (
                        <CheckCircle size={18} />
                      ) : (
                        <Wallet size={18} />
                      )}

                      {loadingWallet
                        ? 'Connecting...'
                        : walletConnected
                        ? shortWallet
                        : 'Connect Wallet'}

                    </button>

                    {walletConnected && (
                      <div className="grid grid-cols-2 gap-3 mt-3">

                        <div className="bg-[#111111] border border-gray-800 rounded-xl p-3">

                          <p className="text-gray-500 text-[11px]">
                            USDT Balance
                          </p>

                          <p className="text-white Gsemibold text-sm mt-1">
                            {formatNumber(usdtBalance, 2)} USDT
                          </p>

                        </div>

                        <div className="bg-[#111111] border border-gray-800 rounded-xl p-3">

                          <p className="text-gray-500 text-[11px]">
                            PVR Balance
                          </p>

                          <p className="text-white Gsemibold text-sm mt-1">
                            {formatNumber(pvrBalance, 2)} PVR
                          </p>

                        </div>

                      </div>
                    )}

                  </div>

                  {/* Payment */}
                  <div>

                    <label className="block text-sm Gsemibold text-gray-300 mb-2">
                      <span className="text-[#FFA200] mr-1">
                        02.
                      </span>
                      Payment Token
                    </label>

                    <div className="w-full py-3 rounded-xl border border-[#FFA200] bg-[#FFA200]/10 text-center text-[#FFA200] text-sm Gsemibold">
                      USDT
                    </div>

                    <p className="text-gray-600 text-xs mt-1.5">
                      Approve the USDT token before purchasing PVR.
                    </p>

                  </div>

                  {/* Amount */}
                  <div>

                    <label className="block text-sm Gsemibold text-gray-300 mb-2">
                      <span className="text-[#FFA200] mr-1">
                        03.
                      </span>
                      Enter USDT Amount
                    </label>

                    <div className="relative">

                      <input
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="Enter USDT amount"
                        value={usdtAmt}
                        onChange={(e) =>
                          setUsdtAmt(e.target.value)
                        }
                        className="w-full bg-[#111111] border border-gray-700 focus:border-[#FFA200] text-white Gregular text-sm rounded-xl px-4 py-3.5 pr-16 outline-none transition-colors placeholder-gray-600"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFA200] text-sm Gsemibold">
                        USDT
                      </span>

                    </div>

                    <div className="flex justify-between mt-1.5 text-xs text-gray-600">
                      <span>Payment: USDT</span>
                      <span>
                        {Number(maxPurchase) > 0
                          ? `Max: ${formatNumber(maxPurchase, 2)} PVR`
                          : 'No wallet limit'}
                      </span>
                    </div>

                  </div>

                  {/* Estimate */}
                  <div className="rounded-xl bg-[#111111] border border-[#FFA200]/15 p-4">

                    <div className="flex items-center justify-between mb-1">

                      <span className="text-gray-400 text-xs Gregular">
                        <span className="text-[#FFA200] mr-1">
                          04.
                        </span>
                        You Receive (Estimated)
                      </span>

                      <Info
                        size={12}
                        className="text-gray-600"
                      />

                    </div>

                    <p className="text-gradient Gbold text-2xl">
                      {formatNumber(estimatedPVR, 4)} PVR
                    </p>

                    <p className="text-gray-500 text-xs Gregular mt-1">
                      Presale price: ${formatNumber(pvrPrice, 4)} per PVR.
                      Final amount is calculated by the smart contract.
                    </p>

                  </div>

                  {/* User Stats */}
                  {walletConnected && (
                    <div className="rounded-xl bg-[#111111] border border-gray-800 p-4">

                      <div className="flex justify-between text-xs mb-2">

                        <span className="text-gray-500">
                          Wallet limit
                        </span>

                        <span className="text-white Gsemibold">
                          {Number(maxPurchase) > 0
                            ? `${formatNumber(maxPurchase, 2)} PVR`
                            : 'None'}
                        </span>

                      </div>

                      <div className="flex justify-between text-xs">

                        <span className="text-gray-500">
                          PVR purchased
                        </span>

                        <span className="text-white Gsemibold">
                          {formatCompact(userPurchased)} PVR
                        </span>

                      </div>

                    </div>
                  )}

                  {/* Buy */}
                  <button
                    onClick={handleBuy}
                    disabled={buying || !saleActive}
                    className="btn-gold !flex mx-auto w-full max-w-[360px] py-3 px-6 text-base items-center justify-center gap-2"
                    style={{
                      opacity:
                        buying || !saleActive
                          ? 0.5
                          : 1,
                      cursor:
                        buying || !saleActive
                          ? 'not-allowed'
                          : 'pointer',
                    }}
                  >

                    {buying ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Processing...
                      </>
                    ) : !walletConnected ? (
                      <>
                        <Wallet size={18} />
                        Connect Wallet
                      </>
                    ) : !saleActive ? (
                      'Presale Not Active'
                    ) : (
                      <>
                        Buy PVR Now
                        <ArrowRight size={18} />
                      </>
                    )}

                  </button>

                  {/* <p className="text-center text-gray-600 text-[11px]">
                    Transactions are executed directly through the
                    PVR presale smart contract.
                  </p> */}

                  {/* Disclaimer */}
                  {/* <div className="flex gap-2 p-3 bg-[#FFA200]/5 border border-[#FFA200]/15 rounded-xl">

                    <Info
                      size={14}
                      className="text-[#FFA200] shrink-0 mt-0.5"
                    />

                    <p className="text-gray-500 text-xs Gregular leading-relaxed">
                      Participation involves digital-asset and market
                      risks. This is currently a BNB Smart Chain
                      Mainnet presale. Always verify the contract
                      address before interacting with a smart contract.
                    </p>

                  </div> */}

                </div>
              </div>

            </div>
          </div>

          {/* Benefits */}
          <div className="mt-16">

            <div className="text-center mb-10">

              <h2 className="text-2xl sm:text-3xl Gsemibold text-white mb-2">
                Presale{' '}
                <span className="text-gradient">
                  Benefits
                </span>
              </h2>

              <div className="section-divider" />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {PRESALE_BENEFITS.map(
                ({ icon, title, desc }) => (

                  <div
                    key={title}
                    className="pvr-card p-6 flex flex-col gap-4 text-center items-center group cursor-default"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-[#FFA200]/10 border border-[#FFA200]/20 flex items-center justify-center group-hover:bg-[#FFA200]/20 transition-colors">

                      {createElement(icon, {
                        size: 24,
                        className: 'text-[#FFA200]',
                      })}

                    </div>

                    <h4 className="text-white Gsemibold text-lg leading-snug">
                      {title}
                    </h4>

                    <p className="text-gray-400 text-md Gregular leading-relaxed">
                      {desc}
                    </p>

                  </div>

                )
              )}

            </div>
          </div>

          {/* Notice */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl border border-yellow-600/25 bg-yellow-500/5">

            <div className="flex gap-3">

              <Info
                size={18}
                className="text-yellow-400 shrink-0 mt-0.5"
              />

              <div>

                <p className="text-yellow-400 Gsemibold text-sm mb-1">
                  Presale Notice
                </p>

                <p className="text-gray-400 text-sm Gregular leading-relaxed">
                  The current PVR presale is deployed on BNB Smart
                  Chain Mainnet. The contract accepts USDT payments
                  and distributes PVR directly to your wallet after
                  the transaction is confirmed.
                  PVR immediately after a successful purchase.
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