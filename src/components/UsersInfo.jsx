import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import map from 'lodash/map';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditUser from './EditUser';
import Styles from '../styles/style';
import Firebase from 'firebase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CreateUser from './CreateUser';

class UsersInfo extends Component {

    state = {
        open: false,
        createOpen: false,
        users: [],
        editOpen: false,
        selectedUser: {},
        selectedUserKey: null,
    };

    componentDidMount() {
        let ref = Firebase.database().ref("/");
        ref.on("value", snapshot => {
            let users = snapshot.val();
            // users = Array.isArray(users) ? users : [users]
            this.setState({ users });
        });
    }

    handleEditShow = (key = null, user = null) => {
        this.setState({ editOpen: !this.state.editOpen, selectedUser: user, selectedUserKey: key });
    };

    handleRemove = (key) => {
        Firebase.database().ref(`/${key}`).remove();
    };

    handleCreateShow = () => {
        this.setState({ createOpen: !this.state.createOpen })
    };

    render() {
        const { classes } = this.props;
        const { users, selectedUser, selectedUserKey, createOpen } = this.state;

        return (
            <Grid container >
                <Grid container alignItems="center" >
                    <Grid item xs={4}>
                        First Name
                        </Grid>
                    <Grid item xs={4}>
                        Last Name
                        </Grid>
                    <Grid item xs={4}>
                        Actions
                        </Grid>
                </Grid>
                <Grid container>
                    {map(users, (user, key) => (
                        <Grid container alignItems="center"  >
                            <Grid item xs={4}>{user.first_name} </Grid>
                            <Grid item xs={4}>{user.last_name}</Grid>
                            <Grid item xs={4}>
                                <IconButton className={classes.button} aria-label="edit" onClick={() => this.handleEditShow(key, user)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton className={classes.button} aria-label="delete" onClick={() => this.handleRemove(key)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    {this.state.editOpen && <EditUser
                        open={this.state.editOpen}
                        handleClose={this.handleEditShow}
                        user={selectedUser}
                        userKey={selectedUserKey}
                    />}
                    {createOpen && <CreateUser
                        open={createOpen}
                        handleClose={this.handleCreateShow}
                    />}
                </Grid>
                <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.handleCreateShow}>
                    <AddIcon />
                </Fab>
            </Grid>
        )
    }
}

export default (withStyles(Styles, { withTheme: true })(UsersInfo))