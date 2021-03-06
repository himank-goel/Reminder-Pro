import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminder, toggleReminder } from '../actions';
import moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate);
    }

    deleteReminder(id) {
        this.props.deleteReminder(id);
    }

    toggleReminder(id) {
        this.props.toggleReminder(id)
    }

    renderReminders() {
        const { reminders } = this.props;
        return(
            <ul className = "list-group col-sm-4">
                {
                    reminders.map(reminder => {
                        return(
                            <li key = { reminder.id } className = "list-group-item">
                                <div 
                                    className = "list-item chkbox"
                                    onChange = {() => {
                                        this.toggleReminder(reminder.id)
                                    }}
                                >
                                    <input 
                                        type = "checkbox"
                                        defaultChecked = { reminder.completed }
                                    />
                                </div>
                                {  
                                    (reminder.completed === true) ?
                                        <del> 
                                            <div className = "list-item"> 
                                                <div> <del> { reminder.text }</del> </div>
                                                <div><em>{ moment(new Date(reminder.dueDate)).fromNow() }</em></div>
                                            </div>
                                        </del> :
                                        <div className = "list-item"> 
                                            <div> { reminder.text } </div>
                                            <div><em>{ moment(new Date(reminder.dueDate)).fromNow() }</em></div>
                                        </div>
                                }
                                <div
                                    onClick = { () => {
                                            this.deleteReminder(reminder.id)
                                        }
                                    } 
                                    className = "list-item delete-button">
                                    &#x2715;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className = "App">
                <div className = "title">
                Reminder Pro
                </div>
                <div className = "form-inline reminder-form">
                    <div className = "form-group">
                        <input  
                            className = "form-control"
                            placeholder = "I have to ..."
                            onChange = {
                                event => this.setState({text: event.target.value})
                            }
                        />
                         <input
                            className = "form-control"
                            type = "datetime-local"
                            onChange = {
                                event => this.setState({
                                    dueDate: event.target.value
                                })
                            }
                         />
                    </div>
                    <button 
                        type = "button"
                        className = "btn btn-success"
                        onClick = {
                            () => this.addReminder()
                        }
                    >
                        Add Reminder
                    </button>
                </div>    
                { this.renderReminders() }
                <div 
                    className = "btn btn-danger"
                    onClick = {() => this.props.clearReminder()}
                >
                    Clear reminders
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminder, toggleReminder })(App);