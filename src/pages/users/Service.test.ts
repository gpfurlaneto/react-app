import { UsersService } from './Service';
import * as Request from '../../lib/request';
import { User } from '../../types/User';

describe('Test service user list', () => {
  test('Load users', async () => {
    const users = [{ id: 1, username: 'username1', email: 'a@a.com' }];

    const getMock = jest.fn().mockReturnValue({ data: users });
    jest.spyOn(Request, 'get').mockImplementation(getMock);

    const service = new UsersService();
    const spy = jest.spyOn(service, 'updateState');

    await service.loadUsers();

    expect(getMock).toBeCalledTimes(1);
    expect(spy.mock.calls.length).toBe(2);
    expect(spy.mock.calls[0][0]).toEqual({
      users: null,
      isLoading: true,
      selectedUserToDelete: null,
    });
    expect(spy.mock.calls[1][0]).toEqual({
      users,
      isLoading: false,
      selectedUserToDelete: null,
    });
  });

  test('Select user to delete', () => {
    const users = [{ id: 1, username: 'username1', email: 'a@a.com' }];

    const service = new UsersService();

    service.updateState({
      users,
      isLoading: false,
      selectedUserToDelete: null as unknown as User,
    });

    const spy = jest.spyOn(service, 'updateState');
    spy.mockClear();

    service.selectUserToDelete(users[0]);

    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual({
      users,
      isLoading: false,
      selectedUserToDelete: users[0],
    });
  });

  test('Clear selected user to delete', () => {
    const users = [{ id: 1, username: 'username1', email: 'a@a.com' }];

    const service = new UsersService();

    service.updateState({
      users,
      isLoading: false,
      selectedUserToDelete: users[0],
    });

    const spy = jest.spyOn(service, 'updateState');
    spy.mockClear();

    service.clearSelectUserToDelete();

    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toEqual({
      users,
      isLoading: false,
      selectedUserToDelete: null as unknown as User,
    });
  });

  test('Delete selected user', async () => {
    const service = new UsersService();

    const users = [{ id: 1, username: 'username1', email: 'a@a.com' }];

    service.updateState({
      users,
      isLoading: false,
      selectedUserToDelete: users[0],
    });

    const spy = jest.spyOn(service, 'updateState');
    spy.mockClear();

    const deleteMock = jest.fn().mockReturnValue({ isOk: true });
    jest.spyOn(Request, '$delete').mockImplementation(deleteMock);

    await service.deleteSelectedUser();

    expect(deleteMock).toBeCalledTimes(1);
    expect(spy.mock.calls.length).toBe(2);
    expect(spy.mock.calls[0][0]).toEqual({
      users,
      isLoading: true,
      selectedUserToDelete: users[0],
    });
    expect(spy.mock.calls[1][0]).toEqual({
      users: [],
      isLoading: false,
      selectedUserToDelete: null as unknown as User,
    });
  });
});
