import {action, makeAutoObservable} from 'mobx';
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

    createToDo(description, importance, executor_id, author_id) {
        this.api.createToDo(description, importance)
        .then(action((toDo) => {
            let {id, description, status, importance, completed} = toDo;
            this.api.addContributor(id, author_id, 'author')
            .then(action(() => {
                if (author_id !== executor_id) {
                    this.api.addContributor(id, executor_id, 'executor');
                }
            })).catch(err => console.log(err));
            let createdToDo = new ToDoItem(this, {
                id,
                description, 
                status, 
                importance, 
                completed
            });
            this.toDos.push(createdToDo);
            createdToDo.fetchContributors();
        }))
        .catch(err => console.log(err));
    }

    removeToDo(id) {
        api.deleteToDo(id)
        .then(action(() => {
            this.toDos = this.toDos.filter(function(toDo) {
                if (toDo.id !== id) return toDo;
            });
        })).catch(err => console.log(err));
    }

    toggleToDo(id, ref, value) {
        api.toggleToDo(id, !value)
        .then(action(() => {
            ref.completed = !value;
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