import React from "react";
import { Button, message } from "antd";
import { defaultProps, propTypes } from "./propTypes";
import http from "../util/api";

// const httpParam = { baseURL: "http://kingofdinner.realsun.me:5201" };
const httpParam = { baseURL: "http://10.108.2.66:1001" };

/**
 * 高级搜索组件
 */
export default class Login extends React.Component<any, any> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount = () => {};

  handleLogin = async () => {
    let res;
    try {
      // res = await http().login({
      //   code: 'demo1',
      //   password: '123456'
      // });

      res = await http(httpParam).login({
        code: "demo",
        password: "1234@qwer"
      });
    } catch (err) {
      console.error(err);
      return message.error(err.message);
    }
    message.success("登录成功");
    localStorage.setItem("userInfo", JSON.stringify(res));
  };

  render() {
    return (
      <Button type="primary" onClick={this.handleLogin}>
        登录
      </Button>
    );
  }
}
