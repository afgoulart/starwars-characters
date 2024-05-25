# Challenge 

> Truth can only be found in one place: the code. <br/>
> -- Robert C. Martin

## 1. Introduction

Be sure to read **all** of this document carefully, and follow the guidelines within.

Use React to implement the following mock-up. You will need to leverage an open API for Star Wars characters data to fill in the details and functionality as described below.

Use the Figma file below to see button states, colors, and responsive design. You should be sure to complete the test to mimic the design as seen.

> [Source Figma file](https://www.figma.com/file/5CMAkR0A4OHSS83xjIiShv/CloudWalk-FrontEnd-test?type=design&node-id=0-1&mode=design&t=U1b5U1gejjQ1ClWr-0)

## 2. Requirements

### 2.1 Data Source API

Stars Wars Characters API:

- https://swapi.dev
- http://swapi.dev/api/planets
- http://swapi.dev/api/peolpe

> NOTE: Swapi API may not allow CORS. To get around this, you will need to setup a local proxy with CORS support and proxy your requests to Swapi API's endpoints.

Images/Photos Placeholder:

- https://picsum.photos/:width/:height

### 2.2. Page Structure

```
Main
  - Filter navigation
    - Planets/Homeworld
  - Section
    - Character item
      - Image (use `https://picsum.photos/:width/:height`)
      - Name
      - Planet Name/Homeworld (use first item in `homeworld` <=> `http://swapi.dev/api/planets/`)
```

### 2.3. Functionality

- The filter navigation needs to be able to perform real-time filtering on both client-side data.
- `Planets` can be pre-filled from the [Planets endpoint](http://swapi.dev/api/planets/).
- The items should always show 4-6 items per row depending on viewport size. Use your own judgment for when to change per breakpoints.

### 2.4. Tech stack

- Javascript or TypeScript oriented
  - Use **React** _(Next is a plus)_
- Feel free to use a preprocessor, CSS-in-JS, or JSS tool but _do not_ use any pre-styled frameworks or libraries
  - The general rule of thumb is: you should write your own styling for your components, do not use "pre-made" tools and utilities
  - There are a few reasons we do this:
    - we care about pixel perfect implementation
    - we want to see your understanding of CSS and styling practices
  - USE:
    - Tailwind
    - SASS
    - CSS
- Implement useful testing

### 2.5. Bonus

- Make the application accessible
- Create a mobile version (included in Figma comp)
- Write clear documentation on how the app was designed and how to run the code
- Provide an online demo of the application
- Include subtle animations to focus attention
- Describe improvement opportunities when you conclude

## 3. What We Care About

Use any libraries that you would normally use if this were a real production App. Be prepared to justify those choices.
Please note: _we care more about how you approach the problem than the end result. Code cleanliness and design
are more important than using the "right" library._

Here's what you should strive for:

- Good use of current Javascript, HTML, CSS, and performance best practices
- Extensible code
- Mobile support and accessibility
- Thorough explanation of decisions and tradeoffs
- (Bonus) Testing approach

## 4. Deliverable

You are expected to submit a compacted git repository with the project through the form you received.

Enjoy :)