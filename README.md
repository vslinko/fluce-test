# fluce-test

> NOTE: Deku was replaced by React.

## Key moments:

* `React.createElement` was replaced by custom `createElement` function that allows to render pure function: [1], [2]
* Dumb components are pure functions: [3]
* Smart components are pure functions but they are return element from previously created react component: [4]
* Stores doesn't store state — stores are just collections of reduce functions: [5]
* Smart components using observers to be smart: [6], [7]
* Smart components using dumb components to render dynamic data: [8]

[1]: .babelrc#L3
[2]: src/utilities/createElement.js
[3]: src/components/Layout/index.js#L6
[4]: src/components/AuthForm/index.js#L83
[5]: src/stores/authForm.js
[6]: src/components/AuthForm/index.js#L72
[7]: src/utilities/createFluceObserver.js
[8]: src/components/AuthForm/index.js#L73
