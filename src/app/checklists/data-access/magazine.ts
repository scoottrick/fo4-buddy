import { LocationObject } from "../../_shared/data-access/location";

export type MagazineId = number;
export type MagazineIssueId = number;

export interface MagazineObject {
  id: number;
  title: string;
  url: string;
  issues: MagazineIssueObject[];
}

export interface MagazineIssueObject {
  id: number;
  title: string;
  effect: string;
  location: LocationObject;
}
