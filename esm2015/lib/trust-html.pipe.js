import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class TrustHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}
TrustHtmlPipe.ɵfac = function TrustHtmlPipe_Factory(t) { return new (t || TrustHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer, 16)); };
TrustHtmlPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "trustHtml", type: TrustHtmlPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrustHtmlPipe, [{
        type: Pipe,
        args: [{
                name: 'trustHtml',
                pure: true
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3QtaHRtbC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90cnVzdC1odG1sLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQU9wRCxNQUFNLE9BQU8sYUFBYTtJQUN0QixZQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQzNDLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7MEVBTlEsYUFBYTsrRUFBYixhQUFhO3VGQUFiLGFBQWE7Y0FKekIsSUFBSTtlQUFDO2dCQUNGLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsSUFBSTthQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gICAgbmFtZTogJ3RydXN0SHRtbCcsXG4gICAgcHVyZTogdHJ1ZVxufSlcbmV4cG9ydCBjbGFzcyBUcnVzdEh0bWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIH1cblxuICAgIHRyYW5zZm9ybShjb250ZW50OiBhbnkpOiBTYWZlSHRtbCB7XG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChjb250ZW50KTtcbiAgICB9XG59XG4iXX0=