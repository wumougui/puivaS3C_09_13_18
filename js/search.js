/**
 * 物理大師 - 全局搜索功能 v1.0
 * 支持知识点、公式、题目全文搜索
 */

// ==================== 搜索數據庫 ====================
const searchDataBase = {
    // 知識點索引
    knowledge: [
        { id: 'k001', title: '牛頓運動定律', category: '力學', keywords: ['牛頓', '定律', 'F=ma', '慣性', '作用力'], desc: '描述物體運動與受力關係的基本定律', page: 'pages/mechanics.html' },
        { id: 'k002', title: '動量守恆定律', category: '力學', keywords: ['動量', '守恆', '碰撞', 'mv', '衝量'], desc: '系統不受外力或合外力為零時總動量保持不變', page: 'pages/mechanics.html' },
        { id: 'k003', title: '機械能守恆定律', category: '力學', keywords: ['機械能', '守恆', '動能', '勢能', 'mgh', '½mv²'], desc: '只有重力或彈力做功時系統機械能守恆', page: 'pages/mechanics.html' },
        { id: 'k004', title: '萬有引力定律', category: '力學', keywords: ['萬有引力', 'GMm/r²', '引力常數', '衛星', '軌道'], desc: '任何兩個質量間的相互吸引力', page: 'pages/mechanics.html' },
        { id: 'k005', title: '圓周運動', category: '力學', keywords: ['向心力', '向心加速度', 'ω²r', 'v²/r', '週期'], desc: '物體沿圓周軌跡的運動', page: 'pages/mechanics.html' },
        { id: 'k006', title: '簡諧運動', category: '力學', keywords: ['振動', '週期', '頻率', '振幅', '彈簧', '單擺'], desc: '物體在平衡位置附近的周期性往復運動', page: 'pages/mechanics.html' },
        { id: 'k007', title: '庫侖定律', category: '電磁學', keywords: ['庫侖', '電荷', '靜電', 'F=kQq/r²', '電場'], desc: '點電荷間的相互作用力規律', page: 'pages/electromagnetism.html' },
        { id: 'k008', title: '歐姆定律', category: '電磁學', keywords: ['歐姆', '電壓', '電流', '電阻', 'U=IR'], desc: '導體中的電流與電壓成正比與電阻成反比', page: 'pages/electromagnetism.html' },
        { id: 'k009', title: '法拉第電磁感應定律', category: '電磁學', keywords: ['感應電動勢', '磁通量', 'Φ', '楞次', '切割'], desc: '閉合回路中感應電動勢等於磁通量變化率的負值', page: 'pages/electromagnetism.html' },
        { id: 'k010', title: '安培力', category: '電磁學', keywords: ['安培力', 'BIL', '左手定則', '磁場', '電流'], desc: '載流導線在磁場中受到的力', page: 'pages/electromagnetism.html' },
        { id: 'k011', title: '洛倫茲力', category: '電磁學', keywords: ['洛倫茲力', 'qvB', '帶電粒子', '圓周運動'], desc: '運動電荷在磁場中受到的力', page: 'pages/electromagnetism.html' },
        { id: 'k012', title: '理想氣體狀態方程', category: '熱學', keywords: ['理想氣體', 'PV=nRT', '壓強', '體積', '溫度'], desc: '描述一定質量理想氣體狀態參量的關係式', page: 'pages/thermodynamics.html' },
        { id: 'k013', title: '熱力學第一定律', category: '熱學', keywords: ['內能', 'ΔU=Q+W', '做功', '熱傳遞'], desc: '能量守恆在熱學中的表達形式', page: 'pages/thermodynamics.html' },
        { id: 'k014', title: '熱力學第二定律', category: '熱學', keywords: ['熵', '不可逆', '方向性', '卡諾'], desc: '涉及熱現象的宏觀過程具有方向性', page: 'pages/thermodynamics.html' },
        { id: 'k015', title: '分子動理論', category: '熱學', keywords: ['布朗運動', '分子', '擴散', '溫度', '壓強'], desc: '從微觀角度解釋熱現象的理論', page: 'pages/thermodynamics.html' },
        { id: 'k016', title: '光的折射', category: '光學', keywords: ['折射', 'n₁sinθ₁=n₂sinθ₂', '折射率', '斯涅爾'], desc: '光從一種介質進入另一種介質時傳播方向改變', page: 'pages/optics.html' },
        { id: 'k017', title: '干涉現象', category: '光學', keywords: ['干涉', '雙縫', '楊氏', '條紋', '波長'], desc: '兩列相干光疊加產生穩定加強減弱的現象', page: 'pages/optics.html' },
        { id: 'k018', title: '衍射現象', category: '光學', keywords: ['衍射', '繞射', '單縫', '光柵', '明暗紋'], desc: '光遇到障礙物時偏離直線傳播的現象', page: 'pages/optics.html' },
        { id: 'k019', title: '光電效應', category: '光學', keywords: ['光電效應', '愛因斯坦', 'hv=W+Ek', '極限頻率'], desc: '光照射金屬表面使電子逸出的現象', page: 'pages/optics.html' },
        { id: 'k020', title: '透鏡成像', category: '光學', keywords: ['透鏡', '凸透鏡', '凹透鏡', '焦距', '1/f=1/u+1/v'], desc: '光經過透鏡後形成像的規律', page: 'pages/optics.html' },
        { id: 'k021', title: '相對論', category: '現代物理', keywords: ['相對論', '愛因斯坦', '時間膨脹', '長度收縮', 'E=mc²'], desc: '研究高速運動物體的時空理論', page: 'pages/modern-physics.html' },
        { id: 'k022', title: '量子力學基礎', category: '現代物理', keywords: ['量子', '波粒二象性', '不確定性原理', '薛丁格', '波函數'], desc: '描述微觀粒子運動規律的理論', page: 'pages/modern-physics.html' },
        { id: 'k023', title: '原子結構', category: '現代物理', keywords: ['原子核', '玻爾', '能級', '躍遷', '光譜'], desc: '原子的核式結構及電子分佈規律', page: 'pages/modern-physics.html' },
        { id: 'k024', title: '核物理', category: '現代物理', keywords: ['衰變', '裂變', '聚變', '半衰期', '質量虧損'], desc: '原子核的性質、變化及反應', page: 'pages/modern-physics.html' }
    ],
    // 公式索引
    formulas: [
        { id: 'f001', formula: 'F = ma', name: '牛頓第二定律', category: '力學', unit: 'N', page: 'pages/mechanics.html' },
        { id: 'f002', formula: 'G·M·m/r²', name: '萬有引力', category: '力學', unit: 'N', page: 'pages/mechanics.html' },
        { id: 'f003', formula: 'p = mv', name: '動量', category: '力學', unit: 'kg·m/s', page: 'pages/mechanics.html' },
        { id: 'f004', formula: 'Ek = ½mv²', name: '動能', category: '力學', unit: 'J', page: 'pages/mechanics.html' },
        { id: 'f005', formula: 'Ep = mgh', name: '重力勢能', category: '力學', unit: 'J', page: 'pages/mechanics.html' },
        { id: 'f006', formula: 'T = 2π√(L/g)', name: '單擺週期', category: '力學', unit: 's', page: 'pages/mechanics.html' },
        { id: 'f007', formula: 'a = ω²r = v²/r', name: '向心加速度', category: '力學', unit: 'm/s²', page: 'pages/mechanics.html' },
        { id: 'f008', formula: 'F = kQq/r²', name: '庫侖定律', category: '電磁學', unit: 'N', page: 'pages/electromagnetism.html' },
        { id: 'f009', formula: 'U = IR', name: '歐姆定律', category: '電磁學', unit: 'V, A, Ω', page: 'pages/electromagnetism.html' },
        { id: 'f010', formula: 'ε = -dΦ/dt', name: '法拉第定律', category: '電磁學', unit: 'V', page: 'pages/electromagnetism.html' },
        { id: 'f011', formula: 'F = BILsinθ', name: '安培力', category: '電磁學', unit: 'N', page: 'pages/electromagnetism.html' },
        { id: 'f012', formula: 'F = qvB', name: '洛倫茲力', category: '電磁學', unit: 'N', page: 'pages/electromagnetism.html' },
        { id: 'f013', formula: 'PV = nRT', name: '理想氣體方程', category: '熱學', unit: 'Pa·m³/(mol·K)', page: 'pages/thermodynamics.html' },
        { id: 'f014', formula: 'ΔU = Q + W', name: '熱力學第一定律', category: '熱學', unit: 'J', page: 'pages/thermodynamics.html' },
        { id: 'f015', formula: 'n₁sinθ₁ = n₂sinθ₂', name: '折射定律(斯涅爾)', category: '光學', unit: '-', page: 'pages/optics.html' },
        { id: 'f016', formula: 'Δx = λL/d', name: '雙縫干涉', category: '光學', unit: 'm', page: 'pages/optics.html' },
        { id: 'f017', formula: 'hν = W + Ek', name: '光電效應方程', category: '光學', unit: 'J', page: 'pages/optics.html' },
        { id: 'f018', formula: '1/f = 1/u + 1/v', name: '薄透鏡公式', category: '光學', unit: '-', page: 'pages/optics.html' },
        { id: 'f019', formula: 'E = mc²', name: '質能方程', category: '現代物理', unit: 'J', page: 'pages/modern-physics.html' },
        { id: 'f020', formula: 'λ = h/p = h/(mv)', name: '德布羅意波長', category: '現代物理', unit: 'm', page: 'pages/modern-physics.html' },
        { id: 'f021', formula: 'Δx·Δp ≥ ħ/2', name: '不確定性原理', category: '現代物理', unit: '-', page: 'pages/modern-physics.html' }
    ]
};

