# VERDANT & VEIL
## Complete beginner's guide: from a ZIP file to a working website and custom CMS

Welcome. This guide assumes you are starting from zero. You do not need to know where files go, what commands do, or how Supabase works. Follow the steps in order. Do not skip ahead until the current checkpoint works.

This project is a demonstration salon website for an educational video. It includes a public-facing website, a custom admin dashboard, Supabase authentication, a database for services and opening hours, a contact form, and optional email notifications through Resend. The project uses Next.js, React, TypeScript, CSS Modules and Supabase. The website is designed to be a polished demo, not a full appointment booking or payment platform.

## CONTENTS

1. What you need before starting
2. What the finished project does
3. Install or check the required programs
4. Extract the ZIP and open the correct folder
5. Open the project in VS Code
6. Install the project packages in CMD
7. Create a free Supabase project
8. Create the database tables and sample content
9. Create your administrator login securely
10. Configure the environment file
11. Start the website on your computer
12. Test the public website and CMS
13. Set up email notifications without paying
14. Add your own image files
15. Prepare the project for deployment
16. Deploy to Vercel
17. Configure Supabase for the deployed site
18. Test the production website
19. Record the video footage
20. The planned short coding demonstration
21. Common errors and exact fixes
22. Security checklist
23. Project file map
24. Final completion checklist

---

## 1. WHAT YOU NEED BEFORE STARTING

You need:

- A Windows computer.
- An internet connection for the first setup and deployment.
- Visual Studio Code (VS Code), a free code editor.
- Node.js, which includes npm. npm installs the libraries the project needs.
- Git, which helps track changes and publish the project to GitHub.
- A free Supabase account for the database and authentication.
- A free Vercel account for public hosting.
- Optionally, a free Resend account for email notifications. The contact form still stores enquiries in Supabase if email is not configured.

No paid AI API is required. Do not enter a credit card just to complete the local demonstration. If any service presents a paid upgrade, skip the upgrade and use the documented fallback.

### Important words in plain English

- **Project folder:** the folder containing the website's files.
- **Terminal / CMD:** the black or dark window where you type commands.
- **Dependency / package:** code written by other developers that this project uses.
- **Local website:** a website running on your own computer, usually at `http://localhost:3000`.
- **Database:** where the website stores services, prices, hours and enquiries.
- **Environment file:** a private settings file named `.env.local`. It connects the code to Supabase and optional email delivery.
- **CMS:** content management system. It is the private dashboard the salon owner uses to change website content.
- **Deployment:** publishing the website online so other people can open it.
- **RLS:** Row Level Security. Database rules that determine who can read or change each type of data.

---

## 2. WHAT THE FINISHED PROJECT DOES

### Public website

The public site includes:

- A custom Verdant & Veil identity.
- A responsive editorial homepage.
- Four sample salon services with descriptions, prices and durations.
- Opening hours.
- A contact enquiry form.
- A footer identifying the site as a demonstration project.
- A link to the private admin login.

### CMS dashboard

The dashboard includes:

- Administrator sign-in.
- A list of services.
- Add, edit, publish/hide and delete actions for services.
- Editing opening hours.
- A private enquiries inbox.
- Enquiry status management.
- A sign-out action.

### Contact enquiries

When a visitor submits the contact form, the server validates the information and saves the enquiry to Supabase. If Resend is configured correctly, the server also sends an email notification. If email is not configured or delivery fails, the enquiry remains saved in Supabase and can be reviewed in the admin inbox.

### What is deliberately not included

This is not an appointment scheduling system, payment system, inventory manager or multi-branch salon platform. Do not advertise those features as part of this demo.

---

## 3. INSTALL OR CHECK THE REQUIRED PROGRAMS

You may already have Node.js, npm, Git and VS Code installed. Check before reinstalling anything.

### Step 3.1: Open Windows CMD

1. Press the Windows key on your keyboard.
2. Type `cmd`.
3. Click **Command Prompt**.
4. A dark window will open. This is where you type the commands in this guide.

Do not type the `>` symbol shown in some examples. Type only the command after it.

