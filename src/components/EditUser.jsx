import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import FormUser from './FormUser'
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
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
        console.log('this.state', this.state)
        console.log('this.props', this.props)
    }
    handleChange = (event) => {
        let user = { ...this.state.user };
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
    updateUserData = () => {
        let user = { ...this.state.user };
        console.log('this.props.key', this.props.userKey)
        Firebase.database()
            .ref(`/${this.props.userKey}`)
            .update(user);
        console.log("DATA UPDATED");
    };
    render() {
        const { user } = this.state
        const { open, userKey, handleClose } = this.props;
        console.log('this.props.userKey', userKey)
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

export default EditUser