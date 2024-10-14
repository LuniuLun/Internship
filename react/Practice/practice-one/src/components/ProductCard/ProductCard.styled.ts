import styled from 'styled-components'

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  gap: 16px;
  border: var(--dark-thin-border);
  border-radius: 8px;
  width: 220px;
  background-color: var(--dark-bg-2);
  color: var(--white-text-1);

  button {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    &:hover {
      background-color: var(--orange-color-2);
      color: var(--orange-color-1);
      box-shadow: none;
    }
  }
`

export const ProductIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 12px;
  z-index: 1;
  display: none;
  cursor: pointer;

  ${ProductContainer}:hover & {
    display: block;
  }
`

export const ProductImage = styled.img`
  margin-top: 20px;
  width: 127px;
  border-radius: 50%;
  aspect-ratio: 1;
`

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 8px;
  margin: 0 40px;
  width: 144px;
`

export const Item = styled.h4`
  text-align: center;
  overflow: hidden;
  margin: 0;
  min-height: 45px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
`

export const ItemThin = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 20px;
  color: var(--white-text-3);
`

export const ProductButtonImage = styled.img`
  margin-right: 8px;
`
