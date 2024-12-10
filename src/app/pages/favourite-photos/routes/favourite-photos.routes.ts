import { Routes } from '@angular/router';
import { FavouritePhotosComponent } from '../favourite-photos.component';
import { SinglePhotoComponent } from '../../single-photo/single-photo.component';

export const FAVOURITE_PHOTOS_ROUTES: Routes = [
	{
		path: '',
		component: FavouritePhotosComponent,
	},
	{
		path: ':id',
		component: SinglePhotoComponent,
	},
];
