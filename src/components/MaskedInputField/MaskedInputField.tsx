import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'
import styles from './MaskedInput.module.scss'
import InputMask from "react-input-mask"

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string,
    mask: string,
    name: string
};

const MaskedInputField: React.FC<InputFieldProps> = ({ label, mask,  ...props }) => {
    const [field, { error, touched }] = useField(props);
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={field.name}>{label}</label>
            <InputMask  {...field} {...props} id={field.name} mask={mask} alwaysShowMask={true} className="form-control" />
            {touched && error ? (
                <div className={styles.select_error}>{error}</div>
            ) : null}
        
        </div>
    );
}



export default MaskedInputField;