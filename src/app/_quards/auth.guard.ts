import { AlmondNotificationService } from '@almond-platform/utility';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestoriaUserService } from 'src/app/_services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: RestoriaUserService,
    private notificationService: AlmondNotificationService
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      if (!route.data.isManager && !route.data.isAdmin) {
        return true;
      }

      if (route.data.isManager && currentUser.management?.isManager && currentUser.management?.restaurantId) {
        return true;
      }

      if (route.data.isAdmin && currentUser.isAdmin) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    }

    this.router.navigate(['account'], { queryParams: { returnUrl: state.url } });
    return false;

  }

}
