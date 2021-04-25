import {action, makeAutoObservable} from 'mobx';
import {api} from '../../utils/API';

class Contributors {

    contributors = [];

    constructor() {
        makeAutoObservable(this);
        this.api = api;
    }


    fetchContributors(toDo_id) {
        api.fetchContributors(toDo_id)
        .then(data => this.contributors = data)
        .catch(err => console.log(err));
    }

    addContributor(toDo_id) {
        
    }
}

export default Contributors;