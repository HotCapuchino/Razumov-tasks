import {action, makeAutoObservable} from 'mobx';
import {api} from '../../utils/API';
import {ToDoItem} from '../ToDoItem/ToDoItem';

class ToDoList {

    toDos = [];
    isLoading = true;

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
        }))
        .catch(err => console.log(err));
    }

    createToDo(description, importance) {
        this.api.createToDo(description, importance)
        .then(() => {
            this.toDos.push(new ToDoItem(this, {
                description, 
                status:'pending', 
                importance, 
                completed: false
            }));
        })
        .catch(err => console.log(err));
    }

    removeToDo(id) {
        api.deleteToDo(id)
        .then(() => {
            this.toDos = this.toDos.filter(function(toDo) {
                if (toDo.id !== id) return toDo;
            });
        }).catch(err => console.log(err));
    }

    toggleToDo(id, ref, value) {
        api.toggleToDo(id, !value)
        .then(() => {
            ref.completed = !value;
        }).catch(err => console.log(err));
    }

    editToDo(id, ref, options) {
        let {description, status, importance} = options;
        api.editToDo(id, options)
        .then(() => {
            ref.description = description;
            ref.status = status;
            ref.importance = importance
        })
        .catch(err => console.log(err));
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

}

const toDoList = new ToDoList();
export default toDoList;