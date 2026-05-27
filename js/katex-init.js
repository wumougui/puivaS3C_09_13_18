/**
 * KaTeX 公式渲染初始化腳本
 * 統一管理公式渲染配置
 */

// KaTeX 全局配置
window.katexConfig = {
    delimiters: [
        { left: '$$', right: '$$', display: true },   // 塊級公式
        { left: '$', right: '$', display: false },     // 行內公式
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false,
    errorColor: '#cc0000',
    strict: false
};

// 頁面加載後自動渲染公式
function initKaTeX() {
    if (typeof renderMathInElement === 'undefined') {
        console.warn('KaTeX 未載入');
        return;
    }

    // 初始渲染
    renderMathInElement(document.body, window.katexConfig);

    // 監聽動態內容變化（用於 AJAX 加載的內容）
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1) {  // 元素節點
                        renderMathInElement(node, window.katexConfig);
                    }
                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    console.log('✓ KaTeX 公式渲染已啟用');
}

// 提供手動重新渲染函數（供其他腳本調用）
function rerenderMath(element) {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(element || document.body, window.katexConfig);
    }
}

// DOM 準備就緒後初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKaTeX);
} else {
    initKaTeX();
}
