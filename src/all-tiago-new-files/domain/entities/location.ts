import { createErr, createOk, type Result } from 'option-t/plain_result/result'

export interface Location {
  getLatitude(): number
  getLongitude(): number
}

export class LocationImpl implements Location {
  private latitude: number
  public getLatitude = () => this.latitude

  private longitude: number
  public getLongitude = () => this.longitude

  private constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }

  public static createLocation(latitude: number, longitude: number): Result<Location, string> {
    return Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180
      ? createOk(new LocationImpl(latitude, longitude))
      : createErr('Wrong coordinates provided')
  }
}
