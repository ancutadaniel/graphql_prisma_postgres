import { PrismaClient } from '@prisma/client';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

const prisma = new PrismaClient();

const typeDefs = `
  type User {
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]!
    user: User!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
  }

  input CreateUserInput {
    email: String!
    name: String!
  }
`;

const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
    user: () => {
      return prisma.user.findUnique({
        where: {
          id: 1,
        },
      });
    },
  },
  Mutation: {
    createUser: (parent, args, ctx, info) => {
      const { data } = args;
      return prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
        },
      });
    },
  },
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
  })
);

app.listen(4000, () => {
  console.log('Server started on http://localhost:4000/graphql');
});
