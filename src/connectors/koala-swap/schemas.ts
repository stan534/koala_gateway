import { Type } from '@sinclair/typebox';

import { getEthereumChainConfig } from '../../chains/ethereum/ethereum.config';

import { KoalaSwapConfig } from './koala-swap.config';

// Get chain config for defaults
const ethereumChainConfig = getEthereumChainConfig();

// Constants for examples
const BASE_TOKEN = 'WETH';
const QUOTE_TOKEN = 'USDC';
const SWAP_AMOUNT = 0.001;
const CLMM_POOL_ADDRESS_EXAMPLE = '0x0000000000000000000000000000000000000000'; // Example Koala Swap V3 pool

// ========================================
// AMM Request Schemas
// ========================================

export const KoalaSwapAmmGetPoolInfoRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  poolAddress: Type.String({
    description: 'Koala Swap V2 pool address',
    examples: [CLMM_POOL_ADDRESS_EXAMPLE],
  }),
});

// Koala Swap AMM Add Liquidity Request
export const KoalaSwapAmmAddLiquidityRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will add liquidity',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  poolAddress: Type.String({
    description: 'Address of the Koala Swap V2 pool',
  }),
  baseTokenAmount: Type.Number({
    description: 'Amount of base token to add',
  }),
  quoteTokenAmount: Type.Number({
    description: 'Amount of quote token to add',
  }),
  slippagePct: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 100,
      description: 'Maximum acceptable slippage percentage',
      default: KoalaSwapConfig.config.slippagePct,
    }),
  ),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// Koala Swap AMM Remove Liquidity Request
export const KoalaSwapAmmRemoveLiquidityRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will remove liquidity',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  poolAddress: Type.String({
    description: 'Address of the Koala Swap V2 pool',
  }),
  percentageToRemove: Type.Number({
    minimum: 0,
    maximum: 100,
    description: 'Percentage of liquidity to remove',
  }),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// Koala Swap AMM Execute Swap Request
export const KoalaSwapAmmExecuteSwapRequest = Type.Object({
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will execute the swap',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  network: Type.Optional(
    Type.String({
      description: 'The blockchain network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  baseToken: Type.String({
    description: 'Token to determine swap direction',
    examples: [BASE_TOKEN],
  }),
  quoteToken: Type.String({
    description: 'The other token in the pair',
    examples: [QUOTE_TOKEN],
  }),
  amount: Type.Number({
    description: 'Amount of base token to trade',
    examples: [SWAP_AMOUNT],
  }),
  side: Type.String({
    description:
      'Trade direction - BUY means buying base token with quote token, SELL means selling base token for quote token',
    enum: ['BUY', 'SELL'],
  }),
  slippagePct: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 100,
      description: 'Maximum acceptable slippage percentage',
      default: KoalaSwapConfig.config.slippagePct,
      examples: [1],
    }),
  ),
  poolAddress: Type.Optional(
    Type.String({
      description: 'Pool address (optional - can be looked up from tokens)',
    }),
  ),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// ========================================
// CLMM Request Schemas
// ========================================

export const KoalaSwapClmmGetPoolInfoRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  poolAddress: Type.String({
    description: 'Koala Swap V3 pool address',
    examples: [CLMM_POOL_ADDRESS_EXAMPLE],
  }),
});

// ========================================
// Router Request Schemas
// ========================================

// Koala Swap-specific quote-swap request
export const KoalaSwapQuoteSwapRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  baseToken: Type.String({
    description: 'First token in the trading pair',
    examples: [BASE_TOKEN],
  }),
  quoteToken: Type.String({
    description: 'Second token in the trading pair',
    examples: [QUOTE_TOKEN],
  }),
  amount: Type.Number({
    description: 'Amount of base token to trade',
    examples: [SWAP_AMOUNT],
  }),
  side: Type.String({
    description:
      'Trade direction - BUY means buying base token with quote token, SELL means selling base token for quote token',
    enum: ['BUY', 'SELL'],
  }),
  slippagePct: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 100,
      description: 'Maximum acceptable slippage percentage',
      default: KoalaSwapConfig.config.slippagePct,
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address for more accurate quotes (optional)',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
});

// Koala Swap-specific quote-swap response
export const KoalaSwapQuoteSwapResponse = Type.Object({
  quoteId: Type.String({
    description: 'Unique identifier for this quote',
  }),
  tokenIn: Type.String({
    description: 'Address of the token being swapped from',
  }),
  tokenOut: Type.String({
    description: 'Address of the token being swapped to',
  }),
  amountIn: Type.Number({
    description: 'Amount of tokenIn to be swapped',
  }),
  amountOut: Type.Number({
    description: 'Expected amount of tokenOut to receive',
  }),
  price: Type.Number({
    description: 'Exchange rate between tokenIn and tokenOut',
  }),
  priceImpactPct: Type.Number({
    description: 'Estimated price impact percentage (0-100)',
  }),
  minAmountOut: Type.Number({
    description: 'Minimum amount of tokenOut that will be accepted',
  }),
  maxAmountIn: Type.Number({
    description: 'Maximum amount of tokenIn that will be spent',
  }),
  routePath: Type.Optional(
    Type.String({
      description: 'Human-readable route path',
    }),
  ),
});

