<template>
  <label
    class="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer"
  >
    Прикрепить изображение:
    <input
      type="file"
      @change="onChange($event)"
    />
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
    },
  },
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.files[0])
    },
  },
}
</script>
