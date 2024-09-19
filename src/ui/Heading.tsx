import styled, { css } from "styled-components";

interface ComponentProps {
  type: "h1" | "h2" | "h3";
}

const typings = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;
    color: white;
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;
    color: black;
  `,
  h3: css`
    font-size: 2rem;
    font-weight: 500;
    color: black;
  `,
};

const Heading = styled.h1<ComponentProps>`
  ${(props) => (props.type === "h1" ? typings.h1 : typings.h2)};
  line-height: 1.4;
`;

export default Heading;
