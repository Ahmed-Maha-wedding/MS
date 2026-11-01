/* ==========================================================================
   AHMED & MAHA — ROYAL WEDDING INVITATION SCRIPT
   - Primary Language: English (Default) with one-click switch to Arabic
   - Professional Animations: Smooth Parallax, Multi-stage Confetti & Tick Pulse
   - Photorealistic Envelope Unsealing & Audio Auto-Play (Le Kol Ashiq Watan)
   - Real-Time Live Countdown to 3:00 PM (November 11, 2026)
   - Smart Calendar Sync (.ics & Google Calendar)
   - Real-Time RSVP Synchronization to Google Sheets (Google Apps Script)
   ========================================================================== */

// ==========================================================================
// GOOGLE SHEETS RSVP ENDPOINT CONFIGURATION
// تم ربط رابط تطبيق الويب الخاص بك بنجاح
// ==========================================================================
const GOOGLE_SHEETS_RSVP_URL = "https://script.google.com/macros/s/AKfycbwLQOh1KF3GV_lp7U_Klr_dC17swX0qZ4Fz-lKkHDlO-AFTPz2hF4g-I07f98-OFMIV/exec";

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS Scroll Animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: false
    });
  }

  // ==========================================================================
  // 2. BILINGUAL DICTIONARY (Default: English 'en', Switchable to Arabic 'ar')
  // ==========================================================================
  const translations = {
    en: {
      hero_wedding_of: "THE WEDDING OF",
      hero_hours: "3:00 PM – 6:00 PM",
      case_welcome: "WELCOME TO OUR WEDDING",
      case_venue: "Gladius Hall — Gardenia Club<br>ALMAZAH - CAIRO",
      case_time: "3:00 PM — 6:00 PM",
      case_unseal: "TAP TO OPEN",
      together_lead: "TOGETHER WITH THEIR FAMILIES",
      save_date_script: "Save our Date",
      portrait_quote: "The start of our forever ♥",
      invitation_body: "REQUEST THE HONOR OF YOUR PRESENCE<br>TO CELEBRATE OUR WEDDING DAY<br>AS WE BEGIN OUR JOURNEY OF LOVE & HAPPINESS<br>YOUR PRESENCE WILL COMPLETE OUR JOY",
      date_month: "NOVEMBER",
      date_day_name: "WEDNESDAY",
      date_year: "2026",
      date_time_label: "TIME",
      date_time: "3:00 PM – 6:00 PM",
      reception_tagline: "an afternoon of love, joyful music & celebration to follow",
      cal_save: "Mark Your Calendar",
      cal_month_header: "NOVEMBER 2026",
      countdown_title: "Counting down to our forever...",
      unit_days: "Days",
      unit_hours: "Hours",
      unit_mins: "Mins",
      unit_secs: "Secs",
      btn_google: "Add to Google Calendar",
      btn_apple: "Save to Apple / Phone (.ics)",
      venue_header: "The Venue",
      venue_hall: "Gladius Hall",
      venue_ballroom: "GARDENIA CLUB — CHEMICAL WARFARE",
      venue_address: "Gardenia Complex, Chemical Warfare, El Thawra St Ext, after El Geish Bridge, Almazah, Cairo Governorate 11775",
      btn_gps: "Open Live Map &amp; GPS Navigation",
      hours_title: "CELEBRATION HOURS",
      hours_note: "We look forward to welcoming you with joy from 3:00 PM to 6:00 PM",
      rsvp_title: "RSVP",
      rsvp_name_label: "YOUR NAME",
      rsvp_attend_label: "?WILL YOU BE ATTENDING OUR DAY",
      rsvp_yes: "YES",
      rsvp_no: "NO",
      rsvp_msg_label: "WRITE YOUR CONGRATULATIONS",
      rsvp_btn_send: "SEND",
      rsvp_name_ph: "Your Full Name",
      rsvp_msg_ph: "Write your warm blessing for Ahmed & Maha...",
      closing_waiting: "We eagerly look forward to seeing you! ♥",
      footer_info: "WEDNESDAY — NOVEMBER 11, 2026<br>CELEBRATION HOURS: 3:00 PM — 6:00 PM<br>Gladius Hall — Gardenia Club<br>ALMAZAH - CAIRO",
      lang_btn_text: "العربية",
      monogram: "A & M",
      crest_monogram: "A & M",
      footer_monogram: "A & M",
      envelope_couple_names: "AHMED & MAHA",
      envelope_date: "11 • 11 • 2026",
      couple_names: "Ahmed & Maha",
      closing_couple_name: "Ahmed & Maha",
      closing_date_str: "11 • 11 • 2026",
      lightbox_couple_names: "Ahmed & Maha",
      lightbox_date: "11 • 11 • 2026"
    },
    ar: {
      hero_wedding_of: "حفل زفاف",
      hero_hours: "من ٣:٠٠ إلى ٦:٠٠ م",
      case_welcome: "يا أهلاً وسهلاً في فرحنا ♥",
      case_venue: "قاعة الجلاديوس — دار جاردينيا<br>ألماظة - القاهرة",
      case_time: "٣:٠٠ م — ٦:٠٠ م",
      case_unseal: "اضغط لفتح الدعوة",
      together_lead: "بمباركة الأهل والأحباب وبقلوب تفيض فرحاً",
      save_date_script: "احفظوا الموعد",
      portrait_quote: "بداية أجمل حكاية عُمر ♥",
      invitation_body: "يسعدنا ويشرفنا دعوتكم لحضور ومشاركتنا حفل زفافنا<br>لنبدأ معاً أجمل رحلة عمر وأيامنا السعيدة<br>ولنصنع ذكريات تدوم مدى الحياة<br>حضوركم يكتمل به سرورنا وفرحتنا",
      date_month: "نوفمبر",
      date_day_name: "الأربعاء",
      date_year: "٢٠٢٦",
      date_time_label: "الميعاد",
      date_time: "٣:٠٠ م – ٦:٠٠ م",
      reception_tagline: "حفل عامر بالمحبة والبهجة والألحان لتكتمل فرحتنا بصحبتكم",
      cal_save: "احفظوا التاريخ",
      cal_month_header: "نوفمبر ٢٠٢٦",
      countdown_title: "باقي على يوم فرحتنا...",
      unit_days: "يوم",
      unit_hours: "ساعة",
      unit_mins: "دقيقة",
      unit_secs: "ثانية",
      btn_google: "إضافة لتقويم جوجل",
      btn_apple: "حفظ في نتيجة الموبايل (.ics)",
      venue_header: "مكان الاحتفال",
      venue_hall: "قاعة الجلاديوس",
      venue_ballroom: "دار جاردينيا — دار الحرب الكيميائية",
      venue_address: "قاعات حفلات دار جاردينيا، دار الحرب الكيميائية<br>امتداد شارع الثورة بعد كوبري الجيش مباشرةً، ألماظة، القاهرة 11775",
      btn_gps: "عرض الخريطة والـ GPS",
      hours_title: "ميعاد الحفل",
      hours_note: "نسعد باستقبالكم ومشاركتكم فرحتنا من الساعة ٣:٠٠ إلى ٦:٠٠ مساءً",
      rsvp_title: "تأكيد الحضور",
      rsvp_name_label: "الاسم الكريم",
      rsvp_attend_label: "هل ستشرفنا بحضورك؟",
      rsvp_yes: "نعم، بكل سرور",
      rsvp_no: "أعتذر لظروف خاصة",
      rsvp_msg_label: "أطيب التهاني للعروسين",
      rsvp_btn_send: "إرسال",
      rsvp_name_ph: "اسمك الكريم",
      rsvp_msg_ph: "اكتب دعوة حلوة أو تهنئة من القلب لأحمد ومها...",
      closing_waiting: "في انتظاركم لتكتمل فرحتنا! ♥",
      footer_info: "الأربعاء — ١١ نوفمبر ٢٠٢٦<br>ميعاد الحفل: من ٣:٠٠ إلى ٦:٠٠ مساءً<br>قاعة الجلاديوس — دار جاردينيا<br>ألماظة - القاهرة",
      lang_btn_text: "English",
      monogram: "أ & م",
      crest_monogram: "أ & م",
      footer_monogram: "أ & م",
      envelope_couple_names: "أحمد ومها",
      envelope_date: "١١ • ١١ • ٢٠٢٦",
      couple_names: "أحمد ومها",
      closing_couple_name: "أحمد ومها",
      closing_date_str: "١١ • ١١ • ٢٠٢٦",
      lightbox_couple_names: "أحمد ومها",
      lightbox_date: "١١ • ١١ • ٢٠٢٦"
    }
  };

  // Primary Default Language: The invitation ALWAYS opens in English by default
  let currentLang = 'en';
  try {
    localStorage.removeItem('wedding_lang');
  } catch (err) {}

  function applyLanguage(lang) {
    currentLang = lang;

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update Hero Couple Names in Grand Palace Calligraphy
    const heroNames = document.getElementById('hero-couple-names');
    if (heroNames) {
      if (lang === 'ar') {
        heroNames.setAttribute('dir', 'rtl');
        heroNames.innerHTML = `
          <span class="p-groom">أحمد</span>
          <span class="p-ampersand-wrap">
            <span class="amp-bar"></span>
            <span class="amp-char">و</span>
            <span class="amp-bar"></span>
          </span>
          <span class="p-bride">مها</span>
        `;
      } else {
        heroNames.setAttribute('dir', 'ltr');
        heroNames.innerHTML = `
          <span class="p-groom">Ahmed</span>
          <span class="p-ampersand-wrap">
            <span class="amp-bar"></span>
            <span class="amp-char">&</span>
            <span class="amp-bar"></span>
          </span>
          <span class="p-bride">Maha</span>
        `;
      }
    }

    // Update Hero Date Display (ensuring correct order in both languages)
    const heroDate = document.getElementById('hero-date-display');
    if (heroDate) {
      if (lang === 'ar') {
        heroDate.innerHTML = `
          <span>١١</span>
          <span class="p-bullet">•</span>
          <span>١١</span>
          <span class="p-bullet">•</span>
          <span>٢٠٢٦</span>
        `;
      } else {
        heroDate.innerHTML = `
          <span>11</span>
          <span class="p-bullet">•</span>
          <span>11</span>
          <span class="p-bullet">•</span>
          <span>2026</span>
        `;
      }
    }

    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = dict.lang_btn_text;

    const rsvpNameInput = document.getElementById('rsvp-guest-name');
    const rsvpMsgInput = document.getElementById('rsvp-guest-message');
    if (rsvpNameInput) {
      rsvpNameInput.placeholder = dict.rsvp_name_ph;
    }
    if (rsvpMsgInput) {
      rsvpMsgInput.placeholder = dict.rsvp_msg_ph;
    }
  }

  // Initialize Language (English default)
  applyLanguage(currentLang);

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
  }

  // ==========================================================================
  // 3. AUDIO ENGINE (Le Kol Ashiq Watan)
  // ==========================================================================
  const audio = document.getElementById('wedding-audio');
  const audioToggle = document.getElementById('audio-toggle');
  let isPlaying = false;

  function updateAudioUI(playing) {
    isPlaying = playing;
    if (audioToggle) {
      audioToggle.classList.toggle('playing', playing);
      audioToggle.innerHTML = playing ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    }
  }

  function playAudio() {
    if (!audio) return;
    audio.volume = 0.85;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateAudioUI(true);
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }
  }

  function pauseAudio() {
    if (!audio) return;
    audio.pause();
    updateAudioUI(false);
  }

  function toggleAudio() {
    isPlaying ? pauseAudio() : playAudio();
  }

  if (audioToggle) audioToggle.addEventListener('click', toggleAudio);

  // ==========================================================================
  // 4. PHOTOREALISTIC ENVELOPE UNSEALING REVEAL & MULTI-STAGE ANIMATION
  // ==========================================================================
  const introOverlay = document.getElementById('cinematic-intro');
  const envelopeWrapper = document.getElementById('royal-envelope-wrapper');
  const openInviteBtn = document.getElementById('btn-open-invite');
  let envelopeOpened = false;

  function unsealEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    // Multi-stage celebratory fireworks & confetti burst
    if (typeof confetti === 'function') {
      // Stage 1: Central Golden Blast
      confetti({
        particleCount: 110,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#EED59B', '#C5A059', '#FFFFFF', '#3B82F6', '#0C1733']
      });

      // Stage 2: Lateral Flutter
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#EED59B', '#3B82F6', '#FFFFFF']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#EED59B', '#3B82F6', '#FFFFFF']
        });
      }, 300);
    }

    // Trigger Envelope Opening Transition
    if (envelopeWrapper) {
      envelopeWrapper.classList.add('is-open');
    }

    // Auto-start background melody: Le Kol Ashiq Watan
    playAudio();

    // After unfolding reveal, fade out intro and display the palace hero
    setTimeout(() => {
      if (introOverlay) {
        introOverlay.style.opacity = '0';
        setTimeout(() => {
          introOverlay.style.display = 'none';
          window.scrollTo({ top: 0, behavior: 'instant' });
          if (typeof AOS !== 'undefined') AOS.refresh();
        }, 800);
      }
    }, 1300);
  }

  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      unsealEnvelope();
    });
  }

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', unsealEnvelope);
  }

  // ==========================================================================
  // 5. PARALLAX HERO MOTION ON SCROLL
  // ==========================================================================
  const heroPalaceImg = document.getElementById('hero-palace-image');
  if (heroPalaceImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY <= window.innerHeight) {
        const translateY = scrollY * 0.25;
        heroPalaceImg.style.transform = `scale(1.04) translateY(${translateY}px)`;
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 6. MINIMALIST DATE HEART CLICK CELEBRATION (Day 11)
  // ==========================================================================
  const heartDay11 = document.getElementById('heart-day-11');
  if (heartDay11) {
    heartDay11.addEventListener('click', (e) => {
      if (typeof confetti === 'function') {
        const rect = heartDay11.getBoundingClientRect();
        confetti({
          particleCount: 50,
          spread: 75,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          },
          colors: ['#FFFFFF', '#3B82F6', '#60A5FA', '#EED59B']
        });
      }
    });
  }

  // ==========================================================================
  // 7. REAL-TIME LIVE COUNTDOWN TIMER (November 11, 2026 at 3:00 PM / 15:00)
  // ==========================================================================
  function updateCountdown() {
    const targetDate = new Date('2026-11-11T15:00:00').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => n < 10 ? `0${n}` : n;

    const elDays = document.getElementById('cal-days');
    const elHours = document.getElementById('cal-hours');
    const elMins = document.getElementById('cal-mins');
    const elSecs = document.getElementById('cal-secs');

    if (elDays && elDays.textContent !== pad(days)) elDays.textContent = pad(days);
    if (elHours && elHours.textContent !== pad(hours)) elHours.textContent = pad(hours);
    if (elMins && elMins.textContent !== pad(mins)) elMins.textContent = pad(mins);
    if (elSecs) {
      elSecs.textContent = pad(secs);
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ==========================================================================
  // 8. SMART CALENDAR DOWNLOAD (.ICS FOR PHONE & APPLE) (3:00 PM – 6:00 PM)
  // ==========================================================================
  const btnAddCal = document.getElementById('btn-add-calendar');
  if (btnAddCal) {
    btnAddCal.addEventListener('click', () => {
      const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ahmed & Maha Royal Wedding//EN
BEGIN:VEVENT
UID:royal-wedding-ahmed-maha-2026@gardenia.com
DTSTAMP:20261029T120000Z
DTSTART:20261111T130000Z
DTEND:20261111T160000Z
SUMMARY:Ahmed & Maha Royal Wedding Celebration ♥
DESCRIPTION:We are overjoyed to celebrate our wedding with you! Celebration hours from 3:00 PM to 6:00 PM at Gladius Hall - Gardenia Club, El Thawra St, Cairo.
LOCATION:Gladius Hall, Gardenia Club, El Thawra St Ext, Almazah, Cairo
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Ahmed_Maha_Royal_Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: currentLang === 'ar' ? 'تم حفظ موعد الفرح عندك! ♥' : 'Saved to Your Calendar! ♥',
          text: currentLang === 'ar' ? 'الأربعاء ١١ نوفمبر ٢٠٢٦ (٣:٠٠ م – ٦:٠٠ م) — قاعة الجلاديوس (دار جاردينيا)' : 'Wednesday, November 11, 2026 (3:00 PM – 6:00 PM) — Gladius Hall (Gardenia Club)',
          icon: 'success',
          confirmButtonText: currentLang === 'ar' ? 'تمام جداً ♥' : 'Great!',
          confirmButtonColor: '#2563EB',
          background: '#0C1733',
          color: '#FFFFFF'
        });
      }
    });
  }

  // ==========================================================================
  // 9. RSVP PILL SELECTION & REAL-TIME GOOGLE SHEETS FORM SUBMISSION
  // ==========================================================================
  const pillYes = document.getElementById('pill-yes-item');
  const pillNo = document.getElementById('pill-no-item');
  const radioYes = document.getElementById('radio-attending-yes');
  const radioNo = document.getElementById('radio-attending-no');

  function updatePillSelection(status) {
    if (status === 'yes') {
      if (pillYes) pillYes.classList.add('is-selected');
      if (pillNo) pillNo.classList.remove('is-selected');
      if (radioYes) radioYes.checked = true;
      if (radioNo) radioNo.checked = false;
    } else {
      if (pillNo) pillNo.classList.add('is-selected');
      if (pillYes) pillYes.classList.remove('is-selected');
      if (radioNo) radioNo.checked = true;
      if (radioYes) radioYes.checked = false;
    }
  }

  if (pillYes) {
    pillYes.addEventListener('click', () => {
      updatePillSelection('yes');
    });
  }
  if (pillNo) {
    pillNo.addEventListener('click', () => {
      updatePillSelection('no');
    });
  }

  const rsvpForm = document.getElementById('wedding-rsvp-form');
  const btnSubmitRsvp = document.getElementById('btn-submit-rsvp');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('rsvp-guest-name');
      const messageInput = document.getElementById('rsvp-guest-message');

      const guestName = nameInput ? nameInput.value.trim() : '';
      const attendance = radioYes && radioYes.checked ? 'yes' : 'no';
      const guestMessage = messageInput ? messageInput.value.trim() : '';

      if (!guestName) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: currentLang === 'ar' ? 'تنبيه' : 'Notice',
            text: currentLang === 'ar' ? 'من فضلك اكتب اسمك الكريم لتأكيد الحضور' : 'Please enter your name to confirm attendance',
            icon: 'warning',
            confirmButtonColor: '#0C1733'
          });
        }
        return;
      }

      // Show Loading State on Send Button
      if (btnSubmitRsvp) {
        btnSubmitRsvp.disabled = true;
        const btnText = btnSubmitRsvp.querySelector('.btn-rsvp-text');
        const btnLoader = btnSubmitRsvp.querySelector('.btn-rsvp-loader');
        if (btnText) btnText.textContent = currentLang === 'ar' ? 'جاري الإرسال...' : 'SENDING...';
        if (btnLoader) btnLoader.style.display = 'inline-block';
      }

      const payload = {
        name: guestName,
        attendance: attendance === 'yes' ? 'YES' : 'NO',
        message: guestMessage,
        date: new Date().toISOString()
      };

      // Save a local backup in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
        stored.push({ ...payload, localTime: new Date().toLocaleString() });
        localStorage.setItem('wedding_rsvp_list', JSON.stringify(stored));
      } catch (err) {
        console.warn('Local storage error:', err);
      }

      // Send to Google Sheets if Web App URL is configured
      if (GOOGLE_SHEETS_RSVP_URL && GOOGLE_SHEETS_RSVP_URL !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        try {
          await fetch(GOOGLE_SHEETS_RSVP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
          });
        } catch (error) {
          console.warn('Google Sheets transmission note:', error);
        }
      }

      // Celebratory Confetti Burst
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 95,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#0C1733', '#C5A059', '#EED59B', '#FFFFFF', '#3B82F6']
        });
      }

      // Show SweetAlert2 Confirmation Dialog
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: currentLang === 'ar' ? `شكراً لك يا ${guestName}! ♥` : `Thank You, ${guestName}! ♥`,
          text: currentLang === 'ar'
            ? (attendance === 'yes'
                ? 'تم تسجيل وتأكيد ردك في قائمة حضور الفرح بنجاح! ننتظرك بكل حب لتكتمل فرحتنا بأحمد ومها.'
                : 'شكراً لمشاركتنا التهنئة، نتمنى لك دوام الصحة والعافية وسنفتقد حضورك!')
            : (attendance === 'yes'
                ? 'Your attendance has been confirmed and saved to our guest list! We eagerly look forward to seeing you.'
                : 'Thank you for your warm wishes! We will miss celebrating with you, and wish you all the best!'),
          icon: 'success',
          confirmButtonText: currentLang === 'ar' ? 'تمام جداً ♥' : 'Great!',
          confirmButtonColor: '#0C1733',
          background: '#FFFFFF',
          color: '#0C1733'
        });
      }

      // Reset Form State
      rsvpForm.reset();
      updatePillSelection('yes');

      // Restore Button
      if (btnSubmitRsvp) {
        btnSubmitRsvp.disabled = false;
        const btnText = btnSubmitRsvp.querySelector('.btn-rsvp-text');
        const btnLoader = btnSubmitRsvp.querySelector('.btn-rsvp-loader');
        if (btnText) btnText.textContent = translations[currentLang].rsvp_btn_send;
        if (btnLoader) btnLoader.style.display = 'none';
      }
    });
  }

  // ==========================================================================
  // 10. LUXURY FULLSCREEN PHOTO LIGHTBOX MODAL
  // ==========================================================================
  const couplePortraitTrigger = document.getElementById('couple-portrait-trigger');
  const photoLightbox = document.getElementById('photo-lightbox');
  const lightboxClose = document.getElementById('lightbox-close');

  if (couplePortraitTrigger && photoLightbox) {
    couplePortraitTrigger.addEventListener('click', () => {
      photoLightbox.classList.add('is-active');
      photoLightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  function closePhotoLightbox() {
    if (photoLightbox) {
      photoLightbox.classList.remove('is-active');
      photoLightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closePhotoLightbox);
  }

  if (photoLightbox) {
    photoLightbox.addEventListener('click', (e) => {
      if (e.target === photoLightbox) {
        closePhotoLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoLightbox && photoLightbox.classList.contains('is-active')) {
      closePhotoLightbox();
    }
  });
});
