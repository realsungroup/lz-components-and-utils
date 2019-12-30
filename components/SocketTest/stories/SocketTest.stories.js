import React from "react";
import { storiesOf } from "@storybook/react";
import SocketTest from "../SocketTest";
import "./index.css";
import "../style/index.less";

storiesOf("SocketTest", module).add("SocketTest", () => (
  <SocketTest resid="629462405981" baseURL="http://10.108.2.66:1001" />
));
