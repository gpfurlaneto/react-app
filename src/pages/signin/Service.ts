import BaseService from '../../lib/base-service';
import { cloneDeep } from 'lodash';
import { post } from '../../lib/request';
import { User, SignInPayload, UserSignIn } from '../../types/User';
import apiConfig from '../../lib/api-config';
import sessionHandler from '../../lib/session-handler';

export const defaultSignInState = {
  username: '',
  password: '',
  isSubmiting: false,
  isValidUsername: true,
  isValidPassword: true,
};

export type SignInState = typeof defaultSignInState;

class Service extends BaseService<SignInState> {
  getDefaultState() {
    return cloneDeep(defaultSignInState);
  }

  getEventIdentifier() {
    return 'sign-in-event';
  }

  onChangeUsername(value: string) {
    this.updateKey('username', value);
    this.updateKey(
      'isValidUsername',
      Boolean(this.currentState.username && this.currentState.username.length),
    );
  }

  onChangePassword(value: string) {
    this.updateKey('password', value);
    this.updateKey(
      'isValidPassword',
      Boolean(this.currentState.password && this.currentState.password.length),
    );
  }

  async onSignIn(): Promise<string | User> {
    const isValidUsername = Boolean(
      this.currentState.username && this.currentState.username.length,
    );
    const isValidPassword = Boolean(
      this.currentState.password && this.currentState.password.length,
    );
    const invalid = !isValidUsername || !isValidPassword;
    this.updateState({
      ...this.currentState,
      isValidUsername,
      isValidPassword,
      isSubmiting: !invalid,
    });

    if (invalid) {
      return null as unknown as string;
    }

    const payload: SignInPayload = {
      username: this.currentState.username,
      password: this.currentState.password,
    } as SignInPayload;
    
    const result: Response<UserSignIn> = await post<SignInPayload, UserSignIn>(
      apiConfig.session.signIn(),
      payload as SignInPayload,
    ) as Response<UserSignIn>;

    this.updateState({
      ...this.currentState,
      isSubmiting: false,
    });

    const data = result.data as UserSignIn;
    const error = result.error as string
    if (!error) {
      sessionHandler.saveToken(data!.token as string);
      return (data as UserSignIn)!.user as User;
    } else {
      return error;
    }
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