### Step 3.2: Check Node.js

Type this and press Enter:

```cmd
node -v
```

A version number should appear, such as `v20.x.x`, `v22.x.x` or a newer supported LTS release. If CMD says `node is not recognized`, Node.js is either not installed or not available in PATH. Install the current Node.js LTS release from `https://nodejs.org/`, then close and reopen CMD.

### Step 3.3: Check npm

```cmd
npm -v
```

A version number should appear. If not, reinstall Node.js LTS and reopen CMD.

### Step 3.4: Check Git

```cmd
git --version
```

A Git version number should appear. If Git is not recognised, install Git for Windows from `https://git-scm.com/downloads/win`, then close and reopen CMD.

### Step 3.5: Check VS Code

Press the Windows key and type `Visual Studio Code`. If it appears, open it. If not, install the free version from `https://code.visualstudio.com/`.

Checkpoint: `node -v`, `npm -v` and `git --version` should all print version numbers.

---

## 4. EXTRACT THE ZIP AND OPEN THE CORRECT FOLDER

1. Find the ZIP file you downloaded.
2. Right-click it.
3. Choose **Extract All…**.
4. Choose a simple location, such as your Desktop or Documents folder.
5. Click **Extract**.
6. Open the extracted `verdant-veil-demo` folder.

You should see items such as `app`, `components`, `lib`, `public`, `supabase`, `package.json` and `README.md`.

**Important:** The folder containing `package.json` is the project root. Commands in this guide must be run from that folder. Do not run them from the outer folder that merely contains the project folder.

### How to confirm you are in the right folder

Open CMD. If the project folder is on your Desktop, enter a command like this:

```cmd
cd %USERPROFILE%\Desktop\verdant-veil-demo
```

If you extracted it somewhere else, change the path to match the actual location. One simple method is to open the project folder in File Explorer, click the address bar, copy the folder path, then use `cd ` followed by the path in CMD. If the path contains spaces, wrap it in quotation marks.

Now type:

```cmd
dir
```

Look for `package.json`. If it is not listed, you are in the wrong folder. Use `cd` to enter the inner `verdant-veil-demo` folder.

---

## 5. OPEN THE PROJECT IN VS CODE

Keep CMD open in the project root.

Type:

```cmd
code .
```

The space and the dot matter. The dot means “open the current folder”.

If the command `code` is not recognised:

1. Open VS Code from the Windows Start menu.
2. Click **File**.
3. Click **Open Folder…**.
4. Browse to the extracted `verdant-veil-demo` folder.
5. Select the folder and click **Select Folder**.

In VS Code, the left sidebar should show the project files. Click `package.json` to confirm you opened the right project.

---

## 6. INSTALL THE PROJECT PACKAGES IN CMD

In VS Code, open the built-in terminal:

1. Click **Terminal** in the top menu.
2. Click **New Terminal**.
3. A terminal panel opens at the bottom.
4. Check that its current path ends in `verdant-veil-demo`.

If it is not in the project root, use `cd` to enter that folder.

Now run:

```cmd
npm install
```

This downloads the project libraries. It may take a few minutes. Wait until CMD returns to a prompt. Warnings are not always fatal. If you see `npm ERR!`, copy the full error text and troubleshoot before continuing.

Checkpoint: a `node_modules` folder should appear. It is large and should not be manually edited.

---

## 7. CREATE A FREE SUPABASE PROJECT

Supabase provides the database and administrator authentication.

### Step 7.1: Create the project

1. Open `https://supabase.com/` in your browser.
2. Sign in or create an account.
3. Create a new project.
4. Name it something like `verdant-veil-demo`.
5. Choose a strong database password and keep it private. This database password is not the same as your website administrator password.
6. Choose an available free plan and a nearby region if offered.
7. Wait for the project to finish provisioning.

Do not share the database password, API keys or administrator login publicly.

### Step 7.2: Find the project URL and publishable/anon key

In your Supabase project:

1. Open **Project Settings**.
2. Find **API** or **API Keys**. The dashboard wording may change.
3. Copy the Project URL. It looks like `https://something.supabase.co`.
4. Copy the publishable key or legacy anon/public key.

