# Swagger to Jest and Mocha Converter

This project provides a utility to convert Swagger API specifications into Mocha, and Jest test. As described in the [Swagger-Converter]() library, the converter focuses on Swagger files that have **tags in their endpoints**. Only the tags in the Swagger Object (root document object for the API specification) are considered.

## Dependencies

The following dependencies are used in the project:

- [Swagger-Converter]() library: Used to convert Swagger 2.0 to Jest and Mocha. This is a library by "la-rebelion" that is used in this project. The library is not published to npm, so it is included as a git submodule in the project, but it **is not included**. Contact me if you are interested in using the library.

## Why Swagger to Jest and Mocha?

The Swagger to Jest and Mocha converter is a tool that allows developers to convert their Swagger API specifications into test suites. The tool is useful for developers who want to test their APIs using popular testing frameworks like Jest and Mocha. By converting Swagger files into test suites, developers can easily test their APIs and ensure that they are working as expected.

Using this TDD approach, developers can write tests for their APIs before they write the actual code. This helps them identify potential issues early in the development process and ensures that their APIs are robust and reliable. The Swagger to Jest and Mocha converter is a valuable tool for developers who want to improve the quality of their APIs and deliver better software products.

## More About

- [APICove Tools](https://tools.apicove.com)
- [What is TDD?](https://www.simform.com/blog/what-is-tdd/)
- [What is Test-Driven Development?](https://testdriven.io/test-driven-development/)
- [Test-Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development)
- [Behavior-Driven Development (BDD)](https://en.wikipedia.org/wiki/Behavior-driven_development)
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)
- [Swagger](https://swagger.io/)
