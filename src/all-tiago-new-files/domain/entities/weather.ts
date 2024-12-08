import { TemperatureImpl, type Temperature } from '../value-objects/temperature'
import { LocationImpl, type Location } from './location'
import type { Result } from 'option-t/plain_result/result'
import { isErr, unwrapOk, unwrapErr, createErr, createOk } from 'option-t/plain_result'
import type { WeatherApi } from '../../apis/weather-api'

export interface Weather {
  getLocation(): Location
  getTemperatures(): Temperature[]
}

export class WeatherImpl implements Weather {

  private location: Location
  public getLocation = () => this.location

  private temperatures: Temperature[]
  public getTemperatures = () => this.temperatures

  private constructor(location: Location, temperatures: Temperature[]) {
    this.location = location
    this.temperatures = temperatures
  }

  public static async createWeather(location: Location, weatherApi: WeatherApi): Promise<Result<Weather, string>> {

    const apiSingleResponse = await weatherApi.getWeatherApiSingleResponse(location.getLatitude(), location.getLongitude())

    if (isErr(apiSingleResponse))
      return createErr(`Could not get API response to create weather due to the following error: ${unwrapErr(apiSingleResponse)}`)

    const response = unwrapOk(apiSingleResponse)
    const dates = response.getDates()
    const temperatures = response.getTemperatures()

    if (dates.length != temperatures.length)
      return createErr('Weather API response info badly formatted')

    const responseLocation = LocationImpl.createLocation(response.getLatitude(), response.getLongitude());
    
    if (isErr(responseLocation))
      return createErr(`Could not process API response location: ${unwrapErr(responseLocation)}`)

    return createOk(
      new WeatherImpl(
        unwrapOk(responseLocation),
        dates.map((date, index) => new TemperatureImpl({ date: date, value: temperatures[index] }))
      )
    )

  }
}
