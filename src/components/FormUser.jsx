import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import CalendarToday from '@material-ui/icons/CalendarToday'
import Phone from '@material-ui/icons/Phone'
import Email from '@material-ui/icons/Email'
const Styles = (theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
    },
    bigAvatar: {
       
        width: 60,
        height: 60,
    },
});

class FormUser extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        birth_day: '',
        age: '',
        photo_user: '',
        phone_number: '',

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        const { classes, first_name, last_name, email, birth_day, photo_user, phone_number } = this.props
        // const {  } = this.state
        return (
            <Grid container   alignItems="center" spacing={4}>
                    <Grid item xs={2}>
                        <Avatar alt="Remy Sharp" src='' name='photo_user' value={photo_user} className={classes.bigAvatar} />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            name='first_name'
                            className={classes.textField}
                            value={first_name}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            className={classes.textField}
                            value={last_name}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Email />
                    </Grid>
                <Grid item xs={11}>
                    <TextField
                        id="email"
                        label="email"
                        name="email"
                        className={classes.textField}
                        value={email}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                </Grid>
                    <Grid item xs={1}>
                        <CalendarToday />
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            id="birth_day"
                            label="Birth day"
                            name='birth_day'
                            className={classes.textField}
                            value={birth_day}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Phone/>    
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            id="phone_number"
                            label="phone_number"
                            name="phone_number"
                            className={classes.textField}
                            value={phone_number}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                    </Grid>
            </Grid>
                )
            }
        }
        
export default (withStyles(Styles)(FormUser))