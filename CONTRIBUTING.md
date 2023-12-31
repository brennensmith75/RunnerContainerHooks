# Basic setup
You'll need a runner compatible with hooks, a repository with container workflows to which you can register the runner and the hooks from this repository.



## Getting Started
- Run ` npm install && npm run bootstrap` to setup your environment and install all the needed packages
- Run `npm run lint` and `npm run format` to ensure your charges will pass CI
- Run `npm run build-all` to build and test end to end.


## E2E
- You'll need a runner compatible with hooks, a repository with container workflows to which you can register the runner and the hooks from this repository.
- See [the runner contributing.md](../../github/CONTRIBUTING.MD) for how to get started with runner development.
- Build your hook using `npm run build`
- Enable the hooks by setting `ACTIONS_RUNNER_CONTAINER_HOOKS=./packages/{libraryname}/dist/index.js` file generated by [ncc](https://github.com/vercel/ncc)
- Configure your self hosted runner against the a repository you have admin access
- Run a workflow with a container job, for example
```
name: myjob
on:
  workflow_dispatch:
jobs:
  my_job:
    runs-on: self-hosted
    services:
      redis:
        image: redis
    container:
      image: alpine:3.15
      options: --cpus 1
    steps:
      - run: pwd
```
