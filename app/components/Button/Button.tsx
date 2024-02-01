import styles from "./Button.module.css"

type ButtonProps = {
    type: "submit" | "reset" | "button"
    label: string
    onClick?: () => void
    size?: "large" | "small"
}

const Button = ({type, size="large", label, onClick}: ButtonProps) => {
    return ( 
        <div className={styles.wrapper} >
            <button 
                className={`${styles.button} ${size === 'small' ? styles.small : ''}`}
                type={type}
                onClick={onClick}
            >
                {label}
            </button>
        </div> 
     );
}
 
export default Button;