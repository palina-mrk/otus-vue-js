export const stateMethodsMixin = {
  data() {
    return {
    }
  },
  props: ['catalog', 'basket'],
  computed: {
    totalCost() {
      return Object.keys(this.basket).reduce((acc, id) => (Number(acc) + this.basket[id] * this.getPrice(id)), 0);
    },
    itemIdCount() {
      return Object.keys(this.basket).length
    },
    totalCount() {
      return Object.values(this.basket).reduce((acc, count) => (Number(acc) + Number(count)), 0);
    }
  },
  methods: {
    getPrice(id) {
      return this.catalog.find(el => el.id == id).price;
    },
    getTitle(id) {
      return this.catalog.find(el => el.id == id).title;
    },
    itemCount(id) {
      return this.basket[id] ? this.basket[id] : 0
    },
    itemCost(id) {
      return Number(this.itemCount(id)) * Number (this.getPrice(id));
    }
  },
}