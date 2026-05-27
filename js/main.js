// ==================== 導航菜單 ====================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}

// ==================== 頁面載入動畫 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 添加動畫類
    const cards = document.querySelectorAll('.module-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });

    // 載入學習進度
    loadProgress();
});

// ==================== 學習進度管理 ====================
function getProgress() {
    const progress = localStorage.getItem('physicsProgress');
    return progress ? JSON.parse(progress) : {
        mechanics: { formulas: 0, exercises: 0 },
        electromagnetism: { formulas: 0, exercises: 0 },
        thermodynamics: { formulas: 0, exercises: 0 },
        optics: { formulas: 0, exercises: 0 },
        modernPhysics: { formulas: 0, exercises: 0 },
        totalVisits: 0
    };
}

function saveProgress(module, type, count = 1) {
    const progress = getProgress();
    if (progress[module]) {
        progress[module][type] += count;
    }
    progress.totalVisits++;
    localStorage.setItem('physicsProgress', JSON.stringify(progress));
}

function loadProgress() {
    const progress = getProgress();
    
    // 更新頁面上的進度顯示
    const progressElements = document.querySelectorAll('[data-progress]');
    progressElements.forEach(el => {
        const module = el.dataset.progress;
        if (progress[module]) {
            const total = progress[module].formulas + progress[module].exercises;
            el.textContent = total;
        }
    });
}

// ==================== 練習題功能 ====================
let currentAnswers = {};

