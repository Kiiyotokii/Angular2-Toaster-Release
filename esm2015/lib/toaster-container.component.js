import { Component, Input } from '@angular/core';
import { Transitions } from './transitions';
import { ToasterConfig } from './toaster-config';
import * as i0 from "@angular/core";
import * as i1 from "./toaster.service";
import * as i2 from "@angular/common";
import * as i3 from "./toast.component";
const _c0 = function (a0, a1) { return [a0, a1]; };
function ToasterContainerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵlistener("click", function ToasterContainerComponent_div_1_Template_div_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r3); const toast_r1 = restoredCtx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.click(toast_r1); })("clickEvent", function ToasterContainerComponent_div_1_Template_div_clickEvent_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.childClick($event); })("removeToastEvent", function ToasterContainerComponent_div_1_Template_div_removeToastEvent_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeToast($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("toast", toast_r1)("toasterconfig", ctx_r0.toasterconfig)("@toastState", ctx_r0.toasterconfig.animation)("titleClass", ctx_r0.toasterconfig.titleClass)("messageClass", ctx_r0.toasterconfig.messageClass)("ngClass", i0.ɵɵpureFunction2(6, _c0, ctx_r0.toasterconfig.iconClasses[toast_r1.type], ctx_r0.toasterconfig.typeClasses[toast_r1.type]));
} }
const _c1 = function (a0) { return [a0]; };
export class ToasterContainerComponent {
    constructor(toasterService) {
        this.toasts = [];
        this.toasterService = toasterService;
    }
    ngOnInit() {
        this.registerSubscribers();
        if (this.isNullOrUndefined(this.toasterconfig)) {
            this.toasterconfig = new ToasterConfig();
        }
    }
    // event handlers
    click(toast, isCloseButton) {
        if (toast.onClickCallback) {
            toast.onClickCallback(toast);
        }
        const tapToDismiss = !this.isNullOrUndefined(toast.tapToDismiss)
            ? toast.tapToDismiss
            : this.toasterconfig.tapToDismiss;
        if (tapToDismiss || (toast.showCloseButton && isCloseButton)) {
            this.removeToast(toast);
        }
    }
    childClick($event) {
        this.click($event.value.toast, $event.value.isCloseButton);
    }
    removeToast(toast) {
        const index = this.toasts.indexOf(toast);
        if (index < 0) {
            return;
        }
        ;
        const toastId = this.toastIdOrDefault(toast);
        this.toasts.splice(index, 1);
        if (toast.onHideCallback) {
            toast.onHideCallback(toast);
        }
        this.toasterService._removeToastSubject.next({ toastId: toastId, toastContainerId: toast.toastContainerId });
    }
    // private functions
    registerSubscribers() {
        this.addToastSubscriber = this.toasterService.addToast.subscribe((toast) => {
            this.addToast(toast);
        });
        this.clearToastsSubscriber = this.toasterService.clearToasts.subscribe((clearWrapper) => {
            this.clearToasts(clearWrapper);
        });
    }
    addToast(toast) {
        if (toast.toastContainerId && this.toasterconfig.toastContainerId
            && toast.toastContainerId !== this.toasterconfig.toastContainerId) {
            return;
        }
        ;
        if (!toast.type
            || !this.toasterconfig.typeClasses[toast.type]
            || !this.toasterconfig.iconClasses[toast.type]) {
            toast.type = this.toasterconfig.defaultToastType;
        }
        if (this.toasterconfig.preventDuplicates && this.toasts.length > 0) {
            if (toast.toastId && this.toasts.some(t => t.toastId === toast.toastId)) {
                return;
            }
            else if (this.toasts.some(t => t.body === toast.body)) {
                return;
            }
        }
        if (this.isNullOrUndefined(toast.showCloseButton)) {
            if (typeof this.toasterconfig.showCloseButton === 'object') {
                toast.showCloseButton = this.toasterconfig.showCloseButton[toast.type];
            }
            else if (typeof this.toasterconfig.showCloseButton === 'boolean') {
                toast.showCloseButton = this.toasterconfig.showCloseButton;
            }
        }
        if (toast.showCloseButton) {
            toast.closeHtml = toast.closeHtml || this.toasterconfig.closeHtml;
        }
        toast.bodyOutputType = toast.bodyOutputType || this.toasterconfig.bodyOutputType;
        if (this.toasterconfig.newestOnTop) {
            this.toasts.unshift(toast);
            if (this.isLimitExceeded()) {
                this.toasts.pop();
            }
        }
        else {
            this.toasts.push(toast);
            if (this.isLimitExceeded()) {
                this.toasts.shift();
            }
        }
        if (toast.onShowCallback) {
            toast.onShowCallback(toast);
        }
    }
    isLimitExceeded() {
        return this.toasterconfig.limit && this.toasts.length > this.toasterconfig.limit;
    }
    removeAllToasts() {
        for (let i = this.toasts.length - 1; i >= 0; i--) {
            this.removeToast(this.toasts[i]);
        }
    }
    clearToasts(clearWrapper) {
        const toastId = clearWrapper.toastId;
        const toastContainerId = clearWrapper.toastContainerId;
        if (this.isNullOrUndefined(toastContainerId) || (toastContainerId === this.toasterconfig.toastContainerId)) {
            this.clearToastsAction(toastId);
        }
    }
    clearToastsAction(toastId) {
        if (toastId) {
            this.removeToast(this.toasts.filter(t => t.toastId === toastId)[0]);
        }
        else {
            this.removeAllToasts();
        }
    }
    toastIdOrDefault(toast) {
        return toast.toastId || '';
    }
    isNullOrUndefined(value) {
        return value === null || typeof value === 'undefined';
    }
    ngOnDestroy() {
        if (this.addToastSubscriber) {
            this.addToastSubscriber.unsubscribe();
        }
        if (this.clearToastsSubscriber) {
            this.clearToastsSubscriber.unsubscribe();
        }
    }
}
ToasterContainerComponent.ɵfac = function ToasterContainerComponent_Factory(t) { return new (t || ToasterContainerComponent)(i0.ɵɵdirectiveInject(i1.ToasterService)); };
ToasterContainerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToasterContainerComponent, selectors: [["toaster-container"]], inputs: { toasterconfig: "toasterconfig" }, decls: 2, vars: 4, consts: [[1, "toast-container", 3, "ngClass"], ["toastComp", "", "class", "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent", 4, "ngFor", "ngForOf"], ["toastComp", "", 1, "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent"]], template: function ToasterContainerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, ToasterContainerComponent_div_1_Template, 1, 9, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, ctx.toasterconfig.positionClass));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.toasts);
    } }, directives: [i2.NgClass, i2.NgForOf, i3.ToastComponent], encapsulation: 2, data: { animation: Transitions } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterContainerComponent, [{
        type: Component,
        args: [{
                selector: 'toaster-container',
                template: `
        <div class="toast-container" [ngClass]="[toasterconfig.positionClass]">
            <div toastComp *ngFor="let toast of toasts" class="toast" [toast]="toast"
                [toasterconfig]="toasterconfig"
                [@toastState]="toasterconfig.animation"
                [titleClass]="toasterconfig.titleClass"
                [messageClass]="toasterconfig.messageClass"
                [ngClass]="[
                    toasterconfig.iconClasses[toast.type],
                    toasterconfig.typeClasses[toast.type]
                ]"
                (click)="click(toast)" (clickEvent)="childClick($event)"
                (removeToastEvent)="removeToast($event)"
            >
            </div>
        </div>
        `,
                animations: Transitions
            }]
    }], function () { return [{ type: i1.ToasterService }]; }, { toasterconfig: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7O0lBU3JDLDhCQVdDO0lBRkcseVBBQXNCLG1NQUFBLGdOQUFBO0lBRzFCLGlCQUFNOzs7O0lBWm9ELGdDQUFlLHVDQUFBLCtDQUFBLCtDQUFBLG1EQUFBLHlJQUFBOzs7QUFpQnJGLE1BQU0sT0FBTyx5QkFBeUI7SUFTbEMsWUFBWSxjQUE4QjtRQUZuQyxXQUFNLEdBQVksRUFBRSxDQUFDO1FBR3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsS0FBSyxDQUFDLEtBQVksRUFBRSxhQUF1QjtRQUN2QyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDdkIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztRQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7WUFDNUQsQ0FBQyxDQUFDLEtBQUss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QyxPQUFPLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUFVO1FBQ2hDLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUM7SUFDMUQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO1FBQ3ZFLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUU7SUFDakYsQ0FBQzs7a0dBckpRLHlCQUF5Qjs0RUFBekIseUJBQXlCO1FBbEI5Qiw4QkFBdUU7UUFDbkUsMEVBWU07UUFDVixpQkFBTTs7UUFkdUIscUZBQXlDO1FBQ2pDLGVBQVM7UUFBVCxvQ0FBUzt1R0FldEMsV0FBVzt1RkFFZCx5QkFBeUI7Y0FyQnJDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkw7Z0JBQ0wsVUFBVSxFQUFFLFdBQVc7YUFDMUI7aUVBTVksYUFBYTtrQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxuICAgIENvbXBvbmVudCxcbiAgICBJbnB1dCwgXG4gICAgT25Jbml0LFxuICAgIE9uRGVzdHJveSBcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2l0aW9ucyB9IGZyb20gJy4vdHJhbnNpdGlvbnMnO1xuaW1wb3J0IHsgVG9hc3RlckNvbmZpZyB9IGZyb20gJy4vdG9hc3Rlci1jb25maWcnO1xuaW1wb3J0IHsgVG9hc3RlclNlcnZpY2V9IGZyb20gJy4vdG9hc3Rlci5zZXJ2aWNlJztcbmltcG9ydCB7IElDbGVhcldyYXBwZXIgfSBmcm9tICcuL2NsZWFyV3JhcHBlcic7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vdG9hc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3RvYXN0ZXItY29udGFpbmVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9hc3QtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwiW3RvYXN0ZXJjb25maWcucG9zaXRpb25DbGFzc11cIj5cbiAgICAgICAgICAgIDxkaXYgdG9hc3RDb21wICpuZ0Zvcj1cImxldCB0b2FzdCBvZiB0b2FzdHNcIiBjbGFzcz1cInRvYXN0XCIgW3RvYXN0XT1cInRvYXN0XCJcbiAgICAgICAgICAgICAgICBbdG9hc3RlcmNvbmZpZ109XCJ0b2FzdGVyY29uZmlnXCJcbiAgICAgICAgICAgICAgICBbQHRvYXN0U3RhdGVdPVwidG9hc3RlcmNvbmZpZy5hbmltYXRpb25cIlxuICAgICAgICAgICAgICAgIFt0aXRsZUNsYXNzXT1cInRvYXN0ZXJjb25maWcudGl0bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgW21lc3NhZ2VDbGFzc109XCJ0b2FzdGVyY29uZmlnLm1lc3NhZ2VDbGFzc1wiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiW1xuICAgICAgICAgICAgICAgICAgICB0b2FzdGVyY29uZmlnLmljb25DbGFzc2VzW3RvYXN0LnR5cGVdLFxuICAgICAgICAgICAgICAgICAgICB0b2FzdGVyY29uZmlnLnR5cGVDbGFzc2VzW3RvYXN0LnR5cGVdXG4gICAgICAgICAgICAgICAgXVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsaWNrKHRvYXN0KVwiIChjbGlja0V2ZW50KT1cImNoaWxkQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKHJlbW92ZVRvYXN0RXZlbnQpPVwicmVtb3ZlVG9hc3QoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGAsXG4gICAgYW5pbWF0aW9uczogVHJhbnNpdGlvbnNcbn0pXG5leHBvcnQgY2xhc3MgVG9hc3RlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBwcml2YXRlIGFkZFRvYXN0U3Vic2NyaWJlcjogYW55O1xuICAgIHByaXZhdGUgY2xlYXJUb2FzdHNTdWJzY3JpYmVyOiBhbnk7XG4gICAgcHJpdmF0ZSB0b2FzdGVyU2VydmljZTogVG9hc3RlclNlcnZpY2U7XG5cbiAgICBASW5wdXQoKSB0b2FzdGVyY29uZmlnOiBUb2FzdGVyQ29uZmlnO1xuXG4gICAgcHVibGljIHRvYXN0czogVG9hc3RbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IodG9hc3RlclNlcnZpY2U6IFRvYXN0ZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudG9hc3RlclNlcnZpY2UgPSB0b2FzdGVyU2VydmljZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlclN1YnNjcmliZXJzKCk7XG4gICAgICAgIGlmICh0aGlzLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudG9hc3RlcmNvbmZpZykpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RlcmNvbmZpZyA9IG5ldyBUb2FzdGVyQ29uZmlnKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBldmVudCBoYW5kbGVyc1xuICAgIGNsaWNrKHRvYXN0OiBUb2FzdCwgaXNDbG9zZUJ1dHRvbj86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRvYXN0Lm9uQ2xpY2tDYWxsYmFjaykge1xuICAgICAgICAgICAgdG9hc3Qub25DbGlja0NhbGxiYWNrKHRvYXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhcFRvRGlzbWlzcyA9ICF0aGlzLmlzTnVsbE9yVW5kZWZpbmVkKHRvYXN0LnRhcFRvRGlzbWlzcykgXG4gICAgICAgICAgICA/IHRvYXN0LnRhcFRvRGlzbWlzc1xuICAgICAgICAgICAgOiB0aGlzLnRvYXN0ZXJjb25maWcudGFwVG9EaXNtaXNzO1xuXG4gICAgICAgIGlmICh0YXBUb0Rpc21pc3MgfHwgKHRvYXN0LnNob3dDbG9zZUJ1dHRvbiAmJiBpc0Nsb3NlQnV0dG9uKSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCh0b2FzdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGlsZENsaWNrKCRldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuY2xpY2soJGV2ZW50LnZhbHVlLnRvYXN0LCAkZXZlbnQudmFsdWUuaXNDbG9zZUJ1dHRvbik7XG4gICAgfVxuXG4gICAgcmVtb3ZlVG9hc3QodG9hc3Q6IFRvYXN0KSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50b2FzdHMuaW5kZXhPZih0b2FzdCk7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHsgcmV0dXJuIH07XG5cbiAgICAgICAgY29uc3QgdG9hc3RJZCA9IHRoaXMudG9hc3RJZE9yRGVmYXVsdCh0b2FzdCk7XG5cbiAgICAgICAgdGhpcy50b2FzdHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICBpZiAodG9hc3Qub25IaWRlQ2FsbGJhY2spIHsgdG9hc3Qub25IaWRlQ2FsbGJhY2sodG9hc3QpOyB9XG4gICAgICAgIHRoaXMudG9hc3RlclNlcnZpY2UuX3JlbW92ZVRvYXN0U3ViamVjdC5uZXh0KHsgdG9hc3RJZDogdG9hc3RJZCwgdG9hc3RDb250YWluZXJJZDogdG9hc3QudG9hc3RDb250YWluZXJJZCB9KTtcbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xuICAgIHByaXZhdGUgcmVnaXN0ZXJTdWJzY3JpYmVycygpIHtcbiAgICAgICAgdGhpcy5hZGRUb2FzdFN1YnNjcmliZXIgPSB0aGlzLnRvYXN0ZXJTZXJ2aWNlLmFkZFRvYXN0LnN1YnNjcmliZSgodG9hc3Q6IFRvYXN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvYXN0KHRvYXN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbGVhclRvYXN0c1N1YnNjcmliZXIgPSB0aGlzLnRvYXN0ZXJTZXJ2aWNlLmNsZWFyVG9hc3RzLnN1YnNjcmliZSgoY2xlYXJXcmFwcGVyOiBJQ2xlYXJXcmFwcGVyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVG9hc3RzKGNsZWFyV3JhcHBlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9hc3QodG9hc3Q6IFRvYXN0KSB7XG4gICAgICAgIGlmICh0b2FzdC50b2FzdENvbnRhaW5lcklkICYmIHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkXG4gICAgICAgICAgICAmJiB0b2FzdC50b2FzdENvbnRhaW5lcklkICE9PSB0aGlzLnRvYXN0ZXJjb25maWcudG9hc3RDb250YWluZXJJZCkgeyByZXR1cm4gfTtcblxuICAgICAgICBpZiAoIXRvYXN0LnR5cGUgXG4gICAgICAgICAgICB8fCAhdGhpcy50b2FzdGVyY29uZmlnLnR5cGVDbGFzc2VzW3RvYXN0LnR5cGVdXG4gICAgICAgICAgICB8fCAhdGhpcy50b2FzdGVyY29uZmlnLmljb25DbGFzc2VzW3RvYXN0LnR5cGVdKSB7XG4gICAgICAgICAgICB0b2FzdC50eXBlID0gdGhpcy50b2FzdGVyY29uZmlnLmRlZmF1bHRUb2FzdFR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLnByZXZlbnREdXBsaWNhdGVzICYmIHRoaXMudG9hc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICh0b2FzdC50b2FzdElkICYmIHRoaXMudG9hc3RzLnNvbWUodCA9PiB0LnRvYXN0SWQgPT09IHRvYXN0LnRvYXN0SWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvYXN0cy5zb21lKHQgPT4gdC5ib2R5ID09PSB0b2FzdC5ib2R5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTnVsbE9yVW5kZWZpbmVkKHRvYXN0LnNob3dDbG9zZUJ1dHRvbikpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvbiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0b2FzdC5zaG93Q2xvc2VCdXR0b24gPSB0aGlzLnRvYXN0ZXJjb25maWcuc2hvd0Nsb3NlQnV0dG9uW3RvYXN0LnR5cGVdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvbiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgdG9hc3Quc2hvd0Nsb3NlQnV0dG9uID0gPGJvb2xlYW4+dGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b2FzdC5zaG93Q2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHRvYXN0LmNsb3NlSHRtbCA9IHRvYXN0LmNsb3NlSHRtbCB8fCB0aGlzLnRvYXN0ZXJjb25maWcuY2xvc2VIdG1sO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9hc3QuYm9keU91dHB1dFR5cGUgPSB0b2FzdC5ib2R5T3V0cHV0VHlwZSB8fCB0aGlzLnRvYXN0ZXJjb25maWcuYm9keU91dHB1dFR5cGU7XG5cbiAgICAgICAgaWYgKHRoaXMudG9hc3RlcmNvbmZpZy5uZXdlc3RPblRvcCkge1xuICAgICAgICAgICAgdGhpcy50b2FzdHMudW5zaGlmdCh0b2FzdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0xpbWl0RXhjZWVkZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RzLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2FzdHMucHVzaCh0b2FzdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0xpbWl0RXhjZWVkZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RzLnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9hc3Qub25TaG93Q2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRvYXN0Lm9uU2hvd0NhbGxiYWNrKHRvYXN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNMaW1pdEV4Y2VlZGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b2FzdGVyY29uZmlnLmxpbWl0ICYmIHRoaXMudG9hc3RzLmxlbmd0aCA+IHRoaXMudG9hc3RlcmNvbmZpZy5saW1pdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUFsbFRvYXN0cygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMudG9hc3RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRoaXMudG9hc3RzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2xlYXJUb2FzdHMoY2xlYXJXcmFwcGVyOiBJQ2xlYXJXcmFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHRvYXN0SWQgPSBjbGVhcldyYXBwZXIudG9hc3RJZCA7XG4gICAgICAgIGNvbnN0IHRvYXN0Q29udGFpbmVySWQgPSBjbGVhcldyYXBwZXIudG9hc3RDb250YWluZXJJZDtcblxuICAgICAgICBpZiAodGhpcy5pc051bGxPclVuZGVmaW5lZCh0b2FzdENvbnRhaW5lcklkKSB8fCAodG9hc3RDb250YWluZXJJZCA9PT0gdGhpcy50b2FzdGVyY29uZmlnLnRvYXN0Q29udGFpbmVySWQpKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVG9hc3RzQWN0aW9uKHRvYXN0SWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjbGVhclRvYXN0c0FjdGlvbih0b2FzdElkPzogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0b2FzdElkKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRoaXMudG9hc3RzLmZpbHRlcih0ID0+IHQudG9hc3RJZCA9PT0gdG9hc3RJZClbMF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBbGxUb2FzdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdG9hc3RJZE9yRGVmYXVsdCh0b2FzdDogVG9hc3QpIHtcbiAgICAgICAgcmV0dXJuIHRvYXN0LnRvYXN0SWQgfHwgJyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc051bGxPclVuZGVmaW5lZCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5hZGRUb2FzdFN1YnNjcmliZXIpIHsgdGhpcy5hZGRUb2FzdFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTsgfVxuICAgICAgICBpZiAodGhpcy5jbGVhclRvYXN0c1N1YnNjcmliZXIpIHsgdGhpcy5jbGVhclRvYXN0c1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTsgfVxuICAgIH1cbn1cbiJdfQ==