// ==================== 搜索引擎核心 ====================
class PhysicsSearchEngine {
    constructor() {
        this.results = [];
        this.searchHistory = JSON.parse(localStorage.getItem('physics_search_history') || '[]');
    }

    /**
     * 全局搜索 - 支持模糊匹配和高亮
     * @param {string} query 搜索关键词
     * @param {object} options 搜索选项
     */
    search(query, options = {}) {
        const { type = 'all', limit = 50, fuzzy = true } = options;
        
        if (!query || !query.trim()) return [];
        
        const q = query.trim().toLowerCase();
        let results = [];

        // 搜索知識點
        if (type === 'all' || type === 'knowledge') {
            results = results.concat(this.searchKnowledge(q, fuzzy));
        }

        // 搜索公式
        if (type === 'all' || type === 'formula') {
            results = results.concat(this.searchFormula(q, fuzzy));
        }

        // 搜索練習題（如果題庫已加載）
        if (type === 'all' || type === 'exercise') {
            results = results.concat(this.searchExercise(q, fuzzy));
        }

        // 排序：按相关性排序
        results.sort((a, b) => b.score - a.score);
        
        // 限制結果數量
        results = results.slice(0, limit);

        // 記錄搜索歷史
        this.addToHistory(q);

        this.results = results;
        return results;
    }

