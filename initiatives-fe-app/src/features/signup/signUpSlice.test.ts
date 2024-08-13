import {
  authSlice,
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from "./authSlice"

import type { AppStore } from "../../app/store"
import type { CounterSliceState } from "./signUpSlice"
import { makeStore } from "../../app/store"

interface LocalTestContext {
  store: AppStore
}

describe<LocalTestContext>("counter reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: CounterSliceState = {
      value: 3,
      status: "idle",
    }

    const store = makeStore({ counter: initialState })

    context.store = store
  })

  it("should handle initial state", () => {
    expect(authSlice.reducer(undefined, { type: "unknown" })).toStrictEqual({
      value: 0,
      status: "idle",
    })
  })

  it("should handle increment", ({ store }) => {
    expect(selectCount(store.getState())).toBe(3)

    store.dispatch(increment())

    expect(selectCount(store.getState())).toBe(4)
  })

  it("should handle decrement", ({ store }) => {
    expect(selectCount(store.getState())).toBe(3)

    store.dispatch(decrement())

    expect(selectCount(store.getState())).toBe(2)
  })

  it("should handle incrementByAmount", ({ store }) => {
    expect(selectCount(store.getState())).toBe(3)

    store.dispatch(incrementByAmount(2))

    expect(selectCount(store.getState())).toBe(5)
  })
})