Use only the publishable/anon key in `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Do **not** use a `service_role` or secret key in the browser or in any `NEXT_PUBLIC_` variable. This project is designed around database permissions, not a service-role key.

Keep this browser tab open. You will need the URL and public key shortly.

---

## 8. CREATE THE DATABASE TABLES AND SAMPLE CONTENT

The SQL file creates the tables, permissions and starter content.

1. In Supabase, open **SQL Editor**.
2. Choose **New query**.
3. In VS Code, open `supabase/schema.sql`.
4. Select all the text in that file and copy it.
5. Return to Supabase SQL Editor and paste the SQL.
6. Click **Run**.
7. Wait for the query to finish.

If it succeeds, the tables are ready. The SQL script is designed so you can run it again without duplicating the sample service and hours rows.

### What the tables mean

- `services`: the service name, description, price, duration, image category and publication status.
- `opening_hours`: one row for each day of the week.
- `contact_enquiries`: submitted messages, including their status.
- `site_admins`: an allow-list of administrator user IDs permitted to manage content.

### Important security detail

The database has Row Level Security enabled. Public visitors can read published services and opening hours and insert an enquiry. They cannot read the private enquiries inbox. Only an authenticated user whose ID is in `site_admins` can manage services, change opening hours, or view and update enquiries.

Checkpoint: In Supabase **Table Editor**, confirm that `services`, `opening_hours`, `contact_enquiries` and `site_admins` exist.

---

## 9. CREATE YOUR ADMINISTRATOR LOGIN SECURELY

You must create an administrator account, then explicitly allow-list its user ID. Merely creating an account does not automatically grant it permission to edit the site.

### Step 9.1: Create the auth user

1. In Supabase, open **Authentication**.
2. Open **Users**.
3. Click **Add user** or **Create user**.
4. Enter an email address you control.
5. Set a strong password and store it in a password manager or another safe place.
6. If Supabase offers a “confirm email” choice for manually created users, follow the dashboard's instructions for your own demo account.
7. Create the user.

### Step 9.2: Copy the user's UUID

In the Authentication user list, open the user you just created. Copy the **User UID** or UUID. It looks like a long identifier with letters, numbers and hyphens. It is not your email address.

### Step 9.3: Add the user to the site_admins allow-list

1. Return to **SQL Editor**.
2. Create a new query.
3. Paste the following, replacing `PASTE-YOUR-USER-UUID-HERE` with the UUID you just copied:

```sql
insert into public.site_admins (user_id)
values ('PASTE-YOUR-USER-UUID-HERE');
```

4. Run the query.

Do not include the placeholder text or angle brackets. Keep the single quotation marks around the UUID.

Checkpoint: You have a Supabase Auth user and a matching row in `site_admins`. Only then will the account have permission to edit services and read enquiries.

If the SQL says a row already exists, the user may already be allow-listed. You can inspect `site_admins` in Table Editor.

---

## 10. CONFIGURE THE ENVIRONMENT FILE

The website needs to know which Supabase project to connect to.

### Step 10.1: Create `.env.local`

1. In VS Code's left file list, find `.env.example` in the project root.
2. Right-click it and choose **Copy** or open it and copy its contents.
3. In the project root, create a new file named exactly `.env.local`.
4. Paste the template into `.env.local`.
5. Replace the Supabase placeholder URL and key with the real values from Step 7.

Your file should follow this pattern:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-real-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-real-public-anon-key

RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
SALON_NOTIFICATION_EMAIL=your-email@example.com
```

The values above are examples, not working credentials. Use the URL and public key from your own project. Do not add quotation marks unless a service specifically tells you to. Do not put spaces around the `=` sign.

The last three settings are for optional email notifications. Leave `RESEND_API_KEY` blank until you set up Resend in Step 13. `SALON_NOTIFICATION_EMAIL` should be the inbox where you want to receive demo notifications.

### Step 10.2: Save the file

Press `Ctrl + S`.

