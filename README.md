# vue-crud-toolkit

Vue Crud Toolkit is a fast and beautiful CRUD Admin creation tool.

## Features

- Dashboard with pagination and filter
- Detail
- Create
- Update
- Remove
- Trash
- Purge
- Restore
- Flexible customization

## Examples

Visit [live examples](https://hieunv495.github.io/vue-crud-toolkit)

## Prerequisites

You need install [**vuetify**](https://vuetifyjs.com/) before install this package.

```js
import Vue from "vue";
// import Vuetify from "vuetify/lib/framework";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
```

## Install

```
yarn add vue-crud-toolkit
```

or

```
npm install --save vue-crud-toolkit
```

## How to use

```js
import Vue from "vue";
import VueCrudToolkit from "vue-crud-toolkit";

Vue.use(VueCrudToolkit);
```

And [live examples](https://hieunv495.github.io/vue-crud-toolkit) and [docs](https://hieunv495.github.io/vue-crud-toolkit).

## Documentation

To check out [live examples](https://hieunv495.github.io/vue-crud-toolkit) and [docs](https://hieunv495.github.io/vue-crud-toolkit), visit [website](https://hieunv495.github.io/vue-crud-toolkit)

## Contributing

```
git clone git@github.com:hieunv495/vue-crud-toolkit.git
```

## Changelog

### 3.1.0

- Add custom header, title, actions in composition

### 3.0.0

- Config composition with provide/inject
- Show error and custom error in CrudDashboard

### 2.0.1

- Fix detail load id null

### 2.0.0

- Update new api request structure
- Add custom text feature

### 1.0.0

First release

## Authors

[hieunv495](https://github.com/hieunv495)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
