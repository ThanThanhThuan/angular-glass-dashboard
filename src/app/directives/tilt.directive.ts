import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appTilt]',
    standalone: true
})
export class TiltDirective {
    @Input() appTilt = true;

    constructor(private el: ElementRef) { }

    @HostListener('mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        if (!this.appTilt) return;
        const rect = this.el.nativeElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - x) / 20;

        this.el.nativeElement.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        this.el.nativeElement.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
}