import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IPhoto } from '../../types/types';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import { AvailableStorageKeys } from '../../types/enums';
import { findItemById } from '../../common/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-photo',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './single-photo.component.html',
  styleUrl: './single-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SinglePhotoComponent implements OnInit, OnDestroy {
  public photo: IPhoto | undefined;

  private snackBar = inject(MatSnackBar);
  private subscriptions: Subscription[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private webStorage: WebStorageService,
    private router: Router,
  ) {
  }
  
  public ngOnInit(): void {
    this.setCurrentPhoto();
  }
  
  public ngOnDestroy(): void {
    this.unsubscribeAll();
  }
  
  public removeFromFavourite(photoId: string): void {
    const existingFavoritePhotos: IPhoto[] = this.webStorage.getItems(
      AvailableStorageKeys.FavoritePhotos,
    );
    const filteredPhotos = existingFavoritePhotos.filter(
      photo => photo.id !== photoId,
    );
    
    this.webStorage.setItems(
      AvailableStorageKeys.FavoritePhotos,
      filteredPhotos,
    );
    
    this.showSnackBar();
  }
  
  private setCurrentPhoto(): void {
    const photoId = this.route.snapshot.params['id'];
    if (!photoId) return;
    
    const favouritePhotos: IPhoto[] = this.webStorage.getItems(AvailableStorageKeys.FavoritePhotos);
    this.photo = findItemById<IPhoto>(favouritePhotos, photoId);
    
    if (!this.photo) this.redirectToFavouritesList();
  }
  
  private showSnackBar(): void {
    const action = 'Ok';
    const message = 'Photo was removed from favourites!';
    const snackBarRef = this.snackBar.open(message, action);
    this.subscriptions.push(
      snackBarRef.afterDismissed().subscribe(() => {
        this.redirectToFavouritesList();
      }),
    );
  }
  
  private redirectToFavouritesList(): void {
    this.router.navigate(['/favourite-photos']);
  }
  
  private unsubscribeAll(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
