export default createMigration({
  version: 271,
  up: async (_, ctx) => {
    const logger = ctx.getContextLogger();

    const allOrganizations = await ctx.handlers.collection.organization
      .find(ctx, {
        params: {
          selector: {},
        },
      })
      .then(fetchCursor);
  },
});
