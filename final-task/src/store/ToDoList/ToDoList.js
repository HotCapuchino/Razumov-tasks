import {action, makeAutoObservable, runInAction} from 'mobx';
import {api} from '../../utils/API';
import {ToDoItem} from '../ToDoItem/ToDoItem';

class ToDoList {

    toDos = [];
    isLoading = true;
    searched = '';
    chosenToDo = null;

    constructor() {
        makeAutoObservable(this);
        this.api = api;
    }

    fetchToDos() {
        this.api.fetchToDos()
        .then(action(data => {
            this.toDos = [];
            for (const toDo of data) {
                this.toDos.push(new ToDoItem(this, toDo));
            }
            this.setChosen(this.unfinishedToDos[0]);
            setTimeout(() => {
                this.isLoading = false;
            }, 500);
        }))
        .catch(err => console.log(err));
    }

    createToDo(description, importance, executor_id, author_id, author_name) {
        this.api.createToDo(description, importance)
        .then(action((toDo) => {
            let {id, description, status, importance, completed} = toDo;
            let createdToDo = new ToDoItem(this, {
                id,
                description, 
                status, 
                importance, 
                completed
            });
            this.toDos.push(createdToDo);
            this.api.addContributor(id, author_id, 'author')
            .then(action(() => {
                createdToDo.contributors.push({
                    user_id: author_id,
                    role: 'author'
                });
                if (author_id !== executor_id) {
                    this.api.addContributor(id, executor_id, 'executor')
                    .then(action(() => {
                        createdToDo.contributors.push({
                            user_id: executor_id,
                            role: 'executor'
                        });
                    }));
                }  
            })).catch(err => console.log(err));
            this.api.addNotification(executor_id, `${author_name} made you an executor of ${description} ToDo`);   
        }))
        .catch(err => console.log(err));
    }

    removeToDo(id) {
        api.deleteToDo(id)
        .then(action(() => {
            if (id === this?.chosenToDo?.id) {
                runInAction(() => {
                    this.chosenToDo = null;
                });
            }
            runInAction(() => {
                this.toDos = this.toDos.filter(function(toDo) {
                    if (toDo.id !== id) return toDo;
                });
            })
        })).catch(err => console.log(err));
    }

    toggleToDo(id, ref, value, author_id, toggler_name) {
        api.toggleToDo(id, !value)
        .then(action(() => {
            ref.completed = !value;
            let notificationText = '';
            if (ref.completed) {
                notificationText = `${toggler_name} has completed your task`;
            } else {
                notificationText = `${toggler_name} has resumed your task`;
            }
            api.addNotification(author_id, notificationText)
        })).catch(err => console.log(err));
    }

    editToDo(id, ref, options) {
        let {description, status, importance} = options;
        api.editToDo(id, options)
        .then(action(() => {
            ref.description = description;
            ref.status = status;
            ref.importance = importance
        })).catch(err => console.log(err));
    }

    setSearched(value) {
        this.searched = value;
    }

    setChosen(chosen) {
        this.chosenToDo = chosen;
    }

    get completedToDos() {
        let completed = [];
        this.toDos.forEach(toDo => {
            if (toDo.completed) {
                completed.push(toDo);
            }
        });
        return completed;
    }

    get unfinishedToDos() {
        let unfinished = [];
        this.toDos.forEach(toDo => {
            if (!toDo.completed) {
                unfinished.push(toDo);
            }
        });
        return unfinished;
    }

    get searchedToDos() {
        return this.unfinishedToDos.filter((toDo) => {
            if (toDo.description.toLowerCase().indexOf(this.searched) >= 0) {
                return toDo;
            }
        })
    }

}

const toDoList = new ToDoList();
export default toDoList;