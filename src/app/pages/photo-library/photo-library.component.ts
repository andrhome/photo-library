import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MediaContentService } from '../../services/media-content.service';
import { Subscription } from 'rxjs';
import { IPhoto } from '../../types/types';
import { PhotosListComponent } from '../../components/photos-list/photos-list.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-photo-library',
  standalone: true,
	imports: [
		MatGridList,
		MatGridTile,
		PhotosListComponent,
		MatProgressSpinner,
	],
  templateUrl: './photo-library.component.html',
  styleUrl: './photo-library.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoLibraryComponent implements OnInit, OnDestroy {
	public photos: IPhoto[] = [];
	public isLoadingPhoto = false;

	private pageNumber = 1;
	private itemsPerPage = 9;
	private skipItems = 0;
	private isNoPhotosToLoad = false;
	private subscriptions: Subscription[] = [];

	constructor(
		private mediaService: MediaContentService,
		private cdr: ChangeDetectorRef,
	) {
	}
	
	public ngOnInit() {
		this.fetchPhotos();
	}
	
	public ngOnDestroy() {
		this.unsubscribeFromAllSubscriptions();
	}
	
	public onPhotosListScroll(event: Event): void {
		const target = event.target as HTMLInputElement;
		const end = target.offsetHeight + target.scrollTop >= target.scrollHeight;
		if (end && !this.isNoPhotosToLoad) {
			this.fetchPhotos();
		}
	}
	
	private fetchPhotos(): void {
		this.isLoadingPhoto = true;
		this.subscriptions.push(
			this.mediaService.getPhotosList(
				this.pageNumber,
				this.itemsPerPage,
				this.skipItems,
			).subscribe((photos: IPhoto[]) => {
				if (!photos.length) {
					this.isNoPhotosToLoad = true;
				}

				this.updateExistingPhotos(photos);
				this.isLoadingPhoto = false;
				this.skipItems = this.pageNumber * this.itemsPerPage;
				this.pageNumber += 1;
				this.cdr.detectChanges();
			}),
		);
	}
	
	private updateExistingPhotos(photos: IPhoto[]): void {
		const existingPhotos = [...this.photos];
		existingPhotos.push(...photos);
		// Redeclare local "photos" property to trigger
		// the Change Detection mechanism for
		// the child "app-photos-list" component
		this.photos = existingPhotos;
	}
	
	private unsubscribeFromAllSubscriptions(): void {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
}
