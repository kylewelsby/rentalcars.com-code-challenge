<template>
  <div>
    <SiteHeader />
    <div class="hero">
      <div class="hero__container">
        <HeroTagline />
        <SearchForm />
      </div>
    </div>
    <p class="footnote">
      <a
        href="https://github.com/kylewelsby/rentalcars.com-code-challenge"
        rel="nofollow"
      >
        Code challenge
      </a> completed by <a href="https://mekyle.com">
        Kyle Welsby
      </a>
    </p>
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
  height: 400px;
  background-color: var(--color-background-blue);
}
.hero__container {
  max-width: var(--container-width);
  margin: 0 auto;
}

.footnote {
  text-align: center;
  font-size: 0.8rem;
}

@media (min-width: 1100px) {
  .hero::before {
    height: 485px;
  }
}
</style>
