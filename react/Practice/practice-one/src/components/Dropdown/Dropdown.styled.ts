import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  border-radius: 8px;
  width: 162px;
`;

export const SortOption = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  margin: 0;
  right: 18px;
  top: 120%;
  width: 200px;
  list-style: none;
  padding: 0;

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: -22px;
    right: 0px;
    border-width: 12px;
    border-style: solid;
    border-color: transparent transparent var(--dark-bg-1) transparent;
  }
`;

export const SortOptionItem = styled.li`
  z-index: 2;
  width: 100%;
  padding: 8px 16px;
  background-color: var(--dark-bg-1);
  caret-color: transparent;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: var(--dark-thin-border);
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  &:hover {
    background-color: var(--orange-color-1);
    .content {
      color: var(--white-text-1);
    }
  }
`;

export const Content = styled.span`
  display: flex;
  width: 100%;
  color: var(--orange-color-1);
`;
