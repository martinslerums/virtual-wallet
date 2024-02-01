import styles from "./Input.module.css"

type InputProps = {
    type: HTMLInputElement['type']
    placeholder?: string
    name?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    required: boolean
    label?: string
    size?: 'large'
}

const Input = ({value,label, name, onChange, placeholder, type='string', required, size}: InputProps ) => {
    return ( 
    <div className={`${size === 'large' ? styles.large : ''} ${styles.wrapper}`}>
        <label>{label}</label>
        <input 
            className={styles.input}
            type={type}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            required={required}
        />
    </div>
     );
}
 
export default Input;