    /**
     * 知識點搜索
     */
    searchKnowledge(query, fuzzy) {
        const results = [];
        
        searchDataBase.knowledge.forEach(item => {
            let score = 0;
            const matches = [];

            // 精確匹配標題
            if (item.title.toLowerCase().includes(query)) {
                score += 100;
                matches.push('title');
            }
            
            // 關鍵詞匹配
            item.keywords.forEach(kw => {
                if (kw.toLowerCase().includes(query) || query.includes(kw.toLowerCase())) {
                    score += 50;
                    matches.push('keyword:' + kw);
                }
            });

            // 描述匹配
            if (item.desc.toLowerCase().includes(query)) {
                score += 30;
                matches.push('description');
            }

            // 分類匹配
            if (item.category.includes(query)) {
                score += 20;
                matches.push('category');
            }

            // 模糊匹配（包含查詢字符）
            if (fuzzy && score === 0) {
                const queryChars = query.split('');
                const titleChars = item.title.toLowerCase();
                let matchCount = 0;
                queryChars.forEach(c => {
                    if (titleChars.includes(c)) matchCount++;
                });
                if (matchCount > query.length * 0.5) {
                    score = matchCount * 2;
                    matches.push('fuzzy');
                }
            }

            if (score > 0) {
                results.push({
                    ...item,
                    type: 'knowledge',
                    score,
                    matches,
                    highlight: this.getHighlightText(item.title, item.desc, query)
                });
            }
        });

        return results;
    }

