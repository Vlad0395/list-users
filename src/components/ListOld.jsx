import React, { Component } from 'react';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import { Typography, Button, TextField, ListItem } from '@material-ui/core';
import MUIList from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';

const Styles = theme => ({
    textField: {
        marginRight: 20,
    },
});

class List extends Component {
    state = {
        list: [],
        input: '',
    };

    componentDidMount() {
        if (this.props.list) this.setState({ list: this.props.list })
    }

    recursiveSearch = (list, item) => {
        forEach(list, elem => {
            if (elem === item) {
                elem.sublist = [];
            }
            if (elem !== item) {
                if (elem.sublist && elem.sublist.length) {
                    let data = this.recursiveSearch(elem.sublist, item);
                    data.sublist = [];
                }
            }
        })
        return list;
    };

    handleInput = (event) => {
        this.setState({ input: event.target.value })
    };

    handleAddItem = () => {
        let list = [...this.state.list];
        list.push({ value: this.state.input, sublist: null });
        this.setState({ list, input: '' });
        if (this.props.onChange) {
            this.props.onChange(list);
        }
    };

    handleAddSublist = (item) => {
        let list = [...this.state.list];
        list = this.recursiveSearch(list, item);
        this.setState({ list })
        if (this.props.onChange) {
            this.props.onChange(list);
        }
    };

    handleRemove = (item) => {
        let list = [...this.state.list];
        list = filter(list, elem => elem !== item);
        this.setState({ list });
        if (this.props.onChange) {
            this.props.onChange(list);
        }
    };

    handleRemoveSublist = (index) => {
        let list = [...this.state.list];
        list[index].sublist = null;
        this.setState({ list });
        if (this.props.onChange) {
            this.props.onChange(list);
        }
    };

    render() {
        const { list } = this.state;
        const { classes } = this.props;

        return (
            <MUIList style={{ marginRight: 10, marginTop: 10 }}>
                {map(list, (item, i) => (
                    <ListItem key={i}>
                        <Typography 
                            className={classes.textField} >{item.value}</Typography>
                        {item.sublist ?
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => this.handleRemoveSublist(i)}>Remove Sublist</Button>
                            : <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => this.handleAddSublist(item)}>Add Sublist</Button>
                        }
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => this.handleRemove(item)}>Remove</Button>
                        {item.sublist &&
                            <List
                                list={item.sublist}
                                onChange={(childList) => {
                                    let newList = [...list];
                                    newList[i].sublist = childList;
                                    this.setState({ list: newList })
                                }}
                                classes={classes}
                            />
                        }
                    </ListItem>
                ))}
                <TextField 
                    className={classes.textField} 
                    type="text" value={this.state.input} 
                    onChange={this.handleInput} />
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={this.handleAddItem}>Add</Button>
            </MUIList>
        );

    }
}

export default (withStyles(Styles)(List));