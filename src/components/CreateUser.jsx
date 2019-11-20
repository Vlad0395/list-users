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
        errorValidation: {},
    };

    handleChange = (event) => {
        let user = { ...this.state.user };
        let error = { ...this.state.errorValidation };
        let regular = '';
        switch (event.target.name) {
            case 'first_name':
            case 'last_name':
                regular = RegExp('^[a-zA-Z0-9]{1,15}$');
                error[event.target.name] = 'Name must consist of latin letters and numbers';
                break;
            case 'phone_number':
                regular = RegExp('^[0-9]{8,12}$');
                error[event.target.name] = 'The phone number must consist of positive digits';
                break;
            case 'email':
                regular = RegExp('^\\w+@[a-zA-Z0-9_.-]+?\\.[a-zA-Z_.-]{2,3}$');
                error[event.target.name] = 'email not valid';
                break;
            default:
                regular = '';
                break;
        }

        user[event.target.name] = event.target.value;
        this.setState({ user });
        if (event.target.value.match(regular)) {
            error[event.target.name] = '';
            this.setState({ errorValidation: error });
        } else {
            this.setState({ errorValidation: error })
        }
    };

    fileSelectedHendler = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                let user = { ...this.state.user }
                user.photo_user = reader.result
                this.setState({ user })
            });
            reader.readAsDataURL(e.target.files[0]);
        }
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

    handleError = () => {
        this.setState({ errorValidation: true });
        console.log('errorValidation', this.state.errorValidation)
    }


    render() {
        const { user, errorValidation } = this.state;
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
                        error={errorValidation}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                  </Button>
                    <Button 
                        onClick={this.writeUserData} 
                        color="primary" 
                        disabled={ Object.values(errorValidation).some(x => (x!==''))}>
                        Save User
                  </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default CreateUser;