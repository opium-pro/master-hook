const identity = (v: any) => v

type THandlersAction = { next?: any } & Function
type THandlersMap = { [key: string]: THandlersAction };

type TAction = {
  type: string
  payload?: any
}


const finalPayloadCreator = (payloadCreator?: Function | Error, ...args: Array<any>) => {
  if (payloadCreator) {
    return (payloadCreator instanceof Error) ? payloadCreator : payloadCreator(...args);
  }

  return args[0];
}


export const actionCreator = (type: string, payloadCreator?: Function | Error) => {
  const actionCreatorHandler: any = (...args: Array<any>) => {
    const payload = finalPayloadCreator(payloadCreator, ...args);
    const action: TAction = { type };

    if (payload !== undefined) {
      action.payload = payload;
    }

    return action;
  };

  actionCreatorHandler.toString = () => type;

  return actionCreatorHandler;
}


export const handleActions = (actionsHandlerMap: THandlersMap, defaultState: Object) => {
  const handlerKeys = Object.keys(actionsHandlerMap);
  const handlers: any = handlerKeys.reduce((acc, key) => {
    const action = actionsHandlerMap[key];
    const isFunction = (typeof action === 'function');
    const handler = {
      next: isFunction ? action : (action.next || identity)
    }

    return Object.assign(acc, { [key]: handler });
  }, {})

  return (state: Object = defaultState, action: TAction): Object => {
    const actionType = action.type;
    const handler = handlers[actionType];

    if (handler) {
      return (handler.next)(state, action);
    }

    return state;
  }
}