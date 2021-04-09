import React, { Component } from 'react';
import './Clock.scss';

export default class CLock extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  intervalId = null;

  componentDidMount() {
    console.log('setInterval');

    this.intervalId = setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString(),
      });
    });
  }

  //если компонент скрівается/открівается, нужно чистить за собой память
  //когда закроем, СетИнтервал будет искать стейт которго не будет уже
  //поэтмоу размаунтить нужно СетИнтервал
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return <div className="Clock__face">{this.state.time}</div>;
  }
}
