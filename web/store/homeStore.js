import { makeAutoObservable } from 'mobx';

class HomeStore {
    constructor() {
        makeAutoObservable(this);
    }

    count = 0;
    loading = false;

    increment = () => {
        this.count += 1
    }

    decrement = () => {
        this.count -= 1
    }

    getBannerList = () => {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 1800);
    }

    getPV = () => {
    }

};

export default new HomeStore();