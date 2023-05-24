import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { MagazineId, MagazineIssueId, MagazineObject } from "./magazine";

@Injectable({
  providedIn: "root",
})
export class MagazineService {
  private http = inject(HttpClient);

  private collectedIssues = new Map<MagazineId, Set<MagazineIssueId>>();
  private magazineList: MagazineObject[] = [];

  private collectedIssuesSubject = new BehaviorSubject(this.collectedIssues);
  private magazineSubject = new BehaviorSubject(this.magazineList);

  public magazines$ = this.magazineSubject.asObservable();
  public magazineCollection$ = this.collectedIssuesSubject.asObservable();

  public fetchData() {
    const dataUrl = "assets/data/magazines.json";
    const request$ = this.http.get<MagazineObject[]>(dataUrl);
    request$.subscribe((magazineData) => {
      this.updateMagazineList(magazineData);
    });
  }

  public toggleIssueFromCollection(
    magazineId: MagazineId,
    issueId: MagazineIssueId
  ) {
    const issuesFromMagazine = this.collectedIssues.get(magazineId);
    if (!issuesFromMagazine) {
      return;
    }
    const isCollected = issuesFromMagazine.has(issueId);
    if (isCollected) {
      issuesFromMagazine.delete(issueId);
    } else {
      issuesFromMagazine.add(issueId);
    }
    this.collectedIssues.set(magazineId, issuesFromMagazine);
    this.collectedIssuesSubject.next(this.collectedIssues);
  }

  public getIssuesCollectedForMagazine(
    magazineId: MagazineId
  ): Observable<MagazineIssueId[]> {
    return this.magazineCollection$.pipe(
      map((magazineCollection) => {
        const collectedIssues = magazineCollection?.get(magazineId);
        return Array.from(collectedIssues || []);
      })
    );
  }

  private updateMagazineList(newList: MagazineObject[]) {
    this.magazineList = newList;
    this.magazineSubject.next(newList);
    let hasUpdated = false;
    newList.forEach((newMagazine) => {
      if (this.collectedIssues.has(newMagazine.id)) {
        return;
      }
      this.collectedIssues.set(newMagazine.id, new Set());
      hasUpdated = true;
    });
    if (hasUpdated) {
      this.collectedIssuesSubject.next(this.collectedIssues);
    }
  }
}
