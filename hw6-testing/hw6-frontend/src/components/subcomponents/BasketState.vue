<template>
    <span class="basket-state">in basket: {{ itemIdCount }} @ {{ totalCount }} = {{ totalCost.toFixed(2) }} $</span>
</template>

<script>
import { stateMethodsMixin } from '../../mixins/stateMethods';

export default {
  mixins: [stateMethodsMixin],
}
</script>

<style lang="scss" scoped>
.basket-state {
  color: wheat;
  opacity: 0.5;
  font-weight: 600;
  font-style: italic;
}
</style>