// Koala Swap-specific execute-quote request
export const KoalaSwapExecuteQuoteRequest = Type.Object({
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will execute the swap',
      default: ethereumChainConfig.defaultWallet,
      examples: [ethereumChainConfig.defaultWallet],
    }),
  ),
  network: Type.Optional(
    Type.String({
      description: 'The blockchain network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  quoteId: Type.String({
    description: 'ID of the quote to execute',
    examples: ['123e4567-e89b-12d3-a456-426614174000'],
  }),
});

// Koala Swap-specific execute-swap request
export const KoalaSwapExecuteSwapRequest = Type.Object({
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will execute the swap',
      default: ethereumChainConfig.defaultWallet,
      examples: [ethereumChainConfig.defaultWallet],
    }),
  ),
  network: Type.Optional(
    Type.String({
      description: 'The blockchain network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  baseToken: Type.String({
    description: 'Token to determine swap direction',
    examples: [BASE_TOKEN],
  }),
  quoteToken: Type.String({
    description: 'The other token in the pair',
    examples: [QUOTE_TOKEN],
  }),
  amount: Type.Number({
    description: 'Amount of base token to trade',
    examples: [SWAP_AMOUNT],
  }),
  side: Type.String({
    description:
      'Trade direction - BUY means buying base token with quote token, SELL means selling base token for quote token',
    enum: ['BUY', 'SELL'],
  }),
  slippagePct: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 100,
      description: 'Maximum acceptable slippage percentage',
      default: KoalaSwapConfig.config.slippagePct,
      examples: [1],
    }),
  ),
});

// Koala Swap CLMM Open Position Request
export const KoalaSwapClmmOpenPositionRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will open the position',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  lowerPrice: Type.Number({
    description: 'Lower price bound for the position',
  }),
  upperPrice: Type.Number({
    description: 'Upper price bound for the position',
  }),
  poolAddress: Type.String({
    description: 'Address of the Koala Swap V3 pool',
  }),
  baseTokenAmount: Type.Optional(
    Type.Number({
      description: 'Amount of base token to deposit',
    }),
  ),
  quoteTokenAmount: Type.Optional(
    Type.Number({
      description: 'Amount of quote token to deposit',
    }),
  ),
  slippagePct: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 100,
      description: 'Maximum acceptable slippage percentage',
      default: KoalaSwapConfig.config.slippagePct,
    }),
  ),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// Koala Swap CLMM Add Liquidity Request
export const KoalaSwapClmmAddLiquidityRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will add liquidity',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  positionAddress: Type.String({
    description: 'NFT token ID of the position',
  }),
  baseTokenAmount: Type.Number({
    description: 'Amount of base token to add',
  }),
  quoteTokenAmount: Type.Number({
    description: 'Amount of quote token to add',
  }),
  slippagePct: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 100,
      description: 'Maximum acceptable slippage percentage',
      default: KoalaSwapConfig.config.slippagePct,
    }),
  ),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// Koala Swap CLMM Remove Liquidity Request
export const KoalaSwapClmmRemoveLiquidityRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will remove liquidity',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  positionAddress: Type.String({
    description: 'NFT token ID of the position',
  }),
  percentageToRemove: Type.Number({
    minimum: 0,
    maximum: 100,
    description: 'Percentage of liquidity to remove',
  }),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// Koala Swap CLMM Close Position Request
export const KoalaSwapClmmClosePositionRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will close the position',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  positionAddress: Type.String({
    description: 'NFT token ID of the position to close',
  }),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// Koala Swap CLMM Collect Fees Request
export const KoalaSwapClmmCollectFeesRequest = Type.Object({
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will collect fees',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  positionAddress: Type.String({
    description: 'NFT token ID of the position',
  }),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});

// Koala Swap CLMM Execute Swap Request
export const KoalaSwapClmmExecuteSwapRequest = Type.Object({
  walletAddress: Type.Optional(
    Type.String({
      description: 'Wallet address that will execute the swap',
      default: ethereumChainConfig.defaultWallet,
    }),
  ),
  network: Type.Optional(
    Type.String({
      description: 'The EVM network to use',
      default: ethereumChainConfig.defaultNetwork,
      enum: [...KoalaSwapConfig.networks],
    }),
  ),
  poolAddress: Type.Optional(
    Type.String({
      description: 'Pool address (optional - can be looked up from tokens)',
    }),
  ),
  baseToken: Type.String({
    description: 'Base token symbol or address',
    examples: [BASE_TOKEN],
  }),
  quoteToken: Type.Optional(
    Type.String({
      description: 'Quote token symbol or address',
      examples: [QUOTE_TOKEN],
    }),
  ),
  amount: Type.Number({
    description: 'Amount to swap',
    examples: [SWAP_AMOUNT],
  }),
  side: Type.String({
    enum: ['BUY', 'SELL'],
    default: 'SELL',
  }),
  slippagePct: Type.Optional(
    Type.Number({
      minimum: 0,
      maximum: 100,
      description: 'Maximum acceptable slippage percentage',
      default: KoalaSwapConfig.config.slippagePct,
    }),
  ),
  gasPrice: Type.Optional(
    Type.String({
      description: 'Gas price in wei for the transaction',
    }),
  ),
  maxGas: Type.Optional(
    Type.Number({
      description: 'Maximum gas limit for the transaction',
      examples: [300000],
    }),
  ),
});
