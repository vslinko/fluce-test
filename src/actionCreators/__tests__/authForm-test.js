jest.dontMock('../authForm')
jest.dontMock('../../constants')
jest.dontMock('key-mirror')

const {
  authFormUsername,
  authFormPassword,
  authFormSubmit,
} = require('../authForm')

const {
  AUTH_FORM_USERNAME,
  AUTH_FORM_PASSWORD,
  AUTH_FORM_DISABLED,
  AUTH_FORM_ERROR,
  CURRENT_USER,
} = require('../../constants')

const authorize = require('../../api/authorize')

function createPromiseMock() {
  const nexts = []

  let then = jest.genMockFn().mockImpl((onFulfilled, onRejected) => {
    const mock = createPromiseMock()
    nexts.push({onFulfilled, onRejected, mock})
    return mock.promise
  })

  return {
    promise: {then},
    resolve(payload) {
      nexts.forEach(({onFulfilled, mock}) => {
        if (onFulfilled) {
          try {
            mock.resolve(onFulfilled(payload))
          } catch (err) {
            mock.reject(err)
          }
        } else {
          mock.resolve(payload)
        }
      })
    },
    reject(payload) {
      nexts.forEach(({onRejected, mock}) => {
        if (onRejected) {
          try {
            mock.resolve(onRejected(payload))
          } catch (err) {
            mock.reject(err)
          }
        } else {
          mock.reject(payload)
        }
      })
    },
  }
}

describe('actionCreators/authForm', () => {
  describe('authFormUsername', () => {
    it('should not dispatch if disabled', () => {
      const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {disabled: true}}}
      authFormUsername(fluce, 'test')
      expect(fluce.dispatch).not.toBeCalled()
    })

    it('should dispatch', () => {
      const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {disabled: false}}}
      authFormUsername(fluce, 'test')
      expect(fluce.dispatch).toBeCalledWith(AUTH_FORM_USERNAME, 'test')
    })
  })

  describe('authFormPassword', () => {
    it('should not dispatch if disabled', () => {
      const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {disabled: true}}}
      authFormPassword(fluce, 'test')
      expect(fluce.dispatch).not.toBeCalled()
    })

    it('should dispatch', () => {
      const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {disabled: false}}}
      authFormPassword(fluce, 'test')
      expect(fluce.dispatch).toBeCalledWith(AUTH_FORM_PASSWORD, 'test')
    })
  })

  describe('authFormSubmit', () => {
    it('should not dispatch if disabled', () => {
      const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {
        valid: true,
        disabled: true,
        data: {username: 'test', password: 'password'}
      }}}
      authFormSubmit(fluce)
      expect(fluce.dispatch).not.toBeCalled()
    })
  })

  it('should dispatch error if invalid', () => {
    const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {
      valid: false,
      disabled: false,
      data: {username: 'test', password: 'password'}
    }}}
    authFormSubmit(fluce)
    expect(fluce.dispatch.mock.calls.length).toBe(1)
    expect(fluce.dispatch.mock.calls[0][0]).toBe(AUTH_FORM_ERROR)
    expect(fluce.dispatch.mock.calls[0][1].message).toBe('Form is invalid')
  })

  it('should dispatch if authorized', () => {
    const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {
      valid: true,
      disabled: false,
      data: {username: 'test', password: 'password'}
    }}}

    const promiseMock = createPromiseMock()
    const user = {username: 'test'}

    authorize.mockReturnValue(promiseMock.promise)
    authFormSubmit(fluce)
    promiseMock.resolve(user)

    expect(fluce.dispatch.mock.calls.length).toBe(4)
    expect(fluce.dispatch.mock.calls[0][0]).toBe(AUTH_FORM_DISABLED)
    expect(fluce.dispatch.mock.calls[0][1]).toBe(true)
    expect(fluce.dispatch.mock.calls[1][0]).toBe(AUTH_FORM_ERROR)
    expect(fluce.dispatch.mock.calls[1][1]).toBe(null)
    expect(fluce.dispatch.mock.calls[2][0]).toBe(CURRENT_USER)
    expect(fluce.dispatch.mock.calls[2][1]).toBe(user)
    expect(fluce.dispatch.mock.calls[3][0]).toBe(AUTH_FORM_DISABLED)
    expect(fluce.dispatch.mock.calls[3][1]).toBe(false)
  })

  it('should dispatch if unauthorized', () => {
    const fluce = {dispatch: jest.genMockFn(), stores: {authForm: {
      valid: true,
      disabled: false,
      data: {username: 'test', password: 'password'}
    }}}

    const promiseMock = createPromiseMock()
    const error = new Error()

    authorize.mockReturnValue(promiseMock.promise)
    authFormSubmit(fluce)
    promiseMock.reject(error)

    expect(fluce.dispatch.mock.calls.length).toBe(4)
    expect(fluce.dispatch.mock.calls[0][0]).toBe(AUTH_FORM_DISABLED)
    expect(fluce.dispatch.mock.calls[0][1]).toBe(true)
    expect(fluce.dispatch.mock.calls[1][0]).toBe(AUTH_FORM_ERROR)
    expect(fluce.dispatch.mock.calls[1][1]).toBe(null)
    expect(fluce.dispatch.mock.calls[2][0]).toBe(AUTH_FORM_ERROR)
    expect(fluce.dispatch.mock.calls[2][1]).toBe(error)
    expect(fluce.dispatch.mock.calls[3][0]).toBe(AUTH_FORM_DISABLED)
    expect(fluce.dispatch.mock.calls[3][1]).toBe(false)
  })
})
