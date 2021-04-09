import React, { PureComponent } from 'react';

class Tabs extends PureComponent {
  state = {
    activeIndex: 0,
  };

  //делаем для того что бы при клике на один и тот же таб(смены индекса не происходит)
  // не происходил метод рендер()
  // использовать всегда не нужно, реакт бистро очень рендерит

  //вместо этого можно использовать PureComponent доавить в импорт и екстенд сделать !!!!

  /*  shouldComponentUpdate(nextProps, nextState) {
    return nextState.activeIndex !== this.state.activeIndex;
  } */

  setActiveIndex = idx => {
    this.setState({
      activeIndex: idx,
    });
  };

  render() {
    console.log(Date.now());
    const { activeIndex } = this.state;
    const { items } = this.props;
    const activeTab = items[activeIndex];
    return (
      <>
        <div>
          {items.map((item, index) => (
            <button
              type="button"
              key={item.label}
              onClick={() => this.setActiveIndex(index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div>
          <h2>{activeTab.label}</h2>
          <p>{activeTab.content}</p>
        </div>
      </>
    );
  }
}

export default Tabs;
