import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Spinner from "./spinner";
import axios from "../axios";

export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [isWordAdded, setAdded] = useState(false);
  const [wordValue, setWordValue] = useState("");
  const [isWordExist, setWordExist] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function OnWordChange(event) {
    setWordValue(event.target.value);
  }

  function OnAddWord() {
    setAdded(true);
    axios({ url: `/getword/${wordValue.toLowerCase()}` })
      .then((data) => {
        if (data.data.word === "notwordfound") {
          setAdded(false);
          setWordExist(false);
        } else {
          setWordValue("");
          setWordExist(true);
          setAdded(false);
          window.location.replace("/");
        }
      })
      .catch((err) => {
        // console.log(err);
        setAdded(false);
      });
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="newWordButtonContainer">
        <Fab
          className="AddnewWordButton"
          onClick={handleClickOpen}
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add to Dictionary</DialogTitle>
        <DialogContent>
          {isWordExist ? (
            <DialogContentText>
              Add new word to your Vocabalary
            </DialogContentText>
          ) : (
            <DialogContentText style={{ color: "red" }}>
              No word found!Check for spelling mistake
            </DialogContentText>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Word"
            type="text"
            fullWidth
            onChange={OnWordChange}
            value={wordValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {isWordAdded ? (
            <Button color="primary">
              <span className="loadingButtonContent">
                <Spinner loading={false} />
                <span>Adding</span>
              </span>
            </Button>
          ) : (
            <Button onClick={OnAddWord} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
