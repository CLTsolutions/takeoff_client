export interface BaseUser {
  email: string
  password: string
  lastName?: string
  firstName?: string
}

export interface FlightsState {
  airline: string
  flightNumber: number
  originAirport: string
  destAirport: string
  flightMiles: number
  flightTime: string
  international: boolean
}

export type FlightsInfo = FlightsState[]
