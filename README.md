# Pump It

This is my personal small workout app / excuse to hand craft something with a few technologies I wanted to check out with almost no AI involved. After mainly building with Claude Code for a few months, I was itching for some good old from-scratch manual coding again.

I coded everything by hand, except for some design mockups and the app logo. I'd like to say I have enough taste to judge design, but I'm not awfully good at creating them; so I AI generated that part initially. I did some adjustments though, e.g. the initial mockups had a more traditional style fixed toolbar; I made it more modern looking by making the toolbar rounded and free floating.

## Tech Stack

This app uses [TanStack Router](https://tanstack.com/router/latest) and [TanStack DB](https://tanstack.com/db/latest) to create something that is client only and has no server side. Everything is stored in `localStorage`.

I also wanted to try running the latest and hippest TS toolchain consisting of [Vite 8](https://vite.dev), [TS Go](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-beta/), [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html). Just to get a feel for it and because I haven't worked with it before, I used [Base UI](https://base-ui.com) and [TanStack Form](https://tanstack.com/form/latest). I also threw in the [JS Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal), althogh I felt the current lack of support for that one. [Storybook](https://storybook.js.org) and [Tailwind](https://tailwindcss.com) are probably almost not worth mentioning anymore.

## Idea

Being a remote developer, I naturally can use a little exercise. From Experience, to get myself motivated I need to create as little friction as possible. So the Idea is simple: I feed some YouTube workouts into this app to create a pool of workouts. Every evening before going to sleep, I can select and chose one of those workouts on my phone for tomorrow, creating some commitment in my head. Tomorrow I'll simply go to "Today's Workout" (also on my phone), hit play and then start AirPlaying to my TV.

Again, everything is stored on local storage; there's no crucial data here so I don't care about longterm persistence. This is a very simple SPA.

## Deployment / Try it

Since it's an SPA, this App is hosted on GitHub pages and I'm pointing a personal subdomain at it. Check it out at [pumpit.kevur.me](https://pumpit.kevur.me). I'd recommend installing the page to the home screen if you want to use it regularly.

## Development

Use [pnpm](https://pnpm.io) to install all dependencies. The following scripts exits:

```sh
pnpm dev # run dev server
pnpm check # run typechecking, linting and formatting
pnpm storybook # run storybook
pnpm build # build the thing
```

GitHub is setup to automatically build and deploy the SPA on each commit on `main`.
