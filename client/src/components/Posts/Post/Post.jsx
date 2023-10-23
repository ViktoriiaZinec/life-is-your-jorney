import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import moment from "moment";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import css from "./Post.module.css";

import { deletePost, likePost } from "../../../redux/operations";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      dispatch(deletePost(post._id));
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  const handleLikeClick = () => {
    dispatch(likePost(post._id));
  };

  return (
    <Card className={css.cardStyle}>
      <CardMedia
        className={css.cardMediaStyle}
        image={post.selectedFile}
        title={post.title}
      />
      <CardContent className={css.overlay}>
        <Typography variant="h6">{post.user}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </CardContent>

      <CardContent className={css.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizOutlinedIcon fontSize="medium" />
        </Button>
      </CardContent>

      <CardContent className={css.detailStyle}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2">{post.message}</Typography>
      </CardContent>
      <CardActions className={css.cardActionsStyle}>
        <Button size="small" color="primary" onClick={handleLikeClick}>
          <ThumbUpOutlinedIcon fontSize="small" />
          &nbsp;&nbsp;Like &nbsp;
          {post.like}
        </Button>
        <Button size="small" color="primary" onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    user: PropTypes.string,
    title: PropTypes.string,
    createdAt: PropTypes.string,
    tags: PropTypes.array,
    selectedFile: PropTypes.string,
    message: PropTypes.string,
    like: PropTypes.number,
  }).isRequired,
  setCurrentId: PropTypes.func.isRequired,
};
