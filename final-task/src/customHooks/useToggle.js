const available_statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

function calcIndex(toDo_status) {
    return available_statuses.findIndex(elem => {
        if (elem.toLowerCase().replace(' ', '') === toDo_status) {
            return true;
        }
    });
}

function calcNewIndex(params) {
    
}

function useToggle() {
    return function(toDo_status, newIndex = null) {
        if (!newIndex) console.log('no new index!');
        let currentStatusIndex = calcIndex(toDo_status);
        // checking if we have to change toDo completed value
        if (Math.abs(currentStatusIndex - newIndex) > 1 || currentStatusIndex * newIndex === 2) {
            return true;
        } else {
            return false;
        }
    }
}

export {useToggle, calcIndex};