import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
} from '@angular/core';
import { PhotosListComponent } from '../../components/photos-list/photos-list.component';
import { IPhoto } from '../../types/types';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { AvailableStorageKeys } from '../../types/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite-photos',
  standalone: true,
	imports: [
		PhotosListComponent,
	],
  templateUrl: './favourite-photos.component.html',
  styleUrl: './favourite-photos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritePhotosComponent implements OnInit {
	public favouritePhotos: IPhoto[] = [];
	public isLoadingPhotos = false;
	
	constructor(
		private webStorage: WebStorageService,
		private router: Router,
	) {
	}
	
	public ngOnInit() {
		this.fetchPhotos();
	}
	
	public openPhotoOnClick(photoId: string): void {
		if (!photoId) return;
		this.router.navigate([`/favourite-photos/${photoId}`]);
	}
	
	private fetchPhotos(): void {
		this.isLoadingPhotos = true;
		this.favouritePhotos = this.webStorage.getItems(
			AvailableStorageKeys.FavoritePhotos,
		);
	}
}
