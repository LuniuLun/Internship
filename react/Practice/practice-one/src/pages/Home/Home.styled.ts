import styled from 'styled-components'

export const HomeStyled = styled.body`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 26px 0 0;
  border-bottom: var(--dark-thin-border);
  width: 1190px;
  padding-bottom: 94px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`

export const WrapperProducts = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
  }
`
export const WrapperBtn = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`
