import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'
import styles from './InputField.module.scss'

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    name: string
};

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
    const [field, { error, touched }] = useField(props);
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={field.name}>{label}</label>
            <input  {...field} {...props} id={field.name} placeholder={props.placeholder} className={`form-control ${error ? styles.select_invalid : ''}`} />
            {touched && error ? (
                <div className={styles.select_error}>{error}</div>
            ) : null}
        
        </div>
    );
}


export { InputField };