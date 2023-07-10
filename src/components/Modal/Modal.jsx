import React, { useState } from 'react';
import './Modal.scss';

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    
  }
  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
   
  };

  handleSubmit = (event) => {
    const { setOpenModal, addBoard } = this.props;
    event.preventDefault();
    // Here you can perform any action with the input value, such as sending it to an API or updating the component's state.
    console.log('Input value:', this.state.inputValue);

    const newBoard = {
      id: Date.now().toString(),
      name: this.state.inputValue
    };

    addBoard(newBoard);

    

  };
  render() {
    const { setOpenModal, type } = this.props;
    const { inputValue } = this.state;
    if (type == "list") {
      return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            {/* <div className="title">
              <h1>Add new board ?</h1>
            </div> */}

            <div className="webflow-style-input">
              <input  placeholder="List Name" value={inputValue} onChange={this.handleInputChange}></input>
            </div>
            {/* <div className="body">

              <input type="text" value={inputValue} onChange={this.handleInputChange} />


            </div> */}
            <div className="footer">
              
              <button type="submit" onClick={this.handleSubmit}>Add</button>
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    } else if (type == "board") {
      return (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            {/* <div className="title">
              <h1>Add new board ?</h1>
            </div> */}

            <div className="webflow-style-input">
              <input  placeholder="Board Name" value={inputValue} onChange={this.handleInputChange}></input>
            </div>
            {/* <div className="body">

              <input type="text" value={inputValue} onChange={this.handleInputChange} />


            </div> */}
            <div className="footer">
              
              <button type="submit" onClick={this.handleSubmit}>Add</button>
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                id="cancelBtn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>




      )
    }
  }
}

export default Modal;
