(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('rxjs'), require('rxjs/operators'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('angular2-toaster', ['exports', '@angular/core', '@angular/animations', 'rxjs', 'rxjs/operators', '@angular/common', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["angular2-toaster"] = {}, global.ng.core, global.ng.animations, global.rxjs, global.rxjs.operators, global.ng.common, global.ng.platformBrowser));
})(this, (function (exports, i0, animations, rxjs, operators, i1$1, i1) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var Transitions = [
        animations.trigger('toastState', [
            animations.state('flyRight, flyLeft, slideDown, slideDown, slideUp, slideUp, fade', animations.style({ opacity: 1, transform: 'translate(0,0)' })),
            animations.transition('void => flyRight', [
                animations.style({
                    opacity: 0,
                    transform: 'translateX(100%)',
                    height: 0
                }),
                animations.animate('0.15s ease-in', animations.style({
                    opacity: 1,
                    height: '*'
                })),
                animations.animate('0.25s 15ms ease-in')
            ]),
            animations.transition('flyRight => void', [
                animations.animate('0.25s ease-out', animations.style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                })),
                animations.animate('0.15s ease-out', animations.style({
                    height: 0
                }))
            ]),
            animations.transition('void => flyLeft', [
                animations.style({
                    opacity: 0,
                    transform: 'translateX(-100%)',
                    height: 0
                }),
                animations.animate('0.15s ease-in', animations.style({
                    opacity: 1,
                    height: '*'
                })),
                animations.animate('0.25s 15ms ease-in')
            ]),
            animations.transition('flyLeft => void', [
                animations.animate('0.25s 10ms ease-out', animations.style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                })),
                animations.animate('0.15s ease-out', animations.style({
                    height: 0
                }))
            ]),
            animations.transition('void => slideDown', [
                animations.style({
                    opacity: 0,
                    transform: 'translateY(-500%)',
                    height: 0
                }),
                animations.group([
                    animations.animate('0.2s ease-in', animations.style({
                        height: '*'
                    })),
                    animations.animate('0.4s ease-in', animations.style({
                        transform: 'translate(0,0)'
                    })),
                    animations.animate('0.3s 0.1s ease-in', animations.style({
                        opacity: 1
                    }))
                ])
            ]),
            animations.transition('slideDown => void', animations.group([
                animations.animate('0.3s ease-out', animations.style({
                    opacity: 0
                })),
                animations.animate('0.4s ease-out', animations.style({
                    transform: 'translateY(-500%)'
                })),
                animations.animate('0.2s 0.2s ease-out', animations.style({
                    height: 0
                }))
            ])),
            animations.transition('void => slideUp', [
                animations.style({
                    opacity: 0,
                    transform: 'translateY(1000%)',
                    height: 0
                }),
                animations.group([
                    animations.animate('0.2s ease-in', animations.style({
                        height: '*'
                    })),
                    animations.animate('0.5s ease-in', animations.style({
                        transform: 'translate(0,0)'
                    })),
                    animations.animate('0.3s 0.1s ease-in', animations.style({
                        opacity: 1
                    }))
                ])
            ]),
            animations.transition('slideUp => void', animations.group([
                animations.animate('0.3s ease-out', animations.style({
                    opacity: 0
                })),
                animations.animate('0.5s ease-out', animations.style({
                    transform: 'translateY(1000%)'
                })),
                animations.animate('0.3s 0.15s ease-out', animations.style({
                    height: 0
                }))
            ])),
            animations.transition('void => fade', [
                animations.style({
                    opacity: 0,
                    height: 0
                }),
                animations.animate('0.20s ease-in', animations.style({
                    height: '*'
                })),
                animations.animate('0.15s ease-in', animations.style({
                    opacity: 1
                }))
            ]),
            animations.transition('fade => void', [
                animations.group([
                    animations.animate('0.0s ease-out', animations.style({
                        // reposition the background to prevent
                        // a ghost image during transition
                        'background-position': '-99999px'
                    })),
                    animations.animate('0.15s ease-out', animations.style({
                        opacity: 0,
                        'background-image': ''
                    })),
                    animations.animate('0.3s 20ms ease-out', animations.style({
                        height: 0
                    }))
                ])
            ])
        ]),
    ];

    exports.BodyOutputType = void 0;
    (function (BodyOutputType) {
        BodyOutputType[BodyOutputType["Default"] = 0] = "Default";
        BodyOutputType[BodyOutputType["TrustedHtml"] = 1] = "TrustedHtml";
        BodyOutputType[BodyOutputType["Component"] = 2] = "Component";
    })(exports.BodyOutputType || (exports.BodyOutputType = {}));

    var DefaultTypeClasses = {
        error: 'toast-error',
        info: 'toast-info',
        wait: 'toast-wait',
        success: 'toast-success',
        warning: 'toast-warning'
    };
    var DefaultIconClasses = {
        error: 'icon-error',
        info: 'icon-info',
        wait: 'icon-wait',
        success: 'icon-success',
        warning: 'icon-warning'
    };
    var ToasterConfig = /** @class */ (function () {
        function ToasterConfig(configOverrides) {
            configOverrides = configOverrides || {};
            this.limit = configOverrides.limit || null;
            this.tapToDismiss = configOverrides.tapToDismiss != null ? configOverrides.tapToDismiss : true;
            this.showCloseButton = configOverrides.showCloseButton != null ? configOverrides.showCloseButton : false;
            this.closeHtml = configOverrides.closeHtml || '<span>&times;</span>';
            this.newestOnTop = configOverrides.newestOnTop != null ? configOverrides.newestOnTop : true;
            this.timeout = configOverrides.timeout != null ? configOverrides.timeout : 5000;
            this.typeClasses = configOverrides.typeClasses || DefaultTypeClasses;
            this.iconClasses = configOverrides.iconClasses || DefaultIconClasses;
            this.bodyOutputType = configOverrides.bodyOutputType || exports.BodyOutputType.Default;
            this.bodyTemplate = configOverrides.bodyTemplate || 'toasterBodyTmpl.html';
            this.defaultToastType = configOverrides.defaultToastType || 'info';
            this.positionClass = configOverrides.positionClass || 'toast-top-right';
            this.titleClass = configOverrides.titleClass || 'toast-title';
            this.messageClass = configOverrides.messageClass || 'toast-message';
            this.animation = configOverrides.animation || '';
            this.preventDuplicates = configOverrides.preventDuplicates != null ? configOverrides.preventDuplicates : false;
            this.mouseoverTimerStop = configOverrides.mouseoverTimerStop != null ? configOverrides.mouseoverTimerStop : false;
            this.toastContainerId = configOverrides.toastContainerId != null ? configOverrides.toastContainerId : null;
        }
        return ToasterConfig;
    }());
    ToasterConfig.ɵfac = function ToasterConfig_Factory(t) { i0__namespace.ɵɵinvalidFactory(); };
    ToasterConfig.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: ToasterConfig, factory: ToasterConfig.ɵfac });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(ToasterConfig, [{
                type: i0.Injectable
            }], function () { return [{ type: undefined }]; }, null);
    })();

    // http://stackoverflow.com/questions/26501688/a-typescript-guid-class
    var Guid = /** @class */ (function () {
        function Guid() {
        }
        Guid.newGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        return Guid;
    }());
    var ToasterService = /** @class */ (function () {
        /**
         * Creates an instance of ToasterService.
         */
        function ToasterService() {
            var _this = this;
            this.addToast = new rxjs.Observable(function (observer) { return _this._addToast = observer; }).pipe(operators.share());
            this.clearToasts = new rxjs.Observable(function (observer) { return _this._clearToasts = observer; }).pipe(operators.share());
            this._removeToastSubject = new rxjs.Subject();
            this.removeToast = this._removeToastSubject.pipe(operators.share());
        }
        /**
         * Synchronously create and show a new toast instance.
         *
         * @param {(string | Toast)} type The type of the toast, or a Toast object.
         * @param {string=} title The toast title.
         * @param {string=} body The toast body.
         * @returns {Toast}
         *          The newly created Toast instance with a randomly generated GUID Id.
         */
        ToasterService.prototype.pop = function (type, title, body) {
            var toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;
            if (!toast.toastId) {
                toast.toastId = Guid.newGuid();
            }
            if (!this._addToast) {
                throw new Error('No Toaster Containers have been initialized to receive toasts.');
            }
            this._addToast.next(toast);
            return toast;
        };
        /**
         * Asynchronously create and show a new toast instance.
         *
         * @param {(string | Toast)} type The type of the toast, or a Toast object.
         * @param {string=} title The toast title.
         * @param {string=} body The toast body.
         * @returns {Observable<Toast>}
         *          A hot Observable that can be subscribed to in order to receive the Toast instance
         *          with a randomly generated GUID Id.
         */
        ToasterService.prototype.popAsync = function (type, title, body) {
            var _this = this;
            setTimeout(function () {
                _this.pop(type, title, body);
            }, 0);
            return this.addToast;
        };
        /**
         * Clears a toast by toastId and/or toastContainerId.
         *
         * @param {string} toastId The toastId to clear.
         * @param {number=} toastContainerId
         *        The toastContainerId of the container to remove toasts from.
         */
        ToasterService.prototype.clear = function (toastId, toastContainerId) {
            var clearWrapper = {
                toastId: toastId, toastContainerId: toastContainerId
            };
            this._clearToasts.next(clearWrapper);
        };
        return ToasterService;
    }());
    ToasterService.ɵfac = function ToasterService_Factory(t) { return new (t || ToasterService)(); };
    ToasterService.ɵprov = /*@__PURE__*/ i0__namespace.ɵɵdefineInjectable({ token: ToasterService, factory: ToasterService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(ToasterService, [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], function () { return []; }, null);
    })();

    var TrustHtmlPipe = /** @class */ (function () {
        function TrustHtmlPipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        TrustHtmlPipe.prototype.transform = function (content) {
            return this.sanitizer.bypassSecurityTrustHtml(content);
        };
        return TrustHtmlPipe;
    }());
    TrustHtmlPipe.ɵfac = function TrustHtmlPipe_Factory(t) { return new (t || TrustHtmlPipe)(i0__namespace.ɵɵdirectiveInject(i1__namespace.DomSanitizer, 16)); };
    TrustHtmlPipe.ɵpipe = /*@__PURE__*/ i0__namespace.ɵɵdefinePipe({ name: "trustHtml", type: TrustHtmlPipe, pure: true });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(TrustHtmlPipe, [{
                type: i0.Pipe,
                args: [{
                        name: 'trustHtml',
                        pure: true
                    }]
            }], function () { return [{ type: i1__namespace.DomSanitizer }]; }, null);
    })();

    var _c0$1 = ["componentBody"];
    var _c1$1 = ["toastComp", ""];
    function ToastComponent_div_4_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelement(0, "div", null, 7);
        }
    }
    function ToastComponent_div_5_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelement(0, "div", 8);
            i0__namespace.ɵɵpipe(1, "trustHtml");
        }
        if (rf & 2) {
            var ctx_r1 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵproperty("innerHTML", i0__namespace.ɵɵpipeBind1(1, 1, ctx_r1.toast.body), i0__namespace.ɵɵsanitizeHtml);
        }
    }
    function ToastComponent_div_6_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "div");
            i0__namespace.ɵɵtext(1);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r2 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵtextInterpolate(ctx_r2.toast.body);
        }
    }
    function ToastComponent_button_7_Template(rf, ctx) {
        if (rf & 1) {
            var _r7_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "button", 9);
            i0__namespace.ɵɵlistener("click", function ToastComponent_button_7_Template_button_click_0_listener($event) { i0__namespace.ɵɵrestoreView(_r7_1); var ctx_r6 = i0__namespace.ɵɵnextContext(); return ctx_r6.click($event, ctx_r6.toast); });
            i0__namespace.ɵɵpipe(1, "trustHtml");
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r3 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵproperty("innerHTML", i0__namespace.ɵɵpipeBind1(1, 1, ctx_r3.toast.closeHtml), i0__namespace.ɵɵsanitizeHtml);
        }
    }
    function ToastComponent_div_8_Template(rf, ctx) {
        if (rf & 1) {
            i0__namespace.ɵɵelementStart(0, "div");
            i0__namespace.ɵɵelement(1, "div", 10);
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r4 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵadvance(1);
            i0__namespace.ɵɵstyleProp("width", ctx_r4.progressBarWidth + "%");
        }
    }
    var ToastComponent = /** @class */ (function () {
        function ToastComponent(componentFactoryResolver, changeDetectorRef, ngZone, element, renderer2) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.changeDetectorRef = changeDetectorRef;
            this.ngZone = ngZone;
            this.element = element;
            this.renderer2 = renderer2;
            this.progressBarWidth = -1;
            this.bodyOutputType = exports.BodyOutputType;
            this.clickEvent = new i0.EventEmitter();
            this.removeToastEvent = new i0.EventEmitter();
            this.timeoutId = null;
            this.timeout = 0;
            this.progressBarIntervalId = null;
        }
        ToastComponent.prototype.ngOnInit = function () {
            if (this.toast.progressBar) {
                this.toast.progressBarDirection = this.toast.progressBarDirection || 'decreasing';
            }
            var timeout = (typeof this.toast.timeout === 'number')
                ? this.toast.timeout : this.toasterconfig.timeout;
            if (typeof timeout === 'object') {
                timeout = timeout[this.toast.type];
            }
            ;
            this.timeout = timeout;
        };
        ToastComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
                var component = this.componentFactoryResolver.resolveComponentFactory(this.toast.body);
                var componentInstance = this.componentBody.createComponent(component, undefined, this.componentBody.injector);
                componentInstance.instance.toast = this.toast;
                this.changeDetectorRef.detectChanges();
            }
            if (this.toasterconfig.mouseoverTimerStop) {
                // only apply a mouseenter event when necessary to avoid
                // unnecessary event and change detection cycles.
                this.removeMouseOverListener = this.renderer2.listen(this.element.nativeElement, 'mouseenter', function () { return _this.stopTimer(); });
            }
            this.configureTimer();
        };
        ToastComponent.prototype.click = function (event, toast) {
            event.stopPropagation();
            this.clickEvent.emit({ value: { toast: toast, isCloseButton: true } });
        };
        ToastComponent.prototype.stopTimer = function () {
            this.progressBarWidth = 0;
            this.clearTimers();
        };
        ToastComponent.prototype.restartTimer = function () {
            if (this.toasterconfig.mouseoverTimerStop) {
                if (!this.timeoutId) {
                    this.configureTimer();
                }
            }
            else if (this.timeout && !this.timeoutId) {
                this.removeToast();
            }
        };
        ToastComponent.prototype.ngOnDestroy = function () {
            if (this.removeMouseOverListener) {
                this.removeMouseOverListener();
            }
            this.clearTimers();
        };
        ToastComponent.prototype.configureTimer = function () {
            var _this = this;
            if (!this.timeout || this.timeout < 1) {
                return;
            }
            if (this.toast.progressBar) {
                this.removeToastTick = new Date().getTime() + this.timeout;
                this.progressBarWidth = -1;
            }
            this.ngZone.runOutsideAngular(function () {
                _this.timeoutId = window.setTimeout(function () {
                    _this.ngZone.run(function () {
                        _this.changeDetectorRef.markForCheck();
                        _this.removeToast();
                    });
                }, _this.timeout);
                if (_this.toast.progressBar) {
                    _this.progressBarIntervalId = window.setInterval(function () {
                        _this.ngZone.run(function () {
                            _this.updateProgressBar();
                        });
                    }, 10);
                }
            });
        };
        ToastComponent.prototype.updateProgressBar = function () {
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
        };
        ToastComponent.prototype.clearTimers = function () {
            if (this.timeoutId) {
                window.clearTimeout(this.timeoutId);
            }
            if (this.progressBarIntervalId) {
                window.clearInterval(this.progressBarIntervalId);
            }
            this.timeoutId = null;
            this.progressBarIntervalId = null;
        };
        ToastComponent.prototype.removeToast = function () {
            this.removeToastEvent.emit(this.toast);
        };
        return ToastComponent;
    }());
    ToastComponent.ɵfac = function ToastComponent_Factory(t) { return new (t || ToastComponent)(i0__namespace.ɵɵdirectiveInject(i0__namespace.ComponentFactoryResolver), i0__namespace.ɵɵdirectiveInject(i0__namespace.ChangeDetectorRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.NgZone), i0__namespace.ɵɵdirectiveInject(i0__namespace.ElementRef), i0__namespace.ɵɵdirectiveInject(i0__namespace.Renderer2)); };
    ToastComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: ToastComponent, selectors: [["", "toastComp", ""]], viewQuery: function ToastComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵviewQuery(_c0$1, 5, i0.ViewContainerRef);
            }
            if (rf & 2) {
                var _t = void 0;
                i0__namespace.ɵɵqueryRefresh(_t = i0__namespace.ɵɵloadQuery()) && (ctx.componentBody = _t.first);
            }
        }, hostBindings: function ToastComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵlistener("mouseleave", function ToastComponent_mouseleave_HostBindingHandler() { return ctx.restartTimer(); });
            }
        }, inputs: { toasterconfig: "toasterconfig", toast: "toast", titleClass: "titleClass", messageClass: "messageClass" }, outputs: { clickEvent: "clickEvent", removeToastEvent: "removeToastEvent" }, attrs: _c1$1, decls: 9, vars: 9, consts: [[1, "toast-content"], [3, "ngClass"], [3, "ngClass", "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], ["class", "toast-close-button", 3, "innerHTML", "click", 4, "ngIf"], [4, "ngIf"], ["componentBody", ""], [3, "innerHTML"], [1, "toast-close-button", 3, "innerHTML", "click"], [1, "toast-progress-bar"]], template: function ToastComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "div", 0);
                i0__namespace.ɵɵelementStart(1, "div", 1);
                i0__namespace.ɵɵtext(2);
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementStart(3, "div", 2);
                i0__namespace.ɵɵtemplate(4, ToastComponent_div_4_Template, 2, 0, "div", 3);
                i0__namespace.ɵɵtemplate(5, ToastComponent_div_5_Template, 2, 3, "div", 4);
                i0__namespace.ɵɵtemplate(6, ToastComponent_div_6_Template, 2, 1, "div", 3);
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵelementEnd();
                i0__namespace.ɵɵtemplate(7, ToastComponent_button_7_Template, 2, 3, "button", 5);
                i0__namespace.ɵɵtemplate(8, ToastComponent_div_8_Template, 2, 2, "div", 6);
            }
            if (rf & 2) {
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngClass", ctx.titleClass);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵtextInterpolate(ctx.toast.title);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngClass", ctx.messageClass)("ngSwitch", ctx.toast.bodyOutputType);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Component);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.TrustedHtml);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Default);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngIf", ctx.toast.showCloseButton);
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngIf", ctx.toast.progressBar);
            }
        }, directives: [i1__namespace$1.NgClass, i1__namespace$1.NgSwitch, i1__namespace$1.NgSwitchCase, i1__namespace$1.NgIf], pipes: [TrustHtmlPipe], encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(ToastComponent, [{
                type: i0.Component,
                args: [{
                        selector: '[toastComp]',
                        template: "\n        <div class=\"toast-content\">\n            <div [ngClass]=\"titleClass\">{{toast.title}}</div>\n            <div [ngClass]=\"messageClass\" [ngSwitch]=\"toast.bodyOutputType\">\n                <div *ngSwitchCase=\"bodyOutputType.Component\" #componentBody></div>\n                <div *ngSwitchCase=\"bodyOutputType.TrustedHtml\" [innerHTML]=\"toast.body | trustHtml\"></div>\n                <div *ngSwitchCase=\"bodyOutputType.Default\">{{toast.body}}</div>\n            </div>\n        </div>\n        <button class=\"toast-close-button\" *ngIf=\"toast.showCloseButton\" (click)=\"click($event, toast)\"\n            [innerHTML]=\"toast.closeHtml | trustHtml\">\n        </button>\n        <div *ngIf=\"toast.progressBar\">\n            <div class=\"toast-progress-bar\" [style.width]=\"progressBarWidth + '%'\"></div>\n        </div>"
                    }]
            }], function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.NgZone }, { type: i0__namespace.ElementRef }, { type: i0__namespace.Renderer2 }]; }, { toasterconfig: [{
                    type: i0.Input
                }], toast: [{
                    type: i0.Input
                }], titleClass: [{
                    type: i0.Input
                }], messageClass: [{
                    type: i0.Input
                }], componentBody: [{
                    type: i0.ViewChild,
                    args: ['componentBody', { read: i0.ViewContainerRef, static: false }]
                }], clickEvent: [{
                    type: i0.Output
                }], removeToastEvent: [{
                    type: i0.Output
                }], restartTimer: [{
                    type: i0.HostListener,
                    args: ['mouseleave']
                }] });
    })();

    var _c0 = function (a0, a1) { return [a0, a1]; };
    function ToasterContainerComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
            var _r3_1 = i0__namespace.ɵɵgetCurrentView();
            i0__namespace.ɵɵelementStart(0, "div", 2);
            i0__namespace.ɵɵlistener("click", function ToasterContainerComponent_div_1_Template_div_click_0_listener() { var restoredCtx = i0__namespace.ɵɵrestoreView(_r3_1); var toast_r1 = restoredCtx.$implicit; var ctx_r2 = i0__namespace.ɵɵnextContext(); return ctx_r2.click(toast_r1); })("clickEvent", function ToasterContainerComponent_div_1_Template_div_clickEvent_0_listener($event) { i0__namespace.ɵɵrestoreView(_r3_1); var ctx_r4 = i0__namespace.ɵɵnextContext(); return ctx_r4.childClick($event); })("removeToastEvent", function ToasterContainerComponent_div_1_Template_div_removeToastEvent_0_listener($event) { i0__namespace.ɵɵrestoreView(_r3_1); var ctx_r5 = i0__namespace.ɵɵnextContext(); return ctx_r5.removeToast($event); });
            i0__namespace.ɵɵelementEnd();
        }
        if (rf & 2) {
            var toast_r1 = ctx.$implicit;
            var ctx_r0 = i0__namespace.ɵɵnextContext();
            i0__namespace.ɵɵproperty("toast", toast_r1)("toasterconfig", ctx_r0.toasterconfig)("@toastState", ctx_r0.toasterconfig.animation)("titleClass", ctx_r0.toasterconfig.titleClass)("messageClass", ctx_r0.toasterconfig.messageClass)("ngClass", i0__namespace.ɵɵpureFunction2(6, _c0, ctx_r0.toasterconfig.iconClasses[toast_r1.type], ctx_r0.toasterconfig.typeClasses[toast_r1.type]));
        }
    }
    var _c1 = function (a0) { return [a0]; };
    var ToasterContainerComponent = /** @class */ (function () {
        function ToasterContainerComponent(toasterService) {
            this.toasts = [];
            this.toasterService = toasterService;
        }
        ToasterContainerComponent.prototype.ngOnInit = function () {
            this.registerSubscribers();
            if (this.isNullOrUndefined(this.toasterconfig)) {
                this.toasterconfig = new ToasterConfig();
            }
        };
        // event handlers
        ToasterContainerComponent.prototype.click = function (toast, isCloseButton) {
            if (toast.onClickCallback) {
                toast.onClickCallback(toast);
            }
            var tapToDismiss = !this.isNullOrUndefined(toast.tapToDismiss)
                ? toast.tapToDismiss
                : this.toasterconfig.tapToDismiss;
            if (tapToDismiss || (toast.showCloseButton && isCloseButton)) {
                this.removeToast(toast);
            }
        };
        ToasterContainerComponent.prototype.childClick = function ($event) {
            this.click($event.value.toast, $event.value.isCloseButton);
        };
        ToasterContainerComponent.prototype.removeToast = function (toast) {
            var index = this.toasts.indexOf(toast);
            if (index < 0) {
                return;
            }
            ;
            var toastId = this.toastIdOrDefault(toast);
            this.toasts.splice(index, 1);
            if (toast.onHideCallback) {
                toast.onHideCallback(toast);
            }
            this.toasterService._removeToastSubject.next({ toastId: toastId, toastContainerId: toast.toastContainerId });
        };
        // private functions
        ToasterContainerComponent.prototype.registerSubscribers = function () {
            var _this = this;
            this.addToastSubscriber = this.toasterService.addToast.subscribe(function (toast) {
                _this.addToast(toast);
            });
            this.clearToastsSubscriber = this.toasterService.clearToasts.subscribe(function (clearWrapper) {
                _this.clearToasts(clearWrapper);
            });
        };
        ToasterContainerComponent.prototype.addToast = function (toast) {
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
                if (toast.toastId && this.toasts.some(function (t) { return t.toastId === toast.toastId; })) {
                    return;
                }
                else if (this.toasts.some(function (t) { return t.body === toast.body; })) {
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
        };
        ToasterContainerComponent.prototype.isLimitExceeded = function () {
            return this.toasterconfig.limit && this.toasts.length > this.toasterconfig.limit;
        };
        ToasterContainerComponent.prototype.removeAllToasts = function () {
            for (var i = this.toasts.length - 1; i >= 0; i--) {
                this.removeToast(this.toasts[i]);
            }
        };
        ToasterContainerComponent.prototype.clearToasts = function (clearWrapper) {
            var toastId = clearWrapper.toastId;
            var toastContainerId = clearWrapper.toastContainerId;
            if (this.isNullOrUndefined(toastContainerId) || (toastContainerId === this.toasterconfig.toastContainerId)) {
                this.clearToastsAction(toastId);
            }
        };
        ToasterContainerComponent.prototype.clearToastsAction = function (toastId) {
            if (toastId) {
                this.removeToast(this.toasts.filter(function (t) { return t.toastId === toastId; })[0]);
            }
            else {
                this.removeAllToasts();
            }
        };
        ToasterContainerComponent.prototype.toastIdOrDefault = function (toast) {
            return toast.toastId || '';
        };
        ToasterContainerComponent.prototype.isNullOrUndefined = function (value) {
            return value === null || typeof value === 'undefined';
        };
        ToasterContainerComponent.prototype.ngOnDestroy = function () {
            if (this.addToastSubscriber) {
                this.addToastSubscriber.unsubscribe();
            }
            if (this.clearToastsSubscriber) {
                this.clearToastsSubscriber.unsubscribe();
            }
        };
        return ToasterContainerComponent;
    }());
    ToasterContainerComponent.ɵfac = function ToasterContainerComponent_Factory(t) { return new (t || ToasterContainerComponent)(i0__namespace.ɵɵdirectiveInject(ToasterService)); };
    ToasterContainerComponent.ɵcmp = /*@__PURE__*/ i0__namespace.ɵɵdefineComponent({ type: ToasterContainerComponent, selectors: [["toaster-container"]], inputs: { toasterconfig: "toasterconfig" }, decls: 2, vars: 4, consts: [[1, "toast-container", 3, "ngClass"], ["toastComp", "", "class", "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent", 4, "ngFor", "ngForOf"], ["toastComp", "", 1, "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent"]], template: function ToasterContainerComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0__namespace.ɵɵelementStart(0, "div", 0);
                i0__namespace.ɵɵtemplate(1, ToasterContainerComponent_div_1_Template, 1, 9, "div", 1);
                i0__namespace.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0__namespace.ɵɵproperty("ngClass", i0__namespace.ɵɵpureFunction1(2, _c1, ctx.toasterconfig.positionClass));
                i0__namespace.ɵɵadvance(1);
                i0__namespace.ɵɵproperty("ngForOf", ctx.toasts);
            }
        }, directives: [i1__namespace$1.NgClass, i1__namespace$1.NgForOf, ToastComponent], encapsulation: 2, data: { animation: Transitions } });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(ToasterContainerComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'toaster-container',
                        template: "\n        <div class=\"toast-container\" [ngClass]=\"[toasterconfig.positionClass]\">\n            <div toastComp *ngFor=\"let toast of toasts\" class=\"toast\" [toast]=\"toast\"\n                [toasterconfig]=\"toasterconfig\"\n                [@toastState]=\"toasterconfig.animation\"\n                [titleClass]=\"toasterconfig.titleClass\"\n                [messageClass]=\"toasterconfig.messageClass\"\n                [ngClass]=\"[\n                    toasterconfig.iconClasses[toast.type],\n                    toasterconfig.typeClasses[toast.type]\n                ]\"\n                (click)=\"click(toast)\" (clickEvent)=\"childClick($event)\"\n                (removeToastEvent)=\"removeToast($event)\"\n            >\n            </div>\n        </div>\n        ",
                        animations: Transitions
                    }]
            }], function () { return [{ type: ToasterService }]; }, { toasterconfig: [{
                    type: i0.Input
                }] });
    })();

    var ToasterModule = /** @class */ (function () {
        function ToasterModule() {
        }
        ToasterModule.forRoot = function () {
            return {
                ngModule: ToasterModule,
                providers: [ToasterService, ToasterContainerComponent]
            };
        };
        ToasterModule.forChild = function () {
            return {
                ngModule: ToasterModule,
                providers: [ToasterContainerComponent]
            };
        };
        return ToasterModule;
    }());
    ToasterModule.ɵfac = function ToasterModule_Factory(t) { return new (t || ToasterModule)(); };
    ToasterModule.ɵmod = /*@__PURE__*/ i0__namespace.ɵɵdefineNgModule({ type: ToasterModule });
    ToasterModule.ɵinj = /*@__PURE__*/ i0__namespace.ɵɵdefineInjector({ imports: [[i1$1.CommonModule]] });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0__namespace.ɵsetClassMetadata(ToasterModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [i1$1.CommonModule],
                        declarations: [
                            ToastComponent,
                            ToasterContainerComponent,
                            TrustHtmlPipe
                        ],
                        exports: [
                            ToasterContainerComponent,
                            ToastComponent
                        ]
                    }]
            }], null, null);
    })();
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0__namespace.ɵɵsetNgModuleScope(ToasterModule, { declarations: [ToastComponent,
                ToasterContainerComponent,
                TrustHtmlPipe], imports: [i1$1.CommonModule], exports: [ToasterContainerComponent,
                ToastComponent] });
    })();

    /*
     * Public API Surface of angular2-toaster
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.DefaultIconClasses = DefaultIconClasses;
    exports.DefaultTypeClasses = DefaultTypeClasses;
    exports.ToastComponent = ToastComponent;
    exports.ToasterConfig = ToasterConfig;
    exports.ToasterContainerComponent = ToasterContainerComponent;
    exports.ToasterModule = ToasterModule;
    exports.ToasterService = ToasterService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=angular2-toaster.umd.js.map
