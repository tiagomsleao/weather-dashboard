<script setup lang="ts">
import WeatherPlot from './all-tiago-new-files/components/WeatherPlot.vue'
import { ref } from 'vue'

import InputNumber from 'primevue/inputnumber'
import IftaLabel from 'primevue/iftalabel'

let latitude = ref(36.188110)
let longitude = ref(-115.176468)
</script>

<template>
  <WeatherPlot :latitude="latitude" :longitude="longitude" />

  <IftaLabel>
    <InputNumber
      id="latitude"
      v-model="latitude"
      suffix="º"
      mode="decimal"
      :minFractionDigits="2"
      :maxFractionDigits="15"
      :min="-90"
      :max="90"
    />
    <label for="latitude">Latitude</label>
  </IftaLabel>

  <IftaLabel>
    <InputNumber
      id="longitude"
      v-model="longitude"
      suffix="º"
      mode="decimal"
      :minFractionDigits="2"
      :maxFractionDigits="15"
      :min="-180"
      :max="180"
    />
    <label for="longitude">Longitude</label>
  </IftaLabel>
  (note: for inputs to submit, change their value and then click enter or click with the mouse
  outside the input)
</template>

<style scoped>
#latitude {
  margin-bottom: 1rem;
}
</style>
