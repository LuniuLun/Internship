import styled from 'styled-components'

export const HeadingStyled = styled.h1<{ bottomBorder?: boolean }>`
  margin-top: 0;
  width: 100%;
  padding-bottom: 24px;
  font-size: 1.75rem;
  line-height: 2.45rem;
  font-weight: 600;
  color: var(--white-text-1);

  ${({ bottomBorder }) =>
    bottomBorder &&
    `
    border-bottom: var(--dark-thin-border);
  `}
`
