import { isValidElement, ReactElement, ReactNode } from "react";
import { styled } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--colo-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface ChildWithId {
  id: string;
}

// Define the props for your FormRow component
interface FormRowProps {
  label?: string;
  error?: string;
  children: ReactNode; // Allow for multiple children
}

export const FormRow: React.FC<FormRowProps> = (props: {
  label?: string;
  error?: string;
  children: ReactNode;
}) => {
  const { label, error, children } = props;
  const getChildWithId = (children: ReactNode) => {
    if (Array.isArray(children)) {
      return (
        (children.find(
          (child) =>
            isValidElement(child) && "id" in (child.props as { id?: string })
        ) as React.ReactElement<ChildWithId>) || null
      );
    }
    return isValidElement(children) && children.props.id ? children : null;
  };

  const childWithId = getChildWithId(children);
  return (
    <>
      <StyledFormRow>
        {label && <Label htmlFor={childWithId?.props.id}>{label}</Label>}
        {children}
        {error && <Error>{error}</Error>}
      </StyledFormRow>
    </>
  );
};
