import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiService } from './services/ui.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule],
    template: `
    <aside class="sidebar" [class.open]="ui.isSidebarOpen()">
      <!-- Header -->
      <div class="sidebar-header">
        <div class="logo">G</div>
        <span class="logo-text">GlassDash</span>
      </div>

      <!-- Navigation Menu -->
      <ul class="nav-menu">
        <li class="nav-section">
          <span class="nav-section-title">Main Menu</span>
          <ul>
            @for (item of menuItems; track item.path) {
              <li class="nav-item">
                <a 
                  [routerLink]="item.path" 
                  routerLinkActive="active" 
                  [routerLinkActiveOptions]="{exact: item.path === '/'}"
                  (click)="closeOnMobile()"
                  class="nav-link"
                >
                  <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" [innerHTML]="item.icon"></svg>
                  {{ item.title }}
                  @if (item.badge) {
                    <span class="nav-badge">{{ item.badge }}</span>
                  }
                </a>
              </li>
            }
          </ul>
        </li>

        <li class="nav-section">
          <span class="nav-section-title">Account</span>
          <ul>
            <li class="nav-item">
              <a routerLink="/login" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <!-- User Profile Footer -->
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">TM</div>
          <div class="user-info">
            <div class="user-name">TemplateMo</div>
            <div class="user-role">Administrator</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </aside>
  `
})
export class Sidebar {
    public ui = inject(UiService);

    readonly menuItems = [
        {
            title: 'Dashboard',
            path: '/',
            icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>'
        },
        {
            title: 'Analytics',
            path: '/analytics',
            badge: 'New',
            icon: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>'
        },
        {
            title: 'Users',
            path: '/users',
            icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>'
        },
        {
            title: 'Settings',
            path: '/settings',
            icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
        },
        {
            title: 'Admin Billing',
            path: '/admin-billing',
            icon: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />'
        }
    ];

    closeOnMobile() {
        // If user clicks a link on mobile, close the sidebar automatically
        if (window.innerWidth <= 992) {
            this.ui.isSidebarOpen.set(false);
        }
    }
}