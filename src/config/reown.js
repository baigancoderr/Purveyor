import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { bsc } from '@reown/appkit/networks';

const projectId =
  import.meta.env.VITE_REOWN_PROJECT_ID ||
  'b56e18d47c72ab683b10814fe9495694';
const appUrl =
  typeof window === 'undefined'
    ? 'https://purveyorpvr.com'
    : window.location.origin;

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [bsc],
  projectId,
  metadata: {
    name: 'Purveyor PVR',
    description: 'Purveyor PVR token presale',
    url: appUrl,
  },
  features: {
    analytics: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#FFA200',
    '--w3m-border-radius-master': '8px',
  },
});