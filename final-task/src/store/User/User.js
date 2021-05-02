import {makeAutoObservable} from 'mobx';

class User {

    id;
    name; 
    photo;
    store;

    constructor(store, id, name, photo) {
        this.store = store;
        this.id = id;
        this.name = name;
        this.photo = photo;
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