import { cloneDeep } from 'lodash';
import BaseService from '../../lib/base-service';
import { get, put, post } from '../../lib/request';
import { User, UserPayload } from '../../types/User';
import apiConfig from '../../lib/api-config';

/* eslint-disable no-useless-escape */
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const defaultUserFormState = {
  id: null as unknown as string,
  username: '',
  email: '',
  password: '',
  isLoading: false,
  errorEmail: false,
  errorUsername: false,
  errorPassword: false,
};

export type UserFormState = typeof defaultUserFormState;

class Service extends BaseService<UserFormState> {
  async loadUser(userId: string) {
    this.updateKey('isLoading', true);
    const result = await get<User>(apiConfig.users.loadUser(userId));
    if (result.isOk) {
      this.updateState({
        ...this.currentState,
        id: userId,
        isLoading: false,
        username: result.data?.username as string,
        email: result.data?.email as string,
      });
    }
    return result;
  }

  async save() {
    const { errorEmail, errorUsername, errorPassword } = this.validate();

    if (errorEmail || errorUsername || errorPassword) {
      this.updateState({
        ...this.currentState,
        errorEmail,
        errorUsername,
        errorPassword,
      });
      return null;
    }
    this.updateKey('isLoading', true);

    const payload: UserPayload = {
      username: this.currentState.username,
      email: this.currentState.email,
    };

    if (!this.currentState.id) {
      payload.password = this.currentState.password;
    }

    const request = this.currentState.id ? put : post;
    const result = await request<UserPayload, User>(
      apiConfig.users.save(this.currentState.id || ''),
      payload,
    );

    if (result.isOk) {
      this.updateState({
        ...this.currentState,
        isLoading: false,
        errorEmail,
        errorUsername,
        errorPassword,
      });
    }
    return result;
  }

  validate(): {
    errorEmail: boolean;
    errorUsername: boolean;
    errorPassword: boolean;
  } {
    const { username, email, password, id } = this.currentState;
    const errorEmail = !email || !emailRegex.test(email);
    const errorUsername = !username;
    const errorPassword = !id && !password;
    return {
      errorEmail,
      errorUsername,
      errorPassword,
    };
  }

  getDefaultState() {
    return cloneDeep(defaultUserFormState);
  }

  getEventIdentifier() {
    return 'user-form-event';
  }

  onChangePasword(value: string): void {
    this.updateKey('password', value);
  }

  onChangeEmail(value: string): void {
    this.updateKey('email', value);
  }

  onChangeUsername(value: string): void {
    this.updateKey('username', value);
  }
}

let instance: Service | null = null;
const instanciate = () => {
  if (!instance) {
    instance = new Service();
  }
  return instance;
};

export default instanciate();
