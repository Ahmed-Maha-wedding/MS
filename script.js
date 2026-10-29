/* ==========================================================================
   AHMED & MAHA — ROYAL WEDDING INVITATION SCRIPT
   - Primary Language: English (Default) with one-click switch to Arabic
   - Professional Animations: Smooth Parallax, Multi-stage Confetti & Tick Pulse
   - Photorealistic Envelope Unsealing & Audio Auto-Play (Le Kol Ashiq Watan)
   - Real-Time Live Countdown to 3:00 PM (November 11, 2026)
   - Smart Calendar Sync (.ics & Google Calendar)
   ========================================================================== */

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
      invitation_body: "REQUEST THE HONOR OF YOUR PRESENCE<br>TO CELEBRATE OUR WEDDING DAY<br>AS WE BEGIN OUR JOURNEY OF LOVE & HAPPINESS<br>YOUR PRESENCE WILL COMPLETE OUR JOY",
      date_month: "NOVEMBER",
      date_day_name: "WEDNESDAY",
      date_year: "2026",
      date_time_label: "TIME",
      date_time: "3:00 PM – 6:00 PM",
      reception_tagline: "an evening of love, joyful music & celebration to follow",
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
      closing_waiting: "We eagerly look forward to seeing you! ♥",
      footer_info: "WEDNESDAY — NOVEMBER 11, 2026<br>CELEBRATION HOURS: 3:00 PM — 6:00 PM<br>Gladius Hall — Gardenia Club<br>ALMAZAH - CAIRO",
      lang_btn_text: "العربية"
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
      invitation_body: "يسعدنا ويشرفنا دعوتكم لحضور ومشاركتنا حفل زفافنا<br>لنبدأ معاً أجمل رحلة عمر وأيامنا السعيدة<br>ولنصنع ذكريات تدوم مدى الحياة<br>حضوركم يكتمل به سرورنا وفرحتنا",
      date_month: "نوفمبر",
      date_day_name: "الأربعاء",
      date_year: "٢٠٢٦",
      date_time_label: "الميعاد",
      date_time: "٣:٠٠ م – ٦:٠٠ م",
      reception_tagline: "سهرة عامرة بالمحبة والبهجة والألحان لتكتمل فرحتنا بصحبتكم",
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
      closing_waiting: "في انتظاركم لتكتمل فرحتنا! ♥",
      footer_info: "الأربعاء — ١١ نوفمبر ٢٠٢٦<br>ميعاد الحفل: من ٣:٠٠ إلى ٦:٠٠ مساءً<br>قاعة الجلاديوس — دار جاردينيا<br>ألماظة - القاهرة",
      lang_btn_text: "English"
    }
  };

  // Primary Default Language is English as explicitly required by the user
  let currentLang = localStorage.getItem('wedding_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('wedding_lang', lang);

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

    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = dict.lang_btn_text;
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
});
