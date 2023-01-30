import cors from 'cors';
import express from 'express';
import { readFile } from 'fs/promises';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';

const typeDefs = await readFile('src/schema.graphql', 'utf8');

const resolvers = {
  Query,
  Mutation,
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
  }),
  cors()
);

app.listen(4000, () => {
  console.log('Server started on http://localhost:4000/graphql');
});
