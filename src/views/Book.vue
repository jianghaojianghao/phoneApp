<template>
    <swipe class="swipe">
        <swipe-item class="swipe-1"></swipe-item>
        <swipe-item class="swipe-2"></swipe-item>
        <swipe-item class="swipe-3"></swipe-item>
    </swipe>
</template>


<script>
import "vue-swipe/dist/vue-swipe.css";
import { Swipe, SwipeItem } from "vue-swipe";
export default {
  created() {
    this.$emit("switchTab", "book");
  },
  data() {
    return {};
  },
  components: {
    swipe: Swipe,
    "swipe-item": SwipeItem
  }
};
</script>

<style lang="scss" scoped>
.swipe {
    height: 200px;
  &-1 {
    height: 200px;
    width: 100%;
    background: #000;
  }
  &-2 {
    height: 200px;
    width: 100%;
    background: #ff0036;
  }
  &-3 {
    height: 200px;
    width: 100%;
    background: rgb(22, 228, 53);
  }
}
</style>