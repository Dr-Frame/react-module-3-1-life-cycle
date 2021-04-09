import React, { Component } from 'react';
//берем метод порта для модалки
import { createPortal } from 'react-dom';
import './Modal.scss';

//ищем по айди в index.html

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  //фаза создания
  componentDidMount() {
    console.log('Modal didmount');

    //вешаем слушателя событий на виндов, для кнопки ESC
    window.addEventListener('keydown', this.handleKeyDown);
  }

  //фаза размонтировки
  componentWillUnmount() {
    console.log('Modal willUnmount');
    //снимаем слушателя, что бы после закрытия модалки не реагировал
    // не забывать за собой подчищать: ОБЫЧНО ЭТО
    // евентлистенеры, таймауты, интервалы, http запросы
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('You have pressed ESC');
      this.props.modalClose();
    }
  };

  handleBackdrop = e => {
    //проверяем что мы кликнули именно по бекдропу а не модалке и сработало всплытие и закрыло модалку
    if (e.target === e.currentTarget) {
      this.props.modalClose();
    }
  };
  render() {
    //создаем портал для модалки. первый аргумент -разметка, второй место куда ставить
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdrop}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
