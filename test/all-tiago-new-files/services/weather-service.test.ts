// Note/Disclaimer (Tiago)
// These unit tests were done before doing some structural changes to code, so I should return here and re-implement them when I have the time to do so


// import type { WeatherApi } from './../../../src/all-tiago-new-files/apis/weather-api'
// import { LocationImpl, type Location } from './../../../src/all-tiago-new-files/entities/location'
// import { WeatherImpl, type Weather } from './../../../src/all-tiago-new-files/entities/weather'
// import { WeatherServiceImpl } from './../../../src/all-tiago-new-files/services/weather-service'
// import {
//   type Result,
//   createOk,
//   createErr,
//   isErr,
//   unwrapErr,
//   unwrapOk,
//   isOk
// } from 'option-t/plain_result'
// import { expect, test } from 'vitest'

// class WeatherApiMock implements WeatherApi {
//   private expectedResult: Result<Weather, string>

//   constructor(expectedResult: Result<Weather, string>) {
//     this.expectedResult = expectedResult
//   }

//   getWeather = (location: Location) => Promise.resolve(this.expectedResult)
// }

// const createWeatherService = (expectedResult: Result<Weather, string>) =>
//   new WeatherServiceImpl(new WeatherApiMock(expectedResult))

// test('when weather api returns error, weather service getWeather method also returns error', async () => {
//   const errorMsg = 'some error'
//   const result = await createWeatherService(createErr(errorMsg)).getWeather(new LocationImpl(1, 1))
//   expect(isErr(result)).toBeTruthy()
//   expect(unwrapErr(result)).toBe(errorMsg)
// })

// test('when weather api returns success, weather service getWeather method also returns success', async () => {
//   const location = new LocationImpl(1, 1)
//   const weather = new WeatherImpl(location, [])
//   const result = await createWeatherService(createOk(weather)).getWeather(location)
//   expect(isOk(result)).toBeTruthy()
//   expect(unwrapOk(result)).toBe(weather)
// })
