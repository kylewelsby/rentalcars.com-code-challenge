<template lang="html">
  <div class="heroTagline">
    <h1 class="heroTagline__title">
      Car Hire - Search, Compare &amp; Save
    </h1>
    <svg
      class="heroTagline__subTitle"
      viewBox="0 0 525 20"
    >
      <text
        x="50%"
        y="50%"
        alignment-baseline="middle"
        text-anchor="middle"
      >
        Compare 900 companies at over 53,000 locations. Best price guaranteed
      </text>
    </svg>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.heroTagline {
  color: var(--color-white);
  text-align: center;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
}

.heroTagline__subTitle {
  width: 100%;
  max-width: 830px;
  margin: 0 auto;
}

.heroTagline__title {
  font-family: var(--font-alt);
  margin: 0;
  font-size: 2rem;
}

@media (min-width: 1100px) {
  .heroTagline {
    height: 220px;
  }
  .heroTagline__title {
    font-size: 3.125rem;
  }
}
</style>
