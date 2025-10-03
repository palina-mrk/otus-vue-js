export const basketInitMixin = {
  data() {
    return {
      //basket: {id1: count1, id2: count2, ...}
      basket: {}
    }
  },
  watch: {
    basket: {
      handler(newBas, oldBas) {
        console.log(`В корзину добавлен товар! Теперь их ${Object.values(newBas).reduce((acc, el) => acc += Number(el), Number(0))}`)
        },
      deep: true,
    }
  },
  methods: {
    addToBasket(productID, productCount) {
      if(!this.basket[productID])
        this.basket[productID] = 0;

      this.basket[productID] = Number(this.basket[productID]) + Number(productCount)
      
      if(this.basket[productID] <= 0)
        delete this.basket[productID];
    },
    clearBasket() {
      Object.keys(this.basket).forEach((productID) => delete this.basket[productID]);
    },
    changeCount(productID, productCount) {
      this.basket[productID] = Number(productCount)
      
      if(this.basket[productID] <= 0)
        delete this.basket[productID];
    },
  }
}