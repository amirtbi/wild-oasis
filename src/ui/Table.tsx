import { createContext, ReactElement, useContext } from "react";
import styled from "styled-components";
import { ICabins } from "../features/cabins/cabins.model";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext<{ columns: string } | null>(null);

export const Table = ({
  children,
  columns,
}: {
  children: JSX.Element;
  columns: string;
}) => {
  const contextValue = {
    columns,
  };
  return (
    <>
      <TableContext.Provider value={contextValue}>
        <StyledTable role="table">{children}</StyledTable>
      </TableContext.Provider>
    </>
  );
};

const Header = ({ children }: { children: JSX.Element[] }) => {
  const { columns } = useContext(TableContext) as { columns: string };
  return (
    <>
      <StyledHeader role="row" columns={columns}>
        {children}
      </StyledHeader>
    </>
  );
};

const Row = ({ children }: { children: JSX.Element[] }) => {
  const { columns } = useContext(TableContext) as { columns: string };
  return (
    <>
      <StyledRow role="row" columns={columns}>
        {children}
      </StyledRow>
    </>
  );
};

const Footer = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <StyledFooter>{children}</StyledFooter>
    </>
  );
};

const Body = ({
  render,
  data,
}: {
  render: (data: ICabins) => React.ReactElement;
  data: ICabins[] | undefined;
}) => {
  if (!data || data.length === 0) return <Empty>No data found</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
