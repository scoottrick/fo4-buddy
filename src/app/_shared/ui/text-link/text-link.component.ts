import { Component, Input } from "@angular/core";

@Component({
  selector: "fo-text-link",
  templateUrl: "./text-link.component.html",
  styles: [
    `
      .link-container {
        margin-left: -8px;
        margin-right: -8px;
      }

      .link-container > a {
        height: auto;
      }
    `,
  ],
})
export class TextLinkComponent {
  @Input() href?: string;
  @Input() text?: string;
  @Input() color: string = "accent";
  @Input() target: string = "_blank";
}
