<template>
<objectTreeNodePrimitive v-if="primitive" v-model="value" :type="type" />
<objectTreeNodeComplex v-else v-model="value" :type="type" :primary="primary" :nowrap="nowrap" :expandButtonText="expandButtonText" :setOpen="setOpen" />
</template>

<script>
import objectTreeNodeComplex from './ObjectTreeNodeComplex.vue';
import objectTreeNodePrimitive from './ObjectTreeNodePrimitive.vue';

export default {
  name: 'objectTreeNode',
  props: {
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
  computed: {
    type() {
        let _type = typeof(this.value);
        if (_type == 'object') {
            if (this.value == null) {
                return "null";
            }
            if (Array.isArray(this.value)) {
                return "array";
            }
            return "object";
        }
        return _type;
    },
    primitive() {
        return !(this.type === 'array' || this.type === 'object');
    }
  },
  components: {
      objectTreeNodeComplex,
      objectTreeNodePrimitive
  }
}
</script>

<style scoped>
</style>
