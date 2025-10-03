export const productInputMixin = {
  props: ['categories'],
  data() {
    return {
      newProduct: {
        title: undefined,
        image: undefined,
        price: undefined,
        category: undefined,
        description: undefined,
      },
      showCard: false,
      error: {
        title: undefined,
        price: undefined,
        category: undefined,
      },
      success: false,
    };
  },
  emits: ['add-product'],
  watch: {
    'newProduct.title': {
      handler(newTitle, oldTitle){
        this.error.title = undefined;
      }
    },
    'newProduct.price': {
      handler(newPrice, oldPrice){
        this.error.price = undefined;
      }
    },
    'newProduct.category': {
      handler(newCat, oldCat){
        this.error.category = undefined;
      }
    }
  },
  methods: {
    buttonReset() {
      this.newProduct.title = undefined;
      this.newProduct.image = undefined;
      this.newProduct.price = undefined;
      this.newProduct.category = undefined;
      this.newProduct.description = undefined;
      this.error.title = undefined;
      this.error.price = undefined;
      this.error.category = undefined;
    },
    formValidate() {
      this.error.title = this.newProduct.title?.length > 0 ? undefined : 'the product title is required!';
      this.error.category = this.newProduct.category?.length > 0 ? undefined : 'the product category is required!';
      console.log(this.newProduct.price);
      if(this.newProduct.price == undefined)
        this.error.price = 'the product price is required!';
      else
        this.error.price = this.newProduct.price > 0 ? undefined : 'the product price must be positive!';

      return this.error.title === undefined
        && this.error.category === undefined
        && this.error.price === undefined;
    },
    buttonClick() {
      if(!this.formValidate())
        return;
      this.$emit('add-product', Object.assign(this.newProduct));
      this.buttonReset();
      this.success = true;
    },
  }
}