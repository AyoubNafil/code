import React from "react";
import Cards from "./CardsScrollable.jsx"
import Select from "./Select.jsx";
import Button from "./Button.jsx";
import { connect } from "react-redux";

class Child extends React.Component {
  addBoard = (newBoard) => {
    this.refs.cards.addBoard(newBoard);
  }
  render() {
    const {selected } = this.props;
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
          <div className={
              selected ? "kanban__main-wrapper-opacity" : "kanban__main-wrapper"
            }
           >
           <Cards ref="cards"/>
            
            </div> 
            <Button />
            <Select addBoard={this.addBoard}/>
        </section>

        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  board: state.board,
  selected: state.selected,
});

export default connect(mapStateToProps)(Child);
