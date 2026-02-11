import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Sidebar],
  // You can keep providers here if providedIn: 'root' isn't working, 
  // but usually, it's not needed for global services.
  providers: [UiService],
  template: `
    <div class="dashboard">
      <!-- 1. Sidebar -->
      <!-- <aside class="sidebar" [class.open]="ui.isSidebarOpen()">
        <div class="sidebar-header">
          <div class="logo">G</div>
          <span class="logo-text">GlassDash</span>
        </div>
     
      </aside> -->
 <app-sidebar></app-sidebar>
      <!-- 2. Main Content -->
      <main class="main-content">
        <nav class="navbar">
          <button class="nav-btn" (click)="ui.toggleSidebar()">☰</button>
          <h1 class="page-title">Dashboard</h1>
          <button class="nav-btn" (click)="ui.toggleTheme()">
             {{ ui.theme() === 'dark' ? '☀️' : '🌙' }}
          </button>
        </nav>

        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class App {
  // Use inject() to avoid "No suitable injection token" errors
  public ui = inject(UiService);
}