import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  map,
  startWith,
} from "rxjs";
import { TerminalGuess } from "./terminal-guess";

@Injectable({
  providedIn: "root",
})
export class TerminalHackingService {
  private passwordList: string[] = [];
  private passwordAttempts: TerminalGuess[] = [];

  private passwordListSubject = new BehaviorSubject(this.passwordList);
  private passwordAttemptsSubject = new BehaviorSubject(this.passwordAttempts);

  terminalPasswords$ = this.passwordListSubject.asObservable();
  passwordAttempts$ = this.passwordAttemptsSubject.asObservable();

  getValidPasswordOptions() {
    combineLatest({
      passwords: this.terminalPasswords$,
      attempts: this.passwordAttempts$,
    }).pipe(
      map(({ passwords, attempts }) =>
        this.getValidPasswordsFromGuesses(passwords, attempts)
      )
    );
  }

  getPossibleOptions(previousGuesses: TerminalGuess[]) {
    return this.terminalPasswords$.pipe(
      map((passwordList) => {
        return this.getValidPasswordsFromGuesses(passwordList, previousGuesses);
      })
    );
  }

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

  private setAttempts(attempts: TerminalGuess[]) {
    this.passwordAttempts = attempts;
    this.passwordAttemptsSubject.next(attempts);
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

  getValidPasswordsFromGuesses(passwords: string[], guesses: TerminalGuess[]) {
    return passwords.filter((password) => {
      const isValidPassword = guesses.every((guess) => {
        const comparedLikeness = this.calculateLikeness(guess.word, password);
        return comparedLikeness === guess.likeness;
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
