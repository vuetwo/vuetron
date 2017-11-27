<template>
<div :class="{ open: open, inline: !open, 'inline-nowrap': !open && nowrap, 'vue-object-view-complex': true }">
    <openButton v-if="primary && !open" @click="open = true" :html="'&#x25B6;'" style="float:left" />
    <openButton v-if="primary && open" @click="open = false" :html="'&#x25BC;'" style="float:left" />
    <div>
    <span v-html="charOpen" />
            <button v-if="!open && !expanded" @click="expanded = true" v-html="expandButtonText" class="vue-object-view-expand"></button>
            <div v-if="open || expanded" v-for="(key, index) in items">
              <span v-if="open || type=='object'" class="key">{{ key }}:&nbsp;</span>
              <objectTreeNode v-model="value[key]" :primary="open" :nowrap="nowrap" :expandButtonText="expandButtonText" :setOpen="computeOpen" />
              <span v-if="!open && index < items.length - 1">,&nbsp;</span>
            </div>
    <span v-html="charClose" /></div>
</div>
</template>

<script>
import openButton from './OpenButton.vue';
import objectTreeNode from './ObjectTreeNode.vue';

export default {
  name: 'objectTreeNodeComplex',
  props: {
    type: String,
    value: [String, Number, Array, Function, Boolean, Object],
    primary: Boolean,
    expandButtonText: {
        type: String,
        default: '...'
    },
    nowrap: {
        type: Boolean,
        default: true
    },
    setOpen: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      open: this.setOpen,
      expanded: this.primary,
      items: this.makeItems()
    }
  },
  beforeCreate: function () {
    this.$options.components.objectTreeNode = require('./ObjectTreeNode.vue').default
  },
  methods: {
    makeItems() {
       if (this.type == 'object') {
           return Object.keys(this.value);
       } else if (this.type == 'array') {
           return [...Array(this.value.length).keys()]
       }
    }
  },
  computed: {
    charOpen() {
        if (this.type == 'object')
            return "{"
        else
            return "["
    },
    charClose() {
        if (this.type == 'object')
            return "}"
        else
            return "]"
    },
    computeOpen() {
      if (this.setOpen === true && this.type == 'object') return true;
      return false;
    }
  },
  watch: {
    primary(value) {
        this.expanded = value;
        this.open = this.open && value;
    }
  },
  components: {
      openButton
  }
}
</script>

<style scoped>
    div.open {
        display: block;
        overflow: hidden;
    } 
    div.open > div {
        float: left;
        display: block;
        overflow: hidden;
    }
    div.open > div > div {
        display: block;
        padding-left: 16px;
    }
    div.inline, div.inline div, div.inline div div {
        display: inline-block;
    } 
    div.inline-nowrap, div.inline-nowrap div, div.inline-nowrap div div {
        display: inline-block;
        white-space: nowrap;
    } 
    span.key {
        font-style: italic;
    }
</style>
