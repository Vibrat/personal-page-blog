import { Injectable } from "@angular/core";
import { NzMessageService } from 'ng-zorro-antd';
import { concatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

constructor(private _message: NzMessageService) {}

  // Example only.
  startShowMessages(): void {
    this._message
      .loading('Action in progress', { nzDuration: 2500 })
      .onClose!.pipe(
        concatMap(() => this._message.success('Loading finished', { nzDuration: 2500 }).onClose!),
        concatMap(() => this._message.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
      )
      .subscribe(() => {
        console.log('All completed!');
      });
  }
}