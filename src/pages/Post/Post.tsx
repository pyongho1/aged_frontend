// types
import { Posts } from "../../types/models";

// style
import styles from "./Post.module.css";

interface PostsProps {
  posts: Posts[];
}

const Post = (props: PostsProps): JSX.Element => {
  const { posts } = props;

  if (!posts.length) return <p>No posts yet...</p>;

  return (
    <div className={styles.container}>
      <h1>Post page</h1>
      {posts.map((post: Posts) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default Post;
