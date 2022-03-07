import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import * as H from 'history';
import { UsersPageWrapper } from '.';
import { UsersState } from './Service';
import { User } from '../../types/User';

let defaultState: UsersState = {
  users: [],
  isLoading: false,
  selectedUserToDelete: null as unknown as User,
};

describe('Test view user list', () => {
  beforeEach(() => {
    defaultState = {
      users: [],
      isLoading: false,
      selectedUserToDelete: null as unknown as User,
    };
  });

  test('show loadin backdrop', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <UsersPageWrapper
          state={
            {
              ...defaultState,
              isLoading: true,
            } as UsersState
          }
          selectUserToDelete={jest.fn()}
          clearDeleteUser={jest.fn()}
          deleteSelectedUser={jest.fn()}
        />
      </BrowserRouter>,
    );

    const loadingComponent = getByTestId('loading-backdrop');
    expect(loadingComponent).toBeVisible();
  });

  test('show users loaded', () => {
    const { getByText } = render(
      <BrowserRouter>
        <UsersPageWrapper
          state={{
            ...defaultState,
            users: [
              { id: 1000, username: 'usernamea', email: 'a@a.com' },
              { id: 2000, username: 'usernameb', email: 'b@b.com' },
            ],
          }}
          selectUserToDelete={jest.fn()}
          clearDeleteUser={jest.fn()}
          deleteSelectedUser={jest.fn()}
        />
      </BrowserRouter>,
    );

    const userId1000 = getByText('1000');
    expect(userId1000).toBeVisible();

    const userNameA = getByText('usernamea');
    expect(userNameA).toBeVisible();

    const userEmailA = getByText('a@a.com');
    expect(userEmailA).toBeVisible();

    const userId2000 = getByText('2000');
    expect(userId2000).toBeVisible();

    const userNameB = getByText('usernameb');
    expect(userNameB).toBeVisible();

    const userEmailB = getByText('b@b.com');
    expect(userEmailB).toBeInTheDocument();
  });

  test('call delete event', () => {
    const selectUserToDelete = jest.fn();

    const user = { id: 1000, username: 'usernamea', email: 'a@a.com' };
    const { getByTestId } = render(
      <BrowserRouter>
        <UsersPageWrapper
          state={{
            ...defaultState,
            users: [user],
          }}
          selectUserToDelete={selectUserToDelete}
          clearDeleteUser={jest.fn()}
          deleteSelectedUser={jest.fn()}
        />
      </BrowserRouter>,
    );

    const deleteButton = getByTestId('delete-1000');
    fireEvent.click(deleteButton);

    expect(selectUserToDelete.mock.calls.length).toBe(1);
    expect((selectUserToDelete.mock.calls as [1][])[0][0]).toBe(user);
  });

  test('call confirm delete user event', () => {
    const confirmDeleteFn = jest.fn();

    const user = { id: 1000, username: 'usernamea', email: 'a@a.com' };
    const { getByTestId } = render(
      <BrowserRouter>
        <UsersPageWrapper
          state={{
            ...defaultState,
            selectedUserToDelete: user,
            users: [user],
          }}
          selectUserToDelete={jest.fn()}
          clearDeleteUser={jest.fn()}
          deleteSelectedUser={confirmDeleteFn}
        />
      </BrowserRouter>,
    );

    const confirm = getByTestId('confirm');
    fireEvent.click(confirm);

    expect(confirmDeleteFn.mock.calls.length).toBe(1);
  });

  test('call cancel delete user event', () => {
    const cancelDelete = jest.fn();

    const user = { id: 1000, username: 'usernamea', email: 'a@a.com' };
    const { getByTestId } = render(
      <BrowserRouter>
        <UsersPageWrapper
          state={{
            ...defaultState,
            selectedUserToDelete: user,
            users: [user],
          }}
          selectUserToDelete={jest.fn()}
          clearDeleteUser={cancelDelete}
          deleteSelectedUser={jest.fn()}
        />
      </BrowserRouter>,
    );

    const cancel = getByTestId('cancel');
    fireEvent.click(cancel);

    expect(cancelDelete.mock.calls.length).toBe(1);
  });

  test('redirect user to create new user', () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    const user = { id: 1000, username: 'usernamea', email: 'a@a.com' };
    const { getByTestId } = render(
      <Router history={historyMock as unknown as H.History}>
        <UsersPageWrapper
          state={{
            ...defaultState,
            selectedUserToDelete: user,
            users: [user],
          }}
          selectUserToDelete={jest.fn()}
          clearDeleteUser={jest.fn()}
          deleteSelectedUser={jest.fn()}
        />
      </Router>,
    );

    const editLink = getByTestId('new-user');
    fireEvent.click(editLink);
    expect(historyMock.push.mock.calls.length).toBe(1);
    expect((historyMock.push.mock.calls as [1][])[0][0]).toBe('/users/form/');
  });

  test('redirect user to edit', () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

    const user = { id: 1000, username: 'usernamea', email: 'a@a.com' };
    const { getByTestId } = render(
      <Router history={historyMock as unknown as H.History}>
        <UsersPageWrapper
          state={{
            ...defaultState,
            selectedUserToDelete: user,
            users: [user],
          }}
          selectUserToDelete={jest.fn()}
          clearDeleteUser={jest.fn()}
          deleteSelectedUser={jest.fn()}
        />
      </Router>,
    );

    const editLink = getByTestId('edit-1000');
    fireEvent.click(editLink);
    expect(historyMock.push.mock.calls.length).toBe(1);
    expect((historyMock.push.mock.calls as [1][])[0][0]).toBe(
      '/users/form/1000',
    );
  });
});
