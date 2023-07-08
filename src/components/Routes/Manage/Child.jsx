import React from "react";
import Cards from "./CardsScrollable.jsx"



class Child extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="kanban__nav">
          <div className="kanban__nav-wrapper">
            <div className="kanban__nav-name">
              <div className="kanban-name">Studio Manage</div>
            </div>
          </div>
        </section>
        <section className="kanban__main">
          <div className="kanban__main-wrapper" />
            <Cards />
        </section>
      </React.Fragment>
    );
  }
}

export default Child;
