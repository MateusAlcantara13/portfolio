 // Restore settings
    const root = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");
    if (savedTheme) root.setAttribute("data-theme", savedTheme);

    function setThemeIcon(theme){
      const icon = document.getElementById("themeIcon");
      if (!icon) return;
      if (theme === "dark"){
        icon.innerHTML = `
          <path d="M21 13.2A8.5 8.5 0 0 1 10.8 3 7 7 0 1 0 21 13.2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        `;
      } else {
        icon.innerHTML = `
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2"/>
        `;
      }
    }
    setThemeIcon(root.getAttribute("data-theme") || "dark");

    document.getElementById("themeBtn").addEventListener("click", ()=>{
      const now = root.getAttribute("data-theme") || "dark";
      const next = (now === "dark") ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      setThemeIcon(next);
    });

    // Mobile menu
    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");
    menuBtn.addEventListener("click", ()=>{
      menu.classList.toggle("open");
      menuBtn.setAttribute("aria-label", menu.classList.contains("open") ? "Fechar menu" : "Abrir menu");
    });
    menu.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=> menu.classList.remove("open")));

    // Subtle ripple
    function ripple(e){
      const target = e.currentTarget;
      const r = document.createElement("span");
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + "px";
      r.style.position = "absolute";
      r.style.left = (e.clientX - rect.left - size/2) + "px";
      r.style.top  = (e.clientY - rect.top  - size/2) + "px";
      r.style.background = "radial-gradient(circle, rgba(96,165,250,.18), transparent 60%)";
      r.style.borderRadius = "999px";
      r.style.pointerEvents = "none";
      r.style.transform = "scale(.45)";
      r.style.opacity = "0.9";
      r.style.filter = "blur(1px)";
      r.style.transition = "transform .55s var(--ease), opacity .55s var(--ease)";
      target.appendChild(r);
      requestAnimationFrame(()=>{ r.style.transform = "scale(1.25)"; r.style.opacity = "0"; });
      setTimeout(()=> r.remove(), 580);
    }
    document.querySelectorAll(".btn, .actions a, .links a, .menu a, .icon-btn").forEach(el=>{
      el.addEventListener("click", (e)=>{ if (e.button !== 2) ripple(e); });
    });

    // Reveal
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el=> io.observe(el));

    // Brand to top
    const brand = document.getElementById("brand");
    function goTop(){ document.getElementById("top").scrollIntoView({behavior:"smooth"}); }
    brand.addEventListener("click", goTop);
    brand.addEventListener("keydown", (e)=>{ if(e.key==="Enter" || e.key===" "){ e.preventDefault(); goTop(); } });

    // Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // i18n
    const i18n = {
      "pt-BR": {
        nav_about: "Sobre",
        nav_edu: "Formação",
        nav_projects: "Projetos",
        nav_skills: "Stack",
        nav_exp: "Experiência",
        nav_contact: "Contato",

        hero_kicker: "Estudante de TI • Machine Learning • Web",
        hero_title: `Projetos reais com <span class="accent">IA e Web</span><br/>com foco em impacto.`,
        hero_lead: `Sou Mateus Alcantara, formado no Técnico em Desenvolvimento de Sistemas pelo SENAI.
                   Estudei minha vida toda no SESI e hoje sou graduando em Análise e Desenvolvimento de Sistemas na Faculdade SENAI (UNISENAI).
                   Busco minha primeira oportunidade em TI (estágio).`,
        cta_talk: "Vamos conversar",
        cta_email: "Email",

        stat1_t: "Foco",
        stat1_s: "Machine Learning • IA • Computer Vision (em evolução)",
        stat2_t: "Stack",
        stat2_s: "JavaScript • React • Node • MySQL • TensorFlow.js • Python",
        stat3_t: "Objetivo",
        stat3_s: "Primeira oportunidade em TI (Estágio / Trainee)",
        chip_loc: "São Paulo • Brasil",
        q1_k: "Formação",
        q1_v: "Técnico SENAI • ADS UNISENAI",
        q2_k: "Interesses",
        q2_v: "IA • ML • TensorFlow",
        q3_k: "Disponível para",
        q3_v: "Estágio em TI",

        about_kicker: "Sobre",
        about_title: "Direto ao ponto: quem eu sou e como eu trabalho",
        about_text: "Sou estudante de TI com foco em Machine Learning e desenvolvimento web. Estou evoluindo em Python para ML e aprofundando em TensorFlow (Python e JavaScript), sempre com projetos práticos e publicáveis.",
        about_caption: "Apresentações, projetos e evolução consistente.",
        about_p1: "Aprendizado rápido",
        about_p2: "Projetos reais",
        about_p3: "Atenção a produto",
        about_p4: "Impacto social",

        edu_kicker: "Formação",
        edu_title: "Trajetória acadêmica",
        edu_text: "Construí minha base no SESI, concluí o Técnico em Desenvolvimento de Sistemas pelo SENAI e hoje curso Análise e Desenvolvimento de Sistemas na Faculdade SENAI (UNISENAI).",
        edu1_title: "SESI",
        edu1_l1: "Formação escolar completa",
        edu1_l2: "Base sólida e disciplina de estudos",
        edu2_title: "SENAI • UNISENAI",
        edu2_l1: "Técnico em Desenvolvimento de Sistemas (SENAI)",
        edu2_l2: "Graduando em Análise e Desenvolvimento de Sistemas (Faculdade SENAI — UNISENAI)",

        proj_kicker: "Projetos",
        proj_title: "Demonstrações publicadas e repositórios",
        proj_text: "Prints reais deixam a vitrine mais forte. Abaixo estão os cards com espaço para você inserir as imagens.",
        p1_title: "VisionCash — Reconhecimento de cédulas",
        p1_text: "Projeto de acessibilidade com IA para auxiliar pessoas com deficiência visual no reconhecimento de cédulas usando TensorFlow.js.",
        p2_text: "Site institucional com cardápio digital interativo, responsivo e com foco em performance.",
        p3_title: "Associação Promessas",
        p3_text: "Site institucional para ONG com foco em clareza, impacto social, SEO e boa experiência mobile.",
        p4_text: "Plataforma sobre cuidados com plantas com layout clean, amigável e totalmente responsivo.",
        btn_code: "Código",
        btn_live: "Site",
        tag_access: "Acessibilidade",
        tag_resp: "Responsivo",
        tag_ui: "UI",

        skills_kicker: "Stack",
        skills_title: "Tecnologias e ferramentas",
        skills_text: "Organizo minha evolução por projetos. Meu foco atual é consolidar Machine Learning com Python e TensorFlow, mantendo base forte em web.",
        skills_caption: "Tecnologias com projetos publicados e aprendizado contínuo.",

        exp_kicker: "Experiência",
        exp_title: "Soft skills que sustentam performance",
        exp_text: "Minha experiência como garçom fortaleceu comunicação, responsabilidade e trabalho sob pressão — competências importantes em times de tecnologia.",
        exp1_title: "Garçom (atual)",
        exp1_l1: "Comunicação clara e empatia no atendimento",
        exp1_l2: "Organização e foco sob pressão",
        exp1_l3: "Trabalho em equipe e disciplina",
        exp1_l4: "Entrega com consistência",
        exp2_title: "Formação",
        exp2_l1: "Técnico em Desenvolvimento de Sistemas — SENAI",
        exp2_l2: "Graduação em ADS — Faculdade SENAI (UNISENAI)",
        exp2_l3: "Base escolar completa — SESI",

        ct_kicker: "Contato",
        ct_title: "Aberto para estágio e projetos",
        ct_text: "Se você busca alguém com energia de aprendizado, projetos reais e vontade de crescer com a empresa, vamos conversar.",
        quote_title: "Mensagem para recrutadores",
        quote_text: "“Não procuro atalhos — busco evolução constante e a chance de provar meu valor através da prática.”",
        pill_intern: "Estágio",
        pill_impact: "Impacto social"
      },

      "en": {
        nav_about: "About",
        nav_edu: "Education",
        nav_projects: "Projects",
        nav_skills: "Stack",
        nav_exp: "Experience",
        nav_contact: "Contact",

        hero_kicker: "IT Student • Machine Learning • Web",
        hero_title: `Real projects with <span class="accent">AI and Web</span><br/>focused on impact.`,
        hero_lead: `I'm Mateus Alcantara, graduated in the Systems Development Technician program at SENAI.
                   I studied my entire school life at SESI and I'm currently pursuing a degree in Systems Analysis and Development at SENAI College (UNISENAI).
                   I'm looking for my first opportunity in tech (internship).`,
        cta_talk: "Let's talk",
        cta_email: "Email",

        stat1_t: "Focus",
        stat1_s: "Machine Learning • AI • Computer Vision (growing)",
        stat2_t: "Stack",
        stat2_s: "JavaScript • React • Node • MySQL • TensorFlow.js • Python",
        stat3_t: "Goal",
        stat3_s: "First opportunity in tech (Internship / Trainee)",
        chip_loc: "São Paulo • Brazil",
        q1_k: "Education",
        q1_v: "SENAI Technician • UNISENAI Degree",
        q2_k: "Interests",
        q2_v: "AI • ML • TensorFlow",
        q3_k: "Available for",
        q3_v: "Tech internship",

        about_kicker: "About",
        about_title: "Straight to the point: who I am and how I work",
        about_text: "I'm an IT student focused on Machine Learning and web development. I'm leveling up in Python for ML and going deeper into TensorFlow (Python and JavaScript), always with practical, publishable projects.",
        about_caption: "Presentations, projects, and consistent growth.",
        about_p1: "Fast learner",
        about_p2: "Real projects",
        about_p3: "Product mindset",
        about_p4: "Social impact",

        edu_kicker: "Education",
        edu_title: "Academic journey",
        edu_text: "I built my foundation at SESI, completed the Systems Development Technician program at SENAI, and I'm currently studying Systems Analysis and Development at SENAI College (UNISENAI).",
        edu1_title: "SESI",
        edu1_l1: "Full school education",
        edu1_l2: "Strong foundation and study discipline",
        edu2_title: "SENAI • UNISENAI",
        edu2_l1: "Systems Development Technician (SENAI)",
        edu2_l2: "Systems Analysis and Development degree (SENAI College — UNISENAI)",

        proj_kicker: "Projects",
        proj_title: "Live demos and repositories",
        proj_text: "Real screenshots strengthen your portfolio. The cards below include image paths for you to replace.",
        p1_title: "VisionCash — Banknote recognition",
        p1_text: "Accessibility project using AI to help visually impaired people recognize banknotes with TensorFlow.js.",
        p2_text: "Business website with an interactive menu, responsive layout, and performance focus.",
        p3_title: "Associação Promessas",
        p3_text: "Non-profit website focused on clarity, social impact, SEO, and strong mobile experience.",
        p4_text: "Plant care platform with a clean, friendly, fully responsive design.",
        btn_code: "Code",
        btn_live: "Live",
        tag_access: "Accessibility",
        tag_resp: "Responsive",
        tag_ui: "UI",

        skills_kicker: "Stack",
        skills_title: "Technologies and tools",
        skills_text: "I organize my growth through projects. My current focus is strengthening ML with Python and TensorFlow while keeping a strong web foundation.",
        skills_caption: "Tech with published projects and continuous learning.",

        exp_kicker: "Experience",
        exp_title: "Soft skills that support performance",
        exp_text: "My experience as a waiter strengthened communication, ownership, and working under pressure — valuable in tech teams.",
        exp1_title: "Waiter (current)",
        exp1_l1: "Clear communication and empathy",
        exp1_l2: "Organization and focus under pressure",
        exp1_l3: "Teamwork and discipline",
        exp1_l4: "Consistent delivery",
        exp2_title: "Education",
        exp2_l1: "Systems Development Technician — SENAI",
        exp2_l2: "Systems Analysis and Development — SENAI College (UNISENAI)",
        exp2_l3: "Full school education — SESI",

        ct_kicker: "Contact",
        ct_title: "Open to internships and projects",
        ct_text: "If you're looking for someone with learning drive, real projects, and the desire to grow with the company, let's talk.",
        quote_title: "Message to recruiters",
        quote_text: `"I don't look for shortcuts — I focus on consistent growth and the chance to prove my value through practice."`,
        pill_intern: "Internship",
        pill_impact: "Social impact"
      }
    };

    function applyI18n(lang){
      const dict = i18n[lang] || i18n["pt-BR"];
      document.documentElement.lang = (lang === "en") ? "en" : "pt-BR";
      document.querySelectorAll("[data-i18n]").forEach(el=>{
        const key = el.getAttribute("data-i18n");
        const value = dict[key];
        if (value) el.innerHTML = value;
      });
      localStorage.setItem("lang", lang);
    }
    applyI18n(savedLang || "pt-BR");

    document.getElementById("langBtn").addEventListener("click", ()=>{
      const current = localStorage.getItem("lang") || "pt-BR";
      const next = (current === "pt-BR") ? "en" : "pt-BR";
      applyI18n(next);
    });