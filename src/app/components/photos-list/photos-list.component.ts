import {
  ChangeDetectionStrategy,
  Component,
  Input,
  output,
} from '@angular/core';
import { IPhoto } from '../../types/types';
import {
  MatGridList,
  MatGridTile,
} from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photos-list',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatProgressSpinnerModule,
  ],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosListComponent {
  @Input() photosList: IPhoto[] = [];
  @Input() isLoading: boolean = false;

  public onScroll = output<Event>();
  public onClick = output<string>();
  
  public onListScroll($event: Event): void {
    this.onScroll.emit($event);
  }
  
  public onItemClick(photo: IPhoto): void {
    this.onClick.emit(photo.id);
  }
}
