export default function createSubscription(fluce, stores) {
  return callback => fluce.subscribe(stores, callback)
}
