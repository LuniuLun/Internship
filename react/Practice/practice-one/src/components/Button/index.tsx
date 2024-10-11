import { IButtonProps } from '../../types/common'
import styles from './Button.module.css'

function Button({ variant, title, ...props }: IButtonProps) {
  const mode = variant ? styles[`btn--${variant}`] : ''

  return (
    <button className={`${styles.btn} ${mode} normal-semiBold-txtBtn`} {...props}>
      {title}
    </button>
  )
}

export default Button

// import { IButtonProps } from '../../types/common'
// import './Button.css'

// function Button({ variant, title, ...props }: IButtonProps) {
//   const mode = variant ? `btn--${variant}` : ''

//   return (
//     <button className={`btn ${mode} normal-semiBold-txtBtn`} {...props}>
//       {title}
//     </button>
//   )
// }

// export default Button
