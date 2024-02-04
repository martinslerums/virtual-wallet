import styles from "./Select.module.css"

type SelectProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { [key: string]: string };
  required: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
};

const Select = ({name, value, onChange, options, required, label, placeholder }: SelectProps) => {
  return ( 
    <div className={styles.wrapper}>
      <label>{label}</label>
      <select 
        id={name} 
        name={name} 
        onChange={onChange} 
        value={value}
        required={required}
        className={styles.select}
      >
        <option value="" disabled selected hidden className={styles.options}>{placeholder}</option>
        {options && Object.entries(options).map(([optionKey, optionValue]) => (
          <option key={optionKey} value={optionKey} className={styles.options}>{optionValue}</option>
        ))}
      </select>
    </div>
   );
}
 
export default Select;