The filename must be `.env.local`, not `.env.local.txt`. If Windows hides file extensions, confirm the name carefully in VS Code.

### Step 10.3: Keep it private

Never paste `.env.local` into a public post, video, screenshot, or GitHub repository. The `.gitignore` file excludes it from Git by default. You can show the existence of the file in a recording, but do not show the values inside it.

---

## 11. START THE WEBSITE ON YOUR COMPUTER

In the VS Code terminal, from the project root, run:

```cmd
npm run dev
```

Wait until Next.js says the local server is ready. Open your browser and visit:

`http://localhost:3000`

You should see the Verdant & Veil homepage.

Keep the terminal open while using the website. To stop the local server, return to the terminal and press `Ctrl + C`. If Windows asks whether to terminate the batch job, type `Y` and press Enter.

### If you edit `.env.local`

Stop the development server with `Ctrl + C`, then start it again with `npm run dev`. Environment variables are loaded when the server starts.

### If the homepage still shows demo content

The homepage has safe preview content as a fallback if Supabase has not been configured or the query fails. That keeps the design visible during setup, but you must not assume the backend is connected merely because the page looks good.

To verify the database connection, continue to the CMS tests and make a real edit. If the change persists and appears on the public website after refresh, the connection is working.

---

## 12. TEST THE PUBLIC WEBSITE AND CMS

Follow these tests in order. Do not move to deployment until the local version works.

### Test A: Public page

1. Open `http://localhost:3000`.
2. Scroll from top to bottom.
3. Check the services and opening hours.
4. Click the navigation links.
5. Make the browser narrower or use the browser's device toolbar to check mobile layout.

### Test B: Administrator login

1. Visit `http://localhost:3000/admin/login`.
2. Enter the email and password created in Step 9.
3. Sign in.
4. You should reach `/admin/dashboard`.

If sign-in succeeds but saving content is denied, verify that the same user's UUID was added to `site_admins`.

### Test C: Change a service price

1. In the dashboard, open **Services**.
2. Click **Edit** beside `The Signature Facial`.
3. Change the price from `28000` to a test value such as `30000`.
4. Click **Save service**.
5. Open the public website in another browser tab.
6. Refresh the public page.
7. Verify that the new price appears.

You can restore the original price after the test. This is the main functional demonstration in the video.

### Test D: Opening hours

1. Return to the CMS.
2. Click **Opening hours**.
3. Change one closing time.
4. Save.
5. Refresh the public website and confirm the change appears.
6. Restore the sample hours if desired.

### Test E: Contact enquiry

1. Open the public site's contact section.
2. Fill in your own test name, email, topic and a message longer than ten characters.
3. Submit it.
4. Confirm that the form shows a success message.
5. Open the CMS and click **Enquiries**.
6. Confirm that the message appears.
7. Change its status and confirm that the dashboard updates.

If the enquiry appears in Supabase but no email arrives, the form's database flow works. Email notification configuration is a separate step, described next.

### Test F: Sign out

Use **Sign out** in the dashboard. You should return to the login screen. If you visit `/admin/dashboard` again without signing in, you should be redirected to the login page.

---

## 13. SET UP EMAIL NOTIFICATIONS WITHOUT PAYING

The enquiry inbox is the reliable fallback. Email is an additional convenience, and it depends on the email provider's current free-tier rules and verification requirements.

This project uses Resend's API if you configure it. Do not upgrade to a paid plan just for this demonstration.

### Step 13.1: Create a Resend account

1. Visit `https://resend.com/`.
2. Create an account if the free tier is available to you.
3. Open the API Keys area.
4. Create a restricted key appropriate for sending emails, if the dashboard offers permission choices.
5. Copy the key once and keep it private.

### Step 13.2: Configure the sender

For initial testing, Resend may provide an onboarding sender, such as `onboarding@resend.dev`. Its restrictions can mean that you can only send to the email address associated with your Resend account until you verify a domain. Follow the current instructions in the Resend dashboard.

Do not buy a domain just for this demo. If a verified domain is required for your desired recipient, leave email unconfigured and use the private CMS inbox. Do not spend money to complete this video.

