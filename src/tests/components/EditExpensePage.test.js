import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper, expense, updatedExpense;

beforeEach ( () => {
    editExpense = jest.fn();
    removeExpense = jest.fn();

    history = { push : jest.fn() };
    expense = expenses[1];
    updatedExpense = { ...expense[1], amount : 20000 };

    wrapper = shallow (<EditExpensePage removeExpense={removeExpense} editExpense={editExpense} history={history} expense={expense}/>);
});

test ('should render edit  expense page correctly', () => {
    expect (wrapper).toMatchSnapshot();
});

test ('should handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(updatedExpense);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(editExpense).toHaveBeenLastCalledWith( expense.id, updatedExpense);
});

test ('should handle remove expense', () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(removeExpense).toHaveBeenLastCalledWith({ id : expense.id });
});