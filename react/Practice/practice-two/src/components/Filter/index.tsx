import { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { CustomSelect, TextField } from '@components'
import { FilterIcon, SearchIcon } from '@assets/icons'
import { SORT_OPTION } from '@constants/option'
import { useFilterStore } from '@hooks/useFilterStore'

interface FilterProps {
  children?: ReactNode
}

const Filter = ({ children }: FilterProps) => {
  const { searchQuery, sortBy, setSearchQuery, setSortBy } = useFilterStore()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  return (
    <Flex gap={8} alignItems='center' flexDirection={{ base: 'column', md: 'row' }}>
      <TextField
        icon={<SearchIcon />}
        variant='outline'
        size='lg'
        placeholder='Search'
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Flex gap={8} alignItems='center' w={{ base: '100%', md: 'unset' }}>
        {children}
        <CustomSelect
          options={SORT_OPTION}
          placeholder='Sort by'
          value={sortBy}
          onChange={handleSortChange}
          maxW={{ base: '100%', md: '150px' }}
        />
        <Box w='19px'>
          <FilterIcon />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Filter