### Step 13.3: Add the settings to `.env.local`

Open `.env.local` and set:

```env
RESEND_API_KEY=re_your_actual_key
RESEND_FROM_EMAIL=onboarding@resend.dev
SALON_NOTIFICATION_EMAIL=your-verified-recipient@example.com
```

Use the exact sender and recipient permitted by your Resend account. Save the file and restart `npm run dev`.

### Step 13.4: Test email

Submit another test enquiry from the public site. Check the recipient inbox and spam folder. If the message arrives, the email notification works. If it doesn't, inspect the terminal for errors and the provider dashboard for rejected messages.

Regardless of email status, confirm that the enquiry is saved in the admin inbox. The API deliberately preserves the database entry even if sending the email fails.

### Email privacy

The email notification contains the name, reply email, topic and message submitted by the visitor. For this fictional demo, use only test information. Never put private customer information in a video recording.

---

## 14. ADD YOUR OWN IMAGE FILES

The design currently uses remote editorial photos so the site looks complete immediately. You can replace them with your own properly licensed images.

### Recommended images

Save your images inside `public/images/`. The suggested names are:

- `hero-salon.jpg`: wide salon interior photograph.
- `signature-facial.jpg`: facial or skincare treatment.
- `silk-press.jpg`: hair treatment or finished hairstyle.
- `veil-manicure.jpg`: manicure or nail treatment.
- `brow-shape.jpg`: portrait or brow treatment.
- `studio-detail.jpg`: calm self-care/editorial photograph.

Use your own images or images you have permission to use. A 1200–1800 pixel long edge is usually enough for this design. Compress the files so the website remains fast on mobile data.

### Add the images without editing code

1. Open the `public` folder in VS Code.
2. Open its `images` folder.
3. Copy each image into that folder and rename it to match the exact filename list above.
4. Save the files.
5. Refresh the website.

That is all. The components already look for those local filenames automatically. If a named local file is not present yet, the website uses an online demo fallback, so the layout can still be tested. The file `public/images/README.md` contains the same map. Keep each filename identical, including letter case. Use JPEG files for the requested `.jpg` filenames. If an image fails to display, confirm it is inside `public/images` and that its filename matches exactly.

### Important note about service images

The CMS stores an image category (`facial`, `silk-press`, `manicure`, or `brows`) rather than uploading arbitrary files. The dashboard can select a category for a service. This keeps the demo small and avoids implementing a full image-upload/media library. Adding a new category requires updating the category mapping in `components/ServiceCard.tsx` and the allowed values in `supabase/schema.sql`.

---

## 15. PREPARE THE PROJECT FOR DEPLOYMENT

Before deploying, make sure:

- The public page loads locally.
- Administrator login works.
- A service edit saves and appears publicly.
- Opening hours save and appear publicly.
- Enquiries are saved and visible only in the admin inbox.
- You have not placed any secret key in client-side code.
- `.env.local` is not committed to Git.

In CMD or the VS Code terminal, run:

```cmd
npm run build
```

This checks that Next.js can compile the project for production. Wait for it to finish. If it fails, fix the reported error before deploying. Do not assume a site that works in development is automatically ready for production.

If the build reports a lint or TypeScript issue, read the first relevant error and correct that issue first. Do not randomly delete code to make the build pass.

---

## 16. DEPLOY TO VERCEL

Vercel hosts the Next.js website. You can deploy from a GitHub repository using the free tier, subject to the provider's current plan and usage limits.

### Step 16.1: Create a GitHub repository

1. Visit `https://github.com/` and sign in.
2. Create a new repository named `verdant-veil-demo`.
3. For this demo, a private repository is a sensible default because it contains your working project. Do not upload `.env.local`.
4. Leave README initialisation unchecked if you intend to push this existing folder with its own README.

### Step 16.2: Push the local project to GitHub

In the VS Code terminal, confirm you are in the project root and run these commands one at a time:

