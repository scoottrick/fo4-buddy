import { LocationObject } from "../../_shared/data-access/location";

export type BobbleheadId = number;

export interface BobbleheadObject {
  id: number;
  name: string;
  url: string;
  image: string;
  location: LocationObject;
  effect: string;
}
