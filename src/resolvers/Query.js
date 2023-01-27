const Query = {
  // parent, args, ctx, info - arguments that are passed to the resolver function
  user: (parent, args, ctx, info) => {
    return {
      id: '123',
      name: 'Daniel',
      email: '',
      age: 30,
    };
  },

  post: (parent, args, ctx, info) => {
    return {
      id: '123',
      title: 'GraphQL 101',
      body: 'This is my first post',
      published: false,
    };
  },

  users: (parent, args, { db }, info) => {
    const { query } = args;
    if (!query) return db.users;
    return db.users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  },

  posts: (parent, args, { db }, info) => {
    const { query } = args;

    if (!query) return db.posts;

    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },

  comments: (parent, args, { db }, info) => {
    const { query } = args;

    if (!query) return db.comments;

    return db.comments.filter((comment) =>
      comment.text.toLowerCase().includes(query.toLowerCase())
    );
  },
};

export default Query;
