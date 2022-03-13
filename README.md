## Forex Application

The Forex Applicaiton is built on top of the [Next.js](https://nextjs.org/) and use [tailwind CSS](https://tailwindcss.com/docs/installation) library.

## Getting Started

Before you get start, you will ensure you have [Node.JS](https://nodejs.org/), [yarn](https://yarnpkg.com/), [Docker](https://www.docker.com/) installed.

### Install dependecies

Please run the following command to install the depencies:

```
yarn
```

### Start the application

Before start the application, you will need to specific the application environment variables, for instance, create a `.env.local` file and with the following content:

```
// The forex-api endpoint
NEXT_PUBLIC_FOREX_API_BASE_URL=http://localhost:8080
// The forex-api token
NEXT_PUBLIC_FOREX_API_TOKEN=10dc303535874aeccc86a8251e6992f5

```

Then run the following command to start the application:

```
yarn dev
```

### How to contribute

Please follow the following practice when you are contribte to the project.

- Adding the components into `src/components` folder
- Adding the React Hook into `src/hooks` folder and expose the API in `src/hooks/index.ts` file
- Adding pages into `src/pages`
- Adding shared libraries into `src/lib` folder
- Adding unit testing into `__test__`
- Plz follow https://www.conventionalcommits.org/ to write your git commit message

There are some usefull commands that can help you improve your commit quality:

- Auto prettier your changes: `yarn prettier`
- Lint your change: `yarn lint`

### Build for production

Please run the following command to create the production build.

```
yarn build
```
