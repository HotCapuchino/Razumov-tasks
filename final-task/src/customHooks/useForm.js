import {useState} from 'react';


const useForm = (formFields) => {

    const [values, setValues] = useState(formFields);
    const [errors, setErrors] = useState({});

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