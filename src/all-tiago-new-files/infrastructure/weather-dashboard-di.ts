import { WeatherApiImpl, type WeatherApi } from '../apis/weather-api'
import { WeatherApiGatewayImpl, type WeatherApiGateway } from '../apis/weather-api-gateway'

// In a big project I could set up DI using some fancy framework :)

export const weatherApiGateway: WeatherApiGateway = new WeatherApiGatewayImpl()

export const weatherApi: WeatherApi = new WeatherApiImpl(weatherApiGateway)
