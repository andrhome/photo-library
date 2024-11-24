import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component, inject,
	OnDestroy,
	OnInit,
} from '@angular/core';
import {
	MatGridList,
	MatGridTile,
} from '@angular/material/grid-list';
import { MediaContentService } from '../../services/media-content/media-content.service';
import { Subscription } from 'rxjs';
import { IPhoto } from '../../types/types';
import { PhotosListComponent } from '../../components/photos-list/photos-list.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { AvailableStorageKeys } from '../../types/enums';
import { findItemById } from '../../common/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Time of displaying a snackbar block */
const SNACK_BAR_DURATION = 1000;

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

	private snackBar = inject(MatSnackBar);
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
		this.unsubscribeAll();
	}
	
	public onPhotosListScroll(event: Event): void {
		const target = event.target as HTMLInputElement;
		const end = target.offsetHeight + target.scrollTop >= target.scrollHeight;
		if (end && !this.isNoPhotosToLoad) {
			this.fetchPhotos();
		}
	}
	
	public addToFavourite(photoId: string): void {
		const photoToAdd = findItemById<IPhoto>(this.photos, photoId);
		if (!photoToAdd) return;
		
		const existingFavoritePhotos: IPhoto[] = this.webStorage.getItems(
			AvailableStorageKeys.FavoritePhotos,
		);
		const photoAlreadyAdded = findItemById<IPhoto>(existingFavoritePhotos, photoToAdd.id);
		if (photoAlreadyAdded) {
			const photoAlreadyAddedMsg = 'Already in favourites.';
			this.showSnackBar(photoAlreadyAddedMsg);
			return;
		}
		
		existingFavoritePhotos.push(photoToAdd);

		this.webStorage.setItems(
			AvailableStorageKeys.FavoritePhotos,
			existingFavoritePhotos,
		);
		const addedPhotoMsg = 'Photo was added to favourites!';
		this.showSnackBar(addedPhotoMsg);
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
	
	private showSnackBar(message: string): void {
		const action = 'Ok';
		this.snackBar.open(message, action, {
			duration: SNACK_BAR_DURATION,
		});
	}
	
	private unsubscribeAll(): void {
		this.subscriptions.forEach(s => s.unsubscribe());
	}
}
