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
import Styles from '../styles/style'
import Firebase from 'firebase';
import config from '../config';

export class Wrapper extends Component {
    constructor(props) {
        super(props);
        Firebase.initializeApp(config);
    }

    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, children } = this.props;
        const { open } = this.state;

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
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <Grid className={classes.drawerHeader} />
                    {children}
                </main>
            </Grid>
        )
    }
}

export default (withStyles(Styles, { whithTheme: true })(Wrapper));
