import { createContext, useContext, useMemo, useState } from "react";

export const SelectComponent = () => {
  const [selecteValue, setSelectValue] = useState("");

  const handleChange = (e: any) => {
    setSelectValue("asas");
  };

  return (
    <>
      <select value={selecteValue} onChange={handleChange}>
        <option value="1">1</option>
        <option value="1">2</option>
        <option value="1">3</option>
        <option value="1">4</option>
      </select>
    </>
  );
};

const SelectContext = createContext<{
  value: string;
  onChange: (e: any) => void;
} | null>(null);

const Select = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e: any) => {
    console.log("value", e.target.value);
    setValue(e.target.value);
  };
  const contextValue = useMemo(
    () => ({
      value: value,
      onChange: handleOnChange,
    }),
    [value]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  );
};

const SelectParent = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { onChange, value } = useContext(SelectContext) as {
    onChange: (e: any) => void;
    value: string;
  };

  return (
    <select onChange={onChange} value={value}>
      {children}
    </select>
  );
};

const Option = ({ optionVal }: { optionVal: string }) => {
  return (
    <>
      <option value={optionVal}>{optionVal}</option>
    </>
  );
};

Select.Option = Option;
Select.Parent = SelectParent;

export default Select;
