<template lang="html">
  <div
    :class="`place place--${placeTypeName}`"
  >
    <span class="place__type">
      {{ placeTypeName | titleize }}
    </span>
    <div class="place__body">
      <div class="place__name">
        {{ data.name }} <span v-if="isAirport">
          ({{ data.iata }})
        </span>
      </div>
      <small class="place__city">
        {{ data.city }} {{ data.country }}
      </small>
    </div>
    <div class="place__isPopular">
      Popular
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    isAirport () {
      return this.data.placeType.toUpperCase() === 'A'
    },
    isStation () {
      return this.data.placeType.toUpperCase() === 'T'
    },
    isDistrict () {
      return this.data.placeType.toUpperCase() === 'D'
    },
    isCity () {
      return this.data.placeType.toUpperCase() === 'C'
    },
    placeTypeName () {
      if (this.isAirport) return 'airport'
      if (this.isStation) return 'station'
      if (this.isDistrict) return 'district'
      if (this.isCity) return 'city'
      return 'other'
    }
  }
}
</script>

<style lang="css">
.place {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid var(--color-hr);
  background-color: var(--color-white);
}
.place:first-child {
  border-top: 0;
}

.place__isPopular,
.place__type {
  color: var(--color-white);
  padding: 0.1875rem 0.3125rem;
  border-radius: 0.1875rem;
  font-weight: bold;
  font-size: 0.85rem;
  text-align: center;
  margin: 0.625rem;
  min-width: 3rem;
}

.place__type {
  margin-right: 0;
  background-color: var(--color-tag-gray);
}

.place--airport .place__type {
  background-color: var(--color-tag-red);
}

.place--city .place__type {
  background-color: var(--color-tag-blue);
}

.place--district .place__type {
  background-color: var(--color-tag-green);
}

.place--station .place__type {
  background-color: var(--color-tag-gray);
}

.place__body {
  margin: 0.625rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.place__city {
  color: var(--color-gray);
  font-size: 0.85rem;
}

.place__isPopular {
  margin-left: 0;
  color: var(--color-green);
  border: 1px solid var(--color-green);
}
</style>
