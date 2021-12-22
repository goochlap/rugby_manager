<template>
  <button @click="onClick()" :style="{ background: color }" class="btn">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    color: String
  },
  methods: {
    onClick() {
      console.log('Show all teams on click...');
    }
  }
}
</script>