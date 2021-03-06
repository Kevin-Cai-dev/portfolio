import React from "react";
import styled from "styled-components";

const BarrierStyle = styled.hr`
  border-bottom-width: 1px;
  border-bottom-color: #c5c6c7;
  border-bottom-style: solid;
  width: 60vw;
  margin: auto;
  opacity: 0.5;
`;

const Barrier = ({ id }) => {
  return <BarrierStyle id={id} />;
};

export default Barrier;
