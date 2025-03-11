import React, { SelectHTMLAttributes } from 'react'
import styles from './Select.module.scss'
import { useField } from 'formik'

interface selectOptions {
    value: string | number;
    text: string;
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string
    nullSelectLabel?: string;
    options: selectOptions[];
    name: string
}

const defaultProps: Partial<SelectProps> = {
    nullSelectLabel: 'Please choose'
}

const Select: React.FC<SelectProps> = ({ label, nullSelectLabel, options, ...props }) => {

    const [field, { error, touched }] = useField(props);

    return (
        <div className="mb-3">
            <label htmlFor={field.name} className="form-label">{label}</label>
            <select  {...props} id={field.name} className="form-select">
                {nullSelectLabel && <option className="sel-suffix" value='' disabled>{nullSelectLabel}</option>}
                {options.map((option: selectOptions, index: number) =>
                    <option key={index} value={option.value} label={option.text}>{option.text}</option>
                )
                }
            </select>
            {touched && error ? (
                <div className={styles.select_error}>{error}</div>
            ) : null}
    </div>
    );
}

Select.defaultProps = defaultProps;

export { Select };