import colors from '@styles/variables/colors'
import { TSizeInfoGroup } from '@type/variant'
import styled from 'styled-components'

export const InfoGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Heading = styled.h3<{ $size?: TSizeInfoGroup }>`
  font-weight: 500;
  font-size: ${({ $size }) => ($size === 'sm' ? '0.875rem' : '1rem')};
  color: ${colors.brand.black};
`

export const Description = styled.p<{ $size?: TSizeInfoGroup }>`
  font-weight: 400;
  font-size: 0.75rem;
  color: ${({ $size }) => ($size === 'sm' ? colors.brand.blackTextTertiary : colors.brand.blackTextSecondary)};
`
