const Post = {
  // Custom resolver for the author field in the Post type - this is a relationship between the two types
  // In Post we have the parent object that is a post object that is being returned from the posts resolver
  // this is a one to one relationship between the post and the user (author) - one post has one author
  author(parent, args, { db }, info) {
    const { author } = parent;
    return db.users.find((user) => user.id === author);
  },
  comments(parent, args, { db }, info) {
    const { id } = parent;
    return db.comments.filter((comment) => comment.postId === id);
  },
};

export default Post;
