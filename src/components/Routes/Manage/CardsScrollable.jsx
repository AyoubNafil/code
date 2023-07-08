import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Button,
  Card,
  CardFooter,
  CardImg,
  CardText,
  CardTitle,
  CardSubtitle,
  Col,
  Container,
  FormGroup,
  Label,
  Input,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

// import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    
    name: `Board ${k}`,
    
    order: k
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function DraggableCard(props) {
  return (
    <Card className="producer">
      <CardImg
        top
        width="100%"
        src="https://wp.salesforce.com/en-ap/wp-content/uploads/sites/14/2022/11/salesforce-logo.jpg?w=1024"
        alt="test name"
      />
      <CardTitle className="name">{props.name}</CardTitle>
      
      
    </Card>
  );
}

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd} className="page">
        <Container>
          
          <Row>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div className="producers" ref={provided.innerRef}>
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="producer-outer"
                        >
                          <DraggableCard {...item} />
                          
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Row>
        </Container>
      </DragDropContext>
    );
  }
}

export default Cards;
