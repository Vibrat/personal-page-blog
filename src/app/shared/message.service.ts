import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";

/**
 * @Example
 *  startShowMessages(): void {
 *   this._message
 *     .loading('Action in progress', { nzDuration: 2500 })
 *     .onClose!.pipe(
 *       concatMap(() => this._message.success('Loading finished', { nzDuration: 2500 }).onClose!),
 *       concatMap(() => this._message.info('Loading finished is finished', { nzDuration: 2500 }).onClose!)
 *     )
 *     .subscribe(() => {
 *       console.log('All completed!');
 *     });
 * }
 */
@Injectable({
  providedIn: "root"
})
export class MessageService {
  constructor(private _message: NzMessageService) {}

  success(message: string, duration: number = 2500) {
    return this._message.success(message, { nzDuration: duration }).onClose!;
  }

  error(message: string, duration: number = 2500) {
    return this._message.error(message, { nzDuration: duration }).onClose!;
  }

  loadding(message, duration: number = 2500) {
    return this._message.loading(message, { nzDuration: duration }).onClose!;
  }

  info(message: string, duration: number = 2500) {
    return this._message.info(message, { nzDuration: duration }).onClose!;
  }

  warn(message: string, duration: number = 2500) {
    return this._message.warning(message, { nzDuration: duration }).onClose!;
  }
}
