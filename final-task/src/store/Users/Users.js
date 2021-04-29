import {action, makeAutoObservable} from 'mobx';
import {api} from '../../utils/API';


class Users {

    users = {};

    constructor() {
        makeAutoObservable(this);
        this.api = api;
    }

    fetchUsers() {
        this.api.fetchUsers()
        .then(action(data => {
            for (const user of data) {
                this.users[user.id] = {
                    name: user.name,
                    photo: user.picture
                };
            }
        }))
        .catch(err => console.log(err));
    }

    fetchNotifications() {

    }

    markAsViewed() {
        
    }
}

const users = new Users();
export {users};