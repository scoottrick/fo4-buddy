import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TerminalHackingService {
  private terminalPasswords: string[] = [];
  private terminalPasswordsSubject = new BehaviorSubject(
    this.terminalPasswords
  );

  terminalPasswords$ = this.terminalPasswordsSubject.asObservable();

  calculateLikeness(str1: string, str2: string): number {
    let likeness = 0;
    for (let i = 0; i < str1.length; i++) {
      const char1 = str1.charAt(i).toLowerCase();
      const char2 = str2.charAt(i).toLowerCase();
      if (char1 === char2) {
        likeness++;
      }
    }
    return likeness;
  }
}
