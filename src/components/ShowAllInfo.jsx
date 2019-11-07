import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CreateUser from './CreateUser'
import Firebase from 'firebase';
import config from '../config';
import map from 'lodash/map'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditUser from './EditUser';

const Styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
});
const drawerWidth = 240;

class ShowAllInfo extends Component {
    constructor(props) {
        super(props);
        Firebase.initializeApp(config);
    }

    state = {
        open: false,
        users: [],
        editOpen: false,
        selectedUser: {},
        selectedUserKey: null,
    }

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
    }
    handleRemove = (key) =>{
        Firebase.database().ref(`/${key}`).remove();
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    render() {

        const { classes } = this.props;
        const { open, users, selectedUser, selectedUserKey } = this.state;
        console.log('users;', users)
        console.log('selectedUserKey', selectedUserKey)
        return (
            <Grid className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Users List
                </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Grid className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {<ChevronLeftIcon />}
                        </IconButton>
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key={100001}>
                            <Link to="/">
                                <ListItemText primary=" All Users" />
                            </Link>
                        </ListItem>
                        <ListItem button key={100002}>
                            <Link to="/list">
                                <ListItemText primary=" List" />
                            </Link>
                        </ListItem>

                    </List>
                    <Divider />
                    <CreateUser />
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <Grid className={classes.drawerHeader} />
                    <Grid container align='center' spacing={4}>
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
                    <Grid container spacing={4}>
                        {map(users, (user, key) => (
                            <Grid container align='center' >
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
                    </Grid>
                </main>
            </Grid>
        )
    }
}

export default (withStyles(Styles, { withTheme: true })(ShowAllInfo))