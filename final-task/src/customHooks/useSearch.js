import toDoList from '../store/ToDoList/ToDoList';

function useSearch() {
    return function(text) {
        toDoList.setSearched(text.toLowerCase());   
    }
}

export {useSearch};