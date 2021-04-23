export interface BaseUser {
  email: string
  password: string
  lastName?: string
  firstName?: string
  // userId: number
}

export interface FlightsState {
   airline: string
   flightNumber: number
   originAirport: string
   destAirport: string
   flightMiles: number
   // flightTime: string
   flightTime: string
   // international: boolean
   // date: Date
   // setDate: (e: any) => void;
 }

 export type FlightsInfo = FlightsState[]