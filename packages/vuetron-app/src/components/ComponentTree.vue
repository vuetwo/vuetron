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
      <b-col cols="12">
        <tree ref="tree" :identifier="getId" :zoomable="zoomable" :data="domTree" :node-text="nodeText" :layout-type="layoutType" :margin-y="textMarginY" class="tree" />
      </b-col>
    </b-row>
  </div>
</template>
 
 <script>
import { tree } from "vued3tree";

export default {
  data() {
    return {
      show: true, // required for properly re-rendering object view on change
      type: "cluster",
      layoutType: "euclidean",
      nodeText: "name",
      zoomable: true,
      isLoading: false,
      textMarginY: 700
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

<style scoped>
  .navbar {
    margin-bottom: 20px;
  }

  .tree {
    height: 90vh;
    width: 80vw;
  }
</style>