    /**
     * 公式搜索
     */
    searchFormula(query, fuzzy) {
        const results = [];
        
        searchDataBase.formulas.forEach(item => {
            let score = 0;

            // 公式名稱匹配
            if (item.name.toLowerCase().includes(query)) {
                score += 100;
            }

            // 公式本身匹配（處理特殊字符）
            const cleanQuery = query.replace(/[^a-zA-Z0-9]/g, '');
            const cleanFormula = item.formula.replace(/[^a-zA-Z0-9]/g, '');
            if (cleanFormula.includes(cleanQuery) && cleanQuery.length > 1) {
                score += 80;
            }

            // 分類匹配
            if (item.category.includes(query)) {
                score += 40;
            }

            // 單位匹配
            if (item.unit.toLowerCase().includes(query)) {
                score += 30;
            }

            if (score > 0) {
                results.push({
                    ...item,
                    type: 'formula',
                    score,
                    highlight: this.getHighlightText(item.name, `${item.formula} [${item.unit}]`, query)
                });
            }
        });

        return results;
    }

    /**
     * 練習題搜索
     */
    searchExercise(query, fuzzy) {
        const results = [];
        
        // 嘗試訪問已載入的題庫
        const banks = window.exerciseBankFull || {};
        const subjects = Object.keys(banks);
        
        subjects.forEach(subject => {
            const levels = ['basic', 'advanced', 'difficult'];
            levels.forEach(level => {
                const exercises = banks[subject]?.[level] || [];
                exercises.forEach((ex, idx) => {
                    let score = 0;
                    
                    // 題目文本匹配
                    if (ex.q?.toLowerCase().includes(query)) {
                        score += 90;
                    } else if (ex.question?.toLowerCase().includes(query)) {
                        score += 90;
                    }
                    
                    // 選項匹配
                    const options = ex.o || ex.options || [];
                    options.forEach(opt => {
                        if (opt?.toLowerCase().includes(query)) {
                            score += 30;
                        }
                    });

                    // 解析匹配
                    if (ex.e?.toLowerCase().includes(query) || 
                        ex.explanation?.toLowerCase().includes(query)) {
                        score += 50;
                    }

                    if (score > 0) {
                        results.push({
                            id: `${subject}_${level}_${idx}`,
                            question: ex.q || ex.question,
                            type: 'exercise',
                            subject,
                            level,
                            score,
                            highlight: this.getHighlightText(
                                ex.q || ex.question, 
                                ex.e || ex.explanation || '', 
                                query
                            )
                        });
                    }
                });
            });
        });

        return results;
    }

    /**
     * 高亮顯示匹配文本
     */
    getHighlightText(text1, text2, query) {
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        const highlight1 = (text1 || '').replace(regex, '<mark>$1</mark>');
        const highlight2 = (text2 || '').replace(regex, '<mark>$1</mark>');
        return { title: highlight1, content: highlight2 };
    }

    /**
     * 轉義正則特殊字符
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * 添加到搜索歷史
     */
    addToHistory(query) {
        // 避免重複
        this.searchHistory = this.searchHistory.filter(h => h !== query);
        this.searchHistory.unshift(query);
        // 最多保存20條
        this.searchHistory = this.searchHistory.slice(0, 20);
        localStorage.setItem('physics_search_history', JSON.stringify(this.searchHistory));
    }

    /**
     * 獲取搜索建議（自動補全）
     */
    getSuggestions(query, limit = 8) {
        if (!query || query.length < 1) {
            return this.getRecentSearches(limit);
        }
        
        const suggestions = new Set();
        const q = query.toLowerCase();

        // 從知識點標題獲取建議
        searchDataBase.knowledge.forEach(k => {
            if (k.title.toLowerCase().includes(q)) {
                suggestions.add({ text: k.title, type: 'knowledge', icon: '📚' });
            }
            k.keywords.forEach(kw => {
                if (kw.toLowerCase().includes(q)) {
                    suggestions.add({ text: kw, type: 'keyword', icon: '🏷️' });
                }
            });
        });

        // 從公式名稱獲取建議
        searchDataBase.formulas.forEach(f => {
            if (f.name.toLowerCase().includes(q) || f.formula.includes(q)) {
                suggestions.add({ text: `${f.name}: ${f.formula}`, type: 'formula', icon: '📐' });
            }
        });

        return Array.from(suggestions).slice(0, limit);
    }

