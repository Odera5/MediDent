/_Contributor Workflow_/

To keep our main branch clean and stable, we use branches + pull requests (PRs).

1. Clone the Repository
   git clone git@github.com:Odera5/MediDent.git
   cd MediDent

2. Create a New Branch

Always create a branch for your work:

git checkout -b feature/your-feature-name

3. Make Your Changes

Write code, test locally (npm run dev).

Commit changes with clear messages:

git add .
git commit -m "Added job posting form component"

4. Push to GitHub
   git push origin feature/your-feature-name

5. Open a Pull Request (PR)

Go to the repo on GitHub.

GitHub will suggest: “Compare & pull request” → click it.

Add a description of what you changed.

Submit the PR.
Examples:

feature/job-posting-form

fix/firebase-auth-bug 6. Code Review & Merge

Another contributor (or project lead) reviews your PR.

Once approved, it’s merged into main.

🚀 The code is now live in the main branch

Rules to Remember

Never push directly to main (protected).

One feature = one branch.

Write meaningful commit messages.

Small PRs are better than giant PRs (easier to review).
