import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      descricao: '',
      att01: '',
      att02: '',
      att03: '',
      dirImage: '',
      lstRare: 'normal',
      chkTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: false,
    };
  }

  handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [target.id]: value });
  }

  handleSaveButtonClick = (event) => {
    event.preventDefault();
    // this.setState({ [target.id]: target.value });
  }

  render() {
    const { name, descricao, att01, att02, att03, dirImage, lstRare } = this.state;
    const { chkTrunfo, hasTrunfo, isSaveButtonDisabled } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ name }
          cardDescription={ descricao }
          cardAttr1={ att01 }
          cardAttr2={ att02 }
          cardAttr3={ att03 }
          cardImage={ dirImage }
          cardRare={ lstRare }
          cardTrunfo={ chkTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.handleInputChange }
          onSaveButtonClick={ this.handleSaveButtonClick }
        />
        <Card
          cardName={ name }
          cardDescription={ descricao }
          cardAttr1={ att01 }
          cardAttr2={ att02 }
          cardAttr3={ att03 }
          cardImage={ dirImage }
          cardRare={ lstRare }
          cardTrunfo={ chkTrunfo }
        />
      </div>
    );
  }
}

export default App;
