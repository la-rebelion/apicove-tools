# Converter API to TypeScript

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

This project provides a utility to convert Swagger API specifications into Mocha, Jest test 
suites and Strapi (future). The converter focuses on Swagger files that have 
**tags in their endpoints**. Only the tags in the Swagger Object (root document object 
for the API specification) are considered.

## Dependencies

The following dependencies are used in the project:

- [Swagger-Converter](https://github.com/la-rebelion/swagger-converter/pkgs/npm/swagger-converter): Used to convert Swagger 2.0 to Jest and Strapi.

The converter is a library by "la-rebelion" that is used in this project. The library is not
published to npm, so it is included as a git submodule in the project, but it **is not included**.

Subscribe to the "la-rebelion" community or contact me if you are interested in using the library.

### Deployment

GitHub Pages is used to deploy the app. The app is deployed to the following URL: [https://tools.apicove.com](https://tools.apicove.com)

To deploy the app, run the following command:

```bash
USE_SSH=true yarn deploy
```

## Future Work

The following features are planned for the future:

- [] Convert Swagger to Strapi
- [] Feature flags to enable/disable features
  - [] Allow the developer to select the test framework (Jest, Mocha)
  - [] Generate the code for direct API calls using Fetch, or generate the code using API helpers (developed by the end user/developer)
  - [] Allow the developer to select the test runner (**Node**, Browser) for the generated code. 
    - [] In Browser Mocha is used, requires to remove the import statements from the boilerplate code.
- [] Karma test runner? Does the community still use it, require it, and is it worth it?

Would you like to contribute with ideas or feature requests? Please open a [discussion](https://github.com/la-rebelion/apicove-tools/discussions/new?category=ideas) in the repository.

Do you have a bug to report? Please open an [issue](https://github.com/la-rebelion/apicove-tools/issues/new/choose) in the repository.