jest.autoMockOff()

const authForm = require('../authForm')
const {
  AUTH_FORM_USERNAME,
  AUTH_FORM_PASSWORD,
  AUTH_FORM_DISABLED,
  AUTH_FORM_ERROR,
} = require('../../constants')

describe('stores/authForm', () => {
  describe('AUTH_FORM_USERNAME', () => {
    it('should work', () => {
      let state = authForm.initial()
      expect(state.data.username).toBe('')
      state = authForm.reducers[AUTH_FORM_USERNAME](state, 'test')
      expect(state.data.username).toBe('test')
    })
  })

  describe('AUTH_FORM_PASSWORD', () => {
    it('should work', () => {
      let state = authForm.initial()
      expect(state.data.password).toBe('')
      state = authForm.reducers[AUTH_FORM_PASSWORD](state, 'test')
      expect(state.data.password).toBe('test')
    })
  })

  describe('AUTH_FORM_DISABLED', () => {
    it('should work', () => {
      let state = authForm.initial()
      expect(state.disabled).toBe(false)
      state = authForm.reducers[AUTH_FORM_DISABLED](state, true)
      expect(state.disabled).toBe(true)
    })
  })

  describe('AUTH_FORM_ERROR', () => {
    it('should work', () => {
      const error = new Error()
      let state = authForm.initial()
      expect(state.error).toBe(null)
      state = authForm.reducers[AUTH_FORM_ERROR](state, error)
      expect(state.error).toBe(error)
    })
  })
})
