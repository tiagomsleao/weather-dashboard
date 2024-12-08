import { WeatherApiSingleResponseImpl, type WeatherApiSingleResponse } from '../domain/entities/weather-api-single-response'
import type { WeatherApiGateway } from './weather-api-gateway'
import { type Result } from 'option-t/plain_result'

export interface WeatherApi {
  getWeatherApiSingleResponse(latitude: number, longitude: number): Promise<Result<WeatherApiSingleResponse, string>>
}

export class WeatherApiImpl implements WeatherApi {
  private weatherApiGateway: WeatherApiGateway

  constructor(weatherApiGateway: WeatherApiGateway) {
    this.weatherApiGateway = weatherApiGateway
  }

  public async getWeatherApiSingleResponse(latitude: number, longitude: number) {
    return await WeatherApiSingleResponseImpl.getWeatherApiSingleResponse(latitude, longitude, this.weatherApiGateway);
  }
}
