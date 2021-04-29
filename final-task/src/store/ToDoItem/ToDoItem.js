import {makeAutoObservable, action} from 'mobx';

class ToDoItem {

    id
    description;
    status;
    importance;
    completed;
    contributors = [];
    author_id;
    executor_id;
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
        .then(action((data) => {
            this.contributors = [];
            for (const contributor of data.contributors_list) {
                if (contributor.role === 'author') {
                    this.author_id = contributor.user_id;
                    this.contributors.unshift(contributor);
                } else if (contributor.role === 'executor') {
                    this.executor_id = contributor.user_id;
                    this.contributors.unshift(contributor);
                } else {
                    this.contributors.push(contributor);
                }
            }
        })).catch(err => console.log(err));
    }

    fetchComments() {
        this.store.api.fetchComments(this.id)
        .then(action((data) => {
            this.comments = data.comments_list;
        }))
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

    displayComments() {
        this.store.setChosen(this);
    }

    leaveComment(user_id, text) {
        this.store.api.addComment(this.id, user_id, text)
        .then(action(data => {
            this.comments.push(data);
            this.store.api.addContributor(this.id, user_id, 'commentator');
        })).catch(err => console.log(err));
    }
}

export {ToDoItem};