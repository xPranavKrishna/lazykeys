# ⌨️💤 LazyKeys

### *Type fast. Stay lazy.* 😴

So you type with two fingers, stare at the keyboard like it owes you money, and quit TypingClub on day 2? **Same.** That's why LazyKeys exists. One tiny round a day, lots of confetti, zero guilt. 🎉

## 🔗 Try it live
**👉 [https://lazykeys.vercel.app](https://lazykeys.vercel.app)**

---

## 🎮 What even is this?
A touch-typing game (typing *without* looking at the keyboard) built for lazy humans. Each round takes about **one minute**. Do one round a day and your 🔥 streak lives on. Skip a day and the streak dies. No pressure. (Okay, a little pressure.)

## ✨ The fun stuff
- 🦥 **Madiyan the Sloth** is your lazy mentor. He gives tips in English or Manglish.
- 🗺️ **58 lessons in 11 levels:** Home Row → Top Row → Bottom Row → Real Words → Shift → Sentences → Numbers → Code → Speed → Pro → Manglish Fun
- 🖐 **Finger help everywhere:** every key shows which finger types it. The Finger Guide page covers posture and home position.
- 🌈 **Rainbow keyboard:** one colour per finger, the next key glows, and F and J have little bump marks.
- 📅 **Daily lazy quest:** 1 lesson saves your streak. 3 lessons is a bonus. A weak-key rescue round fixes your problem keys.
- ⭐ **Stars, XP, streak and a 10-week heatmap**
- 🙈 **Blind mode:** hides the keyboard so you stop peeking
- 🌙 **Dark mode by default** (soft colours, easy on the eyes) plus a light mode toggle
- 🔐 **Login your way:** Google, email signup, forgot password, or guest mode
- 🌴 **Manglish mode:** one tap for മലയാളം vibes

## 🧭 The lazy plan (10 minutes a day)
| When | What |
|---|---|
| Week 1 | Home row. Stay slow. 95% accuracy is the only goal. |
| Week 2 | Top row |
| Week 3 | Bottom row |
| Week 4 | Real words + Shift and capitals |
| Week 5-6 | Sentences, numbers, code and symbols |
| Week 7-8 | Speed builder (25 to 40 WPM) |
| Week 9-10 | Pro zone (45 to 70 WPM) |

Each lesson takes about a minute. Do 3 a day and you finish in about 2 months. Accuracy first, speed comes by itself. 🐢➜🐇

## 🛠️ Built with
| Tool | Job |
|---|---|
| Next.js 16 | Pages & routing |
| GSAP | Animations & confetti 💥 |
| Firebase Auth | Google / email / guest login 🔐 |
| Firestore | Saves your XP & streak ☁️ |
| Vercel | Free hosting 🚀 |

## 📁 Where is everything?
```
app/
  layout.js          # wraps the app (login, progress, toggles)
  page.js            # sends you to /play
  login, signup, forgot/   # account pages
  play/page.js       # home: daily quest + course map
  lesson/[id]/page.js# the typing screen
  guide/page.js      # posture + finger guide
  globals.css        # dark + light theme styles
components/          # AuthProvider, ProgressProvider, AppShell, NavBar,
                     # Keyboard, Mascot, Heatmap, Toggles, SocialLogin, AuthShell
lib/
  firebase.js        # ALL Firebase + login logic
  curriculum in engine.js  # lessons, levels, text maker
  fingers.js         # which finger types which key
  lang.js            # Manglish translations
```

## 🚀 Run it on your PC
1. Install **Node.js 24 (LTS)** from nodejs.org (Next.js 16 needs 20.9+, and Firebase prefers 24+).
2. Open a terminal in the project folder and run:
   ```bash
   npm install
   cp .env.local.example .env.local   # fill in your Firebase keys
   npm run dev
   ```
3. Open http://localhost:3000 and start typing! ⌨️

## 🔥 Firebase setup (5 minutes, promise)
1. Make a project at https://console.firebase.google.com
2. **Authentication → Sign-in method:** turn on **Email/Password**, **Google** (pick a support email) and **Anonymous**.
3. **Firestore Database → Create database** (production mode). Then paste these **Rules** and hit Publish:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{db}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
4. **Project settings → Your apps → Web (`</>`)**: register an app and copy the config.
5. Put the values in `.env.local`:
   ```
   NEXT_PUBLIC_FB_API_KEY=
   NEXT_PUBLIC_FB_AUTH_DOMAIN=
   NEXT_PUBLIC_FB_PROJECT_ID=
   NEXT_PUBLIC_FB_APP_ID=
   ```
6. After you deploy: **Authentication → Settings → Authorized domains → Add domain** and add your Vercel domain. (Skip this and Google login will sulk.)

## ☁️ Put it on the internet (Vercel)
1. Push the project to GitHub. Your secret keys stay safe because `.env.local` is git-ignored. 🔒
2. Go to https://vercel.com → **Add New → Project** → pick your repo.
3. Add the 4 `NEXT_PUBLIC_FB_...` environment variables.
4. Hit **Deploy**. Wait a minute. Boom, you have a live link! 🎉
5. Don't forget the Firebase **Authorized domains** step above.

## 🌴 Add your own Manglish
Open `lib/lang.js` and add a line:
```js
"English text":"Manglish text"
```
Then wrap the text in the page like `{t("English text")}`. That's it!

## 🩺 When things go wrong
| Problem | Fix |
|---|---|
| Google popup fails | Add your domain in Firebase → Authorized domains |
| Progress not saving | Check Firestore rules + your env values |
| Reset email missing | Check spam. It loves hiding there. 📬 |
| Env changes ignored | Restart `npm run dev` (or redeploy on Vercel) |

## 🗺️ Maybe someday
🏆 Leaderboard · 🔊 Sound effects · 📆 Daily quests · മലയാളം typing lessons · 🌗 Light/dark themes

---

Made with ❤️, caffeine and a LOT of laziness by **Pranav Krishna** · [GitHub @xPranavKrishna](https://github.com/xPranavKrishna)
