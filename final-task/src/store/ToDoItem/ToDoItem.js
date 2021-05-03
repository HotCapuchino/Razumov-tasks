import {makeAutoObservable, action, runInAction} from 'mobx';

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
                    runInAction(() => this.author_id = contributor.user_id);
                    this.contributors.unshift(contributor);
                } else if (contributor.role === 'executor') {
                    this.executor_id = contributor.user_id;
                    this.contributors.unshift(contributor);
                } else {
                    this.contributors.push(contributor);
                }
            }
        })).catch(err => {console.log(err)});
    }

    fetchComments() {
        this.store.api.fetchComments(this.id)
        .then(action((data) => {
            this.comments = data.comments_list;
        }))
        .catch(err => console.log(err));
    }

    toggle(author_id, toggler_name) {
        this.store.toggleToDo(this.id, this, this.completed, author_id, toggler_name);
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

    leaveComment(user_id, userName, text) {
        this.store.api.addComment(this.id, user_id, text)
        .then(action(async(data) => {
            this.comments.push(data);
            let needToBeAdded = true;
            for (const contributor of this.contributors) {
                if (contributor.user_id == user_id) {
                    needToBeAdded = false;
                    break;
                }
            }
            if (needToBeAdded) {
                let response = await this.store.api.addContributor(this.id, user_id, 'commentator');
                if (response) {
                    runInAction(() => {
                        this.contributors.push({
                            user_id: user_id,
                            role: 'commentator'
                        });
                    });
                }
            }
            this.store.api.addNotification(this.author_id, `${userName} has left comment on your task`);
        })).catch(err => console.log(err));
    }
    
}

export {ToDoItem};