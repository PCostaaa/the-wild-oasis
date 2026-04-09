import styled from "styled-components";
import PropTypes from "prop-types";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100dvh;
    width: 26rem;
    z-index: 300;
    transform: translateX(${({ open }) => (open ? "0" : "-100%")});
    transition: transform 0.25s ease;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  }
`;

function Sidebar({ open, onClose }) {
  return (
    <StyledSidebar open={open}>
      <Logo />
      <MainNav onClose={onClose} />
    </StyledSidebar>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
