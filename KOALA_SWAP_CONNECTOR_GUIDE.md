# Guide: Creating Koala Swap Connector (Uniswap Fork)

This guide walks you through creating a new DEX connector for Koala Swap, which is a fork of Uniswap. The connector will support Router, AMM (V2), and CLMM (V3) operations.

## Overview

The Koala Swap connector will be structured similarly to Uniswap, with three main route types:
- **Router**: Universal Router for optimal swap routes
- **AMM**: V2-style constant product pools
- **CLMM**: V3-style concentrated liquidity pools

## Step-by-Step Implementation

### Step 1: Create Directory Structure

Create the following directory structure under `src/connectors/koala-swap/`:

```
src/connectors/koala-swap/
├── amm-routes/
│   ├── addLiquidity.ts
│   ├── executeSwap.ts
│   ├── index.ts
│   ├── poolInfo.ts
│   ├── positionInfo.ts
│   ├── quoteLiquidity.ts
│   ├── quoteSwap.ts
│   └── removeLiquidity.ts
├── clmm-routes/
│   ├── addLiquidity.ts
│   ├── closePosition.ts
│   ├── collectFees.ts
│   ├── executeSwap.ts
│   ├── index.ts
│   ├── openPosition.ts
│   ├── poolInfo.ts
│   ├── positionInfo.ts
│   ├── positionsOwned.ts
│   ├── quotePosition.ts
│   ├── quoteSwap.ts
│   └── removeLiquidity.ts
├── router-routes/
│   ├── executeQuote.ts
│   ├── executeSwap.ts
│   ├── index.ts
│   └── quoteSwap.ts
├── koala-swap.config.ts
├── koala-swap.contracts.ts
├── koala-swap.routes.ts
├── koala-swap.ts
├── koala-swap.utils.ts
├── schemas.ts
└── universal-router.ts
```

### Step 2: Create Configuration Files

#### 2.1 Create `koala-swap.config.ts`

Copy from `uniswap.config.ts` and adapt:

```typescript
import { getAvailableEthereumNetworks } from '../../chains/ethereum/ethereum.utils';
import { AvailableNetworks } from '../../services/base';
import { ConfigManagerV2 } from '../../services/config-manager-v2';

export namespace KoalaSwapConfig {
  // Supported networks for Koala Swap
  // Update with actual Koala Swap deployments
  export const chain = 'ethereum';
  export const networks = getAvailableEthereumNetworks().filter((network) =>
    ['mainnet', 'arbitrum', 'base', 'bsc'].includes(network), // Adjust based on actual deployments
  );
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
```

#### 2.2 Create Configuration Template

Create `src/templates/connectors/koala-swap.yml`:

```yaml
# Global settings for Koala Swap
# Default slippage percentage for swaps (2%)
slippagePct: 2

# For each swap, the maximum number of hops to consider
maximumHops: 4
```

#### 2.3 Create Configuration Schema

Create `src/templates/namespace/koala-swap-schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "slippagePct": {
      "type": "number",
      "description": "Default slippage percentage (e.g., 2 for 2%)"
    },
    "maximumHops": {
      "type": "integer",
      "description": "Maximum number of hops to consider for each swap"
    }
  },
  "additionalProperties": false,
  "required": ["slippagePct", "maximumHops"]
}
```

### Step 3: Create Contract Addresses File

Create `koala-swap.contracts.ts` based on `uniswap.contracts.ts`:

**Key changes needed:**
1. Replace all `Uniswap` references with `KoalaSwap`
2. Update contract addresses to Koala Swap's actual deployed addresses
3. Update function names (e.g., `getUniswapV2RouterAddress` → `getKoalaSwapV2RouterAddress`)
4. Update error messages to reference Koala Swap

**Important:** You'll need to obtain the actual contract addresses for Koala Swap on each network:
- V2 Router address
- V2 Factory address
- V3 SwapRouter02 address
- V3 NFT Manager address
- V3 Quoter V2 address
- V3 Factory address
- Universal Router V2 address (if applicable)

### Step 4: Create Main Connector Class

Create `koala-swap.ts` based on `uniswap.ts`:

