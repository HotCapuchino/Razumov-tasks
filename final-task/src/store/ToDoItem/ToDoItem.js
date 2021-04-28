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
            // for (const contributor of data.contributors_list) {
            //     console.log(contributor);
            //     if (contributor.role === 'executor') {
            //         this.contributors.unshift(contributor);
            //         continue;
            //     }
            //     if (contributor.role === 'author') {
            //         if (this.contributors.length > 1) {
            //             this.contributors[1] = contributor;
            //         } else {
            //             this.contributors.push(contributor);
            //         }
            //         continue;
            //     }
            //     this.contributors.push(contributor);
            // }
            this.contributors = data.contributors_list;
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

    displayComments() {
        this.store.setChosen(this);
    }

    leaveComment(user_id, text) {
        this.store.api.addComment(this.id, user_id, text)
        .then(data => {
            this.comments.push(data);
        }).catch(err => console.log(err));
    }

    get executor() {
        for (const contributor of this.contributors) {
            if (contributor.role === 'executor') {
                return contributor.user_id;
            }
        }
        return null;
    }

}

export {ToDoItem};