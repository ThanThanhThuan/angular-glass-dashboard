import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiService {
    theme = signal(localStorage.getItem('theme') || 'dark');
    isSidebarOpen = signal(false);

    constructor() {
        // Sync theme with the HTML attribute automatically
        effect(() => {
            document.documentElement.setAttribute('data-theme', this.theme());
            localStorage.setItem('theme', this.theme());
        });
    }

    toggleTheme() {
        this.theme.update(t => t === 'dark' ? 'light' : 'dark');
    }

    toggleSidebar() {
        this.isSidebarOpen.update(s => !s);
    }
}