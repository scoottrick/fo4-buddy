import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CollectionStorageService } from "src/app/_shared/data-access/collection-storage.service";
import { MagazineId, MagazineIssueId, MagazineObject } from "./magazine";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MagazinesService {
  private http = inject(HttpClient);
  private storageService = inject(CollectionStorageService);

  private collectedIssues = new Map<MagazineId, Set<MagazineIssueId>>();
  private magazineList: MagazineObject[] = [];

  private collectedIssuesSubject = new BehaviorSubject(this.collectedIssues);
  private magazineSubject = new BehaviorSubject(this.magazineList);

  public magazines$ = this.magazineSubject.asObservable();
  public magazineCollection$ = this.collectedIssuesSubject.asObservable();

  public fetchData() {
    const collectedIssues = this.storageService.loadCollections().magazines;
    this.collectedIssues = collectedIssues;
    this.collectedIssuesSubject.next(collectedIssues);

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
    this.storageService.updateMagazines(this.collectedIssues);
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
      this.storageService.updateMagazines(this.collectedIssues);
    }
  }
}
