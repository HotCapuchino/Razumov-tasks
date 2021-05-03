import {action, makeAutoObservable} from 'mobx';
import {api} from '../../utils/API';
import {User} from '../User/User';

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
        }).catch(err => console.log(err));
    }

    markAsViewed(user_id) {
        this.api.deleteNotifications(user_id)
        .then(() => {
            this.userNotifications = [];
        });
    }
}

const users = new Users();
export {users};