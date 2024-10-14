import { TSizeVariant } from '../../types/variant'
import styles from './TextField.module.css'

export interface ITextFieldProps {
  name?: string
  size?: TSizeVariant
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  placeholder: string
}

function TextField({ name, value, onChange, label, error, size = 'lg', placeholder }: ITextFieldProps) {
  const mode = styles[`textField--${size}`]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={`${styles.label} normal-medium-text`}>
          {label}
        </label>
      )}
      <input
        type='text'
        name={name}
        className={`${styles.textField} ${mode} normal-thin-text`}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && <span className={`${styles.error} normal-medium-text`}>{error}</span>}
    </div>
  )
}

export default TextField
