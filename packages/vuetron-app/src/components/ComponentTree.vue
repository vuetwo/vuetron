<template>
  <div class="full-height">
    <navbar title="Vue Vision" />
    <b-container v-if="!domTree" class="full-height" fluid>
      <b-row class="full-height-middle">
        <div class="no-tree-logo text-center">
          <div class="no-tree-icon">
            <icon name="frown-o" scale="6" />
          </div>
          <div class="no-tree-text">
            <h2>No Tree Found</h2>
            <p>Waiting for app connection...</p>
          </div>
        </div>
      </b-row>
    </b-container>
    <b-container v-if="domTree" fluid>
      <b-row>
        <b-col cols="12">
          <h4>Tree Props</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" md="2">
          <label for="margin-y"><strong>Margin-y:</strong></label>
        </b-col>
        <b-col cols="6">
          <b-form-input id="margin-y" size="sm" type="range" min="0" max="400" v-model.number="MarginY" />
          <b-form-text>Margin for Y axis in pixels (0-400)</b-form-text>
        </b-col>
        <b-col cols="3" md="2">
          <span>{{ MarginY }}px</span>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="3" md="2">
          <label for="duration"><strong>Duration:</strong></label>
        </b-col>
        <b-col cols="6">
          <b-form-input id="duration" size="sm" type="range" min="100" max="1500" v-model.number="duration" />
          <b-form-text>Animation duration in milliseconds (100-1500)</b-form-text>
        </b-col>
        <b-col cols="3" md="2">
          <span>{{ duration }}px</span>
        </b-col>
      </b-row>
      <b-row class="tree-container">
        <b-col cols="10" offset="1">
          <tree ref="tree" :identifier="getId" :zoomable="zoomable" :data="domTree" :node-text="nodeText" :layout-type="layoutType" :margin-x="MarginX" :margin-y="MarginY" :duration="duration" class="tree" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
 
<script>
  import Navbar from './navigation/Navbar.vue';
  import { tree } from "vued3tree";
  export default {
    data() {
      return {
        show: true, // required for properly re-rendering object view on change
        type: "tree",
        layoutType: "euclidean",
        nodeText: "name",
        zoomable: false,
        isLoading: false,
        MarginY: 250,
        MarginX: 0,
        duration: 500
      };
    },
    computed: {
      domTree() {
        return this.$store.state.domTree;
      }
    },
    components: {
      'navbar': Navbar,
      tree
    },
    methods: {
      getId(node) {
        return node.id;
      }
    }
};
</script>

<style scoped>
  .no-tree-logo {
    height: 300px;
    width: 300px;
    margin: 15px auto;
    color: #001453;
    background-color: rgba(5, 248, 180, 0.31);
    border-radius: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
  }
  .no-tree-icon {
    text-align: center;
  }
  .no-tree-text {
    text-align: center;
    padding: 20px;
  }
  .full-height {
    height: 100%;
  }
  .full-height-middle {
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tree {
    height: 80vh;
    width: 80vw;
  }
</style>
