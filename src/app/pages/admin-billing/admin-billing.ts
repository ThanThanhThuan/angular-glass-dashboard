import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
// import { NavbarComponent } from '../../app'; // If Navbar is exported from app.ts

@Component({
    selector: 'app-admin-billing',
    standalone: true,
    imports: [CommonModule, FormsModule, SafeHtmlPipe],
    template: `
    <div class="page-header" style="margin-bottom: 30px;">
      <h1 class="page-title">Billing Administration</h1>
      <p class="card-subtitle">Manage records on nocodebackend.com</p>
    </div>

    <!-- 1. ADD / EDIT FORM -->
    <section class="content-grid" style="grid-template-columns: 1fr; margin-bottom: 40px;">
      <div class="glass-card" style="max-width: 700px; margin: 0 auto; width: 100%;">
        <div class="card-header">
          <h2 class="card-title">{{ isEditing() ? 'Edit Record' : 'Create New Bill' }}</h2>
          @if (isEditing()) {
            <button class="card-btn" (click)="cancelEdit()">Cancel</button>
          }
        </div>

        <form (ngSubmit)="onSubmit()" #billingForm="ngForm" class="settings-section">
          <div class="form-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div class="form-group-settings" style="grid-column: span 2;">
              <label class="form-label">Description</label>
              <input type="text" name="desc" [(ngModel)]="formModel.desc" class="form-input" required placeholder="e.g. Pro Plan - Monthly">
            </div>

            <div class="form-group-settings">
              <label class="form-label">Amount ($)</label>
              <input type="number" name="amount" [(ngModel)]="formModel.amount" class="form-input" required step="0.01">
            </div>

            <div class="form-group-settings">
              <label class="form-label">Status</label>
              <select name="status" [(ngModel)]="formModel.status" class="settings-select" style="width: 100%;">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div class="form-group-settings" style="grid-column: span 2;">
              <label class="form-label">Date & Time</label>
              <input type="datetime-local" name="date" [(ngModel)]="formDate" class="form-input" required>
            </div>
          </div>

          @if (message()) {
            <div [style.color]="message()?.type === 'success' ? 'var(--success)' : 'var(--coral)'" style="margin-top: 15px;">
              {{ message()?.text }}
            </div>
          }

          <div class="btn-group" style="margin-top: 25px;">
            <button type="submit" class="btn btn-primary" [disabled]="loading() || !billingForm.valid">
              {{ loading() ? 'Processing...' : (isEditing() ? 'Update Record' : 'Save to Database') }}
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- 2. DATABASE LIST -->
    <section class="content-grid" style="grid-template-columns: 1fr;">
      <div class="glass-card">
        <div class="card-header">
          <h2 class="card-title">Live Database Records</h2>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (item of data.dbOnlyRecords; track item.id) {
                <tr>
                  <td>{{ item.date }}</td>
                  <td>{{ item.desc }}</td>
                  <td><span class="table-amount">$ {{ item.amount }}</span></td>
                  <td>
                    <span class="status-badge" [class.completed]="item.status.toLowerCase() === 'paid'">
                      {{ item.status }}
                    </span>
                  </td>
                  <td>
                    <div style="display: flex; gap: 10px;">
                      <button class="card-btn" (click)="startEdit(item)" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="card-btn" (click)="onDelete(item.id)" style="color: var(--coral);" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    No database records found. Use the form above to add one.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
})
export class AdminBillingComponent implements OnInit {
    public data = inject(DataService);

    // Component State
    loading = signal(false);
    isEditing = signal(false);
    editId = signal<any>(null);
    message = signal<{ text: string, type: string } | null>(null);

    // Form Model
    formModel = { desc: '', amount: 29.00, status: 'paid' };
    formDate = new Date().toISOString().slice(0, 16);

    ngOnInit() {
        this.data.fetchBillingHistory();
    }

    startEdit(item: any) {
        this.isEditing.set(true);
        this.editId.set(item.id);
        this.formModel = {
            desc: item.desc,
            amount: parseFloat(item.amount),
            status: item.status.toLowerCase()
        };
        // Convert DB date (YYYY-MM-DD HH:mm:ss) to HTML input format (YYYY-MM-DDTHH:mm)
        this.formDate = item.date.replace(' ', 'T').slice(0, 16);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    cancelEdit() {
        this.isEditing.set(false);
        this.editId.set(null);
        this.formModel = { desc: '', amount: 29.00, status: 'paid' };
        this.formDate = new Date().toISOString().slice(0, 16);
        this.message.set(null);
    }

    onDelete(id: any) {
        if (confirm('Are you sure you want to delete this record permanently?')) {
            this.data.deleteBilling(id).subscribe(() => {
                this.message.set({ text: 'Record deleted.', type: 'success' });
                this.data.fetchBillingHistory();
            });
        }
    }

    onSubmit() {
        this.loading.set(true);

        // Prepare SQL date string
        const formattedDate = this.formDate.replace('T', ' ') + ':00';
        const payload = { ...this.formModel, date: formattedDate };

        const request = this.isEditing()
            ? this.data.updateBilling(this.editId(), payload)
            : this.data.createBilling(payload);

        request.subscribe({
            next: () => {
                this.message.set({
                    text: this.isEditing() ? 'Record updated!' : 'Record added to database!',
                    type: 'success'
                });
                this.cancelEdit();
                this.data.fetchBillingHistory();
                this.loading.set(false);
            },
            error: () => {
                this.message.set({ text: 'API Error. Check console.', type: 'error' });
                this.loading.set(false);
            }
        });
    }
}