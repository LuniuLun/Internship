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

export const AdditionalCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px dashed var(--orange-color-1);
  min-height: 264px;
  width: 180px;
  cursor: pointer;
  border-radius: 8px;
  padding: 20px;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
`

export const AdditionalIcon = styled.img`
  padding: 14px;
  margin-right: 10px;
`

export const AdditionalDes = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--orange-color-1);
`

export const WrapperPopup = styled.section`
  position: fixed;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
