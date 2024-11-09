import {
  cloneElement,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutSide } from "../hooks/userClickOutside";

const StyledDiv = styled.div<HTMLDivElement>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Content = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext<{
  close?: () => void;
  open?: (openTarget: string) => void;
  openName: string;
} | null>(null);

const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState("");

  const close = useCallback(() => {
    setOpenName("");
  }, []);
  const open = (openName: string) => setOpenName(openName);

  return (
    <>
      <ModalContext.Provider value={{ open, close, openName }}>
        {children}
      </ModalContext.Provider>
    </>
  );
};

const Open = ({
  children,
  opens,
}: {
  children: JSX.Element;
  opens: string;
}) => {
  const { open } = useContext(ModalContext) as {
    open: (target: string) => void;
  };

  return cloneElement(children, {
    onClick: () => {
      open(opens);
    },
  });
};

const Window = ({
  children,
  name,
}: {
  children: JSX.Element;
  name: string;
}) => {
  const { openName, close } = useContext(ModalContext) as {
    openName: string;
    close: () => void;
  };
  const { ref } = useClickOutSide(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledDiv ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <Content>{cloneElement(children, { onClose: close })}</Content>
      </StyledDiv>
    </Overlay>,
    document.body
  );
};

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
