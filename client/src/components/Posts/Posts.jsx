import { useSelector } from "react-redux";
import { selectIsLoading, selectPosts } from "../../redux/selectors";
import { CircularProgress, Grid, Typography, Zoom } from "@mui/material";

import PropTypes from "prop-types";

import Post from "./Post/Post";

import css from "./Posts.module.css";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector(selectPosts);

  const isLoading = useSelector(selectIsLoading);
  console.log("isLoading", isLoading);
  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Grid
      className={css.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.length === 0 ? (
        <Typography variant="h6" color="primary" className={css.noPosts}>
          No posts yet
        </Typography>
      ) : (
        posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Posts;

Posts.propTypes = {
  setCurrentId: PropTypes.func.isRequired,
};
