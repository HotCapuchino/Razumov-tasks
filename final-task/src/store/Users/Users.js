import {action, makeAutoObservable} from 'mobx';
import {api} from '../../utils/API';


class Users {

    users = [];

    constructor() {
        makeAutoObservable(this);
        this.api = api;
    }

    fetchUsers() {
        this.api.fetchUsers()
        .then(action(data => {
            this.users = data;
        }))
        .catch(err => console.log(err));
    }
}

const users = new Users();
export {users};