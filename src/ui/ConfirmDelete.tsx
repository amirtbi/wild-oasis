import styled from "styled-components";
import Heading from "./Heading";
import { Button } from "./Button";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onClose,
}: {
  resourceName: string;
  onConfirm: () => void;
  disabled: boolean;
  onClose?: () => void;
}) {
  function handleConfirmClick() {
    onConfirm();
    onClose?.();
  }

  return (
    <StyledConfirmDelete>
      <Heading type="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmClick}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
