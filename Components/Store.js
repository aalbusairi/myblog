import { extendObservable } from "mobx";

class myStore {
  constructor() {
      extendObservable(this, {
        username: "",
        authenticated: false,
        token:"",
        loaded: false,
      }
    )
  }
}

export default new myStore()
