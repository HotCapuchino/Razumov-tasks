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

    }

    return {values, errors, handleInput, validateInputs};

}

export {useForm};