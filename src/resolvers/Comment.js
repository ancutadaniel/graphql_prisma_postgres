const Comment = {
  // Custom resolver for the comments field in the User type
  // In Comment we have the parent object that is a comment object that is being returned from the comments resolver
  // this is a one to many relationship between the user and the comments - one user has many comments
  author(parent, args, { db }, info) {
    const { author } = parent;
    return db.users.find((user) => user.id === author);
  },
  post(parent, args, { db }, info) {
    const { postId } = parent;
    return db.posts.find((post) => post.id === postId);
  },
};

export default Comment;
