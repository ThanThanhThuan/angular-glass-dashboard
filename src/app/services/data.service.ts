import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private http = inject(HttpClient);

    // --- 1. DYNAMIC DATA (Signals) ---
    // This signal will store the merged live and mock records
    public billingHistory = signal<any[]>([]);

    // --- 2. DASHBOARD STATIC DATA ---
    public readonly dashboardStats = [
        { id: 1, label: 'Total Revenue', value: '$84,254', change: '+12.5%', changeType: 'positive', iconColor: 'cyan', icon: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>` },
        { id: 2, label: 'Active Users', value: '24,521', change: '+8.2%', changeType: 'positive', iconColor: 'magenta', icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>` },
        { id: 3, label: 'Total Orders', value: '8,461', change: '-3.1%', changeType: 'negative', iconColor: 'purple', icon: `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>` },
        { id: 4, label: 'Conversion Rate', value: '3.24%', change: '+2.4%', changeType: 'positive', iconColor: 'success', icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>` }
    ];

    public readonly revenueChartData = [
        { label: 'Jan', height: '120px', color: 'bar-emerald' },
        { label: 'Feb', height: '160px', color: 'bar-gold' },
        { label: 'Mar', height: '90px', color: 'bar-coral' },
        { label: 'Apr', height: '140px', color: 'bar-teal' },
        { label: 'May', height: '180px', color: 'bar-amber' },
        { label: 'Jun', height: '130px', color: 'bar-emerald' }
    ];

    public readonly recentActivity = [
        { id: 1, name: 'John Doe', action: 'purchased Premium Plan', time: '2 mins ago', avatar: 'JD', color: 'var(--emerald)' },
        { id: 2, name: 'Anna Smith', action: 'submitted a ticket', time: '15 mins ago', avatar: 'AS', color: 'var(--gold)' },
        { id: 3, name: 'Mike Johnson', action: 'upgraded subscription', time: '1 hour ago', avatar: 'MJ', color: 'var(--coral)' }
    ];

    public readonly recentTransactions = [
        { id: 1, customer: 'John Doe', product: 'Premium Plan', status: 'Completed', statusClass: 'completed', amount: '$299.00', avatar: 'JD', color: 'var(--emerald)' },
        { id: 2, customer: 'Anna Smith', product: 'Enterprise License', status: 'Processing', statusClass: 'processing', amount: '$1,499.00', avatar: 'AS', color: 'var(--gold)' }
    ];

    public readonly projectProgress = [
        { label: 'UI Design', value: '85%', color: 'cyan' },
        { label: 'Backend API', value: '62%', color: 'magenta' },
        { label: 'Testing', value: '45%', color: 'purple' }
    ];


    // --- 3. ANALYTICS STATIC DATA ---
    public readonly analyticsStats = [
        {
            id: 1,
            label: 'Page Views',
            value: '1,284,521',
            change: '+24.5%',
            changeType: 'positive',
            iconColor: 'cyan',
            icon: `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`
        },
        {
            id: 2,
            label: 'Unique Visitors',
            value: '452,892',
            change: '+18.3%',
            changeType: 'positive',
            iconColor: 'magenta',
            icon: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`
        },
        {
            id: 3,
            label: 'Bounce Rate',
            value: '32.8%',
            change: '+5.2%',
            changeType: 'negative',
            iconColor: 'purple',
            icon: `<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>`
        },
        {
            id: 4,
            label: 'Avg. Session',
            value: '4:32',
            change: '+12.1%',
            changeType: 'positive',
            iconColor: 'success',
            icon: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`
        }
    ];

    public readonly browserStats = [
        { label: 'Chrome', value: '64%', color: 'cyan' },
        { label: 'Safari', value: '22%', color: 'magenta' },
        { label: 'Firefox', value: '8%', color: 'purple' }
    ];

    // --- 4. USERS PAGE STATIC DATA ---
    public readonly userStats = [
        {
            id: 1,
            label: 'Total Users',
            value: '24,521',
            change: '+8.2%',
            changeType: 'positive',
            iconColor: 'cyan',
            icon: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`
        },
        {
            id: 2,
            label: 'Active Now',
            value: '1,234',
            change: '+12.5%',
            changeType: 'positive',
            iconColor: 'magenta',
            icon: `<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>`
        },
        // --- ADDED ITEM 3 ---
        {
            id: 3,
            label: 'New Today',
            value: '156',
            change: '-3.1%',
            changeType: 'negative',
            iconColor: 'purple',
            icon: `<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>`
        },
        // --- ADDED ITEM 4 ---
        {
            id: 4,
            label: 'Premium Users',
            value: '4,892',
            change: '+18.7%',
            changeType: 'positive',
            iconColor: 'success',
            icon: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`
        }
    ];
    // --- Inside DataService Class ---

    public readonly countryStats = [
        { label: '🇺🇸 United States', value: '38%', color: 'cyan' },
        { label: '🇬🇧 United Kingdom', value: '18%', color: 'magenta' },
        { label: '🇩🇪 Germany', value: '12%', color: 'purple' },
        { label: '🇨🇦 Canada', value: '9%', color: 'cyan' }
    ];

    public readonly trafficChartData = [
        { label: '1', height: '80px', color: 'bar-emerald' },
        { label: '2', height: '95px', color: 'bar-emerald' },
        { label: '3', height: '70px', color: 'bar-emerald' },
        { label: '4', height: '110px', color: 'bar-emerald' },
        { label: '5', height: '130px', color: 'bar-emerald' },
        { label: '6', height: '145px', color: 'bar-gold' },
        { label: '7', height: '120px', color: 'bar-gold' },
        { label: '8', height: '100px', color: 'bar-gold' },
        { label: '9', height: '135px', color: 'bar-gold' },
        { label: '10', height: '155px', color: 'bar-gold' },
        { label: '11', height: '140px', color: 'bar-coral' },
        { label: '12', height: '125px', color: 'bar-coral' },
        { label: '13', height: '160px', color: 'bar-coral' },
        { label: '14', height: '175px', color: 'bar-coral' },
        { label: '15', height: '150px', color: 'bar-coral' },
        { label: '16', height: '165px', color: 'bar-teal' },
        { label: '17', height: '145px', color: 'bar-teal' },
        { label: '18', height: '130px', color: 'bar-teal' },
        { label: '19', height: '155px', color: 'bar-teal' },
        { label: '20', height: '180px', color: 'bar-teal' },
        { label: '21', height: '170px', color: 'bar-amber' },
        { label: '22', height: '160px', color: 'bar-amber' },
        { label: '23', height: '185px', color: 'bar-amber' },
        { label: '24', height: '175px', color: 'bar-amber' },
        { label: '25', height: '165px', color: 'bar-amber' },
        { label: '26', height: '190px', color: 'bar-emerald' },
        { label: '27', height: '175px', color: 'bar-emerald' },
        { label: '28', height: '195px', color: 'bar-emerald' },
        { label: '29', height: '185px', color: 'bar-emerald' },
        { label: '30', height: '200px', color: 'bar-emerald' },
    ];

    // Add this helper to your DataService class
    get dbOnlyRecords() {
        // Filters out IDs starting with 'm' (our mock identifiers)
        return this.billingHistory().filter(item => !String(item.id).startsWith('m'));
    }

    // --- 4. API METHODS ---
    private getHeaders() {
        return new HttpHeaders({
            'Authorization': `Bearer ${environment.API_TOKEN}`,
            'accept': 'application/json'
        });
    }

    public fetchBillingHistory() {
        const url = `https://api.nocodebackend.com/read/${environment.TABLE_NAME}?Instance=${environment.INSTANCE_ID}&sub_table=billing`;

        this.http.get<any>(url, { headers: this.getHeaders() }).subscribe({
            next: (res) => {
                const dbData = res.data || [];
                const mockData = [
                    { id: 'm1', date: '2025-01-01 10:00:00', desc: 'Mock Bill', amount: 29.00, status: 'Paid' }
                ];

                // Merge, Sort Descending, and update the Signal
                const combined = [...dbData, ...mockData].sort((a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );

                this.billingHistory.set(combined);
            },
            error: () => this.billingHistory.set([{ id: 'm1', date: '2025-01-01', desc: 'Mock Bill (Offline)', amount: 29.0, status: 'Paid' }])
        });
    }

    public createBilling(record: any) {
        const url = `https://api.nocodebackend.com/create/${environment.TABLE_NAME}?Instance=${environment.INSTANCE_ID}`;
        return this.http.post(url, { ...record, sub_table: 'billing' }, { headers: this.getHeaders() });
    }

    public updateBilling(id: any, record: any) {
        const url = `https://api.nocodebackend.com/update/${environment.TABLE_NAME}/${id}?Instance=${environment.INSTANCE_ID}`;
        return this.http.put(url, record, { headers: this.getHeaders() });
    }

    public deleteBilling(id: any) {
        const url = `https://api.nocodebackend.com/delete/${environment.TABLE_NAME}/${id}?Instance=${environment.INSTANCE_ID}`;
        return this.http.delete(url, { headers: this.getHeaders() });
    }
}