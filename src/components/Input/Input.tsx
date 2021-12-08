import React from 'react';
import styles from "./Input.module.scss";

export interface IInput{
    label: string;
    value: string | Date;
    type?: string;
    name?: string;
    onChange: (e:React.ChangeEvent <HTMLInputElement>)=>void;

}
// 

function Input({label,value, type, name, onChange}: IInput) {

    return (
        <div className={styles.inputDiv}>
            <label  className={styles.labelClassStyle}>{label}</label>
            <input name={name} type={type} className={styles.inputStyle} value={value.toString()} onChange={(e) => onChange(e)} />
        </div>
    );
}
//<Input label={''} value={value} onChange={(e)=>setValue(e.target.value)}/>

export default Input
