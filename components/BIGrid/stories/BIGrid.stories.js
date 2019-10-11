import React from "react";
import { storiesOf } from "@storybook/react";
import BIGrid from "../BIGrid";

storiesOf("ag-grid表格数据组件", module).add("bigrid组件", () => (
  <BIGrid
    gridProps={[
      {
        resid: "460481857607",
        cparm1: 12345,
        cparm2: 201910,
        baseURL: "http://10.108.2.66:9091/",
        pivotMode: true
      }
      // { resid: "561545788771", cmswhere: "", keyValue: "" }
    ]}
    language="zhCN"
    height={600}
    isAllEnableRowGroup={true}
    isAllEnableValue={true}
  />
));
