import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Query = {
  // parent, args, ctx, info - arguments that are passed to the resolver function
  user: (parent, args, ctc, info) =>
    prisma.user.findUnique({
      where: {
        id: args.id,
      },
      include: {
        posts: true,
        comments: true,
      },
    }),

  post: (parent, args, ctc, info) =>
    prisma.post.findUnique({
      where: {
        id: args.id,
      },
      include: {
        author: true,
        comments: true,
      },
    }),

  comment: (parent, args, ctc, info) =>
    prisma.comment.findUnique({
      where: {
        id: args.id,
      },
      include: {
        author: true,
        post: true,
      },
    }),

  allUsers: () =>
    prisma.user.findMany({
      include: {
        posts: true,
        comments: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),

  allPosts: () =>
    prisma.post.findMany({
      include: {
        author: true,
        comments: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    }),

  allComments: () =>
    prisma.comment.findMany({
      include: {
        author: true,
        post: true,
      },
    }),
};

export default Query;
