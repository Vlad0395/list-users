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

class EditUser extends Component {

    state = {
        user: {},
    };

    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    handleChange = (event) => {
        let user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    };

    updateUserData = () => {
        let user = { ...this.state.user };
        Firebase.database()
            .ref(`/${this.props.userKey}`)
            .update(user);
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
                    Edit User
                </DialogTitle>
                <DialogContent>
                    <FormUser
                        user={user}
                        handleChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                  </Button>
                    <Button onClick={this.updateUserData} color="primary">
                        Update User
                  </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EditUser;