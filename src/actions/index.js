import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDER, TOGGLE_REMINDER } from '../constants';

export const addReminder = (text, dueDate) => {
    const action = {
        type: ADD_REMINDER,
        text: text,
        dueDate,
        completed: false
    }
    return action;
}

export const deleteReminder = (id) => {
    const action = {
        type: DELETE_REMINDER,
        id
    }
    return action;
}

export const clearReminder = () => {
    const action = {
        type: CLEAR_REMINDER
    }
    return action;
}

export const toggleReminder = (id) => {
    const action = {
        type: TOGGLE_REMINDER,
        id
    }
    return action;
}