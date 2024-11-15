import styled from 'styled-components'

export const Message = styled.div<{ $status: string; $index: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: fixed;
  z-index: 3;
  border-radius: 8px;
  padding: 12px;
  padding-right: 40px;
  color: var(--white-text-1);
  background-color: ${({ $status }) => ($status === 'success' ? 'var(--green-bg-1)' : 'var(--orange-color-1)')};

  top: calc(20px + (${({ $index }) => $index} * 60px));
`
