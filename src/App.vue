<template>
  <div id="app">
    <h1>RentalCars.com</h1>
    <form name="SearchResultForm" class="search-form">
      <label for="pick-up-location">Pick-up Location</label>
      <input id="pick-up-location" name="pick-up-location" placeholder="city, airport, station, region and district...">
    </form>
    <div class="search-results">
      <div></div>
    </div>
    <div class="search-results__error">No results found</div>
  </div>
</template>
<style>
.search-form {
  background-color: #f3ce56;
}
</style>
