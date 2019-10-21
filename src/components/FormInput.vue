<template>
  <div class="form-group">
    <label for="name">{{ title }}:</label>
    <input class="form-control"
     type="text"
     :id="id"
     :placeholder="title"
     @input="onChange"
     :class="{'is-invalid': valid.$error}">
    <div class="invalid-feedback">Please choose a username.</div>
    <pre>{{ valid }}</pre>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: ['title', 'id', 'valid'],
  methods: {
    onChange({ target: { value } }) {
      this.$emit('input', value);
    },
  },
};
</script>
