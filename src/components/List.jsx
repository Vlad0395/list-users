import React, { Component } from 'react';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import { Button, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const Styles = theme => ({
    textField: {
        marginRight: 20,
        listStyle: 'none'
    },
    text: {
        marginRight: 20
    },
    btn: {
        marginRight: 10
    },
    top: {
        marginTop: 10
    },
    botton:{
        marginBottom:10
    }

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
    handleMove = (index, moveToIndex) => {
        let list = [...this.state.list];
        let a = list[index]
        list[index] = list[moveToIndex]
        list[moveToIndex] = a;
        this.setState({ list })
        if (this.props.onChange) {
            this.props.onChange(list);
        }
    }
    render() {

        const { list } = this.state;
        const { classes } = this.props;

        return (
            <div>
                {map(list, (item, i) => (
                    <ul key={i}>
                        <li
                            className={classes.textField}
                        >
                            <span className={classes.text}>{item.value}</span>
                            {item.sublist ?
                                <Button
                                    onClick={() => this.handleRemoveSublist(i)}
                                    variant='contained'
                                    className={classes.btn}
                                    size='small'
                                >
                                    Remove Sublist
                                </Button>
                                : <Button
                                    onClick={() => this.handleAddSublist(item)}
                                    variant='outlined'
                                    className={classes.btn}
                                    size='small'
                                >
                                    Add Sublist
                                    </Button>
                            }
                            <Button
                                onClick={() => this.handleRemove(item)}
                                variant='contained'
                                className={classes.btn}
                                size='small'
                            >
                                Remove
                            </Button>
                            {i > 0 &&
                                <Button
                                    onClick={() => this.handleMove(i, i - 1)}
                                    variant='outlined'
                                    className={classes.btn}
                                    size='small'
                                >
                                    <ArrowUpward />
                                </Button>}
                            {i < list.length - 1 &&
                                <Button
                                    onClick={() => this.handleMove(i, i + 1)}
                                    variant='outlined'
                                    className={classes.btn}
                                    size='small'
                                >
                                    <ArrowDownward />
                                </Button>}
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

                        </li>
                    </ul>
                ))}
                <TextField
                    className={classes.textField}
                    type="text" value={this.state.input}
                    onChange={this.handleInput}
                />

                <Button
                    onClick={this.handleAddItem}
                    variant='contained'
                    size='small'
                    color='secondary'
                >
                    Add
                </Button>
            </div>)
    }
}

export default (withStyles(Styles)(List));