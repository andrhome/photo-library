import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MediaContentService } from '../../services/media-content/media-content.service';
import { Subscription } from 'rxjs';
import { IPhoto } from '../../types/types';
import { PhotosListComponent } from '../../components/photos-list/photos-list.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { AvailableStorageKeys } from '../../types/enums';

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
	public isLoadingPhotos = false;

	private pageNumber = 1;
	private itemsPerPage = 9;
	private skipItems = 0;
	private isNoPhotosToLoad = false;
	private subscriptions: Subscription[] = [];

	constructor(
		private mediaService: MediaContentService,
		private webStorage: WebStorageService,
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
	
	public addToFavourite(photoId: string): void {
		const photoToAdd = this.photos.find(photo => photo.id === photoId);
		
		if (!photoToAdd) return;
		
		const existingFavoritePhotos: IPhoto[] = this.webStorage.getItems(
			AvailableStorageKeys.FavoritePhotos,
		);
		const photoAlreadyAdded = existingFavoritePhotos.find(
			photo => photo.id === photoToAdd.id,
		);
		
		if (photoAlreadyAdded) return;
		
		existingFavoritePhotos.push(photoToAdd);

		this.webStorage.setItems(
			AvailableStorageKeys.FavoritePhotos,
			existingFavoritePhotos,
		);
	}
	
	private fetchPhotos(): void {
		this.isLoadingPhotos = true;
		this.subscriptions.push(
			this.mediaService.getPhotosList(
				this.pageNumber,
				this.itemsPerPage,
				this.skipItems,
			).subscribe((photos: IPhoto[]) => {
				this.updateExistingPhotos(photos);
				this.isNoPhotosToLoad = !photos.length;
				this.isLoadingPhotos = false;
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
