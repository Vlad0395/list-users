import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import AddUser from '@material-ui/icons/Add'
import FormUser from './FormUser'
import Firebase from 'firebase';
// import config from '../config';
// import uniqueId from 'lodash/uniqueId'
function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

class CreateUser extends Component {
    // constructor(props) {
    //     super(props);
    //     // Firebase.initializeApp(config);
    // };

    state = {
        open: false,
        user: {},
    }
    handleChange = (event) => {
        let user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    writeUserData = () => {
        let user = { ...this.state.user };
        // user.id = uniqueId();
        Firebase.database()
            .ref("/")
            .push(user);
        console.log("DATA SAVED");
    };

    render() {
        const { open, user } = this.state;
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    <AddUser /> Create User
              </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Create User
                </DialogTitle>
                    <DialogContent>
                        <FormUser
                            user={user}
                            handleChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Cancel
                  </Button>
                        <Button onClick={this.writeUserData} color="primary">
                            Save User
                  </Button>
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}

export default CreateUser