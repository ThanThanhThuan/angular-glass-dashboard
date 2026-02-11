import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, TiltDirective, SafeHtmlPipe, RouterLink],
    template: `
    <div class="page-header" style="margin-bottom: 30px;">
      <h1 class="page-title">User Management</h1>
      <div class="page-breadcrumb">
        <a routerLink="/">Dashboard</a>
        <span>/</span>
        <span>Users</span>
      </div>
    </div>

    <!-- 1. User Specific Stats -->
  
<section class="stats-grid">
  @for (stat of data.userStats; track stat.id) {
    <div class="glass-card glass-card-3d" [appTilt]="true">
      <div class="stat-card-inner">
        <div class="stat-info">
          <h3>{{ stat.label }}</h3>
          <div class="stat-value">{{ stat.value }}</div>
          <span class="stat-change" [ngClass]="stat.changeType">
            <!-- Dynamic arrow icon based on changeType -->
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              @if (stat.changeType === 'positive') {
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
              } @else {
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
              }
            </svg>
            {{ stat.change }}
          </span>
        </div>
        <div class="stat-icon" [ngClass]="stat.iconColor">
          <svg 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
            stroke-linecap="round" stroke-linejoin="round"
            [innerHTML]="stat.icon | safeHtml"
          ></svg>
        </div>
      </div>
    </div>
  }
</section>

    <!-- 2. Main Users Table -->
    <section class="content-grid" style="grid-template-columns: 1fr;">
      <div class="glass-card table-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">All Users</h2>
            <p class="card-subtitle">Manage permissions and status</p>
          </div>
          <button class="card-btn">Add User</button>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of data.recentTransactions; track user.id) {
                <tr>
                  <td>
                    <div class="table-user">
                      <div class="table-avatar" [style.background]="user.color">{{ user.avatar }}</div>
                      <div class="table-user-info">
                        <span class="table-user-name">{{ user.customer }}</span>
                      </div>
                    </div>
                  </td>
                  <td>Editor</td>
                  <td>
                    <span class="status-badge" [ngClass]="user.statusClass">
                      {{ user.status }}
                    </span>
                  </td>
                  <td>Jan 15, 2024</td>
                  <td>
                    <div style="display: flex; gap: 8px;">
                      <button class="card-btn" style="padding: 6px 12px;">Edit</button>
                      <button class="card-btn" style="padding: 6px 12px; color: var(--coral);">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .table-user-name { display: block; font-weight: 500; color: var(--text-primary); }
    .stat-icon svg { width: 26px; height: 26px; }
  `]
})
export class UsersComponent {
    public data = inject(DataService);
}