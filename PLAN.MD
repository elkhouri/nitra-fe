## How you planned and broke down the task
- First look at Figma to get a general feel of what the result should look like.
- Create a general layout page with header and footer to slot the pages in the middle.
- Since there is usually a wait time for the backend API to be ready, I first create each page according to the design keeping them as close as possible, while seperating out reusable components where it makes sense.
- As the pages look ready enough, start implementing the business logic and hooking up the API while following the spec closely.
- Finally, repeated testing and fixing iterations checking both the design and the spec to deliver the best possible final result. 

## Key decisions and why you made them
- I decided to use a mix of both quasar.js and native html elements since quasar.js is already used in the project and using it would speed up the process when the element looks fairly similar to Figma like the stepper. But other times the native elements are used since customizing the quasar.js components aren't always straightforward and sometimes they look too different from the design to begin with.
- I use composables for state management since I find them more convenient to use than provide/inject. They can act as a central store for both the data and the associated business logic, whereas provide/inject only deals with the data only. I usually use pinia for state management but composables work similarly enough.
- I created a main layout page so I don't have to put the header, footer, and the stepper on every page and they share the same general layout.

## Why you chose each additional dependency
- lodash-es is used mainly for its groupBy function since it's an important part of the spec.
- date-fns is used for formatting dates and checking the time conflicts among the sessions and workshops.

## How you used AI tools
Since I lack an active subscription that enables agentic coding, I stick to the relatively old fashioned way of asking the AI and implementing myself. I use VS code with Github Copilot which can generate snippets and boilerplate inline, while asking it for boilerplate to bootstrap new pages and components. I used prompts like `create a footer component to place in main layout. the footer should always show at the bottom of the page` which results in a footer doesn't look anything like the design since it couldn't connect to Figma but otherwise mostly works, then updated the design to match.

If I gain access to agentic coding, I imagine it'd be much faster in the initial bootstrapping design phase since it can connect to Figma's MCP server and serve up the pages with design from Figma. I doubt the AI is going to get anywhere near pixel perfect accuracy, so a lot of fine tuning are still needed. For the business loginc part the AI can most likely implement a basic version after you give it the spec, but a lot of testing and changes are likely needed since there are lots of edge cases and error handling.

## Any challenges encountered and how you solved them
- Sometimes the design variables on Figma don't exactly correspond with the variables in the frontend project. Like there are plenty of font sizes 11px and 13px which isn't included that I added where it makes sense.
- I'm not familiar with the Nitra semantic design token system so it's a bit overwhelming at first. But nothing a bit of trial and error couldn't solve then it's a fairly straightforward job of inputting the variable exactly most of the time.
- The design on Figma doesn't include some interacton details like the display of soldout and conflicting sessions and workshops, and what validation errors look like on the review page for sessions and addons. I used my best judgement and look to existing design for reference, but would realistically ask the designer for these details.

## What you would improve given more time
- The whole navigation could use a major refactor. Right now it's kind of hard-wired in the steps composable and doesn't look too pretty.
- The nice to haves like the i18n and mobile RWD design.
- Use local storage to store and retrieve state.
- The UX can be improved with smoother transitions and animations.
