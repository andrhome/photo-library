import { Component, Input, output, Output } from '@angular/core';
import { IPhoto } from '../../types/types';
import {
  MatGridList,
  MatGridTile,
} from '@angular/material/grid-list';
import { NgForOf, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photos-list',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatProgressSpinnerModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent {
  @Input() photosList: IPhoto[] = [];
  public onScroll = output<Event>();
  
  public onListScroll($event: Event): void {
    this.onScroll.emit($event);
  }
}
