/**
 * 物理大師 - 國際化 (i18n) 支持 v1.0
 * 支持繁體中文 / English 切換
 */

// ==================== 語言包定義 ====================
const i18n = {
    'zh-TW': {
        // 通用
        appName: '物理大師',
        appSubtitle: '高三物理復習站',
        
        // 導航
        navHome: '首頁',
        navMechanics: '力學',
        navElectromagnetism: '電磁學',
        navThermodynamics: '熱學',
        navOptics: '光學',
        navModernPhysics: '現代物理',
        
        // 首頁
        heroTitle: '📚 物理大師',
        heroDesc: '系統梳理知識體系，掌握核心公式定理，輕鬆應對高考物理',
        
        // 模組卡片 - 力學
        mechanicsTitle: '力學',
        mechanicsDesc: '運動與力、能量守恆、動量守恆、萬有引力與航天',
        mechanicsTags: ['牛頓定律', '機械能', '動量'],
        
        // 模組卡片 - 電磁學
        electromagnetismTitle: '電磁學',
        electromagnetismDesc: '靜電場、恆定電流、磁場、電磁感應、交變電流',
        electromagnetismTags: ['庫侖定律', '歐姆定律', '法拉第定律'],
        
        // 模組卡片 - 熱學
        thermodynamicsTitle: '熱學',
        thermodynamicsDesc: '分子動理論、氣體實驗定律、熱力學第一定律',
        thermodynamicsTags: ['分子動理論', '理想氣體', '熱力學'],
        
        // 模組卡片 - 光學
        opticsTitle: '光學',
        opticsDesc: '光的傳播、波動性、粒子性、光學儀器',
        opticsTags: ['折射定律', '干涉', '光電效應'],
        
        // 模組卡片 - 現代物理
        modernPhysicsTitle: '現代物理',
        modernPhysicsDesc: '相對論基礎、量子力學、原子結構、核物理',
        modernPhysicsTags: ['相對論', '量子論', '原子核'],
        
        // 功能特點
        featuresTitle: '🚀 學習功能',
        featureKnowledge: { title: '知識梳理', desc: '系統整理各章節核心知識點' },
        featureFormulas: { title: '公式大全', desc: '常用公式、定理、定律速查' },
        featureExercises: { title: '練習鞏固', desc: '精選習題，即時檢驗學習效果' },
        featureExperiments: { title: '虛擬實驗', desc: '互動式物理模擬實驗' },
        featureProgress: { title: '進度追蹤', desc: '記錄學習進度，查漏補缺' },
        
        // 練習題相關
        exerciseBasic: '基礎',
        exerciseAdvanced: '進階',
        exerciseDifficult: '高考',
        submitAnswer: '提交答案',
        correctAnswer: '✓ 回答正確！',
        wrongAnswer: '✗ 回答錯誤',
        refreshExercise: '🔄 換一題',
        showAnswer: '查看答案',
        correctAnswerLabel: '✅ 正確答案：',
        explanationLabel: '💡 解析：',
        selectOption: '請選擇一個選項！',
        
        // 搜索
        searchPlaceholder: '搜尋知識點、公式、練習題... (Ctrl+K)',
        searchAll: '全部',
        searchKnowledge: '知識點',
        searchFormula: '公式',
        searchExercise: '練習題',
        searchNoResult: '未找到相關結果',
        searchHint: '輸入關鍵詞開始搜索',
        clearHistory: '清除歷史',
        recentSearches: '最近搜索',
        relevance: '相關度',
        
        // 頁腳
        footerText: '物理大師 · 祝各位考生高考順利！',
        copyright: '© 2026 物理複習網站',
        
        // 語言切換
        languageSwitch: 'EN',
        languageCurrent: '繁中'
    },
    
    'en': {
        // General
        appName: 'Physics Master',
        appSubtitle: 'High School Physics Review Station',
        
        // Navigation
        navHome: 'Home',
        navMechanics: 'Mechanics',
        navElectromagnetism: 'Electromagnetism',
        navThermodynamics: 'Thermodynamics',
        navOptics: 'Optics',
        navModernPhysics: 'Modern Physics',
        
        // Hero Section
        heroTitle: '📚 Physics Master',
        heroDesc: 'Systematic knowledge organization, master core formulas & theorems, ace the Gaokao physics exam!',
        
        // Module Cards - Mechanics
        mechanicsTitle: 'Mechanics',
        mechanicsDesc: 'Motion & Force, Energy Conservation, Momentum Conservation, Gravity & Spaceflight',
        mechanicsTags: ["Newton's Laws", "Mechanical Energy", "Momentum"],
        
        // Module Cards - Electromagnetism
        electromagnetismTitle: 'Electromagnetism',
        electromagnetismDesc: 'Electrostatics, Direct Current, Magnetic Field, EM Induction, AC Circuits',
        electromagnetismTags: ["Coulomb's Law", "Ohm's Law", "Faraday's Law"],
        
        // Module Cards - Thermodynamics
        thermodynamicsTitle: 'Thermodynamics',
        thermodynamicsDesc: 'Kinetic Theory, Gas Laws, First Law of Thermodynamics',
        thermodynamicsTags: ["Kinetic Theory", "Ideal Gas", "Thermodynamics"],
        
        // Module Cards - Optics
        opticsTitle: 'Optics',
        opticsDesc: 'Light Propagation, Wave Nature, Particle Nature, Optical Instruments',
        opticsTags: ["Snell's Law", "Interference", "Photoelectric Effect"],
        
        // Module Cards - Modern Physics
        modernPhysicsTitle: 'Modern Physics',
        modernPhysicsDesc: 'Relativity Basics, Quantum Mechanics, Atomic Structure, Nuclear Physics',
        modernPhysicsTags: ["Relativity", "Quantum Theory", "Atomic Nucleus"],
        
        // Features
        featuresTitle: '🚀 Learning Features',
        featureKnowledge: { title: 'Knowledge Review', desc: 'Systematically organize key concepts' },
        featureFormulas: { title: 'Formula Reference', desc: 'Quick lookup for formulas, theorems & laws' },
        featureExercises: { title: 'Practice Exercises', desc: 'Curated problems to test understanding' },
        featureExperiments: { title: 'Virtual Labs', desc: 'Interactive physics simulations' },
        featureProgress: { title: 'Progress Tracking', desc: 'Record progress and identify gaps' },
        
        // Exercises
        exerciseBasic: 'Basic',
        exerciseAdvanced: 'Advanced',
        exerciseDifficult: 'Gaokao',
        submitAnswer: 'Submit Answer',
        correctAnswer: '✓ Correct!',
        wrongAnswer: '✗ Incorrect',
        refreshExercise: '🔄 Next Question',
        showAnswer: 'Show Answer',
        correctAnswerLabel: '✅ Correct Answer:',
        explanationLabel: '💡 Explanation:',
        selectOption: 'Please select an option!',
        
        // Search
        searchPlaceholder: 'Search knowledge, formulas, exercises... (Ctrl+K)',
        searchAll: 'All',
        searchKnowledge: 'Knowledge Points',
        searchFormula: 'Formulas',
        searchExercise: 'Exercises',
        searchNoResult: 'No results found',
        searchHint: 'Type to start searching',
        clearHistory: 'Clear History',
        recentSearches: 'Recent Searches',
        relevance: 'Relevance',
        
        // Footer
        footerText: 'Physics Master · Good luck on the Gaokao!',
        copyright: '© 2026 Physics Review Website',
        
        // Language Switch
        languageSwitch: '繁',
        languageCurrent: 'EN'
    }
};