**Key changes:**
1. Replace `Uniswap` class name with `KoalaSwap`
2. Replace `UniswapConfig` with `KoalaSwapConfig`
3. Update all contract address getters to use Koala Swap addresses
4. Update imports to use Koala Swap modules
5. Keep the same structure and logic (since it's a fork)

### Step 5: Create Utility Functions

Create `koala-swap.utils.ts` based on `uniswap.utils.ts`:

**Key changes:**
1. Replace `Uniswap` references with `KoalaSwap`
2. Update function names and comments
3. Keep the same utility logic

### Step 6: Copy and Adapt Route Files

#### 6.1 Router Routes (`router-routes/`)

Copy all files from `src/connectors/uniswap/router-routes/` and:
- Replace `uniswap` with `koala-swap` in route paths
- Update imports to use `KoalaSwap` instead of `Uniswap`
- Update connector name references

#### 6.2 AMM Routes (`amm-routes/`)

Copy all files from `src/connectors/uniswap/amm-routes/` and:
- Replace `uniswap` with `koala-swap` in route paths
- Update imports to use `KoalaSwap` instead of `Uniswap`
- Update connector name references

#### 6.3 CLMM Routes (`clmm-routes/`)

Copy all files from `src/connectors/uniswap/clmm-routes/` and:
- Replace `uniswap` with `koala-swap` in route paths
- Update imports to use `KoalaSwap` instead of `Uniswap`
- Update connector name references

### Step 7: Create Route Registration File

Create `koala-swap.routes.ts` based on `uniswap.routes.ts`:

```typescript
import sensible from '@fastify/sensible';
import { FastifyPluginAsync } from 'fastify';

// Import routes
import { koalaSwapAmmRoutes } from './amm-routes';
import { koalaSwapClmmRoutes } from './clmm-routes';
import { koalaSwapRouterRoutes } from './router-routes';

// Router routes
const koalaSwapRouterRoutesWrapper: FastifyPluginAsync = async (fastify) => {
  await fastify.register(sensible);

  await fastify.register(async (instance) => {
    instance.addHook('onRoute', (routeOptions) => {
      if (routeOptions.schema && routeOptions.schema.tags) {
        routeOptions.schema.tags = ['/connector/koala-swap'];
      }
    });

    await instance.register(koalaSwapRouterRoutes);
  });
};

// AMM routes
const koalaSwapAmmRoutesWrapper: FastifyPluginAsync = async (fastify) => {
  await fastify.register(sensible);

  await fastify.register(async (instance) => {
    instance.addHook('onRoute', (routeOptions) => {
      if (routeOptions.schema && routeOptions.schema.tags) {
        routeOptions.schema.tags = ['/connector/koala-swap'];
      }
    });

    await instance.register(koalaSwapAmmRoutes);
  });
};

// CLMM routes
const koalaSwapClmmRoutesWrapper: FastifyPluginAsync = async (fastify) => {
  await fastify.register(sensible);

  await fastify.register(async (instance) => {
    instance.addHook('onRoute', (routeOptions) => {
      if (routeOptions.schema && routeOptions.schema.tags) {
        routeOptions.schema.tags = ['/connector/koala-swap'];
      }
    });

    await instance.register(koalaSwapClmmRoutes);
  });
};

// Export routes
export const koalaSwapRoutes = {
  router: koalaSwapRouterRoutesWrapper,
  amm: koalaSwapAmmRoutesWrapper,
  clmm: koalaSwapClmmRoutesWrapper,
};

export default koalaSwapRoutes;
```

### Step 8: Create Schemas File

Create `schemas.ts` based on `uniswap/schemas.ts` (if it exists) or copy from another connector. Update all references to use `koala-swap`.

### Step 9: Create Universal Router Service (if needed)

If Koala Swap uses a Universal Router, create `universal-router.ts` based on `uniswap/universal-router.ts` and update:
- Contract addresses
- Connector name references
- Any protocol-specific logic

### Step 10: Register Connector in Connection Manager

Update `src/services/connection-manager.ts`:

Add to the `getConnector` function:

```typescript
} else if (connector === 'koala-swap') {
  const { KoalaSwap } = await import('../connectors/koala-swap/koala-swap');
  return await KoalaSwap.getInstance(network);
```

### Step 11: Register Routes in App

Update `src/app.ts`:

1. Add import at the top:
```typescript
import { koalaSwapRoutes } from './connectors/koala-swap/koala-swap.routes';
```

2. Register routes (around line 257, after Uniswap routes):
```typescript
// Koala Swap routes
app.register(koalaSwapRoutes.router, {
  prefix: '/connectors/koala-swap/router',
});
app.register(koalaSwapRoutes.amm, { prefix: '/connectors/koala-swap/amm' });
app.register(koalaSwapRoutes.clmm, { prefix: '/connectors/koala-swap/clmm' });
```

### Step 12: Update Root Configuration Template

Update `src/templates/root.yml`:

Add the Koala Swap namespace (around line 86, after pancakeswap-sol):

```yaml
  $namespace koala-swap:
    configurationPath: connectors/koala-swap.yml
    schemaPath: koala-swap-schema.json
```

### Step 13: Create Runtime Configuration

Create `conf/connectors/koala-swap.yml` (this will be created by setup, but you can create it manually):

```yaml
# Global settings for Koala Swap
# Default slippage percentage for swaps (2%)
slippagePct: 2

# For each swap, the maximum number of hops to consider
maximumHops: 4
```

### Step 14: Update Config Routes (if needed)

Check `src/config/routes/getConnectors.ts` to ensure Koala Swap is included in the connectors list. It should be automatically detected if properly registered.

## Testing Checklist

After implementation, test the following:

1. **Configuration Loading**
   - Verify config loads correctly: `GET /config/connectors`
   - Check that `koala-swap` appears in the list

2. **Router Routes**
   - `GET /connectors/koala-swap/router/quoteSwap`
   - `POST /connectors/koala-swap/router/executeSwap`

3. **AMM Routes**
   - `GET /connectors/koala-swap/amm/poolInfo`
   - `GET /connectors/koala-swap/amm/quoteSwap`
   - `POST /connectors/koala-swap/amm/executeSwap`
   - `POST /connectors/koala-swap/amm/addLiquidity`
   - `POST /connectors/koala-swap/amm/removeLiquidity`

4. **CLMM Routes**
   - `GET /connectors/koala-swap/clmm/poolInfo`
   - `GET /connectors/koala-swap/clmm/quoteSwap`
   - `POST /connectors/koala-swap/clmm/executeSwap`
   - `POST /connectors/koala-swap/clmm/openPosition`
   - `POST /connectors/koala-swap/clmm/closePosition`

## Important Notes

1. **Contract Addresses**: The most critical step is obtaining and correctly configuring Koala Swap's contract addresses for each network. Verify these addresses are correct before testing.

2. **ABI Compatibility**: Since Koala Swap is a Uniswap fork, the ABIs should be compatible. However, verify that the contract interfaces match exactly.

3. **Network Support**: Update the `networks` array in `koala-swap.config.ts` to reflect the actual networks where Koala Swap is deployed.

4. **Naming Convention**: Use `koala-swap` (kebab-case) consistently throughout the codebase for the connector name.

5. **Testing**: Create test files in `test/connectors/koala-swap/` mirroring the structure of `test/connectors/uniswap/`.

## Quick Reference: Files to Create/Modify

### New Files to Create:
- `src/connectors/koala-swap/koala-swap.ts`
- `src/connectors/koala-swap/koala-swap.config.ts`
- `src/connectors/koala-swap/koala-swap.contracts.ts`
- `src/connectors/koala-swap/koala-swap.routes.ts`
- `src/connectors/koala-swap/koala-swap.utils.ts`
- `src/connectors/koala-swap/schemas.ts`
- `src/connectors/koala-swap/universal-router.ts` (if needed)
- All route files in `amm-routes/`, `clmm-routes/`, `router-routes/`
- `src/templates/connectors/koala-swap.yml`
- `src/templates/namespace/koala-swap-schema.json`
- `conf/connectors/koala-swap.yml`

### Files to Modify:
- `src/services/connection-manager.ts` - Add connector registration
- `src/app.ts` - Add route imports and registration
- `src/templates/root.yml` - Add namespace configuration

## Next Steps

1. Start by creating the directory structure
2. Copy and adapt the configuration files
3. Create the contract addresses file with actual Koala Swap addresses
4. Copy and adapt the main connector class
5. Copy and adapt all route files
6. Register the connector in the system
7. Test each endpoint
8. Create test files for comprehensive coverage

Good luck with your implementation!

