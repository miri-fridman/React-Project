import { observable, makeObservable, action } from 'mobx';

class IsAdminStore {
  isAdmin = false;

  constructor() {
    makeObservable(this, {
      isAdmin: observable,
      setIsAdmin: action,
    });
  }

  setIsAdmin = (val) => {
    this.isAdmin = val;
  };
}

const isAdminStore = new IsAdminStore();
export default isAdminStore;
