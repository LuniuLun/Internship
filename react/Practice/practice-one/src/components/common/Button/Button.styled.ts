import styled, { css } from 'styled-components'

const handleVariant = ($variant?: string) => {
  switch ($variant) {
    case 'primary':
      return css`
        border: 1px solid var(--orange-color-1);
        background-color: transparent;
        color: var(--orange-color-1);

        &:hover {
          background-color: var(--orange-color-1);
          color: var(--white-text-1);
          box-shadow: var(--shadow-hover-btn);
        }
      `
    case 'secondary':
      return css`
        border: none;
        background-color: var(--orange-color-2);
        color: var(--orange-color-1);

        &:hover {
          background-color: var(--orange-color-1);
          color: var(--white-text-1);
          box-shadow: var(--shadow-hover-btn);
        }
      `
    case 'tertiary':
      return css`
        justify-content: flex-start;
        border: var(--dark-thin-border);
        background-color: var(--dark-bg-2);
        color: var(--white-text-1);

        &:hover {
          background-color: var(--orange-color-1);
          color: var(--white-text-1);
          box-shadow: var(--shadow-hover-btn);
        }
      `
    default:
      return css``
  }
}

const handleSize = (size?: string) => {
  switch (size) {
    case 'md':
      return css`
        padding: 14px;
        min-width: 180px;
      `
    case 'sm':
      return css`
        padding: 10px 12px;
      `
    default:
      return css``
  }
}

const ButtonStyled = styled.button<{ $variant?: string; $size?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.225rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  ${({ $variant }) => handleVariant($variant)}
  ${({ $size }) => handleSize($size)}
`

export default ButtonStyled
