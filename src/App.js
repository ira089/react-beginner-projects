import React, { useState } from "react";
import "./index.scss";

const Modal = ({ open, onClickModalClose, children }) => {
  return (
    <div className={`overlay animated ${open ? "show" : ""}`}>
      <div className="modal">
        <svg
          onClick={onClickModalClose}
          height="200"
          viewBox="0 0 200 200"
          width="200"
        >
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
        {children}
      </div>
    </div>
  );
};

function App() {
  const [open, setOpen] = useState(false);
  const onClickModalOpen = () => {
    setOpen(true);
  };
  const onClickModalClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <button onClick={onClickModalOpen} className="open-modal-btn">
        ✨ Открыть окно
      </button>
      <Modal open={open} onClickModalClose={onClickModalClose}>
        <img
          src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
          alt="men"
        />
        <h3>this modal</h3>
      </Modal>
      ;
    </div>
  );
  // return (
  //   <div className="App">
  //     <button onClick={onClickModalOpen} className="open-modal-btn">
  //       ✨ Открыть окно
  //     </button>
  //     {open && <Modal open={open} onClickModalClose={onClickModalClose} />}
  //   </div>
  // );
}

export default App;
