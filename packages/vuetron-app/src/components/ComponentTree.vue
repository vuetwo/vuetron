<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-faded">
      <b-btn @click="() => {this.$store.commit('toggleNavbarDisplay')}" variant="transparent" id="toggle-nav-btn">
        <icon name="navicon" />
      </b-btn>
      <div class="navbar-middle">
        <h1 class="nav-header navbar-brand mb-0">Vue Vision</h1>
      </div>
      <div class="navbar-right">
      </div>
    </nav>
    <b-row class="tree-container" v-if="show && domTree">
      <tree ref="tree" :identifier="getId" :zoomable="zoomable" :data="domTree" :node-text="nodeText" :layout-type="layoutType" :margin-y="textMarginY" class="tree" />
    </b-row>
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
      isLoading: false,
      textMarginY: 1000
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
  .tree-container {
    width: 100%;
    height: 100%;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .tree {
    height: 115vh;
    width: 100vh;
  }
</style>
