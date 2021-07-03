# Code Examples with Typescript

### Declaring Types for your containers/components

Create a type definition file and declare all the types/interfaces that your container will use/manage/export. Like props, slice of reducers, actions

```typescript
/* --- STATE --- */
// Container is only responsible for managing this state
// TODO

/* --- ACTIONS --- */
// Actions that can be fired within these container
// TODO

/* --- EXPORTS --- */
// Standardize your export names so that in other files you can refer them with standardized names
// TODO

// Export only the types this container manages
// TODO
```

---

## Constants

```typescript
// TODO
```

---

## Actions

```typescript
// TODO
```

---

## Selectors

`selectors` will take root state and return appropriate slices of that state

```typescript
// TODO
```

---

## Reducers

Manage the slice of your root state in a type-safe way

```typescript
// TODO
```

`combineReducers` now can manage different slices in a type-safe way.

```typescript
// TODO
```

---

### React Components

Declare types of all the props of this component

```typescript
interface Props {
  a_internal_prop: string
}

export function HomePage(props: Props) {
  // ...
}
```

Type-safe hooks are extremely straight forward and easy

```typescript
export function HomePage(props: Props) {
  const [someValue, setSomeValue] = useState<boolean>(true)
  // ...
}
```
