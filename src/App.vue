<template>
  <div>
    <SiteHeader />
    <div class="hero">
      <div class="hero__container">
        <HeroTagline />
        <SearchForm />
      </div>
    </div>
  </div>
</template>

<script>
import SiteHeader from './components/SiteHeader'
import HeroTagline from './components/HeroTagline'
import SearchForm from './components/SearchForm'
export default {
  components: {
    SiteHeader,
    HeroTagline,
    SearchForm
  }
}
</script>

<style>
.hero::before {
  content: ' ';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 485px;
  background-color: var(--color-background-blue);
}
.hero__container {
  max-width: var(--container-width);
  margin: 0 auto;
}
</style>