```cmd
git init
git add .
git commit -m "Build Verdant and Veil salon demo"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/verdant-veil-demo.git
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username. Do not type the placeholder literally. If Git asks you to sign in, follow GitHub's browser authentication prompt.

If the project already has a Git repository, do not repeat `git init` or add a second remote blindly. Run `git status` and `git remote -v` first. If `origin` already exists, update it only if you understand which repository it points to.

Before pushing, you can check that the private environment file is ignored:

```cmd
git status --short
```

`.env.local` should not appear in the list of files to commit. If it does, stop and fix `.gitignore` before pushing. If a secret was ever pushed publicly, rotate that key in the provider dashboard. Deleting the file in a later commit does not erase it from Git history.

### Step 16.3: Import the repository into Vercel

1. Visit `https://vercel.com/` and sign in with GitHub.
2. Choose **Add New Project** or the equivalent import option.
3. Select the `verdant-veil-demo` repository.
4. Keep the framework as Next.js.
5. Before deploying, open **Environment Variables**.
6. Add `NEXT_PUBLIC_SUPABASE_URL` with your Supabase project URL.
7. Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your Supabase publishable/anon key.
8. If email is configured, add `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `SALON_NOTIFICATION_EMAIL` as separate environment variables.
9. Deploy.

Never add a Supabase `service_role` key. This project does not require one. Do not add your database password as an environment variable.

Wait for Vercel to finish. Open the deployment URL it gives you.

---

## 17. CONFIGURE SUPABASE FOR THE DEPLOYED SITE

### Step 17.1: Configure authentication URLs

In Supabase, open **Authentication** and find the URL configuration section. Add your real Vercel deployment URL as the Site URL or an allowed redirect URL according to the dashboard's current instructions. For example, if Vercel gives you `https://verdant-veil-demo-yourname.vercel.app`, use that exact URL. Do not copy the example literally.

The current login flow uses password authentication and returns to `/admin/dashboard`. If you later enable email confirmation or password recovery, add the relevant callback URLs as required by Supabase.

### Step 17.2: Redeploy if environment variables changed

If you add or edit environment variables after deploying, trigger a new deployment in Vercel. Environment changes do not always update an already-created deployment automatically.

### Step 17.3: Check the production admin account

Open the deployed website and visit `/admin/login`. Sign in with the administrator account you created in Supabase. Confirm that the account is still allow-listed in `site_admins`.

---

## 18. TEST THE PRODUCTION WEBSITE

Do not stop at “the Vercel link opens.” Test the actual deployed version.

1. Open the public Vercel URL on your computer.
2. Open it on your phone if possible.
3. Confirm images load.
4. Confirm the services and opening hours display.
5. Submit a test enquiry.
6. Open `/admin/login` and sign in.
7. Confirm the enquiry appears in the private inbox.
8. Edit a service price and save it.
9. Open the public page in another tab and refresh it.
10. Confirm the changed price appears.
11. Sign out and verify that `/admin/dashboard` redirects to login.
12. Confirm the public site uses HTTPS. Vercel normally provisions HTTPS for its deployment domain.

If production fails but local development works, check Vercel's deployment logs and confirm that every environment variable is present in the correct environment. Check Supabase's Authentication URL settings too.

---

## 19. RECORD THE VIDEO FOOTAGE

Record only after the relevant feature works. Do not record a screen showing a success state that the application has not actually reached.

### Prepare your desktop

- Close unrelated browser tabs and notifications.
- Keep the project in VS Code and the running website in a separate browser window.
- Increase browser zoom slightly if text is too small to read in a screen recording.
- Never show `.env.local` values, passwords, private keys, database credentials or real customer information.
- Use fictional test enquiries only.
- Keep each source recording longer than the final clip so you can trim it cleanly.

### Suggested clips

1. Public homepage: slow, steady scroll from the hero to the services.
2. Mobile layout: show the public website at a phone-sized viewport.
3. Contact form: submit a fictional enquiry and show the confirmation.
4. CMS login: sign in without showing the password being typed if you prefer.
5. Service edit: open a service, change the price and save it.
6. Public verification: refresh the public website and show the new price.
7. Opening hours: edit a time and show it on the public page.
8. Handover: show a prepared checklist, not private account settings.
9. On-camera opening and closing: record these separately in good light and with clear audio.

