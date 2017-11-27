<template>
<span v-if="type === 'null'" class="vue-object-view-primitive vue-object-view-null">null</span>
<span v-else-if="type === 'undefined'" class="vue-object-view-primitive vue-object-view-undefined">undefined</span>
<span v-else-if="type === 'number'" class="vue-object-view-primitive vue-object-view-number">{{ value }}</span>
<span v-else-if="type === 'string'" class="vue-object-view-primitive vue-object-view-string">"{{ value }}"</span>
<span v-else-if="type === 'boolean'" class="vue-object-view-primitive vue-object-view-boolean">{{ value }}</span>
</template>

<script>
export default {
  name: 'objectTreeNodePrimitive',
  props: [ 'type', 'value' ]
}
</script>

<style>
    .vue-object-view-null, .vue-object-view-undefined, .vue-object-viewnode-boolean {
        font-weight: bold;
    }
</style>
