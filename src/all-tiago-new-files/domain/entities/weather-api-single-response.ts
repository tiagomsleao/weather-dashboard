import type { WeatherApiGateway } from "../../apis/weather-api-gateway"
import { createErr, createOk, type Result } from "option-t/plain_result/result"

export interface WeatherApiSingleResponse {
  getLatitude(): number
  getLongitude(): number
  getDates(): Date[]
  getTemperatures(): Float32Array
}

export class WeatherApiSingleResponseImpl implements WeatherApiSingleResponse {
  private latitude: number
  public getLatitude = () => this.latitude

  private longitude: number
  public getLongitude = () => this.longitude

  private dates: Date[]
  public getDates = () => this.dates

  private temperatures: Float32Array
  public getTemperatures = () => this.temperatures

  private constructor(latitude: number, longitude: number, dates: Date[], temperatures: Float32Array) {
    this.latitude = latitude
    this.longitude = longitude
    this.dates = dates
    this.temperatures = temperatures
  }

  public static async getWeatherApiSingleResponse(latitude: number, longitude: number, weatherApiGateway: WeatherApiGateway): Promise<Result<WeatherApiSingleResponse, string>> {
    
    const gatewayResponses = await weatherApiGateway.fetchWeatherData({
      latitude: latitude,
      longitude: longitude,
      hourly: 'temperature_2m'
    })

    if (gatewayResponses == null || gatewayResponses.length != 1)
      return createErr('Unexpected error retrieving weather information')

    const response = gatewayResponses[0]
    const hourly = response.hourly()

    if (!hourly)
        return createErr('Could not parse weather response info')

    const utcOffsetSeconds = response.utcOffsetSeconds()

    return createOk(
      new WeatherApiSingleResponseImpl(
        response.latitude(),
        response.longitude(),
        this.range(Number(hourly!.time()), Number(hourly!.timeEnd()), hourly!.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        hourly!.variables(0)!.valuesArray()!
      )
    )
      
  }

  private static range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)
}
