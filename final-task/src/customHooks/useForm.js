import { useEffect } from 'react';
import {useState} from 'react';

const useForm = ({type, toDo}) => {

    // because of the fact react doesn't provide deep comparison,
    // when it decides whether to rerender component or not, 
    // I decided to check for a status, description and importance as the properties, 
    // that can be modified outside of the edit modal window
    useEffect(() => {
        setValues(defineFormFields());
    }, [toDo?.status, toDo?.description, toDo?.importance]);

    const [values, setValues] = useState(defineFormFields());
    const [errors, setErrors] = useState({});

    function defineFormFields() {
        switch (type) { 
            case 'create': {
                return {
                    description: '',
                    importance: 'minor',
                    executor_id: 1
                }
            }
            case 'edit': {
                return {
                    description: toDo.description,
                    status: toDo.status,
                    importance: toDo.importance
                };
            }
            case 'comment': {
                return {
                    comment: ''
                }
            }
            default: 
                return {};
        }
    }

    function handleInput(e) {
        setValues(prevState => ({
                ...prevState, 
                [e.target.name]: e.target.value
            })
        )
    }

    function validateInputs() {
        let validation_passed = true;
        for (const key in values) {
            if (!values[key]) {
                validation_passed = false;
                setErrors(prevState => ({
                        ...prevState, 
                        [key]: 'This field cannot be empty!'
                    }
                ));
            }
        }
        return validation_passed;
    }

    function clearValues() {
        for (const key in values) {
            setValues(prevState =>({
                ...prevState,
                [key]: ''
            }));
        }   
    }

    return {values, errors, handleInput, validateInputs, clearValues};

}

export {useForm};