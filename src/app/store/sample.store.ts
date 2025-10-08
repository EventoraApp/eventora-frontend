// imports
export interface sampleStateInterface {
  something: string
}


const initialstate = {
    something: "Angular is boring"
}

import { signalStore, withState } from "@ngrx/signals";

export const sampleState = signalStore(withState(initialstate))