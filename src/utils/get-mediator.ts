const identity = (v: any) => v;

type THandlersAction = {next?: any} & Function
type THandlersMap = {[key: string]: THandlersAction };

type TAction = {
  type: string;
  payload?: any;
}

const handleActions = (actionsHandlerMap: THandlersMap, defaultState: Object) => {
  const handlerKeys = Object.keys(actionsHandlerMap);
  const handlers: any = handlerKeys.reduce((acc, key) => {
      const action = actionsHandlerMap[key];
      const isFunction = (typeof action === 'function');
      const handler = {
          next: isFunction ? action : (action.next || identity)
      };

      return Object.assign(acc, {[key]: handler});
  }, {});

  return (state: Object = defaultState, action: TAction): Object => {
      const actionType = action.type;
      const handler = handlers[actionType];

      if (handler) {
          return (handler.next)(state, action);
      }

      return state;
  };
};

const finalPayloadCreator = (payloadCreator?: Function | Error, ...args: Array<any>) => {
  if (payloadCreator) {
      return (payloadCreator instanceof Error) ? payloadCreator : payloadCreator(...args);
  }

  return args[0];
};

const actionCreator = (type: string, payloadCreator?: Function | Error) => {
  const actionCreatorHandler: any = (...args: Array<any>) => {
      const payload = finalPayloadCreator(payloadCreator, ...args);
      const action: TAction = {type};

      if (payload !== undefined) {
          action.payload = payload;
      }

      return action;
  };

  actionCreatorHandler.toString = () => type;

  return actionCreatorHandler;
};

export const getMediator = (name: string, initialState: {[key: string]: any}) => {
  const keys = Object.keys(initialState);

  const set: any = keys.reduce(
      (result, key: string) => ({
          ...result,
          [key]: actionCreator(key.toUpperCase(), (value: any) => ({value}))
      }),
      {},
  )

  const get: any = (state: {[key: string]: [value: any]}) => {
      if (!state[name]) {
          throw new Error(`State ${name} not found.`);
      }

      return state[name]
  }

  keys.forEach((key: string) =>
      Object.defineProperty(get, key, {
          enumerable: true,
          value: (state: Object) => {
              const storeData = get(state);

              return storeData ? storeData[key] : undefined;
          }
      }));

  const defaultActionCreators = {
      reset: actionCreator(`RESET_${name.toUpperCase()}`)
  };

  const handlers = keys.reduce(
      (result: Object, key) => ({
          ...result,
          [set[key]]: (state: Object, {payload: {value}}: any) => ({...state, [key]: value})
      }),
      {
          [defaultActionCreators.reset]: () => initialState
      },
  )

  return {
      set,
      get,
      reducer: handleActions(handlers, initialState),
      action: defaultActionCreators,
      name
  }
};
