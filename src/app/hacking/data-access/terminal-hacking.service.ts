import { Injectable } from "@angular/core";
import { HackingAttempt } from "./hacking-attempt";

@Injectable({
  providedIn: "root",
})
export class TerminalHackingService {
  filterUniquePasswords(oldWords: string[], newWords: string[]) {
    const uniqueNewWords = newWords.filter((w) => !oldWords.includes(w));
    return [...oldWords, ...uniqueNewWords];
  }

  filterAvailablePasswords(passwords: string[], attempts: HackingAttempt[]) {
    return passwords.filter((password) => {
      const isValidPassword = attempts.every((attempt) => {
        const comparedLikeness = this.calculateLikeness(attempt.word, password);
        return comparedLikeness === attempt.likeness;
      });
      return isValidPassword;
    });
  }

  private calculateLikeness(str1: string, str2: string): number {
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
