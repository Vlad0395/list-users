import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import FormUser from './FormUser';
import Firebase from 'firebase';

function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

class CreateUser extends Component {

    state = {
        open: false,
        user: {},
        src: null,
    };

    handleChange = (event) => {
        let user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    writeUserData = () => {
        let user = { ...this.state.user };
        Firebase.database()
            .ref("/")
            .push(user);
    };
    
    fileSelectedHendler = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                let user = {...this.state.user}
                user.photo_user = reader.result
                this.setState({ user })
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    render() {
        const { user } = this.state;
        const { open, handleClose } = this.props;

        return (
            <Dialog
                open={open}
                onClose={handleClose}
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
                        fileSelectedHendler={this.fileSelectedHendler}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                  </Button>
                    <Button onClick={this.writeUserData} color="primary">
                        Save User
                  </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default CreateUser;