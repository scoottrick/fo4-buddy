import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  map,
  startWith,
} from "rxjs";
import { HackingAttempt } from "./hacking-attempt";

@Injectable({
  providedIn: "root",
})
export class TerminalHackingService {
  private passwordList: string[] = [];
  private hackingAttempts: HackingAttempt[] = [];

  private passwordListSubject = new BehaviorSubject(this.passwordList);
  private hackingAttemptsSubject = new BehaviorSubject(this.hackingAttempts);

  terminalPasswords$ = this.passwordListSubject.asObservable();
  hackingAttempts$ = this.hackingAttemptsSubject.asObservable();

  validPasswordOptions$ = combineLatest({
    passwords: this.terminalPasswords$,
    attempts: this.hackingAttempts$,
  }).pipe(
    map(({ passwords, attempts }) =>
      this.getValidPasswordsFromGuesses(passwords, attempts)
    )
  );

  init() {
    this.setPasswords([]);
    this.setAttempts([]);
    this.setPasswords(getSamplePasswords());
  }

  addNewPasswords(words: string[]) {
    this.setPasswords([...this.passwordList, ...words]);
  }

  private setPasswords(words: string[]) {
    this.passwordList = words;
    this.passwordListSubject.next(words);
  }

  private setAttempts(attempts: HackingAttempt[]) {
    this.hackingAttempts = attempts;
    this.hackingAttemptsSubject.next(attempts);
  }

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

  getValidPasswordsFromGuesses(
    passwords: string[],
    attempts: HackingAttempt[]
  ) {
    return passwords.filter((password) => {
      const isValidPassword = attempts.every((attempt) => {
        const comparedLikeness = this.calculateLikeness(attempt.word, password);
        return comparedLikeness === attempt.likeness;
      });
      return isValidPassword;
    });
  }
}

function getSamplePasswords() {
  return [
    "takes",
    "known",
    "kicks",
    "stark",
    "boots",
    "baton",
    "clear",
    "crime",
    "waste",
    "close",
    "sword",
    "slave",
    "fargo",
    "maybe",
    "males",
  ];
}
