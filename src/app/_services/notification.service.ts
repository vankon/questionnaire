import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class QaNotificationService {
  constructor(
    private notificationsService: ToastrService,
    private snackBar: MatSnackBar
  ) {
  }

  error(message: string) {
    this.notificationsService.error(
      message,
      'Error',
      {
        enableHtml: true
      }
    );
  }

  success(message: string) {
    this.notificationsService.success(
      message,
      'Success',
      {
        enableHtml: true
      }
    );
  }

  successSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center'
    });
  }
}
