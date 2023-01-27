const User = {
  // Custom resolver for the posts field and comments field in the User type
  // In User we have the parent object that is a user object that is being returned from the users resolver
  // this is a one to many relationship between the user and the posts - one user has many posts
  posts(parent, args, { db }, info) {
    const { id } = parent;
    return db.posts.filter((post) => post.author === id);
  },
  comments(parent, args, { db }, info) {
    const { id } = parent;
    return db.comments.filter((comment) => comment.author === id);
  },
};

export default User;
