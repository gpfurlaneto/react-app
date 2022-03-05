import { cloneDeep } from 'lodash';
import { User } from '../../types/User';
import { get } from '../../lib/request';
import BaseService from '../../lib/base-service';
import routesConfig from '../../lib/routes-config';
import sessionHandler from '../../lib/session-handler';

export interface SessionState {
  user?: User;
  isLoadingUser: boolean;
}

export const defaultSessioState: SessionState = {
  user: undefined,
  isLoadingUser: false,
};

class Service extends BaseService<SessionState> {
  constructor() {
    super();
    this.updateState(defaultSessioState);
  }

  getDefaultState() {
    return cloneDeep(defaultSessioState);
  }

  getEventIdentifier() {
    return 'session-event';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset() {}

  setUser(user: User) {
    this.updateKey('user', user);
  }

  async loadUser() {
    if (sessionHandler.getToken()) {
      this.updateKey('isLoadingUser', true);
      const result = await get<User>(routesConfig.session.loadUser());

      if (!result.error) {
        this.updateState({
          ...this.currentState,
          user: result.data,
          isLoadingUser: false,
        });
      } else {
        this.logout();
        this.updateKey('isLoadingUser', false);
      }
    }
  }

  logout() {
    sessionHandler.clearToken();
    this.updateKey('user', null);
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
