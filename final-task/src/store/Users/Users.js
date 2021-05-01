import {action, makeAutoObservable} from 'mobx';
import {api} from '../../utils/API';


class Users {

    users = {};
    userNotifications = [];

    constructor() {
        makeAutoObservable(this);
        this.api = api;
    }

    fetchUsers() {
        this.api.fetchUsers()
        .then(action(data => {
            for (const user of data) {
                this.users[user.id] = new User(this, user.id, user.name, user.picture);
            }
        }))
        .catch(err => console.log(err));
    }

    fetchNotifications(user_id) {
        this.api.fetchNotifications(user_id)
        .then(data => {
            this.userNotifications = data.notifications_list;
            console.log(data);
        }).catch(err => console.log(err));
    }

    markAsViewed(user_id) {
        this.api.deleteNotifications(user_id)
        .then()
    }
}

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

}

const users = new Users();
export {users};