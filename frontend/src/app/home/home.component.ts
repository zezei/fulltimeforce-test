import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Commit, GithubService } from './data-access/github.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header [translucent]="true" class="ion-no-border">
      <ion-toolbar class="ion-no-border">
        <ion-avatar slot="start">
          <img src="/assets/fulltimeforcelogo.png" />
        </ion-avatar>
        <ion-title class="ion-text-center">Testing APP </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="loadCommits()" color="primary">
            <ion-icon name="refresh-outline"></ion-icon>
            Refresh
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="ion-padding">
      <ion-row>
        <ion-col
          size="12"
          size-sm="8"
          offset-sm="2"
          size-md="6"
          offset-md="3"
          size-lg="6"
          offset-lg="3"
        >
          <div class="bg-img">
            <img src="/assets/github-commits.jpg" />
          </div>
        </ion-col>
        <ion-col
          size="12"
          size-sm="8"
          offset-sm="2"
          size-md="6"
          offset-md="3"
          size-lg="6"
          offset-lg="3"
        >
          <ng-container *ngIf="vm$ | async as vm">
            <ion-row>
              <ion-col size="12">
                <h2>Lists of commits</h2>
                <small
                  >Commits of https://github.com/zezei/fulltimeforce-test
                  repository. Click on one to see more details.</small
                >
              </ion-col>
            </ion-row>
            <ion-list *ngIf="vm.isLoading">
              <ion-item *ngFor="let i of [1, 2, 3, 4, 5, 6, 7]">
                <ion-label>
                  <ion-skeleton-text
                    animated
                    style="width: 100"
                  ></ion-skeleton-text>
                  <p>
                    <ion-skeleton-text
                      animated
                      style="width: 50%"
                    ></ion-skeleton-text></p
                ></ion-label>
              </ion-item>
            </ion-list>
            <ion-list
              *ngIf="vm.commits.length && !vm.isLoading; else triggerRefresh"
            >
              <ion-item
                *ngFor="let commit of vm.commits"
                class="ion-margin"
                button
                (click)="openCommit(commit.id)"
              >
                <ion-label text-wrap
                  >{{ commit.message }}
                  <p>{{ commit.date | date : 'dd/MM/YYYY HH:MM' }}</p>
                </ion-label>
              </ion-item>
            </ion-list>
            <ng-template #triggerRefresh>
              <ion-item *ngIf="!vm.isLoading" lines="none">
                <ion-label text-wrap class="ion-text-center"
                  >To obtain the commits please click on the refresh button
                  <ion-icon name="refresh-outline"></ion-icon
                ></ion-label>
              </ion-item>
            </ng-template>
          </ng-container>
        </ion-col>
      </ion-row>
    </ion-content>
  `,
  styles: [
    `
      h2 {
        font-family: 'Mona Sans';
      }
      ion-item::part(native) {
        height: 90px;
      }

      .bg-img {
        display: flex;
        width: 100%;
        justify-content: center;
        img {
          max-width: 300px !important;
          border-radius: 25px;
        }
        @media (min-width: 576px) {
          margin-top: 10px;
          /* height: 200px !important; */
        }

      }
    `,
  ],
})
export class HomeComponent {
  /*
  If the application grows in size, 
  the ideal would be to create dumb components to 
  display information only and smart components for the logic
*/

  githubCommits$: Observable<Commit[]> = this.githubService.getCommits();

  vm$ = combineLatest([
    this.githubService.getCommits().pipe(startWith([])),
    this.githubService.getLoadingStatus().pipe(startWith(false)),
  ]).pipe(map(([commits, isLoading]) => ({ commits, isLoading })));
  constructor(private githubService: GithubService) {}

  loadCommits() {
    this.githubService.refresh();
  }

  openCommit(id: string) {
    //In case of building as Mobile APP (android or ios), capacitor plugins should be used
    window.open(
      `https://github.com/zezei/fulltimeforce-test/commit/${id}`,
      '_blank'
    );
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  declarations: [HomeComponent],
  exports: [RouterModule],
})
export class HomeComponentModule {}
