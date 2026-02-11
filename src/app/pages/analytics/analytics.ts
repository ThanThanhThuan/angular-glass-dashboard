import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, TiltDirective, SafeHtmlPipe, RouterLink],
  template: `
    <div class="page-header" style="margin-bottom: 30px;">
      <h1 class="page-title">Analytics Overview</h1>
      <div class="page-breadcrumb">
        <a routerLink="/">Dashboard</a>
        <span>/</span>
        <span>Analytics</span>
      </div>
    </div>

    <!-- 1. Stats Grid -->
    <section class="stats-grid">
      @for (stat of data.analyticsStats; track stat.id) {
        <div class="glass-card glass-card-3d" [appTilt]="true">
          <div class="stat-card-inner">
            <div class="stat-info">
              <h3>{{ stat.label }}</h3>
              <div class="stat-value">{{ stat.value }}</div>
              <span class="stat-change" [ngClass]="stat.changeType">
                {{ stat.change }}
              </span>
            </div>
            <div class="stat-icon" [ngClass]="stat.iconColor">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                   stroke-linecap="round" stroke-linejoin="round" [innerHTML]="stat.icon | safeHtml"></svg>
            </div>
          </div>
        </div>
      }
    </section>

    <!-- 2. Main Traffic Chart Area -->
    <section class="content-grid">
      <div class="glass-card chart-card">
        <div class="card-header">
          <h2 class="card-title">Traffic Overview (30 Days)</h2>
        </div>
        <div class="chart-wrapper">
          <div class="chart-container">
            <div class="chart-y-axis">
              <span class="y-value">50K</span>
              <span class="y-value">25K</span>
              <span class="y-value">0</span>
            </div>
            <div class="chart-placeholder">
              @for (bar of data.trafficChartData; track bar.label) {
                <div class="chart-bar-group">
                  <div class="chart-bar" [ngClass]="bar.color" [style.height]="bar.height"></div>
                  <span class="chart-label">{{ bar.label }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Top Pages (Recycled Activity UI) -->
      <div class="glass-card activity-card">
        <div class="card-header"><h2 class="card-title">Top Pages</h2></div>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-avatar" style="background: var(--emerald)">1</div>
            <div class="activity-content">
              <p class="activity-text"><strong>/dashboard</strong></p>
              <span class="activity-time">45,234 views</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-avatar" style="background: var(--gold)">2</div>
            <div class="activity-content">
              <p class="activity-text"><strong>/products</strong></p>
              <span class="activity-time">32,891 views</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Breakdowns Grid -->
    <!-- 3. Breakdowns Grid -->
<section class="bottom-grid">
  
  <!-- 1. Device Breakdown (Donut) -->
  <div class="glass-card">
    <div class="card-header"><h2 class="card-title">Devices</h2></div>
    <div class="donut-container">
      <div class="donut-chart">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle class="donut-bg" cx="70" cy="70" r="54"/>
          <circle class="donut-segment" cx="70" cy="70" r="54" stroke="var(--emerald-light)" stroke-dasharray="186.6 339.3" stroke-dashoffset="0"/>
          <circle class="donut-segment" cx="70" cy="70" r="54" stroke="var(--gold)" stroke-dasharray="118.8 339.3" stroke-dashoffset="-186.6"/>
        </svg>
        <div class="donut-center">
          <div class="donut-value">100%</div>
          <div class="donut-label">Total</div>
        </div>
      </div>
      <div class="donut-legend">
        <div class="legend-item"><span class="legend-color cyan"></span><span>Mobile (55%)</span></div>
        <div class="legend-item"><span class="legend-color magenta"></span><span>Desktop (35%)</span></div>
      </div>
    </div>
  </div>

  <!-- 2. Browser Stats -->
  <div class="glass-card progress-card">
    <div class="card-header"><h2 class="card-title">Browsers</h2></div>
    @for (browser of data.browserStats; track browser.label) {
      <div class="progress-item">
        <div class="progress-header">
          <span class="progress-label">{{ browser.label }}</span>
          <span class="progress-value">{{ browser.value }}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" [ngClass]="browser.color" [style.width]="browser.value"></div>
        </div>
      </div>
    }
  </div>

  <!-- 3. Countries Stats (NEW) -->
  <div class="glass-card progress-card">
    <div class="card-header"><h2 class="card-title">Top Countries</h2></div>
    @for (country of data.countryStats; track country.label) {
      <div class="progress-item">
        <div class="progress-header">
          <span class="progress-label">{{ country.label }}</span>
          <span class="progress-value">{{ country.value }}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" [ngClass]="country.color" [style.width]="country.value"></div>
        </div>
      </div>
    }
  </div>

</section>
  `,
  styles: [`
    .stat-icon ::ng-deep svg { width: 28px; height: 28px; }
    .page-breadcrumb { display: flex; gap: 8px; font-size: 13px; color: var(--text-muted); }
    .page-breadcrumb a { color: var(--text-secondary); text-decoration: none; }
    .page-breadcrumb a:hover { color: var(--emerald-light); }
  `]
})
export class AnalyticsComponent {
  public data = inject(DataService);
}