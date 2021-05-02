import React from 'react';
import modalStyles from './Modal.module.scss';

const RenderEdit = ({values, errors, inputHandler, errorVisibility}) => {
    return (
        <form className={modalStyles.form}>
            <div className={modalStyles.descriptionBlock}>
                <div className={modalStyles.descriptionBlock__title}>ToDo description</div>
                {errors.description && errorVisibility ? <div className={modalStyles.errorMessage}>{errors.description}</div> : null}
                <textarea name='description'
                    value={values.description}
                    onChange={(e) => inputHandler(e)}
                    className={modalStyles.textarea}></textarea>
            </div>
            <div>
                <label className={modalStyles.label}>Importance</label>
                {errors.importance && errorVisibility ? <div className={modalStyles.errorMessage}>{errors.importance}</div> : null}
                <select name='importance'
                    value={values.importance}
                    onChange={(e) => inputHandler(e)}
                    className={modalStyles.select}>
                    <option value="minor" key='minor'>Minor</option>
                    <option value="normal" key='normal'>Normal</option>
                    <option value="critical" key='critical'>Critical</option>
                </select>
            </div>
            <div>
                <label className={modalStyles.label}>Status</label>
                <select name='status'
                    value={values.status}
                    onChange={(e) => inputHandler(e)}
                    className={modalStyles.select}>
                    <option value="pending" key='pending'>Pending</option>
                    <option value="inprogress" key='inprogress'>In Progress</option>
                    <option value="completed" key='completed'>Completed</option>
                    <option value="cancelled" key='cancelled'>Cancelled</option>
                </select>
            </div>
        </form>
    )
};

export default RenderEdit
