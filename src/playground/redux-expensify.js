import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';


// ADD_EXPENSE
const addExpense = ( 
    { 
        description ="", 
        note = "", 
        amount = 0, 
        createdAt = 0 
    } = {} 
) => ({
    type : 'ADD_EXPENSE',
    expense : {
        id : uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE

const removeExpense = (
    {
        id = ""
    }
) => ( {
    type : 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type : 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = "") => ({
    type : 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type : 'SORT_BY_DATE'
});

// SORT_BY AMOUNT
const sortByAmount = () => ({
    type : 'SORT_BY_AMOUNT'
});



// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type : 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type : 'SET_END_DATE',
    endDate
});



// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter ( (expense) => {
        const startDateMatch = typeof startDate !== 'number' ||  expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' ||  expense.createdAt <= endDate;
        const textMatch = text == '' || expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort( (a,b) => {
        if (sortBy == 'date'){
            return a.createdAt < b.createdAt ? 1: -1;
        } else if (sortBy == 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}


// Stroe creation
const store = createStore(
    combineReducers({
        expenses : expensesReducer,
        filters : filtersReducer
    })
);

store.subscribe ( () => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

    console.log (visibleExpenses);
});

const expenseOne = store.dispatch(addExpense( {description: "Rent", amount : 100,createdAt : -21000 } ));
const expenseTwo = store.dispatch(addExpense( {description: "Coffee", amount : 300, createdAt : -1000 } ));

// store.dispatch (removeExpense( { id : expenseOne.expense.id }));

// store.dispatch (editExpense( expenseTwo.expense.id, {amount: 500}));

// store.dispatch( setTextFilter('fe'));
// store.dispatch( setTextFilter());


// store.dispatch ( sortByAmount() );
store.dispatch ( sortByDate() );


// store.dispatch ( setStartDate(0));
// store.dispatch ( setStartDate());
// store.dispatch ( setEndDate(999));


const demoState = {
    expenses : [
        {
            id : '23233',
            description : 'January rent',
            note : 'This was the final payment for that address',
            amount : 54500,
            createdAt : 0
        }
    ],
    filters : {
        text : 'rent',
        sortBy : 'amount', // date or amount
        startDate : undefined,
        endDate : undefined
    }
};


// const user = {
//     name : "Jen",
//     age : 24
// };

// console.log ({
//     ...user,
//     location : 'Philadelphia',
//     age : 33
// });