The video is planned for approximately 4–5 minutes. You do not need to show every line of code. The finished product and the evidence that the CMS works are the main demonstrations.

---

## 20. THE PLANNED SHORT CODING DEMONSTRATION

The planned file for a short, meaningful code shot is:

`app/admin/dashboard/Dashboard.tsx`

This is the actual client-side CMS dashboard. It contains the service editing form and the function that saves service changes to Supabase. It is a more meaningful demonstration than opening an arbitrary CSS file because it connects a visible business action to the database.

### What to practise before recording

1. In VS Code, use the left file explorer to open `app`.
2. Open `admin`.
3. Open `dashboard`.
4. Open `Dashboard.tsx`.
5. Search in the file for `async function saveService` using `Ctrl + F`.
6. Read the function before recording. It validates the fields, sends an insert or update to Supabase, updates the visible service list and displays a result message.
7. Practise explaining that sequence in your own words.

For the camera shot, you can record a short genuine code edit related to the service editor, such as improving the validation message, then save and test that change. Rehearse the edit first so the recording is clean. The important thing is that the change is real and you can explain what it does. You do not need to pretend that you independently wrote every file in the project.

If you want to show yourself typing code, type a small change that you understand, save it, and demonstrate the result. A prepared project plus a clear explanation of a real change is more credible than a long, staged coding performance.

---

## 21. COMMON ERRORS AND EXACT FIXES

### Error: `node is not recognized`

Node.js is not available in CMD. Install the current Node.js LTS release, close all CMD windows, open a new one and run `node -v` again.

### Error: `npm is not recognized`

Install or repair Node.js, then reopen CMD. npm is normally included with Node.js.

### Error: `ENOENT` or `package.json` not found

The terminal is in the wrong folder. Run `dir`. If `package.json` is not listed, use `cd` to enter the project folder.

### Error: `Missing Supabase environment variables`

Confirm `.env.local` exists in the same folder as `package.json`. Check the exact spelling of both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Restart the development server after changing the file.

### The homepage looks correct but changes do not save

The visual fallback may be showing demo data. Confirm that the SQL script ran, that the Supabase URL and key are correct, and that the browser is using the same project. Then check the browser console and the Supabase logs.

### Error: `new row violates row-level security policy`

For a service edit, confirm that you are signed in as the correct Supabase user and that the user's UUID is in `site_admins`. For an enquiry, confirm that the SQL script created the insert policy and that the submitted fields pass validation.

### Login works but the CMS cannot edit services

Authentication alone does not grant admin rights. Repeat Step 9. Make sure the exact UUID of the logged-in user appears in `site_admins`.

### Contact form says it cannot save the enquiry

Check the Supabase URL/key and confirm the SQL script created `contact_enquiries`. Inspect the terminal for the server error. Confirm the database insert policy exists. Do not solve this by adding a service-role key to client-side code.

### Enquiry saves but email does not arrive

