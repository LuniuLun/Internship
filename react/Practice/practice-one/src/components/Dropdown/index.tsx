import { useState } from 'react'
import { Link } from 'react-router-dom'
import arrowDownIcon from '../../assets/icons/down-arrow.svg'
import { Button, Image } from '../common'
import { DropdownContainer, SortOption, SortOptionItem, Content } from './Dropdown.styled'

export interface IDropdownOption {
  src?: string
  handleOnClick?: () => void
  titleOption: string
}

export interface IDropdownProps {
  title: string
  options: IDropdownOption[]
}

const Dropdown = ({ title, options }: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DropdownContainer>
      <Button variant='tertiary' size='sm' title={title} onClick={toggleDropdown}>
        <Image src={arrowDownIcon} alt='Show more' size='sm' />
      </Button>
      {isOpen && (
        <SortOption>
          {options.map((option, index) => (
            <SortOptionItem key={index}>
              {option.src ? (
                <Link to={option.src}>
                  <Content>{option.titleOption}</Content>
                </Link>
              ) : option.handleOnClick ? (
                <Content onClick={option.handleOnClick}>{option.titleOption}</Content>
              ) : (
                <Content>{option.titleOption}</Content>
              )}
            </SortOptionItem>
          ))}
        </SortOption>
      )}
    </DropdownContainer>
  )
}

export default Dropdown
