import {
  AppBar,
  Container,
  Grid,
  Grow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import css from "./styles.module.css";

import mountain from "./images/mountain.png";
import Posts from "./components/Posts/Posts";
import { useEffect, useState } from "react";

import { getPosts } from "./redux/operations";
import Form from "./components/Form/Form";

const App = () => {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="xl">
      <Container className={css.appContainerStyles}>
        <AppBar position="fixed" className={css.appBarStyles}>
          <Toolbar>
            <img
              src={mountain}
              alt="memories"
              height="90"
              width="90"
              className={css.iconStyle}
            ></img>
            <Typography variant="h3" className={css.titleStyle}>
              Life is your jorney
            </Typography>
          </Toolbar>
        </AppBar>
      </Container>
      <main>
        <Grow in>
          <Container>
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              className={css.containerGreed}
              alignItems="stretch"
            >
              <Grid item xs={12} md={8}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </main>
    </Container>
  );
};

export default App;
