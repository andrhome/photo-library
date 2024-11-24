import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	RouterLink,
	RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'pl-header',
  standalone: true,
	imports: [
		MatButtonModule,
		RouterLink,
		RouterLinkActive,
	],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
