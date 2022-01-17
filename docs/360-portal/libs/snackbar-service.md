---
sidebar_position: 4
---

# @epilot360/snackbar-service

```
yarn add @epilot360/snackbar-service
```

Create snackbar alerts in epilot 360 portal

## Usage

```js
import { SnackbarUtils } from '@epilot360/snackbar-service'

SnackbarUtils.success({
  title: 'Success',  
  message: 'Contact Saved Successfully'
})

SnackbarUtils.info({
  message: 'You got new notifications',
  title: 'Info'
})

SnackbarUtils.warning({
  message: 'Memory Leak Found',
  title: 'Warning'
}

SnackbarUtils.error({
  message: 'Some error has occurred',
  title: 'Error'
})

SnackbarUtils.custom(<MyChildComponent/>)
```
