// Note/Disclaimer (Tiago)
// These unit tests were done before doing some structural changes to code, so I should return here and re-implement them when I have the time to do so

// import {
//   type WeatherApiGateway,
//   type WeatherApiGatewayResponse,
//   type VariablesWithTime,
//   type VariableWithValues
// } from './../../../src/all-tiago-new-files/apis/weather-api-gateway'
// import { WeatherApiImpl } from './../../../src/all-tiago-new-files/apis/weather-api'
// import { LocationImpl } from './../../../src/all-tiago-new-files/entities/location'
// import { isOk, isErr, unwrapErr } from 'option-t/plain_result'
// import { expect, test } from 'vitest'

// class WeatherApiGatewayMock implements WeatherApiGateway {
//   private expectedResponses: WeatherApiGatewayResponse[]

//   constructor(expectedResponses: WeatherApiGatewayResponse[]) {
//     this.expectedResponses = expectedResponses
//   }

//   async fetchWeatherData(params: any): Promise<WeatherApiGatewayResponse[]> {
//     return this.expectedResponses
//   }
// }

// class WeatherApiGatewayResponseMock implements WeatherApiGatewayResponse {
//   private _utcOffsetSeconds: number
//   private _latitude: number
//   private _longitude: number
//   private _expectedHourlyResponses: VariablesWithTime | null

//   constructor(
//     utcOffsetSeconds: number,
//     latitude: number,
//     longitude: number,
//     expectedHourlyResponses: VariablesWithTime | null
//   ) {
//     this._utcOffsetSeconds = utcOffsetSeconds
//     this._latitude = latitude
//     this._longitude = longitude
//     this._expectedHourlyResponses = expectedHourlyResponses
//   }

//   utcOffsetSeconds = () => this._utcOffsetSeconds
//   latitude = () => this._latitude
//   longitude = () => this._longitude
//   hourly = () => this._expectedHourlyResponses
// }

// class VariableWithValuesMock implements VariableWithValues {
//   valuesArray = () => new Float32Array(1)
// }

// class VariablesWithTimeMock implements VariablesWithTime {
//   private _timeEnd: bigint

//   constructor(timeEnd: bigint) {
//     this._timeEnd = timeEnd
//   }

//   time = () => BigInt(1)
//   timeEnd = () => this._timeEnd
//   interval = () => 1
//   variables = (index: number, obj?: VariableWithValues) => new VariableWithValuesMock()
// }

// const createWeatherApi = (expectedResponses: WeatherApiGatewayResponse[]) =>
//   new WeatherApiImpl(new WeatherApiGatewayMock(expectedResponses))

// test('wrong latitude gives error', async () => {
//   const result = await createWeatherApi([]).getWeather(new LocationImpl(1000000, 1))
//   expect(isErr(result)).toBeTruthy()
//   expect(unwrapErr(result)).toBe('Wrong coordinates provided')
// })

// test('wrong longitude gives error', async () => {
//   const result = await createWeatherApi([]).getWeather(new LocationImpl(1, 1000000))
//   expect(isErr(result)).toBeTruthy()
//   expect(unwrapErr(result)).toBe('Wrong coordinates provided')
// })

// test('wrong longitude gives error', async () => {
//   const result = await createWeatherApi([]).getWeather(new LocationImpl(1, 1))
//   expect(isErr(result)).toBeTruthy()
//   expect(unwrapErr(result)).toBe('Unexpected error retrieving weather information')
// })

// test('hourly not provided gives error', async () => {
//   const response = new WeatherApiGatewayResponseMock(1, 1, 2, null)
//   const result = await createWeatherApi([response]).getWeather(new LocationImpl(1, 1))
//   expect(isErr(result)).toBeTruthy()
//   expect(unwrapErr(result)).toBe('Could not parse weather response info')
// })

// test('data not properly formatted gives errors', async () => {
//   const response = new WeatherApiGatewayResponseMock(1, 1, 2, new VariablesWithTimeMock(BigInt(1)))
//   const result = await createWeatherApi([response]).getWeather(new LocationImpl(1, 1))
//   expect(isErr(result)).toBeTruthy()
//   expect(unwrapErr(result)).toBe('Weather response info badly formatted')
// })

// test('all data correct gives success', async () => {
//   const response = new WeatherApiGatewayResponseMock(1, 1, 2, new VariablesWithTimeMock(BigInt(2)))
//   const result = await createWeatherApi([response]).getWeather(new LocationImpl(1, 1))
//   expect(isOk(result)).toBeTruthy()
// })
