var Vue = require('../vue.js')

Vue.component('Checkinput', {
  props: ['title', 'hint', 'error'],
  template: '<div class="reg-check_input"><label class="reg-check_input-label" :class="{checked}"><input type="checkbox" class="reg-check_input-checkbox" @change="toggleInput" v-model="checked">{{title}}</label><input type="text" :placeholder="hint" :style="{width: Math.round(hint.length*10)+\'px\'}" v-model="value" @input="setValue" v-show="checked" class="reg-check_input-input"><span class="reg-error" v-if="error != \'\'">{{error}}</span></div>',
  data: function() {
    return {
      checked: false,
      value: ''
    }
  },
  methods: {
    toggleInput: function() {
      if(this.checked)
        this.$emit('input', this.value);
      else
        this.$emit('input', null);
    },
    setValue: function() {
      if(this.checked)
        this.$emit('input', this.value);
      else
        this.$emit('input', null);
    }
  }
})
