import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useClickOutSide } from "../hooks/userClickOutside";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: fixed;

  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IPosition {
  x: number;
  y: number;
}

const MenuContext = createContext<{
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: IPosition | undefined;
  setPosition: (val: IPosition) => void;
} | null>(null);

const Toggle = ({ id }: { id: string }) => {
  const { openId, close, open, setPosition } = useContext(MenuContext) as {
    openId: string;
    close: () => void;
    open: (id: string) => void;
    setPosition: (val: IPosition) => void;
  };

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const setContextMenuPosition = useCallback(() => {
    if (toggleBtnRef.current) {
      const rect = toggleBtnRef.current.getBoundingClientRect();
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8,
      });
    }
  }, [setPosition]);

  const handleClick = () => {
    setContextMenuPosition();
    if (openId == "" || openId != id) {
      open(id);
    } else {
      close();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setContextMenuPosition();
    });
    return () => {
      window.addEventListener("resize", () => {
        setContextMenuPosition();
      });
    };
  }, [setContextMenuPosition]);
  return (
    <>
      <StyledToggle onClick={handleClick} ref={toggleBtnRef}>
        <HiEllipsisVertical />
      </StyledToggle>
    </>
  );
};

const List = ({
  id,
  children,
}: {
  id: string;
  children: JSX.Element | JSX.Element[] | string;
}) => {
  const { openId, position, close } = useContext(MenuContext) as {
    openId: string;
    position: IPosition;
    close: () => void;
  };
  const { ref } = useClickOutSide(close);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({
  icon,
  onClick,
  children,
}: {
  icon: ReactNode;
  onClick?: () => void;
  children: JSX.Element | string;
}) => {
  const { close } = useContext(MenuContext) as { close: () => void };

  const handleOnclick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleOnclick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

const Menus = ({ children }: { children: JSX.Element }) => {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState<IPosition>();
  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  const contextVal = useMemo(() => {
    return { openId, close, open, setPosition, position };
  }, [openId, position]);

  return (
    <MenuContext.Provider value={contextVal}>{children}</MenuContext.Provider>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
