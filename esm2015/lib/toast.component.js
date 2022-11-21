import { Component, Input, Output, ViewChild, ViewContainerRef, EventEmitter, HostListener } from '@angular/core';
import { BodyOutputType } from './bodyOutputType';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./trust-html.pipe";
const _c0 = ["componentBody"];
const _c1 = ["toastComp", ""];
function ToastComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", null, 7);
} }
function ToastComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 8);
    i0.ɵɵpipe(1, "trustHtml");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r1.toast.body), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.toast.body);
} }
function ToastComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function ToastComponent_button_7_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.click($event, ctx_r6.toast); });
    i0.ɵɵpipe(1, "trustHtml");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r3.toast.closeHtml), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "div", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("width", ctx_r4.progressBarWidth + "%");
} }
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
ToastComponent.ɵfac = function ToastComponent_Factory(t) { return new (t || ToastComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
ToastComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["", "toastComp", ""]], viewQuery: function ToastComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.componentBody = _t.first);
    } }, hostBindings: function ToastComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mouseleave", function ToastComponent_mouseleave_HostBindingHandler() { return ctx.restartTimer(); });
    } }, inputs: { toasterconfig: "toasterconfig", toast: "toast", titleClass: "titleClass", messageClass: "messageClass" }, outputs: { clickEvent: "clickEvent", removeToastEvent: "removeToastEvent" }, attrs: _c1, decls: 9, vars: 9, consts: [[1, "toast-content"], [3, "ngClass"], [3, "ngClass", "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], ["class", "toast-close-button", 3, "innerHTML", "click", 4, "ngIf"], [4, "ngIf"], ["componentBody", ""], [3, "innerHTML"], [1, "toast-close-button", 3, "innerHTML", "click"], [1, "toast-progress-bar"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵelementStart(1, "div", 1);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 2);
        i0.ɵɵtemplate(4, ToastComponent_div_4_Template, 2, 0, "div", 3);
        i0.ɵɵtemplate(5, ToastComponent_div_5_Template, 2, 3, "div", 4);
        i0.ɵɵtemplate(6, ToastComponent_div_6_Template, 2, 1, "div", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, ToastComponent_button_7_Template, 2, 3, "button", 5);
        i0.ɵɵtemplate(8, ToastComponent_div_8_Template, 2, 2, "div", 6);
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.titleClass);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.toast.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.messageClass)("ngSwitch", ctx.toast.bodyOutputType);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Component);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.TrustedHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Default);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.toast.showCloseButton);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.toast.progressBar);
    } }, directives: [i1.NgClass, i1.NgSwitch, i1.NgSwitchCase, i1.NgIf], pipes: [i2.TrustHtmlPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{
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
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { toasterconfig: [{
            type: Input
        }], toast: [{
            type: Input
        }], titleClass: [{
            type: Input
        }], messageClass: [{
            type: Input
        }], componentBody: [{
            type: ViewChild,
            args: ['componentBody', { read: ViewContainerRef, static: false }]
        }], clickEvent: [{
            type: Output
        }], removeToastEvent: [{
            type: Output
        }], restartTimer: [{
            type: HostListener,
            args: ['mouseleave']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQU1aLFlBQVksRUFJZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7SUFTbEMsK0JBQW1FOzs7SUFDbkUseUJBQTJGOzs7O0lBQTNDLHNGQUFvQzs7O0lBQ3BGLDJCQUE0QztJQUFBLFlBQWM7SUFBQSxpQkFBTTs7O0lBQXBCLGVBQWM7SUFBZCx1Q0FBYzs7OztJQUdsRSxpQ0FDOEM7SUFEbUIsME1BQThCOztJQUUvRixpQkFBUzs7O0lBREwsMkZBQXlDOzs7SUFFN0MsMkJBQStCO0lBQzNCLDBCQUE2RTtJQUNqRixpQkFBTTs7O0lBRDhCLGVBQXNDO0lBQXRDLHNEQUFzQzs7QUFHbEYsTUFBTSxPQUFPLGNBQWM7SUFzQnZCLFlBQ1Usd0JBQWtELEVBQ2xELGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsT0FBbUIsRUFDbkIsU0FBb0I7UUFKcEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFwQnZCLHFCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzlCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBR2hDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFF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NEI7UUFBQSxZQUFlO1FBQUEsaUJBQU07UUFDakQsOEJBQWdFO1FBQzVELCtEQUFtRTtRQUNuRSwrREFBMkY7UUFDM0YsK0RBQWdFO1FBQ3BFLGlCQUFNO1FBQ1YsaUJBQU07UUFDTixxRUFFUztRQUNULCtEQUVNOztRQVpHLGVBQXNCO1FBQXRCLHdDQUFzQjtRQUFDLGVBQWU7UUFBZixxQ0FBZTtRQUN0QyxlQUF3QjtRQUF4QiwwQ0FBd0Isc0NBQUE7UUFDbkIsZUFBc0M7UUFBdEMsMkRBQXNDO1FBQ3RDLGVBQXdDO1FBQXhDLDZEQUF3QztRQUN4QyxlQUFvQztRQUFwQyx5REFBb0M7UUFHZCxlQUEyQjtRQUEzQixnREFBMkI7UUFHekQsZUFBdUI7UUFBdkIsNENBQXVCOzt1RkFJeEIsY0FBYztjQWxCMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O2VBY0M7YUFDZDtpTEFFWSxhQUFhO2tCQUFyQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDaUUsYUFBYTtrQkFBbkYsU0FBUzttQkFBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQU05RCxVQUFVO2tCQURoQixNQUFNO1lBR0EsZ0JBQWdCO2tCQUR0QixNQUFNO1lBaUVQLFlBQVk7a0JBRFgsWUFBWTttQkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgT25Jbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgT25EZXN0cm95LFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBOZ1pvbmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vdG9hc3QnO1xuaW1wb3J0IHsgQm9keU91dHB1dFR5cGUgfSBmcm9tICcuL2JvZHlPdXRwdXRUeXBlJztcbmltcG9ydCB7IFRvYXN0ZXJDb25maWcgfSBmcm9tICcuL3RvYXN0ZXItY29uZmlnJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbdG9hc3RDb21wXScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwidGl0bGVDbGFzc1wiPnt7dG9hc3QudGl0bGV9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJtZXNzYWdlQ2xhc3NcIiBbbmdTd2l0Y2hdPVwidG9hc3QuYm9keU91dHB1dFR5cGVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5Db21wb25lbnRcIiAjY29tcG9uZW50Qm9keT48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5UcnVzdGVkSHRtbFwiIFtpbm5lckhUTUxdPVwidG9hc3QuYm9keSB8IHRydXN0SHRtbFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLkRlZmF1bHRcIj57e3RvYXN0LmJvZHl9fTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9hc3QtY2xvc2UtYnV0dG9uXCIgKm5nSWY9XCJ0b2FzdC5zaG93Q2xvc2VCdXR0b25cIiAoY2xpY2spPVwiY2xpY2soJGV2ZW50LCB0b2FzdClcIlxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJ0b2FzdC5jbG9zZUh0bWwgfCB0cnVzdEh0bWxcIj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJ0b2FzdC5wcm9ncmVzc0JhclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LXByb2dyZXNzLWJhclwiIFtzdHlsZS53aWR0aF09XCJwcm9ncmVzc0JhcldpZHRoICsgJyUnXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgdG9hc3RlcmNvbmZpZzogVG9hc3RlckNvbmZpZztcbiAgICBASW5wdXQoKSB0b2FzdDogVG9hc3Q7XG4gICAgQElucHV0KCkgdGl0bGVDbGFzczogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1lc3NhZ2VDbGFzczogc3RyaW5nO1xuICAgIEBWaWV3Q2hpbGQoJ2NvbXBvbmVudEJvZHknLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogZmFsc2UgfSkgY29tcG9uZW50Qm9keTogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIHB1YmxpYyBwcm9ncmVzc0JhcldpZHRoOiBudW1iZXIgPSAtMTtcbiAgICBwdWJsaWMgYm9keU91dHB1dFR5cGUgPSBCb2R5T3V0cHV0VHlwZTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBjbGlja0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZW1vdmVUb2FzdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxUb2FzdD4oKTtcblxuICAgIHByaXZhdGUgdGltZW91dElkPzogbnVtYmVyID0gbnVsbDtcbiAgICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBwcm9ncmVzc0JhckludGVydmFsSWQ/OiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgcmVtb3ZlVG9hc3RUaWNrOiBudW1iZXI7XG5cbiAgICBwcml2YXRlIHJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyOiAoKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMlxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xuICAgICAgICAgICAgdGhpcy50b2FzdC5wcm9ncmVzc0JhckRpcmVjdGlvbiA9IHRoaXMudG9hc3QucHJvZ3Jlc3NCYXJEaXJlY3Rpb24gfHwgJ2RlY3JlYXNpbmcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRpbWVvdXQgPSAodHlwZW9mIHRoaXMudG9hc3QudGltZW91dCA9PT0gJ251bWJlcicpXG4gICAgICAgICAgICA/IHRoaXMudG9hc3QudGltZW91dCA6IHRoaXMudG9hc3RlcmNvbmZpZy50aW1lb3V0O1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGltZW91dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSB0aW1lb3V0W3RoaXMudG9hc3QudHlwZV07XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRvYXN0LmJvZHlPdXRwdXRUeXBlID09PSB0aGlzLmJvZHlPdXRwdXRUeXBlLkNvbXBvbmVudCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy50b2FzdC5ib2R5KTtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlOiBhbnkgPSB0aGlzLmNvbXBvbmVudEJvZHkuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCwgdW5kZWZpbmVkLCB0aGlzLmNvbXBvbmVudEJvZHkuaW5qZWN0b3IpO1xuICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2UuaW5zdGFuY2UudG9hc3QgPSB0aGlzLnRvYXN0O1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm1vdXNlb3ZlclRpbWVyU3RvcCkge1xuICAgICAgICAgICAgLy8gb25seSBhcHBseSBhIG1vdXNlZW50ZXIgZXZlbnQgd2hlbiBuZWNlc3NhcnkgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIHVubmVjZXNzYXJ5IGV2ZW50IGFuZCBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlcy5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW91c2VPdmVyTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyMi5saXN0ZW4oXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMuc3RvcFRpbWVyKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZVRpbWVyKCk7XG4gICAgfVxuXG4gICAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRvYXN0OiBUb2FzdCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5jbGlja0V2ZW50LmVtaXQoeyB2YWx1ZSA6IHsgdG9hc3Q6IHRvYXN0LCBpc0Nsb3NlQnV0dG9uOiB0cnVlIH0gfSk7XG4gICAgfVxuXG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAwO1xuICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gICAgcmVzdGFydFRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm1vdXNlb3ZlclRpbWVyU3RvcCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlVGltZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWVvdXQgJiYgIXRoaXMudGltZW91dElkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVtb3ZlTW91c2VPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW91c2VPdmVyTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maWd1cmVUaW1lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0IDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3RUaWNrID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyB0aGlzLnRpbWVvdXQ7XG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3QoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHRoaXMudGltZW91dCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhckludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0JhcigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUHJvZ3Jlc3NCYXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyV2lkdGggPT09IDAgfHwgdGhpcy5wcm9ncmVzc0JhcldpZHRoID09PSAxMDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAoKHRoaXMucmVtb3ZlVG9hc3RUaWNrIC0gbmV3IERhdGUoKS5nZXRUaW1lKCkpIC8gdGhpcy50aW1lb3V0KSAqIDEwMDtcblxuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0JhckRpcmVjdGlvbiA9PT0gJ2luY3JlYXNpbmcnKSB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwIC0gdGhpcy5wcm9ncmVzc0JhcldpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyV2lkdGggPCAwKSB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhcldpZHRoID4gMTAwKSB7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclRpbWVycygpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZW91dElkKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkID0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZVRvYXN0KCkge1xuICAgICAgICB0aGlzLnJlbW92ZVRvYXN0RXZlbnQuZW1pdCh0aGlzLnRvYXN0KTtcbiAgICB9XG59XG4iXX0=