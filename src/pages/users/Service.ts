import { BaseService } from "../../lib/base-service"
import { cloneDeep } from "lodash"
import { Request } from "../../lib/request"
import { User } from "../../types/User"
import { apiConfig } from "../../lib/api-config"
export const defaultUsersState = {
  users: null as unknown as User[],
  isLoading: false,
  selectedUserToDelete: null as unknown as User,
}

export type UsersState = typeof defaultUsersState

class Service extends BaseService<UsersState> {

  async deleteSelectedUser() {
    this.updateState({
      ...this.currentState,
      isLoading: true
    })
    const result = await Request.$delete<User>(apiConfig.users.delete(this.currentState.selectedUserToDelete.id))
    let newState = { ...this.currentState, isLoading: false }
    if (result.isOk) {
      newState.selectedUserToDelete = null as unknown as User;
      newState.users = newState.users.filter(user => user.id !== this.currentState.selectedUserToDelete.id)
    }
    this.updateState(newState)
    return result;
  }

  clearSelectUserToDelete(): void {
    this.selectUserToDelete(null as unknown as User)
  }

  selectUserToDelete(user: User): void {
    this.updateState({
      ...this.currentState,
      selectedUserToDelete: user,
    })
  }

  async loadUsers() {

    this.updateState({
      ...this.currentState,
      isLoading: true
    })
    const result = await Request.get<User>(apiConfig.users.loadAll())
    this.updateState({
      ...this.currentState,
      users: result.data as unknown as User[] || [] as User[],
      isLoading: false
    })
  }

  getDefaultState() {
    return cloneDeep(defaultUsersState)
  }

  getEventIdentifier() {
    return 'user-event'
  }

}

let instance: Service | null = null
const instanciate = () => {
  if (!instance) {
    instance = new Service()
  }
  return instance
}

export default instanciate()