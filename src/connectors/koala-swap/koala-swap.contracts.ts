/**
 * Koala Swap contract addresses for various networks
 * This file contains the contract addresses for Koala Swap V3 and Router contracts
 * on different networks. These are not meant to be edited by users.
 *
 * Contract addresses for Unit Zero Mainnet (ChainID: 88811)
 * Source: https://chainlist.org/chain/88811
 */

export interface KoalaSwapContractAddresses {
  // V2 contracts
  koalaSwapV2RouterAddress: string;
  koalaSwapV2FactoryAddress: string;
  // V3 contracts
  koalaSwapV3SwapRouterAddress: string;
  koalaSwapV3NftManagerAddress: string;
  koalaSwapV3QuoterV2ContractAddress: string;
  koalaSwapV3FactoryAddress: string;
  koalaSwapV3QuoterAddress: string; // V1 Quoter (optional, for backward compatibility)
}

export interface NetworkContractAddresses {
  [network: string]: KoalaSwapContractAddresses;
}

// Contract addresses for Koala Swap on Unit Zero Mainnet
// Source: https://docs.koalaswap.app/developers/contracts
const koalaSwapContracts = {
  // V2 contracts
  koalaSwapV2RouterAddress: '0x7A2044296804EDec53beAAA8fe9D802E5be19e0a', // SwapRouter
  koalaSwapV2FactoryAddress: '0xcF3Ee60d29531B668Ae89FD3577E210082Da220b', // Factory
  // V3 contracts
  koalaSwapV3SwapRouterAddress: '0x7A2044296804EDec53beAAA8fe9D802E5be19e0a',
  koalaSwapV3NftManagerAddress: '0xa759C5ccF40acdf101BC6623f5b65363186a293b',
  koalaSwapV3QuoterV2ContractAddress: '0xA02C6705e8B54a27113aCc0283Fd3882582433dc',
  koalaSwapV3FactoryAddress: '0xcF3Ee60d29531B668Ae89FD3577E210082Da220b',
  koalaSwapV3QuoterAddress: '0x340dC35d8caA8F696df4BB79d3b9743e6D964E96',
};

export const contractAddresses: NetworkContractAddresses = {
  koala: koalaSwapContracts,
  // Alias 'mainnet' to 'koala' for convenience (Unit Zero Mainnet)
  mainnet: koalaSwapContracts,
};

/**
 * Helper functions to get contract addresses
 */

export function getKoalaSwapV2RouterAddress(network: string): string {
  const address = contractAddresses[network]?.koalaSwapV2RouterAddress;

  if (!address) {
    throw new Error(`Koala Swap V2 Router address not configured for network: ${network}`);
  }

  return address;
}

export function getKoalaSwapV2FactoryAddress(network: string): string {
  const address = contractAddresses[network]?.koalaSwapV2FactoryAddress;

  if (!address) {
    throw new Error(`Koala Swap V2 Factory address not configured for network: ${network}`);
  }

  return address;
}

export function getKoalaSwapV3SwapRouterAddress(network: string): string {
  const address = contractAddresses[network]?.koalaSwapV3SwapRouterAddress;

  if (!address) {
    throw new Error(`Koala Swap V3 SwapRouter address not configured for network: ${network}`);
  }

  return address;
}

export function getKoalaSwapV3NftManagerAddress(network: string): string {
  const address = contractAddresses[network]?.koalaSwapV3NftManagerAddress;

  if (!address) {
    throw new Error(`Koala Swap V3 NFT Manager address not configured for network: ${network}`);
  }

  return address;
}

export function getKoalaSwapV3QuoterV2ContractAddress(network: string): string {
  const address = contractAddresses[network]?.koalaSwapV3QuoterV2ContractAddress;

  if (!address) {
    throw new Error(`Koala Swap V3 Quoter V2 contract address not configured for network: ${network}`);
  }

  return address;
}

export function getKoalaSwapV3FactoryAddress(network: string): string {
  const address = contractAddresses[network]?.koalaSwapV3FactoryAddress;

  if (!address) {
    throw new Error(`Koala Swap V3 Factory address not configured for network: ${network}`);
  }

  return address;
}

export function getKoalaSwapV3QuoterAddress(network: string): string {
  const address = contractAddresses[network]?.koalaSwapV3QuoterAddress;

  if (!address) {
    throw new Error(`Koala Swap V3 Quoter address not configured for network: ${network}`);
  }

  return address;
}

/**
 * Returns the appropriate spender address based on the connector name
 * @param network The network name (e.g. 'koala')
 * @param connectorName The connector name (koala-swap/clmm, koala-swap/router, koala-swap)
 * @returns The address of the contract that should be approved to spend tokens
 */
