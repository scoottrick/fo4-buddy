import { LocationObject } from "../../_shared/data-access/location";

export type MagazineId = number;
export type MagazineIssueId = number;

export type MagazineObject = {
  id: number;
  title: string;
  url: string;
  issues: MagazineIssueObject[];
};

export type MagazineIssueObject = {
  id: number;
  title: string;
  effect: string;
  location: LocationObject;
};
