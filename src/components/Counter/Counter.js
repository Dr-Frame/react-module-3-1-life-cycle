import React from 'react';
import Controls from './Controls';
import './Counter.css';
import Value from './Value';

//class имя компонента
class Counter extends React.Component {
  //TODO:
  //структура: static, state, методы, render()

  //TODO:
  //делаем DefaultProps

  static defaultProps = {
    initialValue: 0,
  };

  static propTypes = {
    //
  };

  //TODO:
  //класический вариант ==========================
  /* constructor() {
    super();

    //здесь можно хранить все что угодно кроме методов
    this.state = {
      value: 5,
    };
  } */

  //TODO:
  //современный метод. Babel за нас транспилирует этот код в тот что выше ==============
  //это всегда обьект, свойство екземпляра, от его свойств зависит разметка
  state = {
    value: this.props.initialValue,
  };

  //TODO:
  //что бы работал контекст this, вместо метода делаем стрелочную функцию
  //event это кросбраузерная обертка реакта над событием браузера
  //приходит не нативное событие а обертка. в остальном все тоже самое
  handleIncrement = event => {
    /* console.log('click');
    console.log(event.target); */

    //ассинхронные функции не будут сразу работать
    //потому что как только синхронный код выполнился
    //значения event очищается, поэтому нужно создать отдельную переменнуюи
    // и записать значение event

    //  const savedEvent = event.target;

    //вариант с деструктуризацией
    /* const { target } = event;

    setTimeout(() => {
      console.log(target);
    }, 1000); */

    this.setState(prevState => {
      return {
        value: prevState.value + 1,
      };
    });
  };

  //TODO:
  //изменяем value
  handleDecrement = () => {
    // ТАК ДЕЛАТЬ НЕЛЬЗЯ!!
    // this.state.value = 6   !!!!!!!!!!!

    // ================== так делаем когда просто хотим записать новое значение не основываясь на предидущем значенни ( передаем обьект)

    /* this.setState(
      {
        value: 10,
        //есть второй аргумент колбека, вызвать функию можно когда значение обновиться
      } //, () => {},
    ); */

    // так делаем для динамического обновления (передаем функцию)
    // React в параметр передаст акрутальное значение на момент вызова функции
    this.setState(prevState => {
      return {
        value: prevState.value - 1,
      };
    });
  };

  render() {
    return (
      <div className="Counter">
        <Value startValue={this.state.value} />

        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}

export default Counter;

//onSubmit

//onChange

// onMouseMove
