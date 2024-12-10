import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
	{
		path: '',
		redirectTo: 'photo-library',
		pathMatch: 'full',
	},
	{
		path: 'photo-library',
		loadComponent: () =>
			import('./pages/photo-library/photo-library.component')
				.then(m => m.PhotoLibraryComponent)
	},
	{
		path: 'favourite-photos',
		loadChildren: () =>
			import('./pages/favourite-photos/routes/favourite-photos.routes')
				.then(m => m.FAVOURITE_PHOTOS_ROUTES)
	},
	{
		path: '**',
		redirectTo: 'photo-library'
	}
];
