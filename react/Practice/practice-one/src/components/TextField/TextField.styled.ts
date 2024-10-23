import styled from 'styled-components'
import { TSizeVariant } from '../../types/variant'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Input = styled.input<{ $dimension: TSizeVariant }>`
  outline: none;
  border: var(--dark-thin-border);
  border-radius: 8px;
  padding: ${(props) => (props.$dimension === 'lg' ? '12px 14px' : '10px 12px')};
  background-color: var(--dark-form-bg-1);
  width: ${(props) => (props.$dimension === 'sm' ? '40%' : '')};

  @media (max-width: 640px) {
    padding: 10px 12px;
  }
`