    /**
     * 獲取最近搜索記錄
     */
    getRecentSearches(limit = 10) {
        return this.searchHistory.slice(0, limit).map(h => ({
            text: h, type: 'history', icon: '🕐'
        }));
    }

    /**
     * 清除搜索歷史
     */
    clearHistory() {
        this.searchHistory = [];
        localStorage.removeItem('physics_search_history');
    }

    /**
     * 獲取統計信息
     */
    getStats() {
        return {
            totalKnowledge: searchDataBase.knowledge.length,
            totalFormulas: searchDataBase.formulas.length,
            recentSearches: this.searchHistory.length
        };
    }
}

// ==================== 搜索 UI 控制器 ====================
class SearchController {
    constructor() {
        this.engine = new PhysicsSearchEngine();
        this.isOpen = false;
        this.currentType = 'all';
        this.init();
    }

    init() {
        // 創建搜索 UI 容器
        this.createSearchUI();
        // 綁定事件
        this.bindEvents();
        // 快捷鍵
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K 打開搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            // Escape 關閉
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    createSearchUI() {
        // 搜索覆蓋層
        const overlay = document.createElement('div');
        overlay.id = 'search-overlay';
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <div class="search-input-wrapper">
                        <span class="search-icon">🔍</span>
                        <input type="text" id="search-input" 
                               placeholder="${this.getPlaceholder()}" 
                               autocomplete="off" autofocus>
                        <button class="search-clear-btn" id="search-clear" style="display:none;">✕</button>
                    </div>
                    <div class="search-shortcut">ESC 關閉</div>
                </div>
                
                <div class="search-filters">
                    <button class="filter-btn active" data-type="all">全部</button>
                    <button class="filter-btn" data-type="knowledge">知識點</button>
                    <button class="filter-btn" data-type="formula">公式</button>
                    <button class="filter-btn" data-type="exercise">練習題</button>
                </div>

                <div class="search-suggestions" id="search-suggestions"></div>
                
                <div class="search-results" id="search-results">
                    <div class="search-empty">
                        <p>輸入關鍵詞開始搜索</p>
                        <p class="search-hint">
                            支持搜索：<strong>知識點</strong> · <strong>公式</strong> · <strong>練習題</strong><br>
                            快捷鍵：<kbd>Ctrl</kbd>+<kbd>K</kbd>
                        </p>
                    </div>
                </div>

                <div class="search-footer">
                    <span class="search-stats"></span>
                    <button class="clear-history-btn" id="clear-history">清除歷史</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
    }

    getPlaceholder() {
        const lang = currentLanguage || 'zh-TW';
        const placeholders = {
            'zh-TW': '搜尋知識點、公式、練習題... (Ctrl+K)',
            'en': 'Search knowledge, formulas, exercises... (Cmd+K)'
        };
        return placeholders[lang] || placeholders['zh-TW'];
    }

    bindEvents() {
        const overlay = document.getElementById('search-overlay');
        const input = document.getElementById('search-input');
        const clearBtn = document.getElementById('search-clear');
        const resultsContainer = document.getElementById('search-results');
        const suggestionsContainer = document.getElementById('search-suggestions');

        // 點擊背景關閉
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });

        // 輸入事件
        input.addEventListener('input', () => {
            const value = input.value.trim();
            clearBtn.style.display = value ? 'block' : 'none';
            
            if (value.length > 0) {
                this.performSearch(value);
            } else {
                this.showSuggestions();
            }
        });

        // 清除按鈕
        clearBtn.addEventListener('click', () => {
            input.value = '';
            clearBtn.style.display = 'none';
            this.showSuggestions();
            input.focus();
        });

