import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendar,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi";
import { HiOutlineCog6Tooth, HiOutlineHomeModern } from "react-icons/hi2";
import { memo } from "react";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavlink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const NavMenues = [
  {
    icon: <HiOutlineHome />,
    title: "Home",
    path: "/dashboard",
  },
  {
    icon: <HiOutlineCalendar />,
    title: "Bookings",
    path: "/bookings",
  },
  {
    icon: <HiOutlineHomeModern />,
    title: "Cabins",
    path: "/cabins",
  },
  {
    icon: <HiOutlineUsers />,
    title: "Users",
    path: "/users",
  },
  {
    icon: <HiOutlineCog6Tooth />,
    title: "Settings",
    path: "/settings",
  },
];

export const MainNav = () => {
  return (
    <nav>
      <NavList>
        {NavMenues.map((menu, index) => (
          <>
            <StyledNavlink key={index} to={menu.path}>
              {menu.icon}
              <span>{menu.title}</span>
            </StyledNavlink>
          </>
        ))}
      </NavList>
    </nav>
  );
};
