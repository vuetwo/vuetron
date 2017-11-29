<template>
  <div>
    <div v-for="(item, index) in processChanges" :key="index">
      <b-btn @click="item.show=!item.show"
        variant="transparent"
        :class="item.show ? 'collapsed' : null"
        :aria-controls="`item-${index}`"
        :aria-expanded="item.show ? 'true' : 'false'">
        <icon :name="item.show ? 'caret-down' : 'caret-right'" class="caret-icon" />
      </b-btn>
      <span> {{ index + 1 }} - {{ item.props.path }}</span>
      <b-collapse class="mt-2" :id="`item-${index}`" v-model="item.show">
        <b-card>
          <b-list-group>
            <b-list-group-item v-for="(value, key, i) in item.props" :key="i">
              <strong>{{ key }}</strong>: {{ value }}
              <add-sub-btn v-if="key === 'path'" 
                v-on:click.native="() => $store.commit('addSubscription', value)" />
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>
  
<script>
  import AddSubBtn from './AddSubBtn.vue';
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
    name: 'Mutations',
    props: ['changes'],
    data() {
      return {
        processedChanges: null
      };
    },
    computed: {
      processChanges() {
        if (this.changes) {
          this.processedChanges = this.changes.map(change => {
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
        }
        return this.processedChanges;
      }
    },
    components: {
      'add-sub-btn': AddSubBtn
    }
  };
</script>

<style>
  
</style>

<style scoped>
  .card {
    background: transparent;
    border: none;
  }

  .card-body {
    padding: 0;

  }

  .caret-icon {
    vertical-align: middle;
  }
</style>

 