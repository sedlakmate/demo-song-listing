# Music library demo app 
♪~ ᕕ(ᐛ)ᕗ

![QA Workflow](https://github.com/szedlakmate/demo-song-listing/actions/workflows/push-qa.yml/badge.svg)

This is a simple music library demo app that allows users to view a list of **song titles**, **artists**, and **album covers**.  
Working with the music itself is not part of the project ¯\\_(ツ)_/¯

## Links

- [Repository](https://github.com/szedlakmate/demo-song-listing)
- [Live demo](https://demo-music-list.up.railway.app/)
- [API documentation](https://demo-song-listing-production.up.railway.app/api-docs/)

## Notes

This project was created for a third-party job interview. The original instructions defined core features and some nice-to-have extras.  
The proposed time limit was very short for a complete implementation.  
However, considering the depth and scope of the work, it’s clear — and hopefully understood — that this project couldn’t realistically be completed in just 4 hours. Maybe a proof-of-concept version of the core features, sure. But this submission goes well beyond that.

Tasks completed:

- project preparation
- project setup
- configuring QA tasks like linting and testing
- deployment setup
- CI/CD setup (linting & deployment)
- manual testing
- \+ documentation

## My goal

The task is simple, but has many layers. There are dozens of ways to approach it.

**My goal was to demonstrate disciplined engineering with a broad skillset and mindset.**

I wanted to show that:

- I can plan and choose the right tools for the job
- I can adopt new technologies (e.g., Railway)
- I care about code quality — especially linting and centralized formatting  
  (which is crucial when working in a team, to avoid drowning in merge conflicts)
- I write maintainable code
- I care about security, including input validation
- I write unit tests
- I design pipelines to support developers — CI/CD should save time and emotional stability during deployments.  
  (It's so relaxing to watch the spinner spin.)
- I care about documentation
- I care about styling. I care about UI/UX.  
  (Yes, the frontend includes a theme selector. Implementing it was actually the easiest part of the whole project.)

## Requirements

### Features

- List existing songs
- Add new songs with an uploaded album cover image
- Delete songs

Persistence is not required. Data is stored in memory and is reset when the server restarts.
Uploaded images are removed when the server restarts.

### Technical requirements

- Node.js server with TypeScript
- React frontend with TypeScript
- TailwindCSS for styling
- Deployed live demo

## Project

### Infrastructure

- GitHub
- GitHub Actions for CI/CD
- 2 Docker containers:
  - Node.js server
  - React frontend
- Railway for deployment:
  - backend service (via backend's Dockerfile)
  - frontend service (via frontend's Dockerfile)

### Considerations

There was an implicit expectation that anyone should be able to run the project locally. This added some complexity.

- I personally prefer **monorepos** for full-stack apps.
- To allow others to run the project easily, I chose a **Docker Compose**-based setup.
- To move quickly, I used **Turborepo**. With solid templates and best practices, it’s easy to get started with:
  - Dockerized setup
  - Preset linting
  - Preset TypeScript configuration
  - Preset unit testing
- For extra polish, I used **OpenAPI** to generate the backend API endpoints. This also gives us auto-generated [API docs](https://demo-song-listing-production.up.railway.app/api-docs/).
- It’s not immediately visible, but I’m proud of the detailed request validations on the backend (see `validateApiDoc` flag at `/apps/backend/src/server.ts`).  
- Even though I attempted accomplishing every "bonus points", I did not implement song editing - to submit the work reasonably early.

### Local development

The project should run smoothly on Linux, macOS, and Windows (although I only tested it on Linux).

1. Install `npm`, `yarn`, `docker`, and `docker-compose` if not already installed
2. Install `turbo` globally: `npm install -g turbo`
3. Clone the [repository](https://github.com/szedlakmate/demo-song-listing)
4. Navigate to the root directory
5. Install dependencies: `yarn install`
6. Build the project: `turbo build`
7. Start the app: `docker-compose up -d`

At this point, the app should be running locally.

File watchers run in the background, so any changes to the code should be reflected in both frontend and backend.

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

### Deployment

The project is [deployed live](https://demo-music-list.up.railway.app/) on Railway.  
Deployment is triggered by a push to the `main` branch.

The `main` branch is protected: it requires a PR to be merged — and merging requires the QA workflow to pass (linting, type checking, etc.).

## Final thoughts

I really enjoyed working on this challenge. Small goals yet a waste amount of possibilities if we consider deployment automatization and optimizations per se.
Yes, I know that life is not like that: we do not have unlimited time and infinite resources and infinite time to do the "right things". 
Meanwhile, it was a perfect opportunity for my personal growth and to show my skills.

Obviously this project has many (unknown) issues. I am open for any constructive critics or ideas.
Whatever happens, this project I built will be useful in my future.

## License
This project is licensed under the MIT License.

#### Author
Máté Sedlák
szedlakmate@gmail.com
