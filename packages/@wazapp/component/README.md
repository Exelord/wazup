# @wazapp/component

Component package expose Wazapp Component which is built on top of React Component. It integrates tracking, app owner (allows to use services) and simplify component API.

> ### Warning!
> **Hence the component extends from React Component, do not use any of its API. It may be removed in the future and using it may cause incompatibility with Wazapp components!**

### Example of usage

```typescript
import { ClassComponent } from "@wazapp/component";

export default class MyComponent extends ClassComponent {
  template({ name }) {
    return (
      <h1>Hello, {name}</h1>
    );
  }
}
```

## Class Component

### `props`

`props` exactly like in React Component returns an Object of passed properties to the component. They are automatically tracked by Wazapp.

#### Example of usage

```typescript
import { ClassComponent } from "@wazapp/component";

export default class MyComponent extends ClassComponent {
  template({ name }) {
    return (
      <h1>My name is {name}</h1>
    );
  }
}

export default class MainComponent extends ClassComponent {
  template() {
    return (
      <MyComponent name="Wazapp" />
    );
  }
}
```

### `isUnmounting`

A boolean flag to tell if the component is in the process of unmounting. This is set to true before `willUnmount` is called.

### `isUnmounted`

A boolean to tell if the component has been fully unmounted. This is set to true after `willUnmount` is called.

### `template(props: P, context: this): ReactNode | void`

`template(props)` allows you to define your component template written in JSX. Remember that you are still working in React so things like `className` instead of `class` are still required.

The template can return `ReactNode` or nothing. By default if not defined it will `yield()` component's `children`.

#### Example of usage

```typescript
import { ClassComponent } from "@wazapp/component";

export default class MyComponent extends ClassComponent {
  template({ name }) {
    return (
      <h1>Hello {name}, this is Wazapp component</h1>
    );
  }
}
```

### `yield(...args)`

`yield()` allows you to return component's `children` or in case the `children` is a function, it will allow you to call it with custom arguments.

#### Arguments
- `...args`: `any[]` - your custom arguments that will be used on `children` call (if `children` is a function)

#### Example of usage

```typescript
import { ClassComponent } from "@wazapp/component";

export default class MyComponent extends ClassComponent {
  template() {
    return (
      <h1>Hello, {this.yield('Wazapp')}</h1>
    );
  }
}

export default class MainComponent extends ClassComponent {
  template() {
    return (
      <MyComponent>
        {(name) => (
          <h1>{name}</h1>
        )}
      </MyComponent>
    );
  }
}
```

### `didMount()`

`didMount` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here.

This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in `willUnmount()`.

#### Example of usage

```typescript
import { ClassComponent } from "@wazapp/component";

export default class MyComponent extends ClassComponent {
  didMount() {
    console.log('Component has been mounted')
  }
}
```

### `didUpdate(prevProps)`

`didUpdate` is invoked immediately after updating occurs. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated.

#### Arguments
- `prevProps`: `T<ComponentProps>` - previous component properties

#### Example of usage

```typescript
import { ClassComponent } from "@wazapp/component";

export default class MyComponent extends ClassComponent {
  didUpdate(prevProps) {
    console.log(prevProps.name, this.props.name)
  }
}
```

### `willUnmount()`

`willUnmount` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `didMount()`.

#### Example of usage

```typescript
import { ClassComponent } from "@wazapp/component";

export default class MyComponent extends ClassComponent {
  willUnmount() {
    console.log('Component has been unmounted`)
  }
}
```