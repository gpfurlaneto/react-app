export abstract class BaseService<TState> {

  currentState: TState
  events: { [key: string]: (newState: TState) => void }

  constructor(){
    this.reset()
    this.events = {}
    this.currentState = this.getDefaultState()
  }

  abstract getDefaultState(): TState
  abstract getEventIdentifier(): string

  reset() {
    this.currentState = this.getDefaultState()
  }

  registerEvent(key: string, setState: (newState: TState) => void ) {
    this.events[key] = setState
  }

  updateState(newState: TState) {
    this.currentState = newState
    Object.keys(this.events).forEach(key => this.events[key](this.currentState))
  }

  updateKey(key: string, value: any) {
    this.updateState({
      ...this.currentState,
      [key]: value
    })
  }
}