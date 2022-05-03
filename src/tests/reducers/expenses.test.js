import expenseReducer from "../../reducers/expenses";
import expenses from '../fixtures/expenses';
import uuid from 'uuid';

test ('should set default state', ()=>{
    const state = expenseReducer(undefined, {type : '@@INIT'});
    expect (state).toEqual([]);
});

test ('should remove expense by id', () =>{
    const action = {
        type : 'REMOVE_EXPENSE',
        id : expenses[1].id
    }

    const state = expenseReducer(expenses, action);
    expect (state).toEqual([expenses[0],expenses[2]]);
});

test ('should not remove expense by id not found', () =>{
    const action = {
        type : 'REMOVE_EXPENSE',
        id : '-1'
    }

    const state = expenseReducer(expenses, action);
    expect (state).toEqual([expenses[0],expenses[1],expenses[2]]);
});

test ('should add expense', () => {
    const newExpense = {
        id : uuid(),
        description : "Laptop",
        amount : 1240000,
        note : ''
    };

    const action = {
        type : 'ADD_EXPENSE',
        expense : newExpense
    };

    const state = expenseReducer(expenses, action);
    expect (state).toEqual( [...expenses, newExpense ] );
});

test ('should edit expense', () => {
    const updatedExpense = {
        description : 'New edited expense',
        amount : 20000,
        note : "Good note"
    };

    const action = {
        type : 'EDIT_EXPENSE',
        id : expenses[1].id,
        updates : updatedExpense
    }

    const state = expenseReducer(expenses, action);
    expect (state).toEqual([ expenses[0], { ...expenses[1], ...updatedExpense }, expenses[2] ]);

});

test ('should not edit expense if expense id not found', ()=>{
    const updatedExpense = {
        description : 'New edited expense',
        amount : 20000,
        note : "Good note"
    };

    const action = {
        type : 'EDIT_EXPENSE',
        id : '-1',
        updates : updatedExpense
    }

    const state = expenseReducer(expenses, action);
    expect (state).toEqual(expenses);
});