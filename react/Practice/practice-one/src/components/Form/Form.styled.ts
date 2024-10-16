import styled from 'styled-components'

export const FormContainer = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: var(--shadow-hover-btn);
  border-radius: 16px 16px 0 16px;
  width: 544px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px 50px 30px;
  background-color: var(--dark-bg-2);

  @media (max-width: 470px) {
    padding: 20px;
  }
`

export const Title = styled.div<{ bottomBorderTitle: boolean }>`
  ${({ bottomBorderTitle }) =>
    bottomBorderTitle &&
    `
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: var(--dark-thin-border);
  `}
`

export const FormAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 95px;
  width: 100%;
  margin-top: 60px;

  @media (max-width: 470px) {
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }
`
