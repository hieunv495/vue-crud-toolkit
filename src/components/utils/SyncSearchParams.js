import deepEqual from "deep-equal";
import getSearchParams from "./getSearchParams";
import setSearchParams from "./setSearchParams";

export default class SyncSearchParams {
  constructor({ paramTypes, paramsGetter, paramsSetter, historyPush }) {
    this.paramTypes = paramTypes;
    this.paramsGetter = paramsGetter;
    this.paramsSetter = paramsSetter;
    this.historyPush = historyPush;

    this._subscribeHistory();

    this._onRouterChange();
  }

  _subscribeHistory = () => {
    window.addEventListener("popstate", this._onRouterChange);
  };

  _unSubscribeHistory = () => {
    window.removeEventListener("popstate", this._onRouterChange);
  };

  _onRouterChange = () => {
    const routerParams = getSearchParams(this.paramTypes);
    const targetParams = this.paramsGetter();

    if (!deepEqual(targetParams, routerParams)) {
      this.paramsSetter(routerParams);
    }
  };

  destroy = () => {
    this._unSubscribeHistory();
  };

  push = (params) => {
    params = params || this.paramsGetter();
    const routerParams = getSearchParams(this.paramTypes);

    if (!deepEqual(params, routerParams)) {
      setSearchParams({
        params,
        paramTypes: this.paramTypes,
        push: this.historyPush,
      });
      return true;
    }
    return false;
  };
}
