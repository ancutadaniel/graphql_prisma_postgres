import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Query = {
  // parent, args, ctx, info - arguments that are passed to the resolver function
  user: (parent, args, ctc, info) =>
    prisma.user.findUnique({
      where: {
        id: args.id,
      },
    }),
  allUsers: () => prisma.user.findMany(),
};

export default Query;
