import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { TextLinkComponent } from "./ui/text-link/text-link.component";

@NgModule({
  declarations: [TextLinkComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [TextLinkComponent],
})
export class SharedModule {}
