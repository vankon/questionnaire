import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'qa-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ManagementComponent implements OnInit, OnDestroy {
  public sidenavOpen: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {

  }

  public onToggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
