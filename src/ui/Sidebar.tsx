import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
`;

export const Sidebar = () => {
  return (
    <>
      <StyledSidebar>aside</StyledSidebar>
    </>
  );
};