import { Pipe, PipeTransform } from "@angular/core";
import { getWikiUrl } from "../data-access/wiki";

@Pipe({
  name: "wikiUrl",
  pure: true,
})
export class WikiUrlPipe implements PipeTransform {
  transform(value: string): string {
    return getWikiUrl(value);
  }
}
