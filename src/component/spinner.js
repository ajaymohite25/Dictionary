//PuffLoader
import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Spinner(props) {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#3f51b5"
        loading={!props.loading}
        css={override}
        size={6}
      />
    </div>
  );
}

export default Spinner;
