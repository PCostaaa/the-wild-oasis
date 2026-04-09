import styled from "styled-components";
import PropTypes from "prop-types";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 1.2rem 1.6rem;
    justify-content: space-between;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  color: var(--color-grey-700);
  line-height: 0;

  & svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const RightActions = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function Header({ sidebarOpen, onToggleSidebar }) {
  return (
    <StyledHeader>
      <HamburgerButton onClick={onToggleSidebar} aria-label="Toggle navigation">
        {sidebarOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
      </HamburgerButton>
      <RightActions>
        <UserAvatar />
        <HeaderMenu />
      </RightActions>
    </StyledHeader>
  );
}

Header.propTypes = {
  sidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};

export default Header;
