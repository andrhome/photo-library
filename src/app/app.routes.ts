import { Routes } from '@angular/router';
import { PhotoLibraryComponent } from './pages/photo-library/photo-library.component';
import { FavouritePhotosComponent } from './pages/favourite-photos/favourite-photos.component';
import { SinglePhotoComponent } from './pages/single-photo/single-photo.component';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/photo-library',
		pathMatch: 'full',
	},
	{
		path: 'photo-library',
		component: PhotoLibraryComponent,
	},
	{
		path: 'favourite-photos',
		component: FavouritePhotosComponent,
	},
	{
		path: 'favourite-photos/:id',
		component: SinglePhotoComponent,
	},
];
