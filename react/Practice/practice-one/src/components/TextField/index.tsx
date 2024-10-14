import { TSizeVariant } from '../../types/variant'
import styles from './TextField.module.css'

export interface ITextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  name?: string
  size?: TSizeVariant
  label?: string
  error?: string
  placeholder?: string
}

const TextField = ({ name, label, error, size = 'lg', placeholder }: ITextFieldProps) => {
  const mode = styles[`textField--${size}`]

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
        placeholder={placeholder}
      />
      {error && <span className={`${styles.error} normal-medium-text`}>{error}</span>}
    </div>
  )
}

export default TextField
