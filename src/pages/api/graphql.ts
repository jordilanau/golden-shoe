/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '../../graphql/schema';

export const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
