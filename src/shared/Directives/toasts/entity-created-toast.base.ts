import { Toast } from 'ngx-toastr';
import { Router } from '@angular/router';

export abstract class EntityCreatedToast<TEntity, TService> extends Toast {

  protected _entity: TEntity;
  protected _service: TService;
  private _router: Router;

  public set entity(value: TEntity) {
    if(value)
      this._entity = value;
  }

  public set service(value: TService) {
    if(value)
      this._service = value;
  }

  public set router(value: Router) {
    if(value)
      this._router = value;
  }
}
