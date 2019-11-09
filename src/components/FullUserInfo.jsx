import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Cake from '@material-ui/icons/Cake';
import moment from 'moment';
import Phone from '@material-ui/icons/Phone';
import Email from '@material-ui/icons/Email';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty';

const Styles = (theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paragraf: {
        display: 'inline-block',
        fontFamily: 'sans-serif',
        fontSize: 24,
        marginLeft:20
    },
    img: {
        width: '100%'
    },
});

class FullUserInfo extends Component {

    render() {
        const { classes, user, keyUser, handleEditShow, handleRemove } = this.props;

        return (
            <Grid className={classes.root}>
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Grid item xs={4} className={classes.heading}>{user.first_name}</Grid>
                        <Grid item xs={4} className={classes.heading}>{user.last_name}</Grid>
                        <Grid item xs={4} onClick={(e) => {
                            e.stopPropagation()
                        }}>
                            <IconButton
                                className={classes.button}
                                aria-label="edit"
                                onClick={() => handleEditShow(keyUser, user)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                className={classes.button}
                                aria-label="delete"
                                onClick={() => handleRemove(keyUser)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={2}>
                                <img className={classes.img} src={user.photo_user} alt='user avatar' />
                            </Grid>
                            <Grid item xs={10}>
                                <Grid item xs={5}>
                                    <Cake /> <Typography
                                        className={classes.paragraf}
                                        component="p"
                                        variant="caption">{user.birth_day}</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <HourglassEmpty /><Typography
                                        className={classes.paragraf}
                                        component="p"
                                        variant="caption">{moment().diff(user.birth_day, 'year')}</Typography></Grid>
                                <Grid item xs={10}>
                                    <Phone /><Typography
                                        className={classes.paragraf}
                                        component="p"
                                        variant="caption">{user.phone_number}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Email /><Typography
                                        className={classes.paragraf}
                                        component="p"
                                        variant="caption">{user.email}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        );
    }
}

export default (withStyles(Styles)(FullUserInfo));