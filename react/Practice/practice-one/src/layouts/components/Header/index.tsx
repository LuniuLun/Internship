import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { FilterSection, HeaderContainer, HeadingSection, SearchForm, SearchIcon } from './Header.styled'

import searchIcon from '@assets/icons/find.svg'
import { Dropdown, TextField } from '@components'
import { Heading } from '@components/common'

const Header = () => {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const dropdownOptions = [
    {
      titleOption: 'Sort by Name: A to Z',
      src: `/?sort=AToZ&property=name&q=${searchValue}`
    },
    { titleOption: 'Sort by Name: Z to A', src: `/?sort=ZToA&property=name&q=${searchValue}` }
  ]

  useEffect(() => {
    if (searchValue) {
      navigate(`/?sort=AToZ&property=name&q=${searchValue}`)
    } else {
      navigate('/')
    }
  }, [searchValue, navigate])

  return (
    <HeaderContainer className='container'>
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