        // 類型篩選
        overlay.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                overlay.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentType = btn.dataset.type;
                if (input.value.trim()) {
                    this.performSearch(input.value.trim());
                }
            });
        });

        // 清除歷史
        document.getElementById('clear-history').addEventListener('click', () => {
            this.engine.clearHistory();
            this.showSuggestions();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        const overlay = document.getElementById('search-overlay');
        overlay.classList.add('open');
        this.isOpen = true;
        setTimeout(() => {
            document.getElementById('search-input').focus();
            this.showSuggestions();
        }, 100);
    }

    close() {
        const overlay = document.getElementById('search-overlay');
        overlay.classList.remove('open');
        this.isOpen = false;
        this.results = [];
    }

    performSearch(query) {
        const results = this.engine.search(query, { type: this.currentType });
        this.renderResults(results, query);
    }

    showSuggestions() {
        const container = document.getElementById('search-suggestions');
        const inputVal = document.getElementById('search-input')?.value?.trim();
        const suggestions = this.engine.getSuggestions(inputVal);
        
        if (suggestions.length > 0) {
            container.innerHTML = suggestions.map(s => `
                <div class="suggestion-item" data-text="${s.text}">
                    <span class="suggestion-icon">${s.icon}</span>
                    <span class="suggestion-text">${s.text}</span>
                </div>
            `).join('');
            
            // 點擊建議執行搜索
            container.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    document.getElementById('search-input').value = item.dataset.text;
                    this.performSearch(item.dataset.text);
                });
            });
            
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    }

    renderResults(results, query) {
        const container = document.getElementById('search-results');
        const statsEl = document.querySelector('.search-stats');

        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-empty">
                    <p>未找到與 "${query}" 相關的結果</p>
                    <p>嘗試使用不同的關鍵詞</p>
                </div>
            `;
            statsEl.textContent = '';
            return;
        }

        // 更新統計
        statsEl.textContent = `找到 ${results.length} 個結果`;

        // 渲染結果列表
        container.innerHTML = results.map(result => this.renderResultItem(result)).join('');

        // 綁定點擊事件
        container.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                if (url) {
                    window.location.href = url;
                    this.close();
                }
            });
        });
    }

    renderResultItem(result) {
        switch (result.type) {
            case 'knowledge':
                return `
                    <div class="result-item knowledge" data-url="${result.page}" data-id="${result.id}">
                        <div class="result-icon">📚</div>
                        <div class="result-content">
                            <div class="result-title">${result.highlight.title}</div>
                            <div class="result-desc">${result.desc}</div>
                            <div class="result-meta">
                                <span class="result-category">${result.category}</span>
                                <span class="result-score">相關度: ${result.score}</span>
                            </div>
                        </div>
                    </div>
                `;
            case 'formula':
                return `
                    <div class="result-item formula" data-url="${result.page}" data-id="${result.id}">
                        <div class="result-icon">📐</div>
                        <div class="result-content">
                            <div class="result-title">${result.highlight.title}</div>
                            <div class="result-formula">${result.formula}</div>
                            <div class="result-meta">
                                <span class="result-category">${result.category}</span>
                                <span class="result-unit">單位: ${result.unit}</span>
                            </div>
                        </div>
                    </div>
                `;
            case 'exercise':
                return `
                    <div class="result-item exercise" data-url="#" data-id="${result.id}">
                        <div class="result-icon">✏️</div>
                        <div class="result-content">
                            <div class="result-title">${this.truncate(result.question, 80)}</div>
                            <div class="result-meta">
                                <span class="result-subject">${result.subject}</span>
                                <span class="result-level">${result.level}</span>
                                <span class="result-score">相關度: ${result.score}</span>
                            </div>
                        </div>
                    </div>
                `;
            default:
                return '';
        }
    }

    truncate(str, len) {
        return str && str.length > len ? str.substring(0, len) + '...' : str;
    }
}

// 初始化搜索功能
let searchController;
document.addEventListener('DOMContentLoaded', () => {
    searchController = new SearchController();
});

// 導出供外部調用
if (typeof module !== 'undefined') {
    module.exports = { PhysicsSearchEngine, SearchController, searchDataBase };
}
