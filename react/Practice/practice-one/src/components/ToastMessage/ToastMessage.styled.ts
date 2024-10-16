import styled from 'styled-components'
import { TStatusVariant } from '../../types/variant'

export const Message = styled.div<{ status: TStatusVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: fixed;
  top: 20px;
  left: 50%;
  z-index: 3;
  transform: translateX(-50%);
  border-radius: 8px;
  padding: 12px;
  padding-right: 40px;
  color: var(--white-text-1);
  background-color: ${({ status }) => (status === 'success' ? 'var(--green-bg-1)' : 'var(--orange-color-1)')};
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`