// 練習題庫
const exerciseBank = {
    basic: [
        {
            question: '一物體從靜止開始做自由落體運動，落地前1秒內通過的位移為45m，則落地時的速度為多少？（g=10m/s²）',
            options: ['20m/s', '30m/s', '40m/s', '50m/s'],
            answer: 'C',
            explanation: '由勻加速直線運動公式：最後1秒位移為45m，設總時間為t，則h(t)-h(t-1)=45，即½g(t²-(t-1)²)=45，解得t=5s，落地速度v=gt=50m/s'
        },
        {
            question: '一質量為2kg的物體在水平面上受水平拉力F=10N作用，若動摩擦係數μ=0.2，則物體的加速度為多少？（g=10m/s²）',
            options: ['3m/s²', '4m/s²', '5m/s²', '6m/s²'],
            answer: 'A',
            explanation: '摩擦力f=μmg=0.2×2×10=4N，合力F合=F-f=10-4=6N，加速度a=F合/m=6/2=3m/s²'
        },
        {
            question: '一顆子彈以400m/s的速度射入靜止的木塊，若子彈質量為0.02kg，木塊質量為0.98kg，則子彈留在木塊中時的速度為多少？',
            options: ['8m/s', '12m/s', '16m/s', '20m/s'],
            answer: 'A',
            explanation: '由動量守恆：m₁v₁+m₂v₂=(m₁+m₂)v，0.02×400+0=(0.02+0.98)v，v=8m/s'
        },
        {
            question: '一物體以10m/s的初速度從地面豎直向上拋出，忽略空氣阻力，則物體上升的最大高度為多少？（g=10m/s²）',
            options: ['2.5m', '5m', '10m', '20m'],
            answer: 'B',
            explanation: '由豎直上拋公式：最大高度h=v₀²/(2g)=100/(2×10)=5m'
        },
        {
            question: '一質量為m的物體在水平面上做直線運動，其位移-時間圖像為拋物線，則該物體所受合外力為？',
            options: ['0', '恆力', '變力', '無法確定'],
            answer: 'B',
            explanation: '位移-時間圖像為拋物線，說明位移與時間的平方成正比，即x=kt²，符合勻加速直線運動特點，合外力為恆力'
        },
        {
            question: '一均勻木棒的質量為4kg，長度為2m，則其重心到細端的距離為多少？',
            options: ['0.5m', '1m', '1.5m', '2m'],
            answer: 'B',
            explanation: '均勻木棒的重心在幾何中心，對於從細端量起的長度L，重心距細端為L/2=2/2=1m'
        },
        {
            question: '一電荷量為2×10⁻⁶C的點電荷在電場中某點受到的電場力為4×10⁻⁴N，則該點的電場強度為多少？',
            options: ['2×10⁻⁸N/C', '2×10²N/C', '8×10⁻¹²N/C', '8×10⁶N/C'],
            answer: 'B',
            explanation: '電場強度E=F/q=4×10⁻⁴/2×10⁻⁶=2×10²N/C'
        },
        {
            question: '一電阻兩端電壓為12V，通過電流為2A，則該電阻的功率為多少？',
            options: ['6W', '12W', '24W', '48W'],
            answer: 'C',
            explanation: '電功率P=UI=12×2=24W'
        },
        {
            question: '一物體做直線運動，其速度-時間圖像如圖所示，則該物體在前4秒內的位移為多少？',
            options: ['4m', '8m', '12m', '16m'],
            answer: 'B',
            explanation: '速度-時間圖像所包圍的面積即為位移。三角形面積：½×4×4=8m'
        },
        {
            question: '關於加速度的概念，下列說法正確的是',
            options: ['加速度為負時，物體一定做減速運動', '加速度越大，速度變化越快', '速度為零時，加速度一定為零', '加速度方向與速度方向一定相同'],
            answer: 'B',
            explanation: '加速度是描述速度變化快慢的物理量，加速度越大表示速度變化越快'
        },
        {
            question: '一質量為3kg的物體從高度為5m處自由落下，忽略空氣阻力，落地時的動能為多少？（g=10m/s²）',
            options: ['50J', '100J', '150J', '200J'],
            answer: 'C',
            explanation: '由機械能守恆：mgh=½mv²=Ek，Ek=3×10×5=150J'
        },
        {
            question: '關於牛頓第三定律，下列說法正確的是',
            options: ['兩物體間的壓力與反壓力一定是大小相等', '兩物體間的摩擦力與反摩擦力一定是大小相等', '兩物體間的作用力與反作用力一定是同種性質的力', '作用力與反作用力一定同時產生、同時消失'],
            answer: 'D',
            explanation: '牛頓第三定律：作用力與反作用力大小相等、方向相反、作用在同一直線上、性質相同、同時產生同消失'
        },
        {
            question: '一物體的動量為p，動能為Ek，則該物體的質量為多少？',
            options: ['p²/Ek', '2p²/Ek', 'p²/(2Ek)', '2Ek/p²'],
            answer: 'C',
            explanation: '由p=mv，Ek=½mv²，可得m=p²/(2Ek)'
        },
        {
            question: '關於機械能守恆定律，下列說法正確的是',
            options: ['只有重力對物體做功時，機械能守恆', '只有彈簧彈力對物體做功時，機械能守恆', '只有重力和彈力對物體做功時，機械能守恆', '只有動力和重力對物體做功時，機械能守恆'],
            answer: 'C',
            explanation: '只有重力或彈簧彈力做功時，機械能守恆'
        },
        {
            question: '一帶電粒子在勻強電場中沿電場線方向從A點移到B點，電場強度E=100N/C，AB間距離d=0.2m，則電場力做的功為多少？',
            options: ['10J', '20J', '500J', '2000J'],
            answer: 'B',
            explanation: 'W=Fd=qEd，設電荷量為q，則W=q×100×0.2=20q，若q=1C，則W=20J'
        },
        {
            question: '關於電阻率，下列說法正確的是',
            options: ['電阻率與導體的長度成正比', '電阻率與導體的橫截面積成反比', '電阻率與導體的材料有關', '電阻率與溫度無關'],
            answer: 'C',
            explanation: '電阻率是材料的固有屬性，與材料種類有關，與長度、截面積無關，但與溫度有關'
        }
    ],
    advanced: [
        {
            question: '在半徑為R的半球形碗內，有一質量為m的小球在碗內做完整圓周運動，則小球在最高點的最小速度為多少？',
            options: ['√(gR)', '√(2gR)', '√(3gR)', '√(4gR)'],
            answer: 'A',
            explanation: '在最高點由重力提供向心力：mg=mv²/R，所以最小速度v=√(gR)'
        },
        {
            question: '一均勻細棒長度為L，質量為m，可繞其一端在豎直面內轉動，現將其從水平位置靜止釋放，則細棒通過豎直位置時的角速度為多少？',
            options: ['√(3g/L)', '√(g/L)', '√(2g/L)', '√(4g/L)'],
            answer: 'A',
            explanation: '由機械能守恆：mg(L/2)=½Iω²，I=⅓mL²，解得ω=√(3g/L)'
        },
        {
            question: '一半徑為R的圓形線圈在磁感應強度為B的勻強磁場中勻速轉動，若線圈面積為S，轉速為n，則感應電動勢的最大值為多少？',
            options: ['BSnπ', '2BSnπ', 'BSn', '2BSn'],
            answer: 'B',
            explanation: '最大值εm=NBSω=BS·2πn=2BSnπ（其中n為每秒轉數）'
        },
        {
            question: '一理想變壓器原線圈匝數為1000匝，副線圈匝數為200匝，若原線圈電壓為220V，則副線圈輸出電壓為多少？',
            options: ['22V', '44V', '110V', '440V'],
            answer: 'B',
            explanation: '由變壓器電壓比：U₁/U₂=n₁/n₂，U₂=U₁×n₂/n₁=220×200/1000=44V'
        },
        {
            question: '一單擺的擺長為0.8m，在地面附近（g=10m/s²）振動，則其週期為多少？',
            options: ['0.8πs', '1.6πs', '0.4πs', '0.2πs'],
            answer: 'B',
            explanation: '單擺週期T=2π√(L/g)=2π√(0.8/10)=2π×0.283=1.6πs'
        },
        {
            question: '一定量理想氣體從狀態A等壓膨脹到狀態B，若氣體吸收熱量為Q，內能增加為ΔU，則氣體對外做功為多少？',
            options: ['Q', 'Q+ΔU', 'Q-ΔU', 'ΔU'],
            answer: 'C',
            explanation: '由熱力學第一定律：Q=ΔU+W，所以W=Q-ΔU'
        },
        {
            question: '一質量為m的滑塊以速度v滑上質量為M的靜止光滑斜面體，斜面體可在光滑水平面上自由滑動，則滑塊能上升的最大高度為多少？',
            options: ['m²v²/(2g(M+m))', 'mv²/(2g(M+m))', 'Mv²/(2g(M+m))', '(M+m)v²/(2gm)'],
            answer: 'A',
            explanation: '系統水平方向動量守恆，最終兩者以共同速度運動，由機械能守恆求得上滑最大高度'
        },
        {
            question: '一束光線從空氣射入折射率為√3的玻璃中，若入射角為60°，則折射角為多少？',
            options: ['30°', '45°', '60°', '90°'],
            answer: 'A',
            explanation: '由斯涅爾定律：n₁sinθ₁=n₂sinθ₂，1×sin60°=√3×sinθ₂，sinθ₂=½，θ₂=30°'
        },
        {
            question: '關於光電效應方程Ek=hv-W，下列說法正確的是',
            options: ['Ek是光電子的動能', 'h是普朗克常數', 'v是光電子速度', 'W是光子能量'],
            answer: 'A',
            explanation: '光電效應方程中Ek是光電子的最大初動能，h是普朗克常數，v是入射光頻率，W是逸出功'
        },
        {
            question: '一質量為M的原子核由N個核子組成，現將其拆分為N個單獨的核子，需要的能量為多少？',
            options: ['結合能', '比結合能', '電離能', '核能'],
            answer: 'A',
            explanation: '將原子核拆分為單獨核子所需的能量等於該原子核的結合能'
        },
        {
            question: '一半徑為r的圓形通電線圈，電流為I，線圈匝數為N，置於磁感應強度為B的勻強磁場中，線圈平面與磁場方向垂直，則線圈所受磁力矩為多少？',
            options: ['NIBr', 'NIBr²', 'NI²Br', 'NIB/r'],
            answer: 'B',
            explanation: '線圈所受磁力矩M=NIBS=NIB·πr²=NIBπr²'
        },
        {
            question: '一水準氣體在t₁=27°C時體積為V₀，若保持壓強不變，則在t₂=127°C時的體積為多少？',
            options: ['V₀/2', '2V₀/3', '4V₀/3', '3V₀/4'],
            answer: 'C',
            explanation: '等壓變化：V₁/T₁=V₂/T₂，V₂=V₀×(400/300)=4V₀/3'
        }
    ],
    difficult: [
        {
            question: '（2023高考）如圖所示，在光滑水平地面上有一質量為M的斜面體，斜面傾角為θ，現將一質量為m的小球從斜面頂端由靜止釋放，則斜面體對地的加速度大小為多少？',
            options: ['gsinθcosθ/(1+msin²θ/M)', 'mgsinθ/(M+m)', 'Mgcosθ/(M+m)', 'mgsinθ/M'],
            answer: 'A',
            explanation: '由系統和牛頓第二定律分析，小球和斜面體的加速度滿足約束條件，解得斜面體加速度a=Mmgsinθcosθ/(M+m)(M+msin²θ)'
        },
        {
            question: '（2022高考）如圖，空間存在相互垂直的勻強電場E和勻強磁場B，一帶電粒子在其中做直線運動，已知粒子的比荷為q/m，則粒子的速度為多少？',
            options: ['E/B', 'B/E', '√(E/B)', '√(BE)'],
            answer: 'A',
            explanation: '當電場力和磁場力平衡時，qE=qvB，所以v=E/B'
        },
        {
            question: '（2021高考）一定質量的理想氣體從狀態A經歷等壓過程到狀態B，再經歷等溫過程到狀態C，最後經歷等壓過程回到狀態A，已知狀態A的體積為V₀，溫度為T₀，則整個循環的功為多少？',
            options: ['0', 'p₀V₀', '2p₀V₀', '½p₀V₀'],
            answer: 'A',
            explanation: '整個循環回到起始狀態，由熱力學第一定律可知，整個循環的凈功為0'
        },
        {
            question: '（2020高考）一半徑為R的半圓形光滑軌道固定在豎直面內，一小球從半圓形軌道的最高點由靜止滑下，若空氣阻力不計，則小球滑到最低點時對軌道的壓力為多少？',
            options: ['2mg', '3mg', '4mg', '5mg'],
            answer: 'B',
            explanation: '由機械能守恆：mgR=½mv²，由向心力公式：N-mg=mv²/R，解得N=3mg'
        },
        {
            question: '（2019高考）如圖，兩平行金屬板間距離為d，板間電壓為U，一電子以初速度v₀平行於金屬板射入，若電子能從金屬板邊緣射出，則金屬板長度L至少為多少？',
            options: ['d√(2eU/mv₀²)', 'd√(eU/mv₀²)', '2d√(eU/mv₀²)', 'd√(mv₀²/eU)'],
            answer: 'A',
            explanation: '電子在垂直於板方向做初速度為零的勻加速運動，平行方向做勻速運動，滿足d/2=½at²，L=v₀t，a=eU/md，解得L=d√(2eU/mv₀²)'
        },
        {
            question: '（2018高考）一束波長為λ的光垂直照射到雙縫上，已知縫間距為d，縫到屏幕距離為L，則第n級明條紋到中央明條紋的距離為多少？',
            options: ['nλL/d', 'nλd/L', 'dL/nλ', 'nλ²d/L'],
            answer: 'A',
            explanation: '雙縫干涉明條紋條件：Δx=nλL/d'
        },
        {
            question: '（2017高考）如圖，理想變壓器原線圈接交流電源，副線圈接電阻R，若將電鍵S閉合，則原線圈中的電流將如何變化？',
            options: ['變大', '變小', '不變', '先變大後變小'],
            answer: 'A',
            explanation: '閉合電鍵S後，副線圈匝數增加，輸出電壓增大，輸出功率增大，故輸入功率增大，原線圈電流變大'
        },
        {
            question: '（2016高考）一半徑為R的圓形線圈在磁場中繞垂直於磁場方向的軸以角速度ω勻速轉動，線圈匝數為N，面積為S，磁感應強度為B，則線圈從中性面開始轉過90°的過程中，感應電動勢的平均值為多少？',
            options: ['NBSω/π', '2NBSω/π', 'NBSω', 'NBSω/2'],
            answer: 'B',
            explanation: '平均感應電動勢ε=NΔΦ/Δt=N(BS-0)/(T/4)=4NBS/T=4NBSω/(2π)=2NBSω/π'
        },
        {
            question: '（2015高考）一束白光垂直照射到光柵上，第一級光譜中波長為λ的光偏離中央明紋的距離為x，若將光柵常數減半，則該波長的光偏離中央明紋的距離為多少？',
            options: ['x/2', 'x', '2x', '4x'],
            answer: 'C',
            explanation: '光柵方程d sinθ=λ，波長不變時，d減半則sinθ加倍，故x加倍為2x'
        },
        {
            question: '（2014高考）氫原子能級如圖所示，已知巴耳末系的最長波長為λ₀，則巴耳末系的系限波長為多少？',
            options: ['λ₀', 'λ₀/2', 'λ₀/3', 'λ₀/4'],
            answer: 'A',
            explanation: '巴耳末系是從n≥3到n=2的躍遷，最長波長對應n=3→n=2，系限波長對應n=∞→n=2，由於En=-13.6/n² eV，可知系限波長等於最長波長'
        },
        {
            question: '（2013高考）一飛輪半徑為R，質量為m，可繞水平軸O無摩擦轉動，飛輪均勻分布著質量為m的質點，位於飛輪邊緣。今用恆力F拉繞在飛輪上的繩子，繩子不計質量且不打滑，則飛輪的角加速度為多少？',
            options: ['2F/(3mR)', 'F/(mR)', '2F/(mR)', '3F/(2mR)'],
            answer: 'D',
            explanation: '飛輪轉動慣量I=½mR²+mR²=3/2mR²，由牛頓第二定律：FR=Iα，解得α=2F/(3mR)'
        },
        {
            question: '（2012高考）一束動能為E的電子垂直射入磁感應強度為B的勻強磁場中，電子速度方向與磁場方向垂直，則電子在磁場中做圓周運動的半徑為多少？',
            options: ['√(2Em)/eB', '√(2E)/eBm', '√(Em)/eB', '√(E)/2eBm'],
            answer: 'A',
            explanation: '由動能公式E=½mv²得v=√(2E/m)，由qvB=mv²/r得r=mv/(qB)=√(2Em)/eB'
        }
    ]
};

