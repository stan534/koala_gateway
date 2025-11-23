import { getAvailableEthereumNetworks } from '../../chains/ethereum/ethereum.utils';
import { AvailableNetworks } from '../../services/base';
import { ConfigManagerV2 } from '../../services/config-manager-v2';

export namespace KoalaSwapConfig {
  // Supported networks for Koala Swap
  // Currently supports Unit Zero Mainnet (koala network)
  // 'mainnet' is an alias for 'koala' network
  export const chain = 'ethereum';
  export const networks = getAvailableEthereumNetworks().filter((network) => ['koala', 'mainnet'].includes(network));
  export type Network = string;

  // Supported trading types
  export const tradingTypes = ['amm', 'clmm', 'router'] as const;

  export interface RootConfig {
    // Global configuration
    slippagePct: number;
    maximumHops: number;

    // Available networks
    availableNetworks: Array<AvailableNetworks>;
  }

  export const config: RootConfig = {
    slippagePct: ConfigManagerV2.getInstance().get('koala-swap.slippagePct'),
    maximumHops: ConfigManagerV2.getInstance().get('koala-swap.maximumHops') || 4,

    availableNetworks: [
      {
        chain,
        networks: networks,
      },
    ],
  };
}
