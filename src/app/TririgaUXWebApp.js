import React from "react";
import { createPortal } from "react-dom";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@carbon/react";
import { HomePage, CurrentUserPage } from "../pages";
import { Paths } from "../utils";
import { LoadingServices, MessageServices } from "../services";
import ShowAppMessages from "./ShowAppMessages";

const cssBase = "tririgaUXWebApp";

export default class TririgaUXWebApp extends React.PureComponent {
  componentDidMount() {
    MessageServices.addSubscriber(this.onMessageChange);
    LoadingServices.addSubscriber(this.onLoadingChange);
  }

  state = {
    message: null,
    loading: false,
  };

  render() {
    const { loading, message } = this.state;
    return (
      <div className={cssBase}>
        <Routes>
          <Route path={Paths.CURRENT_USER} element={<CurrentUserPage />} />
          <Route path={Paths.HOME} element={<HomePage />} />
        </Routes>
        <ShowAppMessages message={message} clearMessage={this.clearMessage} />
        {createPortal(<Loading active={loading} withOverlay />, document.body)}
      </div>
    );
  }

  onLoadingChange = (loading) => {
    this.setState({ loading });
  };

  onMessageChange = (message) => {
    this.setState({ message });
  };

  clearMessage = () => {
    MessageServices.clearMessage();
  };
}
