import styled from '@emotion/styled'

const Button = styled.button`
  background-color: var(--bg-light);
  color: var(--bg-grey);
  outline: none;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 5px;
  cursor: pointer;
  font-weight: bold;
`

export const DarkButton = styled(Button)`
  background-color: var(--bg-dark);
  color: var(--bg-light);
  &:disabled {
    background-color: var(--bg-grey);
  }
`

export default Button
