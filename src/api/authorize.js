export default function authorize({username, password}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({username})
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1000)
  })
}
