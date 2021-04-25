import {makeAutoObservable} from 'mobx';
import {api} from '../../utils/API';

class Comments {
    
    comments = [];
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
        this.api = api;
    }

    fetchComments(toDo_id) {
        api.fetchComments(toDo_id)
        .then(comms => {
            this.comments = comms;
            this.isLoading = false;
        });
    }
}