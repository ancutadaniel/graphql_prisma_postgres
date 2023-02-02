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
  deleteUser: async (parent, args, ctx, info) => {
    const { id } = args;

    // Delete the user's associated posts
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
    });
    // postIds is an array of post ids that we want to delete
    const postIds = posts.map((post) => post.id);
    await prisma.post.deleteMany({
      where: {
        id: {
          in: postIds,
        },
      },
    });

    // Delete the user's associated comments
    const comments = await prisma.comment.findMany({
      where: {
        authorId: id,
      },
    });

    // commentIds is an array of comment ids that we want to delete
    const commentIds = comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentIds,
        },
      },
    });

    // Delete the user
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
