import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const Mutation = {
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
        id,
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
        id,
      },
    });
  },
};

export default Mutation;
