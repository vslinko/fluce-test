import Rx from 'rx'

export default function createFluceObserver(fluce, storeNames, collectState) {
  return Rx.Observable.create(observer => {
    observer.onNext(collectState(storeNames))

    const unsubscribe = fluce.subscribe(storeNames, updatedStoreNames => {
      observer.onNext(collectState(updatedStoreNames))
    })

    return () => {
      unsubscribe()
    }
  })
}
