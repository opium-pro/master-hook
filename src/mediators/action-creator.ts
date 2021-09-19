export type TAction = {
  type: string
  payload?: any
}


const finalPayloadCreator = (payloadCreator?: Function | Error, ...args: Array<any>) => {
  if (payloadCreator) {
    return (payloadCreator instanceof Error) ? payloadCreator : payloadCreator(...args)
  }

  if (args.length > 1) {
    return args
  }

  return args[0]
}


export const actionCreator = (type: string, payloadCreator?: Function | Error) => {
  const actionCreatorHandler: any = (...args: Array<any>) => {
    const payload = finalPayloadCreator(payloadCreator, ...args)
    const action: TAction = { type }

    if (payload !== undefined) {
      action.payload = payload
    }

    return action
  }

  actionCreatorHandler.toString = () => type
  return actionCreatorHandler
}