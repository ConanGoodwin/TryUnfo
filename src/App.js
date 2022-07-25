import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      descricao: '',
      att01: '0',
      att02: '0',
      att03: '0',
      dirImage: '',
      lstRare: 'normal',
      chkTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
  }

  validaBotao = () => {
    const { name, descricao, att01, att02, att03, dirImage, lstRare } = this.state;
    const maxSumAtt = 210;
    const maxAtt = 90;
    const minAtt = 0;

    if (!name || !descricao || !dirImage || !lstRare) return true;

    if (!parseInt(att01, 10) || !parseInt(att02, 10) || !parseInt(att03, 10)) return true;

    if (parseInt(att01, 10) + parseInt(att02, 10) + parseInt(att03, 10) > maxSumAtt) {
      return true;
    }

    if (parseInt(att01, 10) > maxAtt || parseInt(att02, 10) > maxAtt) {
      return true;
    }

    if (parseInt(att03, 10) > maxAtt) {
      return true;
    }

    if (parseInt(att01, 10) < minAtt || parseInt(att02, 10) < minAtt) {
      return true;
    }

    if (parseInt(att03, 10) < minAtt) {
      return true;
    }

    return false;
  }

  handleInputChange = async ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    await this.setState({ [target.id]: value });
    const validaOk = this.validaBotao();
    this.setState({ isSaveButtonDisabled: validaOk });
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
