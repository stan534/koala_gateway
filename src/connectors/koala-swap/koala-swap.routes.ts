import sensible from '@fastify/sensible';
import { FastifyPluginAsync } from 'fastify';

// Import routes
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
  clmm: koalaSwapClmmRoutesWrapper,
};

export default koalaSwapRoutes;
