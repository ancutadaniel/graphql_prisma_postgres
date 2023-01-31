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
  createPost: (parent, args, ctx, info) => {
    const { data } = args;
    return prisma.post.create({
      data: {
        title: data.title,
        body: data.body,
        published: data.published,
        author: {
          connect: {
            id: data.authorId,
          },
        },
      },
      include: {
        author: true,
        comments: true,
      },
    });
  },
  updatePost: (parent, args, ctx, info) => {
    const { id, data } = args;
    return prisma.post.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        body: data.body,
        published: data.published,
      },
      include: {
        author: true,
        comments: true,
      },
    });
  },

  createComment: (parent, args, ctx, info) => {
    const { data } = args;
    return prisma.comment.create({
      data: {
        text: data.text,
        author: {
          connect: {
            id: data.authorId,
          },
        },
        post: {
          connect: {
            id: data.postId,
          },
        },
      },
      include: {
        author: true,
        post: true,
      },
    });
  },
};

export default Mutation;
