const available_statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

function calcIndex(toDo_status) {
    return available_statuses.findIndex(elem => {
        // Много где такая конструкция используется, желательно такие вещи выносить в отдельный файл/модуль/функцию/класс
        return elem.toLowerCase().replace(' ', '') === toDo_status;
    });
}

function useToggle() {
    return function(toDo_status, newIndex) {
        let currentStatusIndex = calcIndex(toDo_status);
        // checking if we have to change toDo completed value
        return Math.abs(currentStatusIndex - newIndex) > 1 || currentStatusIndex * newIndex === 2
    }
}

export {useToggle, calcIndex};