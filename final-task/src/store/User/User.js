import {makeAutoObservable} from 'mobx';

class User {

    id;
    name; 
    photo;
    store;

    constructor(store, user) {
        this.store = store;
        this.id = user.id;
        this.name = user.name;
        this.photo = user.photo;
        makeAutoObservable(this);
    }

    fetchNotifications() {
        this.store.fetchNotifications(this.id);
    }

    clearNotifications() {
        this.store.markAsViewed(this.id);
    }

}

export {User};