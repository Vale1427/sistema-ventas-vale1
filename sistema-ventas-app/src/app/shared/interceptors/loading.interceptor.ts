import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize, Observable } from "rxjs";

var countRequest = 0;

export function loadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log("Loading::Interceptor");
  countRequest++;
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  return next(req).pipe(finalize(() => {
    countRequest--;
    if(!countRequest) {
      spinner.hide();
    }
  }));
}

// @Injectable({
//   providedIn: "root"
// })
// export class LoadingInterceptor implements HttpInterceptor {
//   private countRequest = 0;
//   constructor(private spinner: NgxSpinnerService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log("Loading::Interceptor");  
//     this.spinner.show();
//       this.countRequest++;
//       return next.handle(req).pipe(finalize( () => {
//         this.countRequest--;
//         if (!this.countRequest) {
//           this.spinner.hide();
//         }
//       }));
//   }
// }
