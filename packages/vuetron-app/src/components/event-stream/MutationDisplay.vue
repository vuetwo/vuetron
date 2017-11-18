<template id="mutationDisplayTemplate">
  <div>
    <p class="event-card-title">
      <strong>{{ event.title }}  </strong>
      <revert-btn v-if="event.status === 'active'" :evIdx="evIdx" />
    </p>
    <p><strong>Change Log:</strong></p>
    <div v-for="(item, index) in processChanges" :key="index">
      <span>Change {{ index + 1 }}</span>
      <b-btn @click="item.show=!item.show"
        variant="transparent"
        :class="item.show ? 'collapsed' : null"
        :aria-controls="`item-${index}`"
        :aria-expanded="item.show ? 'true' : 'false'">
        <icon :name="item.show ? 'caret-down' : 'caret-right'" />
      </b-btn>
      <b-collapse class="mt-2" :id="`item-${index}`" v-model="item.show">
        <b-card>
          <b-list-group>
            <b-list-group-item v-for="(value, key, i) in item.props" :key="i">
              <strong>{{ key }}</strong>: {{ value }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>
  
<script>
  import RevertBtn from './assets/RevertBtn.vue';
  const checkType = (char) => {
    switch (char) {
      case 'E':
        return 'Edit';
        break;
      case 'N':
        return 'New';
        break;
      case 'D':
        return 'Delete';
        break;
      default:
        return;
    }
  };
  const getLHS = (obj, arr = false) => {
    if (arr) return obj.item.lhs;
    return 
  };
  export default {
    name: 'MutationDisplay',
    props: ['event', 'evIdx'],
    data() {
      return {
        processedChanges: null
      };
    },
    computed: {
      processChanges() {
        this.processedChanges = this.event.display.changes.map(change => {
          const newObj = {};
          newObj.show = false;
          newObj.props = {};
          // set change path (str)
          newObj.props.path = change.path.join('.');
          // set change type and changed data
          if (checkType(change.kind)) {
            newObj.props.type = checkType(change.kind);
            if (change.lhs) newObj.props.before = change.lhs;
            if (change.rhs) newObj.props.after = change.rhs;
          } else if (change.kind === 'A') {
            newObj.props.type = checkType(change.item.kind);
            if (change.item.lhs) newObj.props.before = change.item.lhs;
            if (change.item.rhs) newObj.props.after = change.item.rhs;
          }
          return newObj;
        });
        return this.processedChanges;
      }
    },
    components: {
      'revert-btn': RevertBtn
    }
  };
</script>

<style>
  
</style>

<style scoped>
  
</style>

 