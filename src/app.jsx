import "./index.css";
import React from "react";
import Loadable from "react-loadable";
import Logo from "./components/Logo/Logo.jsx";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Basic from "./components/Routes/Basic/Basic.jsx";
import Manage from "./components/Routes/Manage/Manage.jsx";
import Reports from "./components/Routes/Reports/Reports.jsx";
import Schedule from "./components/Routes/Schedule/Schedule.jsx";
import Settings from "./components/Routes/Settings/Settings.jsx";
import { executeQuery } from "./api/utile.js";
import { PackageName } from "./constants";

import { NavLink } from "react-router-dom";

class App extends React.Component {
  state = {
    isLoading: true,
    array: []
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const array = await executeQuery(
        "SELECT Id, NamespacePrefix FROM PackageLicense where NamespacePrefix like '" +
        PackageName +
        "'"
      );

      console.log("Fetched array:", array);

      if (array && array.length > 0) {
        this.setState({ array, isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.log("Error occurred while executing query:", error);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { array, isLoading } = this.state;

    if (isLoading) {
      return (<div className="kanban-wrapper">
        <div className="kanban">
          <Logo />
          <div className="loading">Loading...</div>
        </div>
      </div>);
    }

    if (array.length > 0) {
      return (
        <div className="kanban-wrapper">
          <div className="kanban">
            <Logo />
            <Header />
            <Sidebar />
            <Switch>
              <Route exact path="/" component={Manage} />
              <Route path="/list" component={Basic} />
              <Route path="/schedule" component={Schedule} />
              <Route path="/reports" component={Reports} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </div>
        </div>
      );
    } else {
      return (
        <div className="kanban-wrapper">
          <div className="kanban">
            <Logo />
            <Header />
            <section className="kanban__sidebar">
              <NavLink to="/settings" activeClassName="active-area">
                <div className="kanban__sidebar-settings">
                  <i className="material-icons">settings</i>
                  <span>Settings</span>
                </div>
              </NavLink>
            </section>
            <Switch>
              <Route path="/settings" component={Settings} />
            </Switch>

          </div>
        </div>
      );
    }
  }
}

const Loading = () => <div className="loading">Loading...</div>;

const Sidebar = Loadable({
  loader: () => import("./components/Sidebar/Sidebar.jsx"),
  loading: Loading
});

export default App;
