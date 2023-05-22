import { LocationObject } from "../../_shared/data-access/location";

export interface BobbleheadObject {
  id: number;
  name: string;
  url: string;
  location: LocationObject;
}
