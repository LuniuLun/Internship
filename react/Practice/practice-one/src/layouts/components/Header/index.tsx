import { Link } from 'react-router-dom'
import { useState } from 'react'
import searchIcon from '../../../assets/icons/find.svg'
import { FilterSection, HeaderContainer, HeadingSection, SearchForm, SearchIcon } from './Header.styled'
import { Dropdown, Heading, TextField } from '../../../components'

function Header() {
  const [searchValue, setSearchValue] = useState('')

  const dropdownOptions = [
    { titleOption: 'Sort by Name: A to Z', src: '', handleOnClick: () => console.log('Sort A to Z') },
    { titleOption: 'Sort by Name: Z to A', src: '', handleOnClick: () => console.log('Sort Z to A') }
  ]

  return (
    <HeaderContainer>
      <HeadingSection>
        <Link to='/'>
          <Heading title='Foods Management' />
        </Link>
        <SearchForm>
          <SearchIcon src={searchIcon} alt='search icon' />
          <TextField
            dimension='lg'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search for food, coffee, etc..'
          />
        </SearchForm>
      </HeadingSection>

      <FilterSection>
        <Dropdown title='Sort by' options={dropdownOptions} />
      </FilterSection>
    </HeaderContainer>
  )
}

export default Header
