import colors from '@styles/variables/colors'
import radii from '@styles/variables/radii'
import { TBoder, TDimensionInput } from '@type/variant'
import styled from 'styled-components'

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.img`
  padding-left: 20px;
`

export const Input = styled.input<{ $dimension: TDimensionInput; $border: TBoder }>`
  outline: none;
  border: ${(props) => (props.$border === 'thin' ? `1px solid ${colors.brand.secondary}` : 'none')};
  border-radius: ${radii.md};
  padding: ${(props) => (props.$dimension === 'md' ? '12px 16px' : '9px 12px')};
  width: 100%;
  font-size: 1rem;
  color: ${colors.brand.blackTextPrimary};
  background-color: ${colors.brand.white};
`
