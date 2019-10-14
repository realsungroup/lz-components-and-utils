import React from "react";
import { storiesOf } from "@storybook/react";
import BIGrid from "../BIGrid";

storiesOf("ag-grid表格数据组件", module).add("bigrid组件", () => (
  <BIGrid
    gridProps={[
      {
        resid: "624039666618",
        baseURL: "http://10.108.2.66:1001/",
        dataSource: "procedure",
        procedureParams: {
          paranames: "@leaderygno,@yearmonth",
          paratypes: "string,string",
          paravalues: "demo,201908",
          procedure: "GetS3OTListByLeaderMonth"
        }
      },
      {
        resid: "460481857607",
        cparm1: 12345,
        cparm2: 201910,
        baseURL: "http://10.108.2.66:9091/",
        pivotMode: true
      }
    ]}
    // language="zhCN"
    height={700}
    isAllEnableRowGroup={true}
    isAllEnableValue={true}
  />
));
