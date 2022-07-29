import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      indice: 0,
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
      filtroNome: '',
      filtroRare: '',
      filtroTrunfo: false,
      isFilterdisabled: false,
      cardDeck: [],
    };
  }

  validaBotao = () => {
    const { name, descricao, att01, att02, att03, dirImage, lstRare } = this.state;
    const maxSumAtt = 210;
    const maxAtt = 90;
    const minAtt = 0;

    if (!name || !descricao || !dirImage || !lstRare) return true;

    // if (!parseInt(att01, 10) || !parseInt(att02, 10) || !parseInt(att03, 10)) return true;

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

  handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (target.id === 'filtroTrunfo') this.setState({ isFilterdisabled: value });

    this.setState({ [target.id]: value }, () => {
      const validaOk = this.validaBotao();
      this.setState({ isSaveButtonDisabled: validaOk });
    });
  }

  handleSaveButtonClick = (event) => {
    event.preventDefault();
    const { indice, name, descricao, att01, att02, att03 } = this.state;
    const { cardDeck, dirImage, lstRare, chkTrunfo } = this.state;
    const objCard = {
      indice,
      name,
      descricao,
      att01,
      att02,
      att03,
      dirImage,
      lstRare,
      chkTrunfo,
    };
    this.setState({ cardDeck: [...cardDeck, objCard], hasTrunfo: chkTrunfo }, () => {
      this.setState({
        indice: indice + 1,
        name: '',
        descricao: '',
        att01: '0',
        att02: '0',
        att03: '0',
        dirImage: '',
        lstRare: 'normal',
        chkTrunfo: false,
        isSaveButtonDisabled: true,
      });
    });
  }

  handleDellButtonClick = (event) => {
    event.preventDefault();
    const { cardDeck } = this.state;
    const chave = event.target.attributes[1].value;

    this.setState(() => {
      const newDeck = cardDeck.filter(({ indice }) => indice !== parseInt(chave, 10));
      const seTrunfo = newDeck.some(({ chkTrunfo }) => chkTrunfo === true);

      return { cardDeck: newDeck, hasTrunfo: seTrunfo };
    });
  };

  render() {
    const { name, descricao, att01, att02, att03, dirImage, lstRare } = this.state;
    const { chkTrunfo, hasTrunfo, isSaveButtonDisabled, cardDeck } = this.state;
    const { filtroNome, filtroRare, filtroTrunfo, isFilterdisabled } = this.state;
    let cardFilter = cardDeck.filter((item) => item.name.includes(filtroNome));

    cardFilter = cardFilter.filter((item) => {
      if (filtroRare === 'raro') {
        return item.lstRare === filtroRare;
      }
      return item.lstRare.includes(filtroRare);
    });
    if (filtroTrunfo) (cardFilter = cardDeck.filter((item) => item.chkTrunfo === true));

    return (
      <main className="App">
        <section style={ { display: 'flex', flexWrap: 'wrap' } }>
          <h1 style={ { width: '100%' } }>Tryunfo</h1>
          <div style={ { border: '1px solid black' } }>
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
          </div>
          <div style={ { border: '1px solid black' } }>
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
        </section>
        <form>
          <label htmlFor="filtroNome">
            Filtro por Nome:
            <input
              type="text"
              id="filtroNome"
              value={ filtroNome }
              disabled={ isFilterdisabled }
              onChange={ this.handleInputChange }
              data-testid="name-filter"
            />
          </label>
          <label htmlFor="filtroRare">
            Filtro por Frequencia:
            <select
              name="lstRare"
              id="filtroRare"
              value={ filtroRare }
              disabled={ isFilterdisabled }
              onChange={ this.handleInputChange }
              data-testid="rare-filter"
            >
              <option value="">todas</option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          <label htmlFor="filtroTrunfo">
            Super Trunfo
            <input
              type="checkbox"
              id="filtroTrunfo"
              checked={ filtroTrunfo }
              onChange={ this.handleInputChange }
              data-testid="trunfo-filter"
            />
          </label>
        </form>
        <section style={ { display: 'flex', flexWrap: 'wrap' } }>
          {cardFilter.map((item) => (
            <div key={ item.indice }>
              <Card
                cardName={ item.name }
                cardDescription={ item.descricao }
                cardAttr1={ item.att01 }
                cardAttr2={ item.att02 }
                cardAttr3={ item.att03 }
                cardImage={ item.dirImage }
                cardRare={ item.lstRare }
                cardTrunfo={ item.chkTrunfo }
              />
              <button
                type="submit"
                chave={ item.indice }
                onClick={ this.handleDellButtonClick }
                data-testid="delete-button"
              >
                Excluir

              </button>
            </div>
          ))}
        </section>
      </main>
    );
  }
}

export default App;
// att
