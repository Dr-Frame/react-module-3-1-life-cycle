import React, { Component } from 'react';
import shortid from 'shortid';

//ПРИ ПРОСМОТРЕ ГАЙДОВ В ИНТЕРНЕТЕ ПРОВЕРЯТЬ НА ИМУТАБЕЛЬНОСТЬ!!!!!
//МЫ ДОЛЖНЫ СОЗДАВАТЬ НОВЫЙ state, А НЕ ДЕЛАТЬ ССІЛКУ НА СТАРЫЙ.
//ЧТО БЫ prevState не был равен this.state с новыми данными
class Form extends Component {
  state = {
    name: '',
    tag: '',
    exp: 'junior',
    licence: false,
  };

  nameInputId = shortid.generate();
  tagInputId = shortid.generate();

  //патерн работы с инпутами
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.submit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      tag: '',
    });
  };

  handleLicenceChange = e => {
    this.setState({
      licence: e.currentTarget.checked,
    });
    console.log(e.currentTarget.checked);
    console.log(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor={this.nameInputId}>
          Name
          <input
            //значение name как в state
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            id={this.nameInputId}
          ></input>
        </label>
        <label htmlFor={this.tagInputId}>
          NickName
          <input
            //значение name как в state
            name="tag"
            type="text"
            value={this.state.tag}
            onChange={this.handleChange}
            id={this.tagInputId}
          ></input>
        </label>

        <p>Your level</p>
        <label>
          Junior
          <input
            type="radio"
            name="exp"
            value="junior"
            onChange={this.handleChange}
            checked={this.state.exp === 'junior'}
          ></input>
        </label>
        <label>
          Middle
          <input
            type="radio"
            name="exp"
            value="middle"
            onChange={this.handleChange}
            checked={this.state.exp === 'middle'}
          ></input>
        </label>
        <label>
          Senior
          <input
            type="radio"
            name="exp"
            value="senior"
            onChange={this.handleChange}
            checked={this.state.exp === 'senior'}
          ></input>
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            name="licence"
            checked={this.state.licence}
            onChange={this.handleLicenceChange}
          ></input>
          Agree with terms
        </label>

        <button type="submit" disabled={!this.state.licence}>
          Отправить
        </button>
      </form>
    );
  }
}

export default Form;
