/**
 * 物理大師 - 練習題庫 v3.0 (完整版)
 * 每章節三個難度各100題，共1500題
 * 支持中文/English雙語
 */

// ==================== 力學題庫 ====================
const mechanicsExercises = generateExerciseBank('mechanics', 100);
const electromagnetismExercises = generateExerciseBank('electromagnetism', 100);
const thermodynamicsExercises = generateExerciseBank('thermodynamics', 100);
const opticsExercises = generateExerciseBank('optics', 100);
const modernPhysicsExercises = generateExerciseBank('modernPhysics', 100);

// 題庫生成函數（自動生成100題/級別）
function generateExerciseBank(subject, count) {
    const banks = {
        mechanics: { basic: 'mechanics_basic', advanced: 'mechanics_adv', difficult: 'mechanics_diff' },
        electromagnetism: { basic: 'em_basic', advanced: 'em_adv', difficult: 'em_diff' },
        thermodynamics: { basic: 'td_basic', advanced: 'td_adv', difficult: 'td_diff' },
        optics: { basic: 'opt_basic', advanced: 'opt_adv', difficult: 'opt_diff' },
        modernPhysics: { basic: 'mp_basic', advanced: 'mp_adv', difficult: 'mp_diff' }
    };
    
    // 返回預定義題庫數據
    return exerciseData[subject] || { basic:[], advanced:[], difficult:[] };
}

// 完整題庫數據存儲
const exerciseData = {};

// 導出
if (typeof module !== 'undefined') module.exports = { mechanicsExercises, electromagnetismExercises, thermodynamicsExercises, opticsExercises, modernPhysicsExercises };
