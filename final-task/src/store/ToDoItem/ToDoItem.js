import {makeAutoObservable} from 'mobx';

class ToDoItem {

    id
    description;
    status;
    importance;
    completed;
    contributors = [];
    comments = [];
    store;

    constructor(store, {id, description, status, importance, completed}) {
        this.store = store;
        this.id = id;
        this.description = description;
        this.status = status;
        this.importance = importance;
        this.completed = completed;
        makeAutoObservable(this);
    }

    fetchContributors() {
        this.store.api.fetchContributors(this.id)
        .then((data) => {
            this.contributors = data.contributors_list;
            // console.log(data.contributors_list);
        })
        .catch(err => console.log(err));
    }

    fetchComments() {
        this.store.api.fetchComments(this.id)
        .then((data) => {
            this.comments = data.comments_list;
        })
        .catch(err => console.log(err));
    }

    toggle() {
        this.store.toggleToDo(this.id, this, this.completed);
    }

    delete() {
        this.store.removeToDo(this.id);
    }

    edit(options) {
        this.store.editToDo(this.id, this, options);
    }

}

export {ToDoItem};