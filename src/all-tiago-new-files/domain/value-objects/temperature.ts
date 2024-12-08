import { ValueObject } from './valueObject'

export interface TemperatureProps {
  date: Date
  value: number
}

export interface Temperature {
  getDate(): Date
  getValue(): number
}

export class TemperatureImpl extends ValueObject<TemperatureProps> implements Temperature {
  public getDate = () => this.props.date
  public getValue = () => this.props.value

  constructor(props: TemperatureProps) {
    super(props)
  }
}