// ==================== 語言管理器 ====================
class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('physics_language') || 'zh-TW';
        this.translations = i18n;
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLang);
        this.createLanguageToggle();
    }

    /**
     * 獲取當前語言
     */
    getCurrentLanguage() {
        return this.currentLang;
    }

    /**
     * 切換語言
     */
    switchLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language "${lang}" not supported`);
            return;
        }
        this.currentLang = lang;
        localStorage.setItem('physics_language', lang);
        this.applyLanguage(lang);
        
        // 觸發自定義事件供其他組件響應
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        
        // 更新搜索佔位符（如果存在）
        if (typeof searchController !== 'undefined') {
            const input = document.getElementById('search-input');
            if (input) input.placeholder = this.t('searchPlaceholder');
        }
    }

    /**
     * 翻譯函數
     */
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }

    /**
     * 應用語言到頁面
     */
    applyLanguage(lang) {
        const t = this.translations[lang];
        
        // 設置 HTML lang 屬性
        document.documentElement.lang = lang;

        // 更新全局變量供其他腳本使用
        window.currentLanguage = lang;

        // 翻譯帶有 data-i18n 屬性的元素
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.getNestedValue(t, key);
            if (text) el.textContent = text;
        });

        // 翻譯帶有 data-i18n-placeholder 的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const text = this.getNestedValue(t, key);
            if (text) el.placeholder = text;
        });

        // 翻譯帶有 data-i18n-title 的元素
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const text = this.getNestedValue(t, key);
            if (text) el.title = text;
        });

        // 特殊處理首頁內容
        this.translateHomePage(t);
        
        // 更新語言切換按鈕狀態
        this.updateToggleButton(t);
    }

    /**
     * 嵌套值獲取
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((o, k) => o?.[k], obj);
    }

    /**
     * 首頁特殊翻譯處理
     */
    translateHomePage(t) {
        // Logo 文字
        const logo = document.querySelector('.logo');
        if (logo) {
            const logoText = logo.lastChild;
            if (logoText && logoText.nodeType === Node.TEXT_NODE) {
                logoText.textContent = ` ${t.appName}`;
            } else {
                // 如果有子元素，查找文本節點
                const textNode = Array.from(logo.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                if (textNode) textNode.textContent = ` ${t.appName}`;
            }
        }

        // Hero 區域
        const heroH1 = document.querySelector('.hero h1');
        if (heroH1) heroH1.innerHTML = t.heroTitle;

        const heroP = document.querySelector('.hero p');
        if (heroP) heroP.textContent = t.heroDesc;

        // 模組卡片
        this.translateModuleCard('.mechanics', t.mechanicsTitle, t.mechanicsDesc, t.mechanicsTags);
        this.translateModuleCard('.electromagnetism', t.electromagnetismTitle, t.electromagnetismDesc, t.electromagnetismTags);
        this.translateModuleCard('.thermodynamics', t.thermodynamicsTitle, t.thermodynamicsDesc, t.thermodynamicsTags);
        this.translateModuleCard('.optics', t.opticsTitle, t.opticsDesc, t.opticsTags);
        this.translateModuleCard('.modern', t.modernPhysicsTitle, t.modernPhysicsDesc, t.modernPhysicsTags);

        // 功能區域
        const featuresTitle = document.querySelector('.features h2');
        if (featuresTitle) featuresTitle.textContent = t.featuresTitle;

        const featureItems = document.querySelectorAll('.feature-item');
        const featureData = [
            t.featureKnowledge,
            t.featureFormulas,
            t.featureExercises,
            t.featureExperiments,
            t.featureProgress
        ];
        featureItems.forEach((item, idx) => {
            if (featureData[idx]) {
                const h3 = item.querySelector('h3');
                const p = item.querySelector('p');
                if (h3) h3.textContent = featureData[idx].title;
                if (p) p.textContent = featureData[idx].desc;
            }
        });

        // 頁腳
        const footerP = document.querySelectorAll('.footer p');
        if (footerP[0]) footerP[0].textContent = t.footerText;
        if (footerP[1]) footerP[1].textContent = t.copyright;

        // 導航
        const navLinks = document.querySelectorAll('.nav-links a');
        const navKeys = [
            'navHome', 'navMechanics', 'navElectromagnetism',
            'navThermodynamics', 'navOptics', 'navModernPhysics'
        ];
        navLinks.forEach((link, idx) => {
            if (navKeys[idx] && t[navKeys[idx]]) {
                link.textContent = t[navKeys[idx]];
            }
        });
    }

    /**
     * 翻譯模組卡片
     */
    translateModuleCard(selector, title, desc, tags) {
        const card = document.querySelector(selector);
        if (!card) return;
        
        const h2 = card.querySelector('h2');
        const p = card.querySelector('p');
        const tagSpans = card.querySelectorAll('.tag');
        
        if (h2) h2.textContent = title;
        if (p) p.textContent = desc;
        tagSpans.forEach((span, idx) => {
            if (tags[idx]) span.textContent = tags[idx];
        });
    }

    /**
     * 創建語言切換按鈕（或復用已有的）
     */
    createLanguageToggle() {
        // 檢查是否已有按鈕（由 HTML 定義）
        let toggleBtn = document.getElementById('lang-toggle-btn');

        if (toggleBtn) {
            // 已有按鈕：綁定事件 + 更新初始狀態
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const newLang = this.currentLang === 'zh-TW' ? 'en' : 'zh-TW';
                this.switchLanguage(newLang);
            });
        } else {
            // 沒有按鈕：創建一個並添加到導航欄
            const nav = document.querySelector('.nav');
            if (!nav) return;

            toggleBtn = document.createElement('button');
            toggleBtn.className = 'lang-toggle';
            toggleBtn.id = 'lang-toggle-btn';
            toggleBtn.setAttribute('aria-label', 'Switch Language');
            
            toggleBtn.addEventListener('click', () => {
                const newLang = this.currentLang === 'zh-TW' ? 'en' : 'zh-TW';
                this.switchLanguage(newLang);
            });

            nav.appendChild(toggleBtn);
        }

        // 更新初始文字
        this.updateToggleButton(this.translations[this.currentLang]);
    }

    /**
     * 更新切換按鈕顯示
     */
    updateToggleButton(t) {
        const btn = document.getElementById('lang-toggle-btn');
        if (btn) {
            const langText = btn.querySelector('.lang-text');
            if (langText) {
                // 舊結構：有 lang-text 子元素
                langText.textContent = t.languageSwitch;
            } else {
                // HTML 直接定義的簡單按鈕：🌐 EN/繁
                btn.innerHTML = `🌐 ${t.languageSwitch}`;
            }
        }
    }

    /**
     * 翻譯練習題界面
     */
    translateExerciseUI(t) {
        // 標籤頁按鈕
        document.querySelectorAll('.tab-btn').forEach(btn => {
            const text = btn.textContent.trim();
            if (text.includes('基礎') || text.includes('Basic')) {
                btn.firstChild.textContent = ` ${t.exerciseBasic}`;
            } else if (text.includes('進階') || text.includes('Advanced')) {
                btn.firstChild.textContent = ` ${t.exerciseAdvanced}`;
            } else if (text.includes('高考') || text.includes('Exam')) {
                btn.firstChild.textContent = ` ${t.exerciseDifficult}`;
            }
        });
    }
}

// 初始化語言管理器
let i18nManager;
document.addEventListener('DOMContentLoaded', () => {
    i18nManager = new I18nManager();
});

// 導出
if (typeof module !== 'undefined') {
    module.exports = { I18nManager, i18n };
}
