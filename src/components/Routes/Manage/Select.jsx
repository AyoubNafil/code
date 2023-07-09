import React, { useState } from "react";
import { connect } from "react-redux";
import Modal from "../../Modal/Modal.jsx";

const Select = ({ selected }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    console.log("adddddd");
    setModalOpen(true);
  };

  if (selected) {
    return (
      <div>
        <div className="kanban__main-select">
          <div className="main-select">
            <div className="select-wrapper">
              <div className="select-text">Add scheduled task</div>
              <div className="select-event-note" onClick={handleClick}>
                <i className="material-icons">event_note</i>
              </div>
            </div>
          </div>


        </div>

        {modalOpen && <Modal setOpenModal={setModalOpen} type="board" />}
      </div>
    );
  }

  return null;
};

const mapStateToProps = (state) => ({
  selected: state.selected,
});

export default connect(mapStateToProps)(Select);
