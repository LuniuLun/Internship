import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-bottom: var(--dark-thin-border);
  width: 1190px;
  padding-bottom: 26px;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const HeadingSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: unset;
  }
`

export const FilterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 38px;
  width: 100%;
`

export const SearchForm = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 342px;

  input {
    padding-left: 40px;
  }

  @media (max-width: 768px) {
    width: unset;
  }
`

export const SearchIcon = styled.img`
  position: absolute;
  left: 4%;
`
