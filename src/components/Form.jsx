import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form style={ { display: 'flex', flexDirection: 'column' } }>
        <label htmlFor="name">
          Nome:
          <input type="text" id="name" data-testid="name-input" />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <textarea name="descricao" id="" data-testid="description-input" />
        </label>
        <label htmlFor="att01">
          Atributo 01:
          <input type="number" id="att01" data-testid="attr1-input" />
        </label>
        <label htmlFor="att02">
          Atributo 02:
          <input type="number" id="att02" data-testid="attr2-input" />
        </label>
        <label htmlFor="att03">
          Atributo 03:
          <input type="number" id="att03" data-testid="attr3-input" />
        </label>
        <label htmlFor="dirImage">
          Caminho para imagem:
          <input type="text" id="dirImage" data-testid="image-input" />
        </label>
        <label htmlFor="lstRare">
          Frequencia:
          <select name="lstRare" id="lstRare" data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="chkTrunfo">
          <input type="checkbox" id="chkTrunfo" data-testid="trunfo-input" />
          Super Trunfo
        </label>
        <button type="submit" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
