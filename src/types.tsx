export interface BaseUser {
  firstName?: string
  lastName?: string
  email: string
  password: string
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