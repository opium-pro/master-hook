export let externalReducers = {}
export let externalMiddleware: any[] = []
export let withDevTools = true


export function useDevTools(value: boolean) {
  withDevTools = value
}


export function addReducers(reducers: {[key: string]: any}) {
  externalReducers = {...externalReducers, reducers}
}


export function addMiddleware(middleware: any) {
  if (!Array.isArray(middleware)) {
    middleware = [middleware]
  }
  externalMiddleware = middleware
}