import styled from "styled-components";

const ButtonText = styled.button`
  border: none;
  background-color: transparent;
  color: var(--color-brand-600);
  font-size: 1.4rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-brand-700);
  }
`;

export default ButtonText;
