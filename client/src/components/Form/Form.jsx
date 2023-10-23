import { TextField, Button, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../redux/selectors";
import { addPost, updatePost } from "../../redux/operations";
import css from "./Form.module.css";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    user: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const post = useSelector((state) => {
    const posts = selectPosts(state);

    if (Array.isArray(posts)) {
      return currentId ? posts.find((p) => p._id === currentId) : null;
    }
    return null;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevPostData) => ({
      ...prevPostData,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentId) {
      dispatch(addPost(postData));
    } else {
      dispatch(updatePost({ id: currentId, updatedData: postData }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      user: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  return (
    <Paper className={css.paper}>
      <form
        autoComplete="off"
        noValidate
        className={css.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">
          {currentId ? "Editing " : "Creating "}a Post
        </Typography>
        <TextField
          name="user"
          variant="outlined"
          label="User"
          fullWidth
          style={{ marginTop: 10 }}
          value={postData.user}
          onChange={handleInputChange}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          style={{ marginTop: 10 }}
          value={postData.title}
          onChange={handleInputChange}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          style={{ marginTop: 10 }}
          value={postData.message}
          onChange={handleInputChange}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          style={{ marginTop: 10 }}
          value={postData.tags}
          onChange={handleInputChange}
        />
        <div className={css.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={css.buttonSubmit}
          style={{ marginTop: 10 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          style={{ marginTop: 10 }}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
