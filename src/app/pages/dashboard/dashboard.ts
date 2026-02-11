import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { TiltDirective } from '../../directives/tilt.directive';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, TiltDirective, SafeHtmlPipe],
    template: `
    <!-- 1. Stats Grid -->
    <section class="stats-grid">
      @for (stat of data.dashboardStats; track stat.id) {
        <div class="glass-card glass-card-3d" [appTilt]="true">
          <div class="stat-card-inner">
            <div class="stat-info">
              <h3>{{ stat.label }}</h3>
              <div class="stat-value">{{ stat.value }}</div>
              <span class="stat-change" [ngClass]="stat.changeType">
                <!-- SVG for the trend arrow -->
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
              <!-- 1. We wrap the innerHTML in an SVG tag -->
              <!-- 2. We use the safeHtml pipe to bypass sanitization -->
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                [innerHTML]="stat.icon | safeHtml"
              ></svg>
            </div>
          </div>
        </div>
      }
    </section>

    <!-- 2. Main Content Grid -->
    <section class="content-grid">
      <!-- Revenue Chart -->
      <div class="glass-card chart-card" [appTilt]="false">
        <div class="card-header">
          <h2 class="card-title">Revenue Analytics</h2>
        </div>
        <div class="chart-wrapper">
          <div class="chart-container">
            <div class="chart-y-axis">
              <span class="y-value">$100K</span>
              <span class="y-value">$50K</span>
              <span class="y-value">$0</span>
            </div>
            <div class="chart-placeholder">
              @for (bar of data.revenueChartData; track bar.label) {
                <div class="chart-bar-group">
                  <div class="chart-bar" [ngClass]="bar.color" [style.height]="bar.height"></div>
                  <span class="chart-label">{{ bar.label }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="glass-card activity-card">
        <div class="card-header">
          <h2 class="card-title">Recent Activity</h2>
        </div>
        <div class="activity-list">
          @for (act of data.recentActivity; track act.id) {
            <div class="activity-item">
              <div class="activity-avatar" [style.background]="act.color">{{ act.avatar }}</div>
              <div class="activity-content">
                <p class="activity-text"><strong>{{ act.name }}</strong> {{ act.action }}</p>
                <span class="activity-time">{{ act.time }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="glass-card table-card">
        <div class="card-header">
          <h2 class="card-title">Recent Transactions</h2>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              @for (tx of data.recentTransactions; track tx.id) {
                <tr>
                  <td>
                    <div class="table-user">
                      <div class="table-avatar" [style.background]="tx.color[0]">{{ tx.avatar }}</div>
                      <div class="table-user-info">
                        <span class="table-user-name">{{ tx.customer }}</span>
                      </div>
                    </div>
                  </td>
                  <td>{{ tx.product }}</td>
                  <td><span class="status-badge" [ngClass]="tx.statusClass">{{ tx.status }}</span></td>
                  <td><span class="table-amount">{{ tx.amount }}</span></td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 3. Bottom Grid -->
    <section class="bottom-grid">
      
      <!-- Traffic Sources Donut -->
      <div class="glass-card">
        <div class="card-header"><h2 class="card-title">Traffic Sources</h2></div>
        <div class="donut-container">
          <div class="donut-chart">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle class="donut-bg" cx="70" cy="70" r="54"/>
              <circle class="donut-segment" cx="70" cy="70" r="54" stroke="var(--emerald-light)" stroke-dasharray="169.6 339.3" stroke-dashoffset="0"/>
            </svg>
            <div class="donut-center">
              <div class="donut-value">24.5K</div>
              <div class="donut-label">Visitors</div>
            </div>
          </div>
          <div class="donut-legend">
            <div class="legend-item"><span class="legend-color cyan"></span><span>Organic (50%)</span></div>
            <div class="legend-item"><span class="legend-color magenta"></span><span>Social (30%)</span></div>
          </div>
        </div>
      </div>

      <!-- Progress Bars -->
      <div class="glass-card progress-card">
        <div class="card-header"><h2 class="card-title">Project Progress</h2></div>
        @for (item of data.projectProgress; track item.label) {
          <div class="progress-item">
            <div class="progress-header">
              <span class="progress-label">{{ item.label }}</span>
              <span class="progress-value">{{ item.value }}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" [ngClass]="item.color" [style.width]="item.value"></div>
            </div>
          </div>
        }
      </div>

      <!-- 📅 New Month Calendar Widget -->
      <div class="glass-card">
        <div class="calendar-header">
          <h2 class="card-title">{{ monthName }} {{ year }}</h2>
          <div class="calendar-nav">
             <button class="calendar-nav-btn">◀</button>
             <button class="calendar-nav-btn">▶</button>
          </div>
        </div>
        <div class="calendar-grid">
          @for (day of weekDays; track day) {
            <span class="calendar-day-name">{{ day }}</span>
          }
          
          @for (date of daysInMonth; track date) {
            <span class="calendar-day" [class.today]="isToday(date)">
              {{ date }}
            </span>
          }
        </div>
      </div>

    </section>
  `,
    styles: [`
    :host { display: block; }
    .stat-icon ::ng-deep svg { width: 26px; height: 26px; }
  `]
})
export class DashboardComponent implements OnInit {
    public data = inject(DataService);

    // Calendar Logic
    readonly weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    daysInMonth: number[] = [];
    monthName: string = '';
    year: number = 0;
    todayDate: number = new Date().getDate();

    ngOnInit() {
        const now = new Date();
        this.monthName = now.toLocaleString('default', { month: 'short' });
        this.year = now.getFullYear();

        // Calculate total days in current month
        const totalDays = new Date(this.year, now.getMonth() + 1, 0).getDate();
        this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    }

    isToday(day: number): boolean {
        const now = new Date();
        return day === this.todayDate &&
            this.year === now.getFullYear();
    }
}