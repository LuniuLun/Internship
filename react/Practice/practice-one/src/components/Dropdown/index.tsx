import { useState } from 'react'
import styles from './Dropdown.module.css'
import { IDropdownProps } from '../../types/common'
import arrowDownIcon from '../../assets/icons/down-arrow.svg'
import { Link } from 'react-router-dom'

function Dropdown({ title, options }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.dropdown}>
      <button className={`${styles.btnToggle} normal-medium-text`} onClick={toggleDropdown}>
        <img className={styles.icon} src={arrowDownIcon} alt='filter food' />
        {title}
      </button>

      {isOpen && (
        <ul className={styles.sortOption}>
          {options.map((option, index) => (
            <li key={index} className={`${styles.sortOptionItem} normal-medium-text`}>
              {option.src ? (
                <Link to={option.src} className={styles.content}>
                  {option.titleOption}
                </Link>
              ) : (
                <></>
              )}
              {option.handleOnClick && (
                <span onClick={option.handleOnClick} className={styles.content}>
                  {option.titleOption}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
