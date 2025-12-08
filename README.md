# Music library demo app 
♪~ ᕕ(ᐛ)ᕗ

![QA Workflow](https://github.com/sedlakmate/demo-song-listing/actions/workflows/push-qa.yml/badge.svg)

This is a simple music library demo app that allows users to view a list of **song titles**, **artists**, and **album covers**.  
Working with the music itself is not part of the project ¯\\_(ツ)_/¯

## Links

- [Repository](https://github.com/sedlakmate/demo-song-listing)
- [Live demo](https://demo-music-list.up.railway.app/)
- [API documentation](https://demo-song-listing-production.up.railway.app/api-docs/)

## Notes

This project was created for a job interview. The original instructions defined core features and some nice-to-have extras.  
This implementation aims to accomplish all the requirements and bonus points.

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

The project uses **corepack** to manage the Yarn package manager. This ensures all developers and CI/CD environments use the same Yarn version (4.6.0).

#### Prerequisites

1. **Node.js** (version 20.0.0 or higher) - [Download](https://nodejs.org/)
2. **corepack** - Comes bundled with Node.js 16.9.0+, but needs to be enabled:
   ```bash
   corepack enable
   ```
3. **Docker** and **docker-compose** for running the full application stack

#### Setup

1. Clone the [repository](https://github.com/sedlakmate/demo-song-listing)
   ```bash
   git clone https://github.com/sedlakmate/demo-song-listing.git
   cd demo-song-listing
   ```

2. Enable corepack (one-time setup):
   ```bash
   corepack enable
   ```
   This command sets up Yarn 4.6.0 as managed by corepack.

3. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

4. Build the project using Turbo:
   ```bash
   yarn build
   ```

5. Start the application stack:
   ```bash
   docker-compose up -d
   ```

The app should now be running locally:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Backend API Docs**: http://localhost:3001/api-docs/

#### Yarn and Corepack

This project uses **Yarn 4.6.0** managed through **corepack**. This approach provides:

- **Version consistency**: All team members and CI/CD environments use the exact same Yarn version
- **No global installation needed**: Corepack handles Yarn installation per project
- **Automatic updates**: Updating the `packageManager` field in `package.json` automatically updates Yarn
- **Reduced conflicts**: No NPM cache conflicts or version mismatches across environments

All `package.json` files in this monorepo explicitly declare `"packageManager": "yarn@4.6.0"`.

**Common Yarn commands:**
- `yarn install` - Install dependencies
- `yarn build` - Build all packages using Turbo
- `yarn dev` - Start development mode with file watchers
- `yarn lint` - Run linting across all packages
- `yarn type-check` - Run TypeScript type checking
- `yarn test` - Run unit tests

For more information on Yarn, visit [yarnpkg.com](https://yarnpkg.com/).

File watchers run in the background during `yarn dev`, so code changes are reflected in both frontend and backend automatically.

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