function checkAnswer(exerciseId, correctAnswer) {
    const selectedOption = document.querySelector(`input[name="${exerciseId}"]:checked`);
    if (!selectedOption) {
        alert('請選擇一個選項！');
        return;
    }

    const userAnswer = selectedOption.value;
    const options = document.querySelectorAll(`input[name="${exerciseId}"]`);
    
    options.forEach(opt => {
        const optionDiv = opt.closest('.option');
        if (opt.value === correctAnswer) {
            optionDiv.classList.add('correct');
        } else if (opt.value === userAnswer && userAnswer !== correctAnswer) {
            optionDiv.classList.add('wrong');
        }
        opt.disabled = true;
    });

    // 顯示答案解析
    const answerArea = document.getElementById(`answer-${exerciseId}`);
    if (answerArea) {
        answerArea.classList.add('show');
    }

    // 保存答案
    currentAnswers[exerciseId] = userAnswer === correctAnswer;
    
    // 禁用按鈕
    const btn = document.querySelector(`#${exerciseId} .answer-btn`);
    if (btn) {
        btn.disabled = true;
        btn.textContent = userAnswer === correctAnswer ? '✓ 回答正確！' : '✗ 回答錯誤';
        btn.style.background = userAnswer === correctAnswer ? '#10b981' : '#ef4444';
    }
    
    // 延遲後隨機刷新新題目
    setTimeout(() => {
        refreshExercise(exerciseId);
    }, 2000); // 2秒後刷新
}

