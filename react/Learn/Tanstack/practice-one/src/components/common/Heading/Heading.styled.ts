import styled from 'styled-components'
import { IHeadingProps } from '.'

export const HeadingStyled = styled.h1<IHeadingProps>`
  margin: 0;
  width: 100%;
  ${({ as }) => {
    switch (as) {
      case 'h2':
        return `
          font-size: 0.875rem;
          line-height: 1.1375rem;
          font-weight: 500;
        `
      case 'h1':
      default:
        return `
          font-size: 1.75rem;
          line-height: 2.45rem;
          font-weight: 600;
        `
    }
  }}
  color: var(--white-text-1);
`
