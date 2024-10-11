import { ITextFieldProps } from '../../types/common'
import styles from './TextField.module.css'

function TextField({ name, value, onChange, label, error, size = 'lg' }: ITextFieldProps) {
  const mode = styles[`textField--${size}`]
  console.log(mode)

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
        onChange={onChange}
      />
      {error && <span className={`${styles.error} normal-medium-text`}>{error}</span>}
    </div>
  )
}

export default TextField
