# 🛣️ Relearn Project Roadmap

This is the high-level roadmap to guide development toward a smart AI-powered school discovery assistant for returning adult learners.

---

## ✅ Phase 1 – Validate Core Experience

- [ ] Implement `/query` OpenAI endpoint in Flask
- [ ] POST to `/query` from frontend with natural prompt
- [ ] Use returned `filters` to call `/schools/discover`
- [ ] Show AI-generated explanation above results
- [x] Build component-based Discover UI (ChatBox, ChatDisplay, ResultCards)
- [x] Test frontend-backend connectivity with Axios

---

## 🧠 Phase 2 – Make It Feel Smart + Real

- [ ] Display: “These were matched based on your need for...” above results
- [ ] Detect “near me” and request user geolocation
- [ ] Reverse-geocode location to ZIP for filtering
- [ ] Add prompt suggestions under ChatBox (e.g., “Try: Flexible IT programs under $10k”)
- [ ] Log prompts to help suggest better queries later

---

## 💰 Phase 3 – Monetization Signals + Market Testing

- [ ] Create waitlist landing page (Popsy, Typedream, or Framer)
- [ ] Add email capture form + early access CTA
- [ ] Add soft paywall hooks (“Want a personalized plan?”)
- [ ] Offer follow-up reminders as a value-add CTA

---

## 📦 Phase 4 – Strengthen Infrastructure (if traction shows)

- [ ] Add OpenAI error fallback (“Can you rephrase?”)
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Netlify/Vercel
- [ ] Track anonymous session activity (log prompts + time)
- [ ] Store session history (localStorage or temp DB)

---

Feel free to add more items as needed or turn this into issues for GitHub Projects.