function refreshExercise(currentId) {
    // 獲取當前難度級別
    const tabBtns = document.querySelectorAll('.tab-btn');
    let currentLevel = 'basic';
    tabBtns.forEach(b => {
        if (b.classList.contains('active')) {
            if (b.textContent.includes('基礎')) currentLevel = 'basic';
            else if (b.textContent.includes('進階')) currentLevel = 'advanced';
            else if (b.textContent.includes('高考')) currentLevel = 'difficult';
        }
    });
    
    // 從題庫中隨機選擇一道新題目
    const allExercises = exerciseBank[currentLevel];
    const randomIndex = Math.floor(Math.random() * allExercises.length);
    const newExercise = allExercises[randomIndex];
    
    // 創建新的練習卡片
    const exerciseCard = document.getElementById(currentId);
    if (exerciseCard && newExercise) {
        // 保存當前卡片ID
        const cardId = exerciseCard.id;
        
        exerciseCard.innerHTML = `
            <div class="exercise-header">
                <h4>📝 ${newExercise.question}</h4>
            </div>
            <div class="options">
                ${newExercise.options.map((opt, i) => `
                    <label class="option">
                        <input type="radio" name="${cardId}" value="${String.fromCharCode(65 + i)}">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
            <div class="answer-area" id="answer-${cardId}">
                <p>✅ 正確答案：<strong>${newExercise.answer}</strong></p>
                <p>💡 解析：${newExercise.explanation}</p>
            </div>
            <div class="exercise-footer">
                <button class="refresh-btn" onclick="refreshThisExercise('${cardId}')">🔄 換一題</button>
                <button class="answer-btn" onclick="checkAnswer('${cardId}', '${newExercise.answer}')">提交答案</button>
            </div>
        `;
        
        // 添加淡入動畫
        exerciseCard.style.opacity = '0';
        exerciseCard.style.transform = 'translateY(10px)';
        setTimeout(() => {
            exerciseCard.style.transition = 'opacity 0.5s, transform 0.5s';
            exerciseCard.style.opacity = '1';
            exerciseCard.style.transform = 'translateY(0)';
        }, 50);
    }
}

// 手動刷新單個練習題
function refreshThisExercise(exerciseId) {
    refreshExercise(exerciseId);
}

function showAnswer(exerciseId) {
    const answerArea = document.getElementById(`answer-${exerciseId}`);
    if (answerArea) {
        answerArea.classList.add('show');
    }
}

// ==================== 標籤頁切換 ====================
function switchTab(tabId) {
    // 隱藏所有標籤內容
    document.querySelectorAll('.exercise-list').forEach(list => {
        list.classList.remove('active');
    });
    
    // 取消所有按鈕的激活狀態
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 顯示選中的標籤內容
    document.getElementById(tabId).classList.add('active');
    
    // 激活按鈕
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes(tabId === 'basic' ? '基礎' : tabId === 'advanced' ? '進階' : '高考')) {
            btn.classList.add('active');
        }
    });
}

// ==================== 公式高亮 ====================
function highlightFormula(formulaId) {
    const formula = document.getElementById(formulaId);
    if (formula) {
        formula.style.transform = 'scale(1.05)';
        formula.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
        setTimeout(() => {
            formula.style.transform = 'scale(1)';
            formula.style.boxShadow = 'none';
        }, 500);
    }
}

// ==================== 滾動動畫 ====================
function animateOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('animate-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// ==================== 主題切換（可選） ====================
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// ==================== 導出筆記功能 ====================
function exportNotes() {
    const notes = document.querySelector('.notes-area');
    if (notes) {
        const text = notes.value;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '物理筆記.txt';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// ==================== 列印功能 ====================
function printPage() {
    window.print();
}

// ==================== 互動實驗動畫控制 ====================

// 斜面運動實驗動畫
let animationFrames = {};
function updateInclinedPlane(angle, friction, mass, gravity) {
    const canvas = document.getElementById('inclinedPlaneCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    const angleRad = angle * Math.PI / 180;
    const groundY = H * 0.8;
    const groundX = W * 0.1;
    
    // 計算斜面長度和端點
    const planeLength = W * 0.7;
    const height = planeLength * Math.sin(angleRad);
    const endX = groundX + planeLength * Math.cos(angleRad);
    const endY = groundY - height;
    
    ctx.clearRect(0, 0, W, H);
    
    // 繪製地面
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(groundX - 20, groundY);
    ctx.lineTo(W * 0.95, groundY);
    ctx.stroke();
    
    // 繪製斜面
    ctx.strokeStyle = '#CD853F';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(groundX, groundY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    
    // 計算加速度
    const a = gravity * Math.sin(angleRad) - friction * gravity * Math.cos(angleRad);
    
    // 繪製木塊
    const blockSize = 30;
    const progress = Math.min(1, (Date.now() % 4000) / 4000);
    const blockX = groundX + progress * planeLength * Math.cos(angleRad) - blockSize/2;
    const blockY = groundY - progress * height - blockSize;
    
    // 木塊陰影
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(blockX + 3, blockY + 3, blockSize, blockSize);
    
    // 木塊
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(blockX, blockY, blockSize, blockSize);
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.strokeRect(blockX, blockY, blockSize, blockSize);
    
    // 木塊受力示意
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(blockX + blockSize/2, blockY + blockSize/2);
    ctx.lineTo(blockX + blockSize/2, blockY + blockSize + 25);
    ctx.stroke();
    ctx.fillStyle = '#e74c3c';
    ctx.font = '14px Arial';
    ctx.fillText('G', blockX + blockSize/2 + 5, blockY + blockSize + 18);
    
    // 更新顯示
    const resultDiv = document.getElementById('inclinedPlaneResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.9); border-radius: 8px;">
                <p>📊 <strong>運動分析</strong></p>
                <p>• 加速度 a = ${a.toFixed(2)} m/s²</p>
                <p>• 合力 F = ${(mass * a).toFixed(2)} N</p>
                <p>• 下滑力 F₁ = ${(mass * gravity * Math.sin(angleRad)).toFixed(2)} N</p>
                <p>• 摩擦力 f = ${(friction * mass * gravity * Math.cos(angleRad)).toFixed(2)} N</p>
            </div>
        `;
    }
    
    requestAnimationFrame(() => updateInclinedPlane(angle, friction, mass, gravity));
}

