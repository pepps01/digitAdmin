import React, { Fragment } from "react";
import { BackgroundColor } from "src/utils/setBackground";
import { StatusColor } from "src/utils/setStatusColor";

// import ToolTip from "./ToolTip/ToolTip";

export default function StatusCell({ status = "" }: any) {
  const capitlaizeStatus =
    status && status?.charAt(0).toUpperCase() + status?.slice(1);

  return (
    <Fragment>
      <div
        style={{
          color: StatusColor(capitlaizeStatus),
          fontSize: 14,
          fontWeight: 600,
        }}
        data-tip
        data-for={capitlaizeStatus}
      >
        {capitlaizeStatus}
      </div>
    </Fragment>
  );
}