This normally means the database path works but the email provider is not configured or has rejected the sender. Check `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `SALON_NOTIFICATION_EMAIL`; restart the server; check the Resend dashboard and spam folder. Use the admin inbox as the fallback.

### Error: `EADDRINUSE` or port 3000 already in use

Another development server is using the port. Find its terminal and stop it with `Ctrl + C`, or use the alternative port offered by Next.js. Open the exact localhost URL printed in the terminal.

### Image is missing

Check that the file exists inside `public/images` and that the source path starts with `/images/`. Remember that `public/images/hero-salon.jpg` is referenced in the browser as `/images/hero-salon.jpg`, not `/public/images/hero-salon.jpg`.

### Vercel deployment fails

Open the deployment's build logs and fix the first actual error. Confirm that `npm run build` succeeds locally and that the correct repository was imported. Environment variables must be added in Vercel, not only in your local `.env.local` file.

### Vercel site opens but admin login fails

Check the Supabase URL configuration, Vercel environment variables, and that the administrator user remains in `site_admins`. Trigger a redeployment after changing environment variables.

---

## 22. SECURITY CHECKLIST

Before recording or sharing the demo:

- Do not expose `.env.local`.
- Do not use a Supabase service-role or secret key in the browser.
- Do not share your Supabase database password.
- Keep contact enquiries private to allow-listed administrators.
- Use test names, test email addresses and fictional messages in recordings.
- Confirm that an unauthenticated visitor cannot open the admin dashboard.
- Confirm that a normal visitor cannot update services.
- Do not publish private deployment logs or account settings that reveal credentials.
- If a secret is exposed, rotate it immediately in the provider's dashboard.

The project is a learning/demo implementation. Before using this as a real commercial salon platform, perform a proper security review, add rate limiting and abuse protection to the public form, configure a verified sender domain for email, set up monitoring and backups, and agree on privacy/data-retention practices with the business owner.

---

## 23. PROJECT FILE MAP

- `app/page.tsx`: public-facing homepage and the main sections of the salon website.
- `app/home.module.css`: homepage layout, responsive styling and visual design.
- `app/globals.css`: global palette, typography and reusable styles.
- `app/layout.tsx`: application root layout and page metadata.
- `app/admin/login/page.tsx`: administrator sign-in page.
- `app/admin/dashboard/page.tsx`: server-side session check and initial dashboard data loading.
- `app/admin/dashboard/Dashboard.tsx`: interactive CMS, service editing, opening-hours editor and enquiry inbox.
- `app/admin/admin.module.css`: admin login and dashboard styles.
- `app/api/contact/route.ts`: server-side validation, enquiry insertion and optional email notification.
- `components/Brand.tsx`: the Verdant & Veil wordmark.
- `components/SiteHeader.tsx`: public navigation.
- `components/ServiceCard.tsx`: service cards and image mapping.
- `components/ContactForm.tsx`: public contact form.
- `lib/demo-content.ts`: safe sample content used as a visual fallback.
- `lib/supabase/client.ts`: browser Supabase client.
- `lib/supabase/server.ts`: server-side Supabase client.
- `lib/format.ts`: currency and time formatting helpers.
- `supabase/schema.sql`: database schema, security policies and starter rows.
- `public/images/README.md`: image naming and replacement instructions.
- `.env.example`: template for environment variable names.
- `.env.local`: your private local values. Never commit this file.

---

## 24. FINAL COMPLETION CHECKLIST

Tick each item only after you have personally verified it.

### Local setup
- [ ] Node.js, npm, Git and VS Code are available.
- [ ] The ZIP is extracted and VS Code opened the folder containing `package.json`.
- [ ] `npm install` completed.
- [ ] Supabase project created.
- [ ] `supabase/schema.sql` ran successfully.
- [ ] Admin Auth user created and its UUID added to `site_admins`.
- [ ] `.env.local` created and populated without exposing secrets.
- [ ] `npm run dev` starts the website.

### Functionality
- [ ] Public website loads.
- [ ] Services load from Supabase.
- [ ] Admin login works.
- [ ] Service edit persists after refresh.
- [ ] Opening-hours edit persists after refresh.
- [ ] Contact enquiry is stored in Supabase.
- [ ] Enquiries are visible only in the admin inbox.
- [ ] Email notification works, or the secure inbox fallback is confirmed.
- [ ] Sign-out and admin route protection work.
- [ ] Mobile layout is usable.
- [ ] `npm run build` succeeds.

### Deployment and recording
- [ ] `.env.local` is not in Git.
- [ ] Repository pushed to GitHub without secrets.
- [ ] Vercel environment variables are set.
- [ ] Public HTTPS deployment works.
- [ ] Production CMS edit updates the public website.
- [ ] Production contact form works.
- [ ] Images are licensed and load correctly.
- [ ] No secrets or real customer information appear in footage.
- [ ] Opening and closing camera shots are recorded.
- [ ] The code demonstration is a real change that you can explain.

You do not need to complete everything in one sitting. Work through the guide in order. If you hit an error, stop at that step and resolve it before continuing.

**End of README.**
