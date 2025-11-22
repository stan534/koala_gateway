import { FastifyPluginAsync } from 'fastify';

// Import routes - will be added as we implement them
// import executeQuoteRoute from './executeQuote';
// import executeSwapRoute from './executeSwap';
// import quoteSwapRoute from './quoteSwap';

export const koalaSwapRouterRoutes: FastifyPluginAsync = async (_fastify) => {
  // Routes will be registered as they are implemented
  // Router routes are not yet implemented for Koala Swap
  // await fastify.register(quoteSwapRoute);
  // await fastify.register(executeQuoteRoute);
  // await fastify.register(executeSwapRoute);
};

export default koalaSwapRouterRoutes;
