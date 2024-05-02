# Shengnong_frontend

## Project setup
```
yarn install
```

> bug: error Couldn't find package "fsevents@~2.3.2" required by "chokidar@^3.5.3" on the "npm" registry.
> reason: fsevents is a MacOS specific package, and you are trying to install it on a non-MacOS system.
> solution: yarn install --ignore-engines

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
