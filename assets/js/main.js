/**
* Template Name: EasyFolio
* Template URL: https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/
* Updated: Feb 21 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



/**
 * Quiz
 */
document.addEventListener('DOMContentLoaded', function() {
  // Quiz Questions
  const questions = [
    {
      question: "When you're feeling down, you usually...",
      options: [
        { text: "Listen to country music and reminisce about simpler times", era: "taylor_swift" },
        { text: "Write down your feelings and thoughts, immerse yourself in music", era: "folklore" },
        { text: "Face challenges and show your strength", era: "reputation" },
        { text: "Embrace the sadness and find beauty in melancholy", era: "evermore" }
      ]
    },
    {
      question: "What's your favorite color?",
      options: [
        { text: "Gold and yellow - bright and hopeful", era: "fearless" },
        { text: "Purple and indigo - mysterious and cosmic", era: "midnights" },
        { text: "Blue and pink - bright and vibrant", era: "1989" },
        { text: "Black and white - poetic and reflective", era: "tortured_poets" }
      ]
    },
    {
      question: "In your free time, you prefer to...",
      options: [
        { text: "Take a walk in nature, enjoy the quiet", era: "folklore" },
        { text: "Attend events or parties, be the center of attention", era: "reputation" },
        { text: "Daydream about fairytale romances and possibilities", era: "speak_now" },
        { text: "Write poetry or read literature that speaks to your soul", era: "tortured_poets" }
      ]
    },
    {
      question: "Which music style moves you most?",
      options: [
        { text: "Folk and acoustic - simple with depth", era: "folklore" },
        { text: "Country pop - authentic and storytelling", era: "taylor_swift" },
        { text: "Dreamy pop - soft and romantic", era: "lover" },
        { text: "Alternative folk - introspective and autumn-like", era: "evermore" }
      ]
    },
    {
      question: "How would you describe your personal style?",
      options: [
        { text: "Classic and elegant with a modern twist", era: "1989" },
        { text: "Glittery and bold, making a statement", era: "fearless" },
        { text: "Dark, edgy, with an attitude", era: "reputation" },
        { text: "Vintage-inspired looks with attention to detail", era: "speak_now" }
      ]
    },
    {
      question: "Your idea of a perfect date would be...",
      options: [
        { text: "A romantic evening under the stars", era: "lover" },
        { text: "An intellectually stimulating conversation at a cozy cafe", era: "evermore" },
        { text: "Dancing the night away at an exclusive party", era: "1989" },
        { text: "Midnight drives and deep conversation", era: "midnights" }
      ]
    },
    {
      question: "When faced with a difficult situation, you...",
      options: [
        { text: "Process your emotions through writing or art", era: "tortured_poets" },
        { text: "Feel intensely and sometimes let emotions overwhelm you", era: "red" },
        { text: "Stand your ground and defend yourself fiercely", era: "reputation" },
        { text: "Reflect quietly and find wisdom in the experience", era: "evermore" }
      ]
    },
    {
      question: "Which season resonates with your personality most?",
      options: [
        { text: "Summer - bright, vibrant, and full of possibilities", era: "1989" },
        { text: "Autumn - nostalgic, cozy, and introspective", era: "red" },
        { text: "Winter - mysterious, quiet, and contemplative", era: "folklore" },
        { text: "Spring - hopeful, fresh beginnings", era: "fearless" }
      ]
    },
    {
      question: "Your approach to love is...",
      options: [
        { text: "Idealistic and dreamy, believing in true love", era: "speak_now" },
        { text: "Cautious but passionate when you find the right person", era: "red" },
        { text: "Celebratory and colorful, embracing all forms of love", era: "lover" },
        { text: "Complex and poetic, exploring the depths of connection", era: "tortured_poets" }
      ]
    },
    {
      question: "Which word best describes you?",
      options: [
        { text: "Resilient", era: "midnights" },
        { text: "Authentic", era: "taylor_swift" },
        { text: "Passionate", era: "red" },
        { text: "Imaginative", era: "speak_now" }
      ]
    },
    {
      question: "Your favorite time of day is...",
      options: [
        { text: "Midnight - mysterious and full of possibilities", era: "midnights" },
        { text: "Early morning - fresh and full of potential", era: "taylor_swift" },
        { text: "Golden hour - romantic and nostalgic", era: "lover" },
        { text: "Late evening - reflective and peaceful", era: "folklore" }
      ]
    }
  ];
  
  // Results information
  const eraResults = {
    "taylor_swift": {
      name: "Debut Dreamer",
      hashtags: ["#CountryVibes", "#NostalgicSoul", "#SimpleJoys"],
      quote: " \"You said the way my blue eyes shined put those Georgia stars to shame that night.\"",
      description: "You’re sincere and nostalgic, drawn to the beauty in life’s simplest moments. Your heart holds tightly to memories, and your voice carries gentle authenticity. As you journey forward, let your roots remind you of where your strength truly began.",
      image: "./images/a1.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/5eyZZoQEFQWRHkV2xgAeBw?si=oQaBsqGrRFOiJXrQLqExnA",
      songs: [
        "Tim McGraw",
        "Teardrops on My Guitar",
        "Our Song",
        "Picture to Burn",
        "Mary's Song (Oh My My My)"
      ],
      trackIds: [
        "2Fn01AIMyHbha2ceNQeOqw?si=4a72e9884f4f4dde", // Tim McGraw
        "2TF4UtYreqNbQ6Z9AccldU?si=959936dfe88e4ffa", // Teardrops on My Guitar
        "1j6gmK6u4WNI33lMZ8dC1s?si=97b0ba8077854b04", // Our Song
        "4BYejINgfZF0qKDMEH2cim?si=c8b91e9cf0be4a50", // Picture to Burn
        "2O8sogKJCfVZ4rotBv1vVF?si=500d631f79fc4f2c"  // Mary's Song (Oh My My My)
      ]
    },
    "fearless": {
      name: "Fearless Warrior",
      hashtags: ["#YoungAndBold", "#GoldenGlow", "#FearlessHeart"],
      quote: " \"This love is difficult, but it's real.\"",
      description: "You face life with optimism and a bright, open heart, eager to believe in magic and meaning. Even when the road is uncertain, your courage shines through. Remember—being vulnerable is not weakness, but a rare and fearless form of power.",
      image: "./images/a2.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH?si=37RD8P4-T_-era3OD_pACA",
      songs: [
        "Love Story",
        "You Belong With Me",
        "Fifteen",
        "Fearless",
        "White Horse"
      ],
      trackIds: [
        "6YvqWjhGD8mB5QXcbcUKtx?si=1ff0cd6521f94614", // Love Story
        "1qrpoAMXodY6895hGKoUpA?si=ca0f3ea1342045f6", // You Belong With Me
        "2nqio0SfWg6gh2eCtfuMa5?si=27fd406a1fbe4c86", // Fifteen
        "77sMIMlNaSURUAXq5coCxE?si=c95c3f6e4e6f4f9e", // Fearless
        "5YL553x8sHderRBDlm3NM3?si=b594a29ba4354c42"  // White Horse
      ]
    },
    "speak_now": {
      name: "Speak Now Songbird",
      hashtags: ["#SpeakYourTruth", "#DaydreamBeliever", "#RomanticRebel"],
      quote: " \"I said remember this moment in the back of my mind.\"",
      description: "You dream boldly and speak honestly, finding power in words that are uniquely yours. Your independence is your melody, sung with graceful strength. Stay true to your vision—it often takes just one voice to spark change.",
      image: "./images/a3.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/5AEDGbliTTfjOB8TSm1sxt?si=1StxYDyaS_2EyW1kzj2zOQ",
      songs: [
        "Mine",
        "Back to December",
        "Enchanted",
        "Dear John",
        "Long Live"
      ],
      trackIds: [
        "7G0gBu6nLdhFDPRLc0HdDG?si=86554e88d9434b46", // Mine
        "79uDOz0zuuWS7HWxzMmTa2?si=e43ac4339bad45d8", // Back to December
        "3sW3oSbzsfecv9XoUdGs7h?si=640814dcb4a44935", // Enchanted
        "1zU8j1x3yi9xalMF96pzKp?si=561855a9e81e4f0f", // Dear John
        "4hqJ4bSlYJOXb6Z4SRmzxs?si=bb8b5c2a1dbc4233"  // Long Live
      ]
    },
    "red": {
      name: "Red Heartbeat",
      hashtags: ["#EmotionalDepth", "#RedRush", "#HeartOnSleeve"],
      quote: " \"I remember it all too well.\"",
      description: "You feel the world in vivid color, embracing both love’s fire and heartbreak’s shadow. Your emotional depth is a gift, even when it aches. Rather than dimming your passion, learn to channel it—it can heal, connect, and create.",
      image: "./images/a4.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/6kZ42qRrzov54LcAk4onW9?si=C4iDKAZfROmMnlskhNCtSw",
      songs: [
        "All Too Well",
        "I Knew You Were Trouble",
        "22",
        "We Are Never Ever Getting Back Together",
        "Begin Again"
      ],
      trackIds: [
        "3nsfB1vus2qaloUdcBZvDu?si=f1b6e79845c145b8", // All Too Well
        "6AtZLIzUINvExIUy4QhdjP?si=9385d14aebfb46e0", // I Knew You Were Trouble
        "3yII7UwgLF6K5zW3xad3MP?si=626d8708ba36445c", // 22
        "5YqltLsjdqFtvqE7Nrysvs?si=cffc689792044f5f", // We Are Never Ever Getting Back Together
        "05GsNucq8Bngd9fnd4fRa0?si=f3d41913fc424ae3"  // Begin Again
      ]
    },
    "1989": {
      name: "1989 Trendsetter",
      hashtags: ["#CityLights", "#BoldAndBright", "#ReinventionQueen"],
      quote: " \"The lights are so bright but they never blind me.\"",
      description: "You move through the world with style, joy, and an ever-evolving sense of self. Change doesn’t scare you—it excites you. As you chase the spotlight, don’t forget that the boldest kind of freedom is being fully present.",
      image: "./images/aa5.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/64LU4c1nfjz1t4VnGhagcg?si=bKLx7FV3TPS0-OibOOhIMQ",
      songs: [
        "Shake It Off",
        "Blank Space",
        "Style",
        "Bad Blood",
        "Wildest Dreams"
      ],
      trackIds: [
        "3pv7Q5v2dpdefwdWIvE7yH?si=2114a152a63d4aac", // Shake It Off
        "45wMBGri1PORPjM9PwFfrS?si=0a3580a4645d4db7", // Blank Space
        "1hjRhYpWyqDpPahmSlUTlc?si=30464f0a0a7e47c6", // Style
        "64FzgoLZ3oXu2SriZblHic?si=b2f6d3faabce42c5", // Bad Blood
        "1K39ty6o1sHwwlZwO6a7wK?si=11f9ab203c254ec1"  // Wildest Dreams
      ]
    },
    "reputation": {
      name: "Reputation Queen",
      hashtags: ["#BoldAndUnbothered", "#SnakeQueen", "#NewRules"],
      quote: " \"I got a list of names and yours is in red, underlined.\"",
      description: "You're unshakable in the face of judgment, rising with resilience each time you’re doubted. You own your power, setting firm boundaries in a world that often tests them. Let your silence speak, and your growth stun those who underestimated you.",
      image: "./images/a6.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/6DEjYFkNZh67HP7R9PSZvv?si=4iGQKIc3RmGBpzUxawGnGQ",
      songs: [
        "Look What You Made Me Do",
        "Delicate",
        "Getaway Car",
        "...Ready For It?",
        "End Game"
      ],
      trackIds: [
        "1P17dC1amhFzptugyAO7Il?si=b9b6fff7a3c94056", // Look What You Made Me Do
        "6NFyWDv5CjfwuzoCkw47Xf?si=7289781b0b504e7b", // Delicate
        "0VE4kBnHJUgtMf0dy6DRmW?si=c254989335cf419e", // Getaway Car
        "2yLa0QULdQr0qAIvVwN6B5?si=986e80da71d949cf", // ...Ready For It?
        "2x0WlnmfG39ZuDmstl9xfX?si=ad0eaeede8e2474d"  // End Game
      ]
    },
    "lover": {
      name: "Lover Romantic",
      hashtags: ["#LoveWins", "#PastelVibes", "#BigHeartEnergy"],
      quote: " \"I once believed love would be burning red, but it's golden like daylight.\"",
      description: "You radiate warmth, joy, and a wholehearted belief in love’s potential. People are drawn to the light you so naturally give. Just remember, it’s okay to love yourself first—the world will still benefit from your brightness.",
      image: "./images/a7.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/1NAmidJlEaVgA3MpcPFYGq?si=jXGkt5YGSumPKn7w-WNMdQ",
      songs: [
        "Lover",
        "Cruel Summer",
        "You Need To Calm Down",
        "The Man",
        "Paper Rings"
      ],
      trackIds: [
        "1dGr1c8CrMLDpV6mPbImSI?si=dc93f843e08447b2", // Lover
        "1BxfuPKGuaTgP7aM0Bbdwr?si=67f0ae7b2e6749b6", // Cruel Summer
        "6RRNNciQGZEXnqk8SQ9yv5?si=87433bcd009b4d5a", // You Need To Calm Down
        "3RauEVgRgj1IuWdJ9fDs70?si=3f32a270efe44432", // The Man
        "4y5bvROuBDPr5fuwXbIBZR?si=7b47e91512c54574"  // Paper Rings
      ]
    },
    "folklore": {
      name: "Folklore Storyteller",
      hashtags: ["#QuietStrength", "#PoeticSoul", "#CottageCore"],
      quote: " \"You drew stars around my scars.\"",
      description: "You find meaning in quiet moments, crafting stories from memory, emotion, and imagination. There's magic in the way you see the world. Let your depth be your anchor, and don’t be afraid to let others see your hidden colors.",
      image: "./images/a8.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/2fenSS68JI1h4Fo296JfGr?si=M9cVjgAcRV6FnIRH1LhOUQ",
      songs: [
        "Cardigan",
        "August",
        "Exile",
        "Betty",
        "The 1"
      ],
      trackIds: [
        "4R2kfaDFhslZEMJqAFNpdd?si=1813f60a8887497a", // Cardigan
        "3hUxzQpSfdDqwM3ZTFQY0K?si=2cee6206dc6544fa", // August
        "4pvb0WLRcMtbPGmtejJJ6y?si=cafffe8f97894dba", // Exile
        "5kI4eCXXzyuIUXjQra0Cxi?si=aff420d7fad142c6", // Betty
        "0Jlcvv8IykzHaSmj49uNW8?si=e9dda2d08e4141c2"  // The 1
      ]
    },
    "evermore": {
      name: "Evermore Wanderer",
      hashtags: ["#LayeredSoul", "#BittersweetTruth", "#WinterMuse"],
      quote: " \"I can't not think of all the cost, and the things that will be lost.\"",
      description: "You walk life’s path with patience and reflection, holding space for both joy and sorrow. Your wisdom is layered, often soft-spoken but deeply felt. Trust the unfolding—you are growing even when the answers aren’t yet clear.",
      image: "./images/a9.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/2Xoteh7uEpea4TohMxjtaq?si=IkIvM2yTRqGE-otJ5wmkbw",
      songs: [
        "Willow",
        "Champagne Problems",
        "No Body, No Crime",
        "Coney Island",
        "'Tis The Damn Season"
      ],
      trackIds: [
        "0lx2cLdOt3piJbcaXIV74f?si=386e5f94d8194431", // Willow
        "0sY6ZUTh4yoctD8VIXz339?si=7181c91a4b6348e6", // Champagne Problems
        "3RaT22zZsxVYxxKR7TAaYF?si=9ea53bb9d8d74455", // No Body, No Crime
        "3k7ne7VmH43ZPWxPdvPUgR?si=be699d6a75c14e31", // Coney Island
        "7dW84mWkdWE5a6lFWxJCBG?si=f62fda725d224072"  // 'Tis The Damn Season
      ]
    },
    "midnights": {
      name: "Midnights Thinker",
      hashtags: ["#SleeplessDreamer", "#AfterDarkVibes", "#MirrorSoul"],
      quote: " \"It's me, hi, I'm the problem, it's me.\"",
      description: "You are reflective and layered, often awake when the world sleeps, sorting through thoughts and truths. Your nights are filled with insight. Embrace your duality—both your questions and clarity make you remarkably whole.",
      image: "./images/a10.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/151w1FgRZfnKZA9FEcg9Z3?si=rsPF6f_eSEa0RS_cnLapcA",
      songs: [
        "Anti-Hero",
        "Lavender Haze",
        "Midnight Rain",
        "Snow On The Beach",
        "Bejeweled"
      ],
      trackIds: [
        "0V3wPSX9ygBnCm8psDIegu?si=e0ba16490e284281", // Anti-Hero
        "5jQI2r1RdgtuT8S3iG8zFC?si=25e11daea0b84b02", // Lavender Haze
        "3rWDp9tBPQR9z6U5YyRSK4?si=dd73c808618b46ab", // Midnight Rain
        "1wtOxkiel43cVs0Yux5Q4h?si=0dc3f60ee3d2468d", // Snow On The Beach
        "3qoftcUZaUOncvIYjFSPdE?si=9400f18e11914393"  // Bejeweled
      ]
    },
    "tortured_poets": {
      name: "TTPD Muse",
      hashtags: ["#BrokenBeauty", "#PoeticMelancholy", "#QuietIntensity"],
      quote: " \"I cry a lot but I am so productive, it's an art.\"",
      description: "You transform pain into poetry, seeing beauty where others might only see shadow. Your sensitivity is your strength, a quiet intensity that leaves a mark. Let your heart speak in ink—your truth has the power to move, and to mend.",
      image: "./images/aa11.jpg",
      spotifyPlaylist: "https://open.spotify.com/album/1Mo4aZ8pdj6L1jx8zSwJnt?si=JP47X4R9T7iWOhNr0UuVLQ",
      songs: [
        "Fortnight",
        "The Smallest Man Who Ever Lived",
        "Down Bad",
        "But Daddy I Love Him",
        "I Can Do It With A Broken Heart"
      ],
      trackIds: [
        "2OzhQlSqBEmt7hmkYxfT6m?si=27150d8d59714e8c", // Fortnight
        "2v1ivOOsgn64g5OywuH55L?si=77c86b67bd78479b", // The Smallest Man Who Ever Lived
        "2F3N9tdombb64aW6VtZOdo?si=5268ba6da5334c9e", // Down Bad
        "5og4Qzt92jJzVDkOtSEilb?si=05d8271423d445c0", // But Daddy I Love Him
        "4q5YezDOIPcoLr8R81x9qy?si=de39d36bfc934863"  // I Can Do It With A Broken Heart
      ]
    }
  };
  
  // Initialize variables
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let selectedOption = null;
  
  // DOM elements
  const startScreen = document.getElementById('startScreen');
  const quizContent = document.getElementById('quizContent');
  const questionContainer = document.getElementById('questionContainer');
  const nextBtn = document.getElementById('nextBtn');
  const progressBar = document.getElementById('progressBar');
  const resultContainer = document.getElementById('resultContainer');
  const eraNameElement = document.getElementById('eraName');
  const resultDescriptionElement = document.getElementById('resultDescription');
  const resultImageElement = document.getElementById('resultImage');
  const resultTitleElement = document.getElementById('resultTitle');
  const totalTakersElement = document.getElementById('totalTakers');
  const sameEraPercentageElement = document.getElementById('sameEraPercentage');
  const popularEraElement = document.getElementById('popularEra');
  const songListElement = document.getElementById('songList');
  const spotifyLinkElement = document.getElementById('spotifyLink');
  
  // Start button click
  document.getElementById('startBtn')?.addEventListener('click', () => {
    startScreen.style.display = 'none';
    quizContent.style.display = 'block';
    displayQuestion(currentQuestionIndex);
  });
  
  // Next button click
  nextBtn?.addEventListener('click', () => {
    if (selectedOption !== null) {
      userAnswers.push(selectedOption);
      
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
      } else {
        showResult();
      }
      
      selectedOption = null;
      nextBtn.style.display = 'none';
    }
  });
  
  // Restart button click
  document.getElementById('restartBtn')?.addEventListener('click', () => {
    resultContainer.style.display = 'none';
    quizContent.style.display = 'block';
    currentQuestionIndex = 0;
    userAnswers = [];
    selectedOption = null;
    displayQuestion(currentQuestionIndex);
  });
  
  // Display question function
  function displayQuestion(index) {
    const question = questions[index];
    const progressPercentage = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    
    // Create HTML for question
    let questionHTML = `
      <div class="question active">
        <h4 class="mb-3">${question.question}</h4>
        <div class="options">
    `;
    
    // Create HTML for options
    question.options.forEach((option, i) => {
      questionHTML += `
        <div class="option mb-2 p-3 border rounded hover-shadow" data-era="${option.era}" onclick="selectOption(this, ${i})">
          ${option.text}
        </div>
      `;
    });
    
    questionHTML += `
        </div>
      </div>
    `;
    
    questionContainer.innerHTML = questionHTML;
  }
  
  // Select option function
  window.selectOption = function(element, index) {
    // Remove selected class from all options
    document.querySelectorAll('.option').forEach(option => {
      option.classList.remove('bg-light', 'border-primary');
    });
    
    // Add selected class
    element.classList.add('bg-light', 'border-primary');
    selectedOption = element.getAttribute('data-era');
    nextBtn.style.display = 'inline-block';
  }
  
  function showResult() {
    const result = calculateResult();
    const resultEra = eraResults[result];

    // 儲存到 Firebase
    const timestamp = Date.now();
    database.ref('quiz_results/' + timestamp).set({
      era: result,
      timestamp: new Date().toISOString()
    });

    // Reset animation classes to ensure they play again
    resultContainer.style.animation = 'none';
    resultContainer.offsetHeight; // Force reflow
    resultContainer.style.animation = 'slideUp 0.8s ease-out';
    
    // 顯示測驗結果
    eraNameElement.textContent = resultEra.name;
    resultTitleElement.innerHTML = `You are a <span id="eraName">${resultEra.name}</span>!`;
    resultDescriptionElement.innerHTML = `
  <div class="mb-2 text-muted small">
    ${resultEra.hashtags.map(tag => `<span class="hashtag">#${tag.replace(/^#/, '')}</span>`).join('')}
  </div>
  <blockquote>
    ${resultEra.quote}
  </blockquote>
  <p>${resultEra.description}</p>
`;
    resultImageElement.src = resultEra.image || "assets/img/eras/default-era.jpg";
    resultImageElement.alt = `${resultEra.name} image`;
    
    // Apply animations to specific elements
    resultImageElement.className = ''; // Reset any existing classes
    resultTitleElement.className = 'result-title mb-2';
    resultDescriptionElement.className = 'result-description mb-4';
    
    // Make sure animations play by forcing reflow
    void resultImageElement.offsetWidth;
    void resultTitleElement.offsetWidth;
    void resultDescriptionElement.offsetWidth;
    
    // Apply animation classes
    resultImageElement.style.animation = 'revealRotate 1.2s ease-out';
    resultTitleElement.style.animation = 'fadeInRight 0.8s ease-out 0.2s both';
    resultDescriptionElement.style.animation = 'fadeInRight 0.8s ease-out 0.4s both';
    
    // Add animations to sections
    document.querySelectorAll('.share-section, .stats-section, .playlist-section').forEach(section => {
      section.style.animation = 'fadeInUp 0.8s ease-out 0.6s both';
    });

    // 更新歌單內容
    updatePlaylist(result);

    // 從 Firebase 撈統計資料
    database.ref('quiz_results').once('value', snapshot => {
      const data = snapshot.val() || {};
      const total = Object.keys(data).length;
      const eraCounts = {};

      Object.values(data).forEach(entry => {
        eraCounts[entry.era] = (eraCounts[entry.era] || 0) + 1;
      });

      const sameEraCount = eraCounts[result] || 0;
      const sameEraPercent = Math.round((sameEraCount / total) * 100);

      // 找出最多人屬於的 era
      let mostPopularEra = result;
      let max = 0;
      for (let era in eraCounts) {
        if (eraCounts[era] > max) {
          max = eraCounts[era];
          mostPopularEra = era;
        }
      }

      totalTakersElement.textContent = total;
      sameEraPercentageElement.textContent = `${sameEraPercent}%`;
      popularEraElement.textContent = eraResults[mostPopularEra]?.name.split(' ')[0] || '--';
    });

    // First hide quizContent, then show resultContainer with animation
    quizContent.style.display = 'none';
    resultContainer.style.display = 'block';
    
    // Scroll to top of result container for better animation viewing
    window.scrollTo({
      top: resultContainer.offsetTop - 50,
      behavior: 'smooth'
    });
    }
    
    // Update playlist based on era result
    function updatePlaylist(era) {
    const eraData = eraResults[era];
    if (!eraData || !eraData.songs || !songListElement) return;

    // Clear existing songs
    songListElement.innerHTML = '';
    
    // Remove any existing maxHeight or overflow style that might cause scrolling
    if (songListElement.style) {
      songListElement.style.maxHeight = 'none';
      songListElement.style.overflowY = 'visible';
    }

    // Add songs to the playlist
    eraData.songs.forEach((song, index) => {
      const songItem = document.createElement('li');
      songItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      const trackId = eraData.trackIds?.[index] || null;
      
      songItem.innerHTML = `
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>
      <span class="badge bg-primary me-2">${index + 1}</span>
      ${song}
        </div>
        <div>
        <button 
    class="btn btn-sm play-btn"
    data-index="${index}"
    style="width: 30px; height: 30px; padding: 0; background-color: white; border: 1px solid #556d9b; display: flex; justify-content: center; align-items: center;"
    ${trackId ? `onclick="embedTrack('${trackId}', this)"` : 'disabled'}>
    <i class="bi bi-play-fill" style="color: #556d9b; font-size: 18px;"></i>
  </button>
        </div>
      </div>
      `;
      songListElement.appendChild(songItem);

      // Add hover effect
      songItem.addEventListener('mouseover', function() {
      this.classList.add('bg-light');
      });
      songItem.addEventListener('mouseout', function() {
      this.classList.remove('bg-light');
      });

      // Changed: removed the badge color change on click
      // Now the song items stay blue when clicked
    });

    // Ensure parent container doesn't have any scroll settings
    const playlistContainer = songListElement.parentElement;
    if (playlistContainer && playlistContainer.style) {
      playlistContainer.style.maxHeight = 'none';
      playlistContainer.style.overflowY = 'visible';
    }

    // Update Spotify link
    if (spotifyLinkElement && eraData.spotifyPlaylist) {
      spotifyLinkElement.href = eraData.spotifyPlaylist;
    }
    }
    
    // Calculate result function
    function calculateResult() {
    const eraCounts = {};
    
    // Count occurrences of each Era
    userAnswers.forEach(era => {
      eraCounts[era] = (eraCounts[era] || 0) + 1;
    });
    
    // Find the Era with highest count
    let maxCount = 0;
    let result = '';
    for (const era in eraCounts) {
      if (eraCounts[era] > maxCount) {
      maxCount = eraCounts[era];
      result = era;
      }
    }
    
    return result || 'midnights';
    }
    
    function fetchStatsFromFirebase() {
    database.ref('quiz_results').once('value', snapshot => {
      const data = snapshot.val();
      const counts = {};

      Object.values(data || {}).forEach(entry => {
      counts[entry.era] = (counts[entry.era] || 0) + 1;
      });

      // 找出最多人選的 Era
      const popularEra = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0])[0];
      popularEraElement.textContent = eraResults[popularEra]?.name.split(' ')[0] || 'Unknown';
    });
    }

    // 你可以在 showResult() 結束後呼叫：
    fetchStatsFromFirebase();

    // Share result functions
window.shareResult = function(platform) {
  const shareText = `I'm a ${eraResults[calculateResult()].name}! Discover your Taylor Swift Era personality!`;
  const shareUrl = window.location.href;
  
  let shareLink = '';
  switch (platform) {
    case 'facebook':
      shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
      window.open(shareLink, '_blank');
      break;
    case 'twitter':
      shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(shareLink, '_blank');
      break;
    case 'instagram':
      // 先顯示提示
      alert('Screenshot your result and share it on your Instagram story or post!');
      // 然後在短暫延遲後打開Instagram
      setTimeout(() => {
        // 嘗試打開Instagram應用（在移動設備上）
        const instagramUrl = 'instagram://';
        const webInstagramUrl = 'https://www.instagram.com/';
        
        // 創建一個隱藏的iframe來嘗試打開Instagram應用
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = instagramUrl;
        document.body.appendChild(iframe);
        
        // 如果無法在500ms內打開應用，則重定向到網頁版
        setTimeout(() => {
          document.body.removeChild(iframe);
          window.open(webInstagramUrl, '_blank');
        }, 500);
      }, 1000); // 1秒後執行
      break;
  }
}
    
    // Copy link function
    window.copyLink = function() {
    const shareText = `I'm a ${eraResults[calculateResult()].name}! Discover your Taylor Swift Era personality!`;
    const shareUrl = window.location.href;
    
    // Create temporary text area
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = `${shareText} ${shareUrl}`;
    document.body.appendChild(tempTextArea);
    
    // Copy text
    tempTextArea.select();
    document.execCommand('copy');
    
    // Remove text area
    document.body.removeChild(tempTextArea);
    
    // Alert message
    alert('Link copied to clipboard!');
    }

    window.embedTrack = function(trackId, buttonEl) {
    const player = document.getElementById('trackPlayer');
    if (!player || !trackId) return;

    // Capture current scroll position before updating player
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    player.innerHTML = `
    <iframe style="border-radius:12px"
      src="https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0"
      width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"></iframe>
    `;

    // Removed scrollIntoView to prevent automatic scrolling
    // player.scrollIntoView({ behavior: 'smooth' });

    // Restore scroll position to prevent page jump
    window.scrollTo(0, scrollPos);

    // 取消所有按鈕 active 樣式
    document.querySelectorAll('.play-btn').forEach(btn => {
    btn.classList.remove('active-play');
    btn.style.backgroundColor = 'white';
    btn.style.borderColor = '#556d9b';
    btn.querySelector('i').style.color = '#556d9b';
    });

    // 加上目前的 active 樣式
    if (buttonEl) {
    buttonEl.classList.add('active-play');
    buttonEl.style.backgroundColor = '#556d9b';
    buttonEl.style.borderColor = '#556d9b';
    buttonEl.querySelector('i').style.color = 'white';
    }
  }
  });