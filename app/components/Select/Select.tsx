import styles from "./Select.module.css"

type SelectProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { [key: string]: string };
  required: boolean;
};

const Select = ({name, value, onChange, options, required }: SelectProps) => {
  return ( 
    <select 
      id={name} 
      name={name} 
      onChange={onChange} 
      value={value}
      required={required}
    >
      {options && Object.entries(options).map(([optionKey, optionValue]) => (
        <option key={optionKey} value={optionKey}>
          {optionValue}
        </option>
      ))}
    </select>
   );
}
 
export default Select;