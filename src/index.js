import { PrismaClient } from '@prisma/client';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

const prisma = new PrismaClient();

const typeDefs = `
  type User {
    id: ID!
    email: String!
    name: String
  }

  type Query {
    allUsers: [User!]!
    user: User!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }

  input CreateUserInput {
    email: String!
    name: String!
  }

  input UpdateUserInput {
    email: String
    name: String
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
    updateUser: (parent, args, ctx, info) => {
      const { id, data } = args;
      return prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          email: data.email,
          name: data.name,
        },
      });
    },
    deleteUser: (parent, args, ctx, info) => {
      const { id } = args;
      return prisma.user.delete({
        where: {
          id: Number(id),
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
