<a href="https://job-fitty.vercel.app/">
  <h1 align="center">Job Fitty</h1>
</a>

Create your job post, upload candidates resumes and get your AI-powered candidate score!

This is actually my learning and portfolio project.

Keep in mind that the project is not yet complete and has shortcomings. You can contribute for the missing parts.

![Screenshot 2024-03-09 at 19 59 33](https://github.com/uzanenis/Job-Fitty/assets/73305571/f2272d8d-171f-4e61-87c7-03e10bf8547b)

![Screenshot 2024-03-09 at 20 29 05](https://github.com/uzanenis/Job-Fitty/assets/73305571/696d06e0-8ea3-49d9-9e12-a1c774ed1ac5)

![Screenshot 2024-03-09 at 20 29 36](https://github.com/uzanenis/Job-Fitty/assets/73305571/036a9eee-7d47-4ce6-9f09-d4f1349f12b9)

![Screenshot 2024-03-26 at 22 07 34](https://github.com/uzanenis/Job-Fitty/assets/73305571/ce7e01a9-6097-4c5e-b544-f86c8b7426a8)

![Screenshot 2024-03-26 at 22 07 43](https://github.com/uzanenis/Job-Fitty/assets/73305571/e0cf6c37-301f-4440-a62d-0a97a7ca266b)


## Local Development

Clone the project

```bash
  git clone https://github.com/uzanenis/Job-Fitty.git
```

Go to the project directory

```bash
  cd ai-interview
```

Copy envoriments and edit it

```bash
  cp .env.example .env
```

Install dependencies

```bash
  npm install
```

Start the local server

```bash
  npm run dev
```

## Tech Stack

Next.js [App Router](https://nextjs.org/docs/app) for the frontend

[Prisma](https://www.prisma.io/) for ORM

[Supabase](https://supabase.com/) for database

[Shadcn](https://ui.shadcn.com/) for the components

[Tailwind CSS](https://tailwindcss.com/) for the styling

[Zustand](https://github.com/pmndrs/zustand) for store

[Vercel](https://vercel.com/) for deploy

## Deploy Your Own

You can deploy this project by setting up some requirements

1. run `npm install` first
2. copy envoriment variables `cp .env.example .env`
3. edit and save your envoriments.
4. `npm run build` and you can deploy anywhere. (Can be dockerize)

##

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Roadmap

- [x] Preview uploaded pdfs.
- [x] List resume when uploaded
- [x] Create Company Jobs
- [x] Create and List company jobs in dialog
- [x] Refactor upload resume form to shadcn Form
- [x] Components back buttons
- [x] Create component header
- [x] Upload pdf text to database
- [ ] Table pagination
- [x] CRUD on list
- [x] Clear file input after submit resume
- [x] Select pdf and analyze by job posting
- [x] Analyze resume with OpenAI
- [ ] Show analyze result
- [ ] Refactor upload resume(dropzone, progress, uploadthing)
- [ ] Footer
- [ ] Summary page(How many application reviewed? etc..)
- [ ] Landing page
- [ ] Contact page
- [ ] Pricing page
- [ ] About page
- [ ] Privacy page
- [ ] Stripe
- [ ] Transcribe meeting interview and review it
