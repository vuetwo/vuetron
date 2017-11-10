<template>
  <div v-if="show && domTree">
    <p>ksdfjhdksfhdskfjhdskfjhskfjdhsfkjdsh</p>
    <tree ref="tree" :identifier="getId" :zoomable="zoomable" :data="domTree" :node-text="nodeText" :layout-type="layoutType" class="tree" />
  </div>
</template>
 
 <script>
import { tree } from "vued3tree";

export default {
  data() {
    return {
      show: true, // required for properly re-rendering object view on change
      type: "tree",
      layoutType: "euclidean",
      nodeText: "name",
      zoomable: true,
      isLoading: false
    };
  },
  computed: {
    domTree() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      return this.$store.state.domTree;
    }
  },
  components: {
    tree
  },
  methods: {
    getId(node) {
      return node.name;
    }
  }
};
</script>

<style>
.tree {
  height: 600px;
  width: 100%;
  z-index: 10000;
}

</style>
