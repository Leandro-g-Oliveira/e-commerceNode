class Cart {
  constructor() {
    this.cart = [];
  }
  addCart (nome,valor,qt,unit,pao) {
    let keyPao = this.cart.filter(val => val.name == nome && val.pao == pao);
    let key = this.cart.findIndex((val)=>val == keyPao[0]);
    if (key > -1) {
      this.cart[key].qtd += parseInt(qt);
      this.cart[key].value += parseFloat(valor);
    } else {
      let lanche = {
        name : nome,
        qtd : parseInt(qt),
        valUnit : parseFloat(unit),
        value : parseFloat(valor),
        pao
      };
      this.cart.push(lanche);
    }
  }
  getCart () {
    return this.cart;
  }
  addQtd (name,op,unit,pao) {
    let keyPao = this.cart.filter(val => val.name == name && val.pao == pao);
    let key = this.cart.findIndex((val)=>val == keyPao[0]);
    //let key = this.cart.findIndex((val)=>val.name==name);
    this.cart[key].qtd++;
    this.cart[key].value += parseFloat(unit);
  }
  rmQtd (name,op,unit,pao) {
    let keyPao = this.cart.filter(val => val.name == name && val.pao == pao);
    let key = this.cart.findIndex((val)=>val == keyPao[0]);
    //let key = this.cart.findIndex((val)=>val.name==name);
    if (this.cart[key].qtd > 1) {
      this.cart[key].qtd--;
      this.cart[key].value -= parseFloat(unit);
    } else {
      this.cart.splice(key,1);
    }
  }
}

module.exports = new Cart();