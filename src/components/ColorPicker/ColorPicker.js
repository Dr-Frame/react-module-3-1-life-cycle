import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './ColorPicker.css';

class ColorPicker extends PureComponent {
  state = {
    activeOptionIdx: 3,
  };

  setActiveIdx = index => {
    this.setState({ activeOptionIdx: index });
  };

  makeOptionClassName = index => {
    //используем фишку CLASSNAMES!!!!!!!!!!!!!

    const classes = classNames('ColorPicker__option', {
      'ColorPicker__option--active': index === this.state.activeOptionIdx,
    });

    return classes;

    /*     const optionClasses = ['ColorPicker__option'];

    if (index === this.state.activeOptionIdx) {
      optionClasses.push('ColorPicker__option--active');
    }

    return optionClasses.join(' '); */
  };

  //выносить с JSX функции в метод обьекта.
  //Старатся что бы JSX был максимально чистый и читабельный
  render() {
    const { activeOptionIdx } = this.state;
    const { options } = this.props;

    const { label } = options[activeOptionIdx];
    const { color } = options[activeOptionIdx];

    return (
      <div className="ColorPicker">
        <h2 className="ColorPicker__title"> Color Picker</h2>
        <div className="ColorPicker__cont">
          <p>Выбрана опция {label}</p>
          <span
            className="ColorPicker__color"
            style={{ backgroundColor: color }}
          ></span>
        </div>
        <div>
          {options.map(({ label, color }, index) => {
            return (
              <button
                className={this.makeOptionClassName(index)}
                key={label}
                style={{ backgroundColor: color }}
                //TODO:
                //нужно візівать анонимную функцию которая вызовет функцию,
                //если сразу вызывать .вернет undefined
                onClick={() => this.setActiveIdx(index)}
              ></button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ColorPicker;
