import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favourite-photos',
  standalone: true,
  imports: [],
  templateUrl: './favourite-photos.component.html',
  styleUrl: './favourite-photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritePhotosComponent {

}
