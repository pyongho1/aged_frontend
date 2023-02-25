// types
import { Posts } from "../../types/models";

interface PostCardProps {
  post: Posts;
}

const PostCard = (props: PostCardProps): JSX.Element => {
  const { post } = props;

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default PostCard;
// props: PostCardProps: JSX.Element;
