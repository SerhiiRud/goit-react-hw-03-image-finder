import { Component } from 'react';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  render() {
    return createPortal(
      <div className="overlay">
        <div className="modal">
          <img src="" alt="" />
        </div>
      </div>,
      document.querySelector('#modal-root')
    );
  }
}
