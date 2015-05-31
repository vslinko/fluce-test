# fluce-test

> NOTE: Deku was replaced by React.

## Key moments:

* `React.createElement` was replaced by custom `createElement` function that allows to render pure function: [1], [2]
* Dumb components are pure functions: [3]
* Smart components are pure functions but they are return element from previously created react component: [4], [5]
* Stores doesn't store state — stores are just collections of reduce functions: [6]
* Smart components using observers to be smart: [7], [8], [9]
* Smart components using dumb components to render observed data: [10]

[1]: .babelrc#L3
[2]: src/utilities/createElement.js

[3]: src/components/Layout/index.js#L6

[4]: src/utilities/createSmartComponent.js
[5]: src/components/AuthForm/index.js#L76

[6]: src/stores/authForm.js

[7]: src/utilities/createFluceObserver.js
[8]: src/components/AuthForm/index.js#L77
[9]: src/components/AuthForm/index.js#L38

[10]: src/components/AuthForm/index.js#L78
