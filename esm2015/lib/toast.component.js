import { Component, Input, Output, ViewChild, ViewContainerRef, EventEmitter, ComponentFactoryResolver, ChangeDetectorRef, HostListener, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { BodyOutputType } from './bodyOutputType';
export class ToastComponent {
    constructor(componentFactoryResolver, changeDetectorRef, ngZone, element, renderer2) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.element = element;
        this.renderer2 = renderer2;
        this.progressBarWidth = -1;
        this.bodyOutputType = BodyOutputType;
        this.clickEvent = new EventEmitter();
        this.removeToastEvent = new EventEmitter();
        this.timeoutId = null;
        this.timeout = 0;
        this.progressBarIntervalId = null;
    }
    ngOnInit() {
        if (this.toast.progressBar) {
            this.toast.progressBarDirection = this.toast.progressBarDirection || 'decreasing';
        }
        let timeout = (typeof this.toast.timeout === 'number')
            ? this.toast.timeout : this.toasterconfig.timeout;
        if (typeof timeout === 'object') {
            timeout = timeout[this.toast.type];
        }
        ;
        this.timeout = timeout;
    }
    ngAfterViewInit() {
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            const component = this.componentFactoryResolver.resolveComponentFactory(this.toast.body);
            const componentInstance = this.componentBody.createComponent(component, undefined, this.componentBody.injector);
            componentInstance.instance.toast = this.toast;
            this.changeDetectorRef.detectChanges();
        }
        if (this.toasterconfig.mouseoverTimerStop) {
            // only apply a mouseenter event when necessary to avoid
            // unnecessary event and change detection cycles.
            this.removeMouseOverListener = this.renderer2.listen(this.element.nativeElement, 'mouseenter', () => this.stopTimer());
        }
        this.configureTimer();
    }
    click(event, toast) {
        event.stopPropagation();
        this.clickEvent.emit({ value: { toast: toast, isCloseButton: true } });
    }
    stopTimer() {
        this.progressBarWidth = 0;
        this.clearTimers();
    }
    restartTimer() {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (!this.timeoutId) {
                this.configureTimer();
            }
        }
        else if (this.timeout && !this.timeoutId) {
            this.removeToast();
        }
    }
    ngOnDestroy() {
        if (this.removeMouseOverListener) {
            this.removeMouseOverListener();
        }
        this.clearTimers();
    }
    configureTimer() {
        if (!this.timeout || this.timeout < 1) {
            return;
        }
        if (this.toast.progressBar) {
            this.removeToastTick = new Date().getTime() + this.timeout;
            this.progressBarWidth = -1;
        }
        this.ngZone.runOutsideAngular(() => {
            this.timeoutId = window.setTimeout(() => {
                this.ngZone.run(() => {
                    this.changeDetectorRef.markForCheck();
                    this.removeToast();
                });
            }, this.timeout);
            if (this.toast.progressBar) {
                this.progressBarIntervalId = window.setInterval(() => {
                    this.ngZone.run(() => {
                        this.updateProgressBar();
                    });
                }, 10);
            }
        });
    }
    updateProgressBar() {
        if (this.progressBarWidth === 0 || this.progressBarWidth === 100) {
            return;
        }
        this.progressBarWidth = ((this.removeToastTick - new Date().getTime()) / this.timeout) * 100;
        if (this.toast.progressBarDirection === 'increasing') {
            this.progressBarWidth = 100 - this.progressBarWidth;
        }
        if (this.progressBarWidth < 0) {
            this.progressBarWidth = 0;
        }
        if (this.progressBarWidth > 100) {
            this.progressBarWidth = 100;
        }
    }
    clearTimers() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
        if (this.progressBarIntervalId) {
            window.clearInterval(this.progressBarIntervalId);
        }
        this.timeoutId = null;
        this.progressBarIntervalId = null;
    }
    removeToast() {
        this.removeToastEvent.emit(this.toast);
    }
}
ToastComponent.decorators = [
    { type: Component, args: [{
                selector: '[toastComp]',
                template: `
        <div class="toast-content">
            <div [ngClass]="titleClass">{{toast.title}}</div>
            <div [ngClass]="messageClass" [ngSwitch]="toast.bodyOutputType">
                <div *ngSwitchCase="bodyOutputType.Component" #componentBody></div>
                <div *ngSwitchCase="bodyOutputType.TrustedHtml" [innerHTML]="toast.body | trustHtml"></div>
                <div *ngSwitchCase="bodyOutputType.Default">{{toast.body}}</div>
            </div>
        </div>
        <button class="toast-close-button" *ngIf="toast.showCloseButton" (click)="click($event, toast)"
            [innerHTML]="toast.closeHtml | trustHtml">
        </button>
        <div *ngIf="toast.progressBar">
            <div class="toast-progress-bar" [style.width]="progressBarWidth + '%'"></div>
        </div>`
            },] }
];
ToastComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 }
];
ToastComponent.propDecorators = {
    toasterconfig: [{ type: Input }],
    toast: [{ type: Input }],
    titleClass: [{ type: Input }],
    messageClass: [{ type: Input }],
    componentBody: [{ type: ViewChild, args: ['componentBody', { read: ViewContainerRef, static: false },] }],
    clickEvent: [{ type: Output }],
    removeToastEvent: [{ type: Output }],
    restartTimer: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLHdCQUF3QixFQUN4QixpQkFBaUIsRUFJakIsWUFBWSxFQUNaLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXFCbEQsTUFBTSxPQUFPLGNBQWM7SUFzQnZCLFlBQ1Usd0JBQWtELEVBQ2xELGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsT0FBbUIsRUFDbkIsU0FBb0I7UUFKcEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFwQnZCLHFCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzlCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBR2hDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFFNUMsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLDBCQUFxQixHQUFZLElBQUksQ0FBQztJQVczQyxDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxJ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QUU7eUJBS3BFLE1BQU07K0JBRU4sTUFBTTsyQkFnRU4sWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBPbkluaXQsXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBPbkRlc3Ryb3ksXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIE5nWm9uZSxcbiAgICBFbGVtZW50UmVmLFxuICAgIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi90b2FzdCc7XG5pbXBvcnQgeyBCb2R5T3V0cHV0VHlwZSB9IGZyb20gJy4vYm9keU91dHB1dFR5cGUnO1xuaW1wb3J0IHsgVG9hc3RlckNvbmZpZyB9IGZyb20gJy4vdG9hc3Rlci1jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ1t0b2FzdENvbXBdJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9hc3QtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ0aXRsZUNsYXNzXCI+e3t0b2FzdC50aXRsZX19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIm1lc3NhZ2VDbGFzc1wiIFtuZ1N3aXRjaF09XCJ0b2FzdC5ib2R5T3V0cHV0VHlwZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLkNvbXBvbmVudFwiICNjb21wb25lbnRCb2R5PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLlRydXN0ZWRIdG1sXCIgW2lubmVySFRNTF09XCJ0b2FzdC5ib2R5IHwgdHJ1c3RIdG1sXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiYm9keU91dHB1dFR5cGUuRGVmYXVsdFwiPnt7dG9hc3QuYm9keX19PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b2FzdC1jbG9zZS1idXR0b25cIiAqbmdJZj1cInRvYXN0LnNob3dDbG9zZUJ1dHRvblwiIChjbGljayk9XCJjbGljaygkZXZlbnQsIHRvYXN0KVwiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cInRvYXN0LmNsb3NlSHRtbCB8IHRydXN0SHRtbFwiPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInRvYXN0LnByb2dyZXNzQmFyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9hc3QtcHJvZ3Jlc3MtYmFyXCIgW3N0eWxlLndpZHRoXT1cInByb2dyZXNzQmFyV2lkdGggKyAnJSdcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+YFxufSlcbmV4cG9ydCBjbGFzcyBUb2FzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSB0b2FzdGVyY29uZmlnOiBUb2FzdGVyQ29uZmlnO1xuICAgIEBJbnB1dCgpIHRvYXN0OiBUb2FzdDtcbiAgICBASW5wdXQoKSB0aXRsZUNsYXNzOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbWVzc2FnZUNsYXNzOiBzdHJpbmc7XG4gICAgQFZpZXdDaGlsZCgnY29tcG9uZW50Qm9keScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiBmYWxzZSB9KSBjb21wb25lbnRCb2R5OiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gICAgcHVibGljIHByb2dyZXNzQmFyV2lkdGg6IG51bWJlciA9IC0xO1xuICAgIHB1YmxpYyBib2R5T3V0cHV0VHlwZSA9IEJvZHlPdXRwdXRUeXBlO1xuXG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIGNsaWNrRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQE91dHB1dCgpXG4gICAgcHVibGljIHJlbW92ZVRvYXN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFRvYXN0PigpO1xuXG4gICAgcHJpdmF0ZSB0aW1lb3V0SWQ/OiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgdGltZW91dDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHByb2dyZXNzQmFySW50ZXJ2YWxJZD86IG51bWJlciA9IG51bGw7XG4gICAgcHJpdmF0ZSByZW1vdmVUb2FzdFRpY2s6IG51bWJlcjtcblxuICAgIHByaXZhdGUgcmVtb3ZlTW91c2VPdmVyTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICBwcml2YXRlIHJlbmRlcmVyMjogUmVuZGVyZXIyXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICB0aGlzLnRvYXN0LnByb2dyZXNzQmFyRGlyZWN0aW9uID0gdGhpcy50b2FzdC5wcm9ncmVzc0JhckRpcmVjdGlvbiB8fCAnZGVjcmVhc2luZyc7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGltZW91dCA9ICh0eXBlb2YgdGhpcy50b2FzdC50aW1lb3V0ID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgID8gdGhpcy50b2FzdC50aW1lb3V0IDogdGhpcy50b2FzdGVyY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGltZW91dCA9IHRpbWVvdXRbdGhpcy50b2FzdC50eXBlXTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudG9hc3QuYm9keU91dHB1dFR5cGUgPT09IHRoaXMuYm9keU91dHB1dFR5cGUuQ29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLnRvYXN0LmJvZHkpO1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2U6IGFueSA9IHRoaXMuY29tcG9uZW50Qm9keS5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50LCB1bmRlZmluZWQsIHRoaXMuY29tcG9uZW50Qm9keS5pbmplY3Rvcik7XG4gICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZS50b2FzdCA9IHRoaXMudG9hc3Q7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcubW91c2VvdmVyVGltZXJTdG9wKSB7XG4gICAgICAgICAgICAvLyBvbmx5IGFwcGx5IGEgbW91c2VlbnRlciBldmVudCB3aGVuIG5lY2Vzc2FyeSB0byBhdm9pZFxuICAgICAgICAgICAgLy8gdW5uZWNlc3NhcnkgZXZlbnQgYW5kIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVzLlxuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb3VzZU92ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIyLmxpc3RlbihcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgICAgICAgICAnbW91c2VlbnRlcicsXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zdG9wVGltZXIoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29uZmlndXJlVGltZXIoKTtcbiAgICB9XG5cbiAgICBjbGljayhldmVudDogTW91c2VFdmVudCwgdG9hc3Q6IFRvYXN0KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmNsaWNrRXZlbnQuZW1pdCh7IHZhbHVlIDogeyB0b2FzdDogdG9hc3QsIGlzQ2xvc2VCdXR0b246IHRydWUgfSB9KTtcbiAgICB9XG5cbiAgICBzdG9wVGltZXIoKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDA7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgICByZXN0YXJ0VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcubW91c2VvdmVyVGltZXJTdG9wKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZW91dElkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmVUaW1lcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZW91dCAmJiAhdGhpcy50aW1lb3V0SWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZW1vdmVNb3VzZU92ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb3VzZU92ZXJMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpZ3VyZVRpbWVyKCkge1xuICAgICAgICBpZiAoIXRoaXMudGltZW91dCB8fCB0aGlzLnRpbWVvdXQgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdFRpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMudGltZW91dDtcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgdGhpcy50aW1lb3V0KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9ncmVzc0JhcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9PT0gMCB8fCB0aGlzLnByb2dyZXNzQmFyV2lkdGggPT09IDEwMCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9ICgodGhpcy5yZW1vdmVUb2FzdFRpY2sgLSBuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyB0aGlzLnRpbWVvdXQpICogMTAwO1xuXG4gICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyRGlyZWN0aW9uID09PSAnaW5jcmVhc2luZycpIHtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAxMDAgLSB0aGlzLnByb2dyZXNzQmFyV2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA8IDApIHtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyV2lkdGggPiAxMDApIHtcbiAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAxMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNsZWFyVGltZXJzKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy50aW1lb3V0SWQpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhckludGVydmFsSWQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGltZW91dElkID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhckludGVydmFsSWQgPSBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlVG9hc3QoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlVG9hc3RFdmVudC5lbWl0KHRoaXMudG9hc3QpO1xuICAgIH1cbn1cbiJdfQ==