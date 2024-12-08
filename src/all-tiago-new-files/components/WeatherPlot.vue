<script setup lang="ts">
import { LocationImpl } from '../domain/entities/location'
import { weatherApi } from '../infrastructure/weather-dashboard-di'
import { ref, watch } from 'vue'
import { isErr, unwrapOk, unwrapErr } from 'option-t/plain_result'
import { WeatherImpl } from '../domain/entities/weather';

const props = defineProps<{
  latitude: number
  longitude: number
}>()

const series = ref(GenerateSeries([]))
const options = ref(GenerateOptions([]))

const isError = ref(false)
const errorMessage = ref('')

// Initial setup just to show something
UpdatePlot(props.latitude, props.longitude)

watch(props, async (_, newValue) => UpdatePlot(newValue.latitude, newValue.longitude))

// I could make these series and options with proper classes,
// but I believe that, for the purposes of not caring too much about the UI, this is enough
function GenerateSeries(data: number[]) {
  return [
    {
      name: 'temperature',
      data: data
    }
  ]
}

function GenerateOptions(categories: string[]) {
  return {
    chart: {
      id: 'temperature-plot'
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: categories
    }
  }
}

async function UpdatePlot(latitude: number, longitude: number) {

  const location = LocationImpl.createLocation(latitude, longitude);

  if (isErr(location)) {
    isError.value = true
    errorMessage.value = unwrapErr(location)
    return
  }
  
  const result = await WeatherImpl.createWeather(unwrapOk(location), weatherApi);

  isError.value = isErr(result)

  if (isError.value) {
    errorMessage.value = unwrapErr(result)
    return
  }

  const weather = unwrapOk(result)

  const temperatures = weather.getTemperatures()

  const totalNumberResults = temperatures.length
  const periodicityToTake = Math.floor(totalNumberResults / 100)

  const temperaturesToDisplay = temperatures.filter((_value, index) => index % periodicityToTake == 0)

  series.value = GenerateSeries(temperaturesToDisplay.map((x) => Math.round(x.getValue() * 100) / 100))
  options.value = GenerateOptions(temperaturesToDisplay.map((x) => x.getDate().toLocaleString()))
}
</script>

<template>
  <h3 v-if="isError">{{ errorMessage }}</h3>

  <div v-if="!isError">
    Temperature (in Cº) per date (in local time of this browser)
    <apexchart width="800" height="500" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<style scoped></style>
