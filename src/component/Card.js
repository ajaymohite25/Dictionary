import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import "./cssFiles/card.css";
import axios from "../axios";
import Spinner from "./spinner";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isremoved, setremove] = useState(false);
  const [isError, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function RemoveWord() {
    setremove(true);
    axios({ url: `/delete/${props.word.word}`, method: "DELETE" })
      .then((data) => {
        // setremove(false);
        window.location.replace("/");
      })
      .catch((err) => {
        setremove(false);
        setError(true);
      });
  } //REMOVING WORD FROM DB

  return (
    <div className="cardContainer">
      <div onClick={handleClickOpen} className="card">
        <div className="cardTitle">
          <p>
            <b className="highlighted">Word:</b> {props.word.word.toUpperCase()}
          </p>
        </div>
        <div className="cardBody">
          <p>
            <b className="highlighted">Defination: </b>
            {props.word.shortdefination}
          </p>
        </div>
      </div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.word.word.toUpperCase()}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="fullScreenModal">
          {isError ? (
            <h1>
              Error occured while deleting the word please try again after
              refreshing the page
            </h1>
          ) : (
            <div className="fullScreenModalInnercontainer">
              <p>
                <b className="highlighted">Defination: </b>
                {props.word.defination}
              </p>
              <p>
                <em className="highlighted">category: </em>
                {props.word.category}
              </p>
              {props.word.examples ? (
                <p>
                  <em className="highlighted">example: </em>
                  {props.word.examples}
                </p>
              ) : null}
              {props.word.synonyms ? (
                <p>
                  <em className="highlighted">synonym: </em>
                  {props.word.synonyms}
                </p>
              ) : null}
              {isremoved ? (
                <div className="RemoveButtonContainer">
                  <Button
                    style={{ color: "red", borderColor: "red" }}
                    variant="outlined"
                    onClick={RemoveWord}
                  >
                    <span className="loadingButtonContent">
                      <Spinner loading={false} />
                      <span>removing</span>
                    </span>
                  </Button>
                </div>
              ) : (
                <div className="RemoveButtonContainer">
                  <Button
                    style={{
                      marginTop: "1rem",
                      marginBottom: "0.5rem",
                      color: "red",
                      borderColor: "red",
                    }}
                    variant="outlined"
                    onClick={RemoveWord}
                  >
                    remove form your vocab
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}

export default FullScreenDialog;
