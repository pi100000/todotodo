import { React, useState, useEffect, useRef } from "react";
import CONSTANTS from "../constants/constants";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

function Todo() {
  let getDate = new Date();

  // let date = getDate.getDate();
  // let month = getDate.getMonth() + 1;
  // let year = getDate.getFullYear();
  // let formattedDate = `${date}-${month}-${year}`;

  const [disable, setDisable] = useState(true);
  const [modal, setModal] = useState(false);
  const [task, setTask] = useState("");
  const [comment, setComment] = useState("");
  const [todos, setTodos] = useState([]);

  const taskInput = useRef(null);
  const commentInput = useRef(null);

  const payload = {
    taskName: task,
    comment: comment,
    date: getDate,
  };

  const handleNewTodo = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleAdd = async () => {
    taskInput.current.value = "";
    commentInput.current.value = "";
    setTask("");
    setComment("");

    const updater = async () => {
      await axios
        .post(`${CONSTANTS.POST_TODO_CARD}`, payload)
        .then((res) => console.log(res));
      await axios
        .get(`${CONSTANTS.GET_TODO_CARDS}`)
        .then((res) => setTodos(res.data));
    };
    updater();
  };

  useEffect(() => {
    if (todos && todos.length == 0) {
      axios
        .get(`${CONSTANTS.GET_TODO_CARDS}`)
        .then((res) => setTodos(res.data));
    }
  }, [todos]);

  useEffect(() => {
    if (task && task.length && comment && comment.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  });

  return (
    <>
      <Paper>
        <Grid
          margin={"auto"}
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <h1>Todo Cards</h1>
          <IconButton
            variant="contained"
            onClick={handleNewTodo}
            sx={{ margin: 5 }}
            style={{ backgroundColor: "#bef56e" }}
          >
            <AddIcon sx={{ fontSize: 40, padding: 5 }} />
          </IconButton>
        </Grid>

        {/* ADD TODO MODAL  */}

        <Modal open={modal} onClose={handleModalClose}>
          <Paper
            sx={{
              margin: "auto",
              p: 2,
              maxWidth: 500,
              boxShadow: 10,
              marginTop: 5,
            }}
          >
            <Grid
              container
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                container
                item
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <h1>Todo Cards</h1>
              </Grid>
              <Grid
                container
                item
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  style={{ color: "#21b6ae" }}
                  inputRef={taskInput}
                  color="success"
                  item
                  label="Task"
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid
                container
                item
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  inputRef={commentInput}
                  multiline
                  rows={4}
                  item
                  label="Comment"
                  color="success"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid
                container
                item
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
                padding={2}
              >
                <Button
                  variant="contained"
                  disabled={disable}
                  onClick={handleAdd}
                  style={{ backgroundColor: "#bef56e" }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Modal>

        {/* TODO CARDS GRID  */}

        {todos.map((item) => (
          <Grid
            container
            item
            xs={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
            padding={2}
          >
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                boxShadow: 3,
                backgroundColor: "rgb(211, 255, 208)",
              }}
            >
              <Grid container spacing={5}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.taskName}
                  </Typography>
                  <Typography color="text.primary">{item.comment}</Typography>
                  <Typography color="text.secondary">{item.date}</Typography>
                </Grid>

                {/* DELETE TODO  */}

                <Grid item>
                  <IconButton
                    onClick={() => {
                      const update = async () => {
                        await axios.delete(
                          `${CONSTANTS.DELETE_TODO_CARD}/${item._id}`
                        );
                        await axios
                          .get(`${CONSTANTS.GET_TODO_CARDS}`)
                          .then((res) => setTodos(res.data));
                      };
                      update();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Paper>
    </>
  );
}

export default Todo;
