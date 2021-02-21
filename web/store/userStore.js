import { makeAutoObservable } from 'mobx';

class UserStore {
    constructor() {
        makeAutoObservable(this);
    }

    username = 'csd';

}

export default new UserStore();