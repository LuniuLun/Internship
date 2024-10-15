import { useState } from 'react'
import { TSizeVariant } from '../../types/variant'
import styles from './TextField.module.css'

export interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string
  dimension?: TSizeVariant
  label?: string
  error?: string
}

const TextField = ({ value, name, label, error, dimension = 'lg', ...props }: ITextFieldProps) => {
  const mode = styles[`textField--${dimension}`]
  const [valueInput, setValueInput] = useState(value)

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={`${styles.label} normal-medium-text`}>
          {label}
        </label>
      )}
      <input
        name={name}
        value={valueInput}
        type='text'
        className={`${styles.textField} ${mode} normal-thin-text`}
        onChange={(e) => setValueInput(e.target.value)}
        {...props}
      />
      {error && <span className={`${styles.error} normal-medium-text`}>{error}</span>}
    </div>
  )
}

export default TextField
