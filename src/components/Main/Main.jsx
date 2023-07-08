import React from "react";
import Cards from "./Cards.jsx";
import Select from "./Select.jsx";
import Button from "./Button.jsx";
import { connect } from "react-redux";
import {
  filtratedTasksBacklog,
  filtratedTasksProgress,
  filtratedTasksReview,
  filtratedTasksComplete
} from "../../selectors/";
import CSSTransition from "react-addons-css-transition-group";

class Main extends React.Component {
  render() {
    return (
      <section className="kanban__main">
        <CSSTransition
          transitionName="article"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {this.cardsList}
        </CSSTransition>
      </section>
    );
  }


  get cardsList() {

    
    const allowDrop = (ev) => {
      ev.preventDefault();
    };
  
    const drag = (ev) => {

     
      ev.dataTransfer.setData("text", ev.target.id);
     
    };
  
    const drop = (ev) => {
      ev.preventDefault();
      const data = ev.dataTransfer.getData('text');
      const sourceCardId = data;
      const targetCardId = ev.target.id;
    
      const sourceCard = document.getElementById(sourceCardId);
      const targetCard = document.getElementById(targetCardId);
    
      console.log(sourceCard);
      console.log(targetCard);
      // Swap the cards by swapping their parent nodes
      const sourceParent = sourceCard.parentNode;
      const targetParent = targetCard.parentNode;
    
      sourceParent.replaceChild(targetCard, sourceCard);
      targetParent.appendChild(sourceCard);
    };

    const getRandomString = () => {
      const strings = ["in-progress-color", "backlog-color", "review-color", "complete-color"];
      const randomIndex = Math.floor(Math.random() * strings.length);
      return strings[randomIndex];
    };

    const { board, backlog, progress, review, complete, selected } = this.props;
    if (board) {
      return (
        <React.Fragment>
          <div
            className={
              selected ? "kanban__main-wrapper-opacity" : "kanban__main-wrapper"
            }
          >
             <div  onDragOver={allowDrop} onDrop={drop}>
          
            <Cards
              id="drag1"
              onDragStart={drag}
              name="Backlog"
              style={getRandomString()}
              type="backlog"
              data={backlog}
            />
             </div>
             <div  onDragOver={allowDrop} onDrop={drop}>
             <Cards
              id="drag2"
              onDragStart={drag}
              name="In Progress"
              style={getRandomString()}
              type="progress"
              data={progress}
            />
            </div>
            <div  onDragOver={allowDrop} onDrop={drop}>
            <Cards
              id="drag3"
              onDragStart={drag}
              name="Review"
              style={getRandomString()}
              type="review"
              data={review}
            />
            </div>
            <div  onDragOver={allowDrop} onDrop={drop}>
            <Cards
              id="drag4"
              onDragStart={drag}
              name="Complete"
              style={getRandomString()}
              type="complete"
              data={complete}
            />
            </div>
          </div>
          <Button />
          <Select />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => ({
  board: state.board,
  selected: state.selected,
  backlog: filtratedTasksBacklog(state),
  progress: filtratedTasksProgress(state),
  review: filtratedTasksReview(state),
  complete: filtratedTasksComplete(state)
});

export default connect(mapStateToProps)(Main);