function startInclinedPlaneExperiment() {
    const angle = parseFloat(document.getElementById('angleSlider')?.value || 30);
    const friction = parseFloat(document.getElementById('frictionSlider')?.value || 0.2);
    const mass = parseFloat(document.getElementById('massSlider')?.value || 2);
    const gravity = parseFloat(document.getElementById('gravitySlider')?.value || 9.8);
    
    updateInclinedPlane(angle, friction, mass, gravity);
}

// 平拋運動實驗
function updateProjectileMotion(v0, h) {
    const canvas = document.getElementById('projectileCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    const g = 9.8;
    const groundY = H * 0.85;
    
    ctx.clearRect(0, 0, W, H);
    
    // 繪製地面
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, groundY, W, H - groundY);
    
    // 繪製牆壁
    ctx.fillStyle = '#D3D3D3';
    ctx.fillRect(W * 0.1 - 10, groundY - 150, 10, 150);
    
    // 繪製釋放點
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(W * 0.1, groundY - 150, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // 計算運動
    const t = (Date.now() % 5000) / 1000;
    const x = v0 * t;
    const y = groundY - 150 - (h * t + 0.5 * g * t * t);
    
    // 繪製小球
    if (y < groundY && y > 0) {
        ctx.fillStyle = '#4ecdc4';
        ctx.beginPath();
        ctx.arc(W * 0.1 + x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // 軌跡
        ctx.strokeStyle = 'rgba(78, 205, 196, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        for (let i = 0; i <= t * 50; i++) {
            const ti = i / 50;
            const xi = v0 * ti;
            const yi = groundY - 150 - (h * ti + 0.5 * g * ti * ti);
            if (yi < groundY) {
                if (i === 0) ctx.moveTo(W * 0.1 + xi, yi);
                else ctx.lineTo(W * 0.1 + xi, yi);
            }
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }
    
    // 更新顯示
    const resultDiv = document.getElementById('projectileResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.9); border-radius: 8px;">
                <p>📊 <strong>運動分析</strong></p>
                <p>• 水平速度 vₓ = ${v0.toFixed(1)} m/s（保持不變）</p>
                <p>• 當前豎直速度 vᵧ = ${(h + g * t).toFixed(2)} m/s</p>
                <p>• 當前位置：(${x.toFixed(2)}m, ${(y - groundY + 150).toFixed(2)}m)</p>
                <p>• 射程 R = ${(v0 * Math.sqrt(2 * (150 + h) / g)).toFixed(2)} m</p>
            </div>
        `;
    }
    
    requestAnimationFrame(() => updateProjectileMotion(v0, h));
}

function startProjectileExperiment() {
    const v0 = parseFloat(document.getElementById('v0Slider')?.value || 10);
    const h = parseFloat(document.getElementById('heightSlider')?.value || 0);
    
    updateProjectileMotion(v0, h);
}

// 彈簧振子實驗
let springAngle = 0;
function updateSpringOscillation(k, amplitude, m) {
    const canvas = document.getElementById('springCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    const centerY = H / 2;
    const omega = Math.sqrt(k / m);
    const t = Date.now() / 1000;
    const displacement = amplitude * Math.cos(omega * t);
    
    // 繪製牆壁
    ctx.fillStyle = '#555';
    ctx.fillRect(20, centerY - 120, 20, 240);
    
    // 繪製彈簧
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, centerY);
    const springLength = 100 + displacement;
    const coils = 12;
    for (let i = 0; i <= coils; i++) {
        const x = 40 + Math.sin(i * Math.PI * 2) * 15;
        const y = centerY + (springLength * i / coils);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // 繪製振子
    const blockY = centerY + springLength;
    ctx.fillStyle = '#3498db';
    ctx.fillRect(25, blockY, 30, 30);
    ctx.strokeStyle = '#2980b9';
    ctx.lineWidth = 2;
    ctx.strokeRect(25, blockY, 30, 30);
    
    // 繪製平衡位置
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(10, centerY + 100);
    ctx.lineTo(70, centerY + 100);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // 更新顯示
    const resultDiv = document.getElementById('springResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.9); border-radius: 8px;">
                <p>📊 <strong>振動分析</strong></p>
                <p>• 彈簧常數 k = ${k} N/m</p>
                <p>• 振幅 A = ${amplitude} m</p>
                <p>• 質量 m = ${m} kg</p>
                <p>• 角頻率 ω = ${omega.toFixed(2)} rad/s</p>
                <p>• 週期 T = ${(2 * Math.PI / omega).toFixed(2)} s</p>
                <p>• 當前位移 x = ${displacement.toFixed(3)} m</p>
            </div>
        `;
    }
    
    requestAnimationFrame(() => updateSpringOscillation(k, amplitude, m));
}

function startSpringExperiment() {
    const k = parseFloat(document.getElementById('springConstSlider')?.value || 10);
    const amplitude = parseFloat(document.getElementById('springAmpSlider')?.value || 0.5);
    const m = parseFloat(document.getElementById('springMassSlider')?.value || 1);
    
    updateSpringOscillation(k, amplitude, m);
}

// 歐姆定律實驗
function updateOhmsLaw(V, R) {
    const resultDiv = document.getElementById('ohmsResult');
    if (resultDiv) {
        const I = V / R;
        const P = V * I;
        
        resultDiv.innerHTML = `
            <div style="margin-top: 15px; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
                <h4 style="margin: 0 0 10px 0;">⚡ 歐姆定律實驗結果</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.8;">電壓 (V)</div>
                        <div style="font-size: 24px; font-weight: bold;">${V} V</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.8;">電阻 (R)</div>
                        <div style="font-size: 24px; font-weight: bold;">${R} Ω</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.8;">電流 (I)</div>
                        <div style="font-size: 24px; font-weight: bold;">${I.toFixed(2)} A</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 12px; opacity: 0.8;">功率 (P)</div>
                        <div style="font-size: 24px; font-weight: bold;">${P.toFixed(2)} W</div>
                    </div>
                </div>
                <p style="margin: 10px 0 0 0; font-size: 14px; text-align: center;">
                    📐 歐姆定律：I = V/R = ${V}/${R} = ${I.toFixed(2)} A
                </p>
            </div>
        `;
    }
}

function startOhmsLawExperiment() {
    const V = parseFloat(document.getElementById('voltageSlider')?.value || 12);
    const R = parseFloat(document.getElementById('resistanceSlider')?.value || 10);
    updateOhmsLaw(V, R);
}

// 折射率實驗
function updateRefraction(n1, n2, angle) {
    const canvas = document.getElementById('refractionCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    const centerX = W / 2;
    const centerY = H / 2;
    
    // 繪製介質1（上方）
    ctx.fillStyle = 'rgba(135, 206, 250, 0.3)';
    ctx.fillRect(0, 0, W, centerY);
    ctx.fillStyle = '#1e3a5f';
    ctx.font = '14px Arial';
    ctx.fillText(`介質1: n₁ = ${n1}`, 10, 20);
    
    // 繪製介質2（下方）
    ctx.fillStyle = 'rgba(255, 218, 185, 0.3)';
    ctx.fillRect(0, centerY, W, centerY);
    ctx.fillText(`介質2: n₂ = ${n2}`, 10, centerY + 20);
    
    // 繪製界面
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(W, centerY);
    ctx.stroke();
    
    // 計算角度
    const angleRad = angle * Math.PI / 180;
    const rayLength = 150;
    
    // 入射光線
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - rayLength * Math.sin(angleRad), centerY - rayLength * Math.cos(angleRad));
    ctx.stroke();
    
    // 法線
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - rayLength);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // 計算折射角
    const sinAngle2 = (n1 / n2) * Math.sin(angleRad);
    const angle2 = Math.asin(sinAngle2) * 180 / Math.PI;
    
    // 折射光線
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + rayLength * Math.sin(angle2 * Math.PI / 180), centerY + rayLength * Math.cos(angle2 * Math.PI / 180));
    ctx.stroke();
    
    // 標註角度
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(centerX - 40 * Math.sin(angleRad/2), centerY - 40 * Math.cos(angleRad/2), 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(`θ₁=${angle}°`, centerX - 60 * Math.sin(angleRad/2), centerY - 50 * Math.cos(angleRad/2));
    
    if (!isNaN(angle2)) {
        ctx.fillStyle = '#3498db';
        ctx.beginPath();
        ctx.arc(centerX + 40 * Math.sin(angle2 * Math.PI / 360), centerY + 40 * Math.cos(angle2 * Math.PI / 360), 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(`θ₂=${angle2.toFixed(1)}°`, centerX + 50 * Math.sin(angle2 * Math.PI / 180), centerY + 60 * Math.cos(angle2 * Math.PI / 180));
    }
    
    // 更新顯示
    const resultDiv = document.getElementById('refractionResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.9); border-radius: 8px;">
                <p>📊 <strong>折射分析</strong></p>
                <p>• 入射角 θ₁ = ${angle}°</p>
                <p>• 折射率比 n₁/n₂ = ${(n1/n2).toFixed(3)}</p>
                <p>• 折射角 θ₂ = ${isNaN(angle2) ? '全反射' : angle2.toFixed(2) + '°'}</p>
                <p>• ${isNaN(angle2) ? '⚠️ 發生全反射！' : '📐 斯涅爾定律：n₁sinθ₁ = n₂sinθ₂'}</p>
            </div>
        `;
    }
}

function startRefractionExperiment() {
    const n1 = parseFloat(document.getElementById('n1Slider')?.value || 1.0);
    const n2 = parseFloat(document.getElementById('n2Slider')?.value || 1.5);
    const angle = parseFloat(document.getElementById('incidentAngleSlider')?.value || 30);
    
    updateRefraction(n1, n2, angle);
}

// 凸透鏡成像實驗
function updateLens(f, u) {
    const canvas = document.getElementById('lensCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    const centerX = W / 2;
    const centerY = H / 2;
    
    // 繪製主光軸
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(W, centerY);
    ctx.stroke();
    
    // 繪製透鏡
    ctx.fillStyle = 'rgba(200, 200, 255, 0.5)';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 80);
    ctx.quadraticCurveTo(centerX + 15, centerY, centerX, centerY + 80);
    ctx.lineTo(centerX, centerY - 80);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 焦點
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(centerX + f, centerY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText(`F'`, centerX + f + 8, centerY + 5);
    
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.arc(centerX - f, centerY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(`F`, centerX - f - 15, centerY + 5);
    
    // 計算成像
    const v = 1 / (1/f - 1/u);
    const m = Math.abs(v / u);
    
    // 繪製物體
    const objectX = centerX - u;
    const objectHeight = 40;
    ctx.fillStyle = '#3498db';
    ctx.fillRect(objectX - 5, centerY - objectHeight, 10, objectHeight);
    
    // 繪製光線
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.6)';
    ctx.lineWidth = 1;
    
    // 光線1：平行光軸後經過焦點
    ctx.beginPath();
    ctx.moveTo(objectX, centerY - objectHeight);
    ctx.lineTo(centerX, centerY - objectHeight);
    if (v > 0) {
        ctx.lineTo(centerX + v, centerY);
    } else {
        ctx.lineTo(centerX + f, centerY);
    }
    ctx.stroke();
    
    // 光線2：經過光心
    ctx.beginPath();
    ctx.moveTo(objectX, centerY - objectHeight);
    ctx.lineTo(centerX + v, centerY - m * objectHeight);
    ctx.stroke();
    
    // 光線3：經過焦點後平行
    if (u > f) {
        ctx.beginPath();
        ctx.moveTo(objectX, centerY - objectHeight);
        ctx.lineTo(centerX - f, centerY);
        ctx.lineTo(centerX + v, centerY - objectHeight);
        ctx.stroke();
    }
    
    // 繪製像
    if (!isNaN(v) && isFinite(v) && Math.abs(v) < 500) {
        const imageX = centerX + v;
        const imageHeight = m * objectHeight;
        
        ctx.fillStyle = '#e74c3c';
        if (v > 0) {
            // 實像（倒立）
            ctx.fillRect(imageX - 5, centerY - imageHeight, 10, imageHeight);
        } else {
            // 虛像（正立）
            ctx.fillRect(imageX - 5, centerY, 10, imageHeight);
        }
    }
    
    // 更新顯示
    const resultDiv = document.getElementById('lensResult');
    if (resultDiv) {
        const imageType = v > 0 ? '實像（倒立）' : '虛像（正立）';
        const magnification = m > 1 ? '放大' : m < 1 ? '縮小' : '等大';
        resultDiv.innerHTML = `
            <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.9); border-radius: 8px;">
                <p>📊 <strong>成像分析</strong></p>
                <p>• 物距 u = ${u} cm</p>
                <p>• 焦距 f = ${f} cm</p>
                <p>• 像距 v = ${isNaN(v) || !isFinite(v) ? '無像' : v.toFixed(2) + ' cm'}</p>
                <p>• 放大率 m = ${isNaN(m) || !isFinite(m) ? '無窮大' : m.toFixed(2)}</p>
                <p>• 成像性質：${isNaN(v) || !isFinite(v) ? '不成像' : imageType + '、' + magnification}</p>
                <p>• 📐 透鏡公式：1/f = 1/u + 1/v</p>
            </div>
        `;
    }
    
    requestAnimationFrame(() => updateLens(f, u));
}

function startLensExperiment() {
    const f = parseFloat(document.getElementById('focalLengthSlider')?.value || 20);
    const u = parseFloat(document.getElementById('objectDistanceSlider')?.value || 40);
    
    updateLens(f, u);
}

// 初始化實驗
document.addEventListener('DOMContentLoaded', function() {
    // 延遲初始化實驗，確保 DOM 已完全載入
    setTimeout(() => {
        startInclinedPlaneExperiment();
        startProjectileExperiment();
        startSpringExperiment();
        startOhmsLawExperiment();
        startRefractionExperiment();
        startLensExperiment();
    }, 500);
});
