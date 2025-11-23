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