export function getSpender(network: string, connectorName: string): string {
  // Check for AMM (V2) connector pattern
  if (connectorName.includes('/amm')) {
    return getKoalaSwapV2RouterAddress(network);
  }

  // Check for CLMM swap-specific pattern - use SwapRouter
  if (connectorName.includes('/clmm/swap') || connectorName.includes('/router')) {
    return getKoalaSwapV3SwapRouterAddress(network);
  }

  // Check for CLMM (V3) connector pattern - use NFT Manager for positions
  if (connectorName.includes('/clmm')) {
    return getKoalaSwapV3NftManagerAddress(network);
  }

  // For router connector pattern or regular koala-swap connector, use SwapRouter
  if (connectorName.includes('/router') || connectorName === 'koala-swap') {
    return getKoalaSwapV3SwapRouterAddress(network);
  }

  // Default to SwapRouter for any other case
  return getKoalaSwapV3SwapRouterAddress(network);
}

/**
 * ABI Definitions for Koala Swap contracts
 * These are compatible with Uniswap V3 ABIs since Koala Swap is a fork
 */

/**
 * Koala Swap V3 QuoterV2 ABI for quote methods
 */
export const IQuoterV2ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenIn', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'uint24', name: 'fee', type: 'uint24' },
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint160', name: 'sqrtPriceLimitX96', type: 'uint160' },
    ],
    name: 'quoteExactInputSingle',
    outputs: [
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      { internalType: 'uint160', name: 'sqrtPriceX96After', type: 'uint160' },
      {
        internalType: 'uint32',
        name: 'initializedTicksCrossed',
        type: 'uint32',
      },
      { internalType: 'uint256', name: 'gasEstimate', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'tokenIn', type: 'address' },
      { internalType: 'address', name: 'tokenOut', type: 'address' },
      { internalType: 'uint24', name: 'fee', type: 'uint24' },
      { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      { internalType: 'uint160', name: 'sqrtPriceLimitX96', type: 'uint160' },
    ],
    name: 'quoteExactOutputSingle',
    outputs: [
      { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
      { internalType: 'uint160', name: 'sqrtPriceX96After', type: 'uint160' },
      {
        internalType: 'uint32',
        name: 'initializedTicksCrossed',
        type: 'uint32',
      },
      { internalType: 'uint256', name: 'gasEstimate', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

/**
 * Koala Swap V3 SwapRouter ABI for swap methods
 */
export const ISwapRouterABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'tokenIn', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint24', name: 'fee', type: 'uint24' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'amountOutMinimum',
            type: 'uint256',
          },
          {
            internalType: 'uint160',
            name: 'sqrtPriceLimitX96',
            type: 'uint160',
          },
        ],
        internalType: 'struct IV3SwapRouter.ExactInputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactInputSingle',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'tokenIn', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint24', name: 'fee', type: 'uint24' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
          { internalType: 'uint256', name: 'amountInMaximum', type: 'uint256' },
          {
            internalType: 'uint160',
            name: 'sqrtPriceLimitX96',
            type: 'uint160',
          },
        ],
        internalType: 'struct IV3SwapRouter.ExactOutputSingleParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'exactOutputSingle',
    outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
];

/**
 * Koala Swap V3 Position Manager ABI for CLMM operations
 */
export const POSITION_MANAGER_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'positions',
    outputs: [
      { internalType: 'uint96', name: 'nonce', type: 'uint96' },
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'address', name: 'token0', type: 'address' },
      { internalType: 'address', name: 'token1', type: 'address' },
      { internalType: 'uint24', name: 'fee', type: 'uint24' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      {
        internalType: 'uint256',
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
      },
      { internalType: 'uint128', name: 'tokensOwed0', type: 'uint128' },
      { internalType: 'uint128', name: 'tokensOwed1', type: 'uint128' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

/**
 * Koala Swap V3 Factory ABI for pool operations
 */
export const IKoalaSwapV3FactoryABI = {
  abi: [
    {
      constant: true,
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint24', name: 'fee', type: 'uint24' },
      ],
      name: 'getPool',
      outputs: [{ internalType: 'address', name: 'pool', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
};

/**
 * Koala Swap V2 Router ABI for swap and liquidity methods
 * Compatible with Uniswap V2 Router02 ABI
 */
export const IKoalaSwapV2Router02ABI = {
  abi: [
    // Router methods for swapping
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETH',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapETHForExactTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactETH',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactTokens',
      outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    // Router methods for adding/removing liquidity
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        {
          internalType: 'uint256',
          name: 'amountTokenDesired',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};

/**
 * Koala Swap V2 Pair ABI for liquidity operations
 */
export const IKoalaSwapV2PairABI = {
  abi: [
    {
      constant: true,
      inputs: [],
      name: 'getReserves',
      outputs: [
        { internalType: 'uint112', name: '_reserve0', type: 'uint112' },
        { internalType: 'uint112', name: '_reserve1', type: 'uint112' },
        { internalType: 'uint32', name: '_blockTimestampLast', type: 'uint32' },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'token0',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'token1',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
};

/**
 * Standard ERC20 ABI for token operations
 */
export const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
