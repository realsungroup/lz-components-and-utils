import React from "react";
import { storiesOf } from "@storybook/react";
import BIGrid from "../BIGrid";

storiesOf("ag-grid表格数据组件", module).add("bigrid组件", () => (
  <BIGrid
    gridProps={[
      { resid: "507309704555", cmswhere: "", keyValue: "李" },
      { resid: "561545788771", cmswhere: "", keyValue: "" }
    ]}
    language="zhCN"
    height={500}
  />
));
