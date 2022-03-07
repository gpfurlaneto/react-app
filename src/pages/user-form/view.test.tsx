import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserFormPageWrapper } from '.';
import { UserFormState } from './Service';

let defaultState: UserFormState = {
  id: null as unknown as string,
  username: '',
  email: '',
  password: '',
  isLoading: false,
  errorEmail: false,
  errorUsername: false,
  errorPassword: false,
};

describe('Test view user form', () => {
  beforeEach(() => {
    defaultState = {
      id: null as unknown as string,
      username: '',
      email: '',
      password: '',
      isLoading: false,
      errorEmail: false,
      errorUsername: false,
      errorPassword: false,
    };
  });

  test('show error message', () => {
    const { getByText } = render(
      <BrowserRouter>
        <UserFormPageWrapper
          state={{
            ...defaultState,
            errorEmail: true,
            errorUsername: true,
            errorPassword: true,
          }}
          onChangeUsername={jest.fn()}
          onChangeEmail={jest.fn()}
          onChangePasword={jest.fn()}
          onSave={jest.fn()}
          onCancel={jest.fn()}
        />
      </BrowserRouter>,
    );

    expect(getByText('Username is required.')).toBeVisible();
    expect(getByText('Email is required.')).toBeVisible();
    expect(getByText('Password is required.')).toBeVisible();
  });

  test('onChenge username, email, password', () => {
    const changeUsernameMock = jest.fn();
    const changeEmailMock = jest.fn();
    const changePaswordMock = jest.fn();

    const { getByTestId } = render(
      <BrowserRouter>
        <UserFormPageWrapper
          state={defaultState}
          onChangeUsername={changeUsernameMock}
          onChangeEmail={changeEmailMock}
          onChangePasword={changePaswordMock}
          onSave={jest.fn()}
          onCancel={jest.fn()}
        />
      </BrowserRouter>,
    );

    const inputUsername = getByTestId('username');
    fireEvent.change(inputUsername, { target: { value: 'usernamevalue' } });
    expect(changeUsernameMock.mock.calls.length).toBe(1);
    expect((changeUsernameMock.mock.calls as [1][])[0][0]).toBe(
      'usernamevalue',
    );

    const inputEmail = getByTestId('email');
    fireEvent.change(inputEmail, {
      target: { value: 'emailvalue@emailvalue.com' },
    });
    expect(changeEmailMock.mock.calls.length).toBe(1);
    expect((changeEmailMock.mock.calls as [1][])[0][0]).toBe(
      'emailvalue@emailvalue.com',
    );

    const inputPassword = getByTestId('password');
    fireEvent.change(inputPassword, { target: { value: 'Test123!' } });
    expect(changePaswordMock.mock.calls.length).toBe(1);
    expect((changePaswordMock.mock.calls as [1][])[0][0]).toBe('Test123!');
  });

  test('call onSave and onCancel', () => {
    const onSaveMock = jest.fn();
    const onCancelMock = jest.fn();

    const { getByTestId } = render(
      <BrowserRouter>
        <UserFormPageWrapper
          state={defaultState}
          onChangeUsername={jest.fn()}
          onChangeEmail={jest.fn()}
          onChangePasword={jest.fn()}
          onSave={onSaveMock}
          onCancel={onCancelMock}
        />
      </BrowserRouter>,
    );

    const saveButton = getByTestId('save');
    fireEvent.click(saveButton);
    expect(onSaveMock.mock.calls.length).toBe(1);

    const cancelButton = getByTestId('cancel');
    fireEvent.click(cancelButton);
    expect(onCancelMock.mock.calls.length).toBe(1);
  });
});
