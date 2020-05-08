# Dashboard Admin Template by [Nitroxis](https://nitroxis.com)

Admin Dashboard by @mrhammadasif based on vue@2.6+ and vuetify@2+

## Recommended plugins in VSCODE

- ext install `octref.vetur`
- ext install `dbaeumer.vscode-eslint`
- ext install `vuetifyjs.vuetify-vscode`
- ext install `incleaf.vuetypes-snippets`

## Features of this Templates

- ready-made templates for starting with admin
- dynamic loading of config vars *even after generated build from public/config.json*

## Quick Hack for making API Requests

For API calling, we will be storing everything in state for discouraging repeated API calls.

There is also a code Snippet defined with the name of `doApi` for VS Code. Which will output below code snippet:

```javascript
this.$store.dispatch("doApi", {
  url: "users",
  commit: "users", // name of the state key to store (optional): only if you want to store it in state
  method: "method", // default: get, valid options are get, post, patch or delete
  body: null,
  respKey: null, // if the resp key is different in axios response
  onError: (err) => {
    console.log(err)
  }
})
```

### Toast Service (based on Vuex)

Snippets: 
### `toast.error`

```javascript
this.$toast.error("ERROR MESSAGE")
```

### `toast.success`

```javascript
this.$toast.success("ERROR MESSAGE")
```

### `toast.options`

```javascript
{
  type: "success",
  title: "title",
  closeText: "Ok",
  timeout: 3000,
  callback: () => {}
}
```

### Progress Bar loading

For Showing Progress Bar

`this.$loader.show("LOADER_NAME")`

For Hiding Progress Bar (the same name should be used while hiding and showing)

`this.$loader.hide("LOADER_NAME")`

### BreadCrumbs

Vuetify provides component for BreadCrumbs example usage

```html
<v-breadcrumbs
  divider="/"
  :items="[{text: 'Dashboard', href: '/'}, {text: $route.name}]">
</v-breadcrumbs>
```

### TODOS

- Quick Tour
- Intro Popup
