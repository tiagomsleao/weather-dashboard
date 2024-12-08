import { fetchWeatherApi } from 'openmeteo'

export interface WeatherApiGatewayResponse {
  utcOffsetSeconds(): number
  latitude(): number
  longitude(): number
  hourly(obj?: VariablesWithTime): VariablesWithTime | null
}

export interface VariableWithValues {
  valuesArray(): Float32Array | null
}

export interface VariablesWithTime {
  time(): bigint
  timeEnd(): bigint
  interval(): number
  variables(index: number, obj?: VariableWithValues): VariableWithValues | null
}

export interface WeatherApiGateway {
  fetchWeatherData(params: any): Promise<WeatherApiGatewayResponse[]>
}

export class WeatherApiGatewayImpl implements WeatherApiGateway {
  // In some big project I would put this url in some config file, so that it could be easily changed (for example, if we had test/uat/live environments, with different urls each)
  private readonly url: string = 'https://api.open-meteo.com/v1/forecast'

  fetchWeatherData = async (params: any) => await fetchWeatherApi(this.url, params)
}
