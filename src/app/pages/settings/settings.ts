import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiService } from '../../services/ui.service';
import { DataService } from '../../services/data.service';
// import { GlassCard } from '../../components/glass-card'; // Assuming you made a wrapper or using raw div
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="page-header" style="margin-bottom: 30px;">
      <h1 class="page-title">Settings</h1>
    </div>

    <div class="settings-grid">
      <!-- 1. Settings Navigation -->
      <div class="glass-card settings-nav-card">
        <ul class="settings-nav">
          @for (tab of tabs; track tab.id) {
            <li class="settings-nav-item">
              <button 
                class="settings-nav-link" 
                [class.active]="activeTab() === tab.id"
                (click)="activeTab.set(tab.id)"
              >
                <span class="tab-icon" [innerHTML]="tab.icon"></span>
                {{ tab.label }}
              </button>
            </li>
          }
        </ul>
      </div>

      <!-- 2. Settings Content Area -->
      <div class="glass-card">
        
        <!-- Profile Tab -->
        @if (activeTab() === 'profile') {
          <div class="settings-tab-content active">
            <div class="profile-header">
              <div class="profile-avatar-large">TM</div>
              <div class="profile-info">
                <h2>TemplateMo</h2>
                <p>admin&#64;templatemo.com • Administrator</p>
              </div>
            </div>

            <div class="settings-section">
              <h3 class="settings-section-title">Profile Information</h3>
              <div class="form-grid">
                <div class="form-group-settings">
                  <label>First Name</label>
                  <input type="text" class="form-input" value="Template">
                </div>
                <div class="form-group-settings">
                  <label>Last Name</label>
                  <input type="text" class="form-input" value="Mo">
                </div>
                <div class="form-group-settings full-width">
                  <label>Bio</label>
                  <textarea class="form-input">Dashboard template creator and Angular enthusiast.</textarea>
                </div>
              </div>
            </div>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        }

        <!-- Appearance Tab -->
        @if (activeTab() === 'appearance') {
          <div class="settings-tab-content active">
            <h3 class="settings-section-title">Appearance</h3>
            <div class="settings-row">
              <div class="settings-label">
                <span class="settings-label-title">Color Mode</span>
                <span class="settings-label-desc">Switch between light and dark themes</span>
              </div>
              <select 
                class="settings-select" 
                [ngModel]="ui.theme()" 
                (ngModelChange)="ui.toggleTheme()"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>
          </div>
        }

        <!-- Billing Tab -->
        @if (activeTab() === 'billing') {
          <div class="settings-tab-content active">
            <div class="billing-plan-card" style="background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(212, 165, 116, 0.1)); border: 1px solid var(--glass-border); padding: 24px; border-radius: 16px; margin-bottom: 30px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="font-size: 20px; font-weight: 600; margin-bottom: 4px;">Pro Plan</h4>
                  <p style="color: var(--text-muted); font-size: 14px;">Your next billing date is {{ nextBillingDate() }}</p>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 32px; font-weight: 700; font-family: 'Space Mono', monospace;">$29</span>
                  <span style="color: var(--text-muted); font-size: 14px;">/mo</span>
                </div>
              </div>
            </div>

            <h3 class="settings-section-title">Billing History (Live + Mock)</h3>
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  @for (invoice of data.billingHistory(); track invoice.id) {
                    <tr>
                      <td>{{ invoice.date }}</td>
                      <td>{{ invoice.desc }}</td>
                      <td><span class="table-amount">$ {{ invoice.amount }}</span></td>
                      <td>
                        <span class="status-badge" [class.completed]="invoice.status.toLowerCase() === 'paid'">
                          {{ invoice.status }}
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

      </div>
    </div>
  `,
    styles: [`
    .settings-grid { display: grid; grid-template-columns: 250px 1fr; gap: 24px; }
    .settings-nav-link { 
      width: 100%; background: none; border: none; text-align: left; 
      display: flex; align-items: center; gap: 12px; padding: 14px 18px; 
      color: var(--text-secondary); border-radius: 12px; cursor: pointer; 
    }
    .settings-nav-link.active { background: var(--glass-hover); color: var(--text-primary); }
    .tab-icon { display: flex; align-items: center; width: 20px; }
    @media (max-width: 992px) { .settings-grid { grid-template-columns: 1fr; } }
  `]
})
export class SettingsComponent implements OnInit {
    public ui = inject(UiService);
    public data = inject(DataService);

    activeTab = signal('profile');

    // Dynamic date: 1st of next month
    nextBillingDate = computed(() => {
        const now = new Date();
        const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return next.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    });

    readonly tabs = [
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'security', label: 'Security', icon: '🔒' },
        { id: 'appearance', label: 'Appearance', icon: '🎨' },
        { id: 'billing', label: 'Billing', icon: '💳' }
    ];

    ngOnInit() {
        // Refresh billing data when the settings page loads
        this.data.fetchBillingHistory();
    }
}