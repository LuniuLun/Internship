import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import { CustomSelect, TextField } from '@components'
import { FilterIcon, SearchIcon } from '@assets/icons'
import { SORT_OPTION } from '@constants/option'
import { useFilter } from '@hooks/useFilter'

interface FilterProps {
  children?: ReactNode
}

const Filter = ({ children }: FilterProps) => {
  const { searchQuery, sortBy, setSearchQuery, setSortBy } = useFilter()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  return (
    <Flex gap={8} alignItems='center'>
      <TextField
        icon={<SearchIcon />}
        variant='outline'
        size='lg'
        placeholder='Search'
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {children}
      <CustomSelect options={SORT_OPTION} placeholder='Sort by' value={sortBy} onChange={handleSortChange} />
      <FilterIcon />
    </Flex>
  )
}

export default Filter
