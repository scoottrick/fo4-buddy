import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, combineLatest, map, startWith } from "rxjs";
import { HackingAttempt } from "./hacking-attempt";

@Injectable({
  providedIn: "root",
})
export class TerminalHackingService {
  private passwordList: string[] = [];
  private hackingAttempts: HackingAttempt[] = [];
  private currentAttempt?: HackingAttempt = undefined;

  private passwordListSubject = new BehaviorSubject(this.passwordList);
  private hackingAttemptsSubject = new BehaviorSubject(this.hackingAttempts);
  private currentAttemptSubject = new Subject<HackingAttempt>();

  terminalPasswords$ = this.passwordListSubject.asObservable();
  previousAttempts$ = this.hackingAttemptsSubject.asObservable();
  currentAttempt$ = this.currentAttemptSubject
    .asObservable()
    .pipe(startWith(undefined));

  validPasswordOptions$ = combineLatest({
    passwords: this.terminalPasswords$,
    attempts: this.previousAttempts$,
  }).pipe(
    map(({ passwords, attempts }) =>
      this.getValidPasswordsFromGuesses(passwords, attempts)
    )
  );

  init() {
    this.setPasswords([]);
    this.setAttempts([]);
  }

  addNewPasswords(words: string[]) {
    this.setPasswords([...this.passwordList, ...words]);
    if (this.currentAttempt || this.passwordList.length < 1) {
      return;
    }
    const word = this.passwordList[0];
    const likeness = 0;
    this.setCurrentAttempt({ word, likeness });
  }

  private setPasswords(words: string[]) {
    this.passwordList = words;
    this.passwordListSubject.next(words);
  }

  private setAttempts(attempts: HackingAttempt[]) {
    this.hackingAttempts = attempts;
    this.hackingAttemptsSubject.next(attempts);
  }

  private setCurrentAttempt(attempt: HackingAttempt) {
    this.currentAttempt = attempt;
    this.currentAttemptSubject.next(this.currentAttempt);
  }

  setAttemptWord(word: string) {
    this.setCurrentAttempt({ word, likeness: 0 });
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
