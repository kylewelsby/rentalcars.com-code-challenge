<template lang="html">
  <div class="spinner" />
</template>

<script>
export default {
}
</script>

<style lang="css">
.spinner {
  height: 1.25rem;
  width: 1.25rem;
  animation: rotate 0.8s infinite linear;
  border: 0.1rem solid var(--color-link);
  border-right-color: transparent;
  border-radius: 50%;
}

@keyframes rotate {
  0%   { transform: rotate(0deg);   }
  100% { transform: rotate(360deg); }
}
</style>
