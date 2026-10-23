# TinyTalk AI – Phase 1
Static PWA on Cloudflare Workers Static Assets. No backend, no secrets.
## Files
wrangler.jsonc · public/{index.html,style.css,app.js,manifest.json,service-worker.js,icon.svg,privacy.html,parent-guide.html}
## Deploy from phone
1. GitHub app/web: new repo `tinytalk-ai`, upload files keeping the `public/` folder.
2. Cloudflare dashboard → Workers & Pages → Create → Import a repository → pick repo. Build command empty; deploy.
3. Open the workers.dev URL in Chrome, wait for load once, then Menu → Install app. Test offline in airplane mode.
## Honest limits
- No prerecorded audio yet: speech is the phone's TTS (Hindi voice may be missing on some devices). Animal "sounds" are spoken words, not recordings.
- Pictures are emoji (look varies by Android version). Original SVG art / licensed audio are the next step.
- Not yet built: memory cards, daily challenge, speech recognition, offline downloads, extra topics (numbers, colors…), additional languages.
- Test on a real Android phone before sharing.
