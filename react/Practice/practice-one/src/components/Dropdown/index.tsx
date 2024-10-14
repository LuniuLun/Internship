import { useState } from 'react'
import styles from './Dropdown.module.css'
import arrowDownIcon from '../../assets/icons/down-arrow.svg'
import { Link } from 'react-router-dom'
import Button from '../Button'

export interface IDropdownOption {
  src?: string
  handleOnClick?: () => void
  titleOption: string
}

export interface IDropdownProps {
  title: string
  options: IDropdownOption[]
}

function Dropdown({ title, options }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.dropdown}>
      <Button variant='tertiary' size='sm' title={title} onClick={toggleDropdown} icon={arrowDownIcon} />
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
