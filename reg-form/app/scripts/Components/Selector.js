var Vue = require('../vue.js')

Vue.component('Selector', {
  props: ['title', 'options', 'dependent', 'error'],
  template: '<div class="reg-selector"><input class="reg-selector-input" @input="findItem" v-model="input" v-bind:value="input" @focus="openList" @blur="hideList" v-bind:placeholder="title"><ul class="reg-selector-list" v-bind:class="{opened}"><li v-for="(val, key) in filtered" class="reg-selector-item" :key="key" :rel="key" @mousedown="selectItem">{{val}}</li></ul><span class="reg-error" v-if="error != \'\'"> — {{error}}</span></div>',
  data: function() {
    return {
      opened: false,
      selected: 0,
      input: '',
      query: ''
    }
  },
  methods: {
    openList: function() {
      this.opened = true;
    },
    hideList: function() {
      this.opened = false;
    },
    selectItem: function(e) {
      this.selected = e.path[0].getAttribute('rel');
      this.input = this.options[this.selected];
      this.$emit('input', this.selected);
    },
    findItem: function(e) {
      this.$emit('input', 0);
      const query = e.target.value.trim();
      if(query.match(/^[a-zа-яїєё]*$/i)) {
        this.query = query;
      }
    }
  },
  computed: {
    filtered: function() {
      const regex = new RegExp(this.query, "i");
      var newOpts = {};
      for(var key in this.options) {
        if(this.options[key].match(regex) != null)
          newOpts[key] = this.options[key];
      }
      return newOpts;
    }
  },
  watch: {
    dependent: function() {
      this.input = '';
      this.$emit('input', 0);
    }
  }
})
