import React from 'react';
import modalStyles from './Modal.module.scss';

const RenderCreate = ({ values, errors, inputHandler, errorVisibility, renderUsers }) => {
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
                <label className={modalStyles.label}>Executor</label>
                <select name='executor_id'
                    value={values.executor_id}
                    onChange={(e) => inputHandler(e)}
                    className={modalStyles.select}>
                    {renderUsers()}
                </select>
            </div>
        </form>
    );
};

export default RenderCreate;
