const AFFILIATE_TAG = 'desksetup05-22';
const PULL_COUNT_KEY = 'amazon_gacha_pull_count';

// DOM Elements
const screenGacha = document.getElementById('screen-gacha');
const screenAnim = document.getElementById('screen-animation');
const screenResults = document.getElementById('screen-results');
const btnPull10 = document.getElementById('btn-pull-10');
const btnPullAgain = document.getElementById('btn-pull-again');
const btnShare = document.getElementById('btn-share');
const btnSaveImage = document.getElementById('btn-save-image');
const resultsGrid = document.getElementById('results-grid');
const pullCountEl = document.getElementById('pull-count');
const resultsActions = document.querySelector('.results-actions');

// Modal Elements
const modalImage = document.getElementById('modal-image');
const btnCloseModal = document.getElementById('btn-close-modal');
const generatedImagePreview = document.getElementById('generated-image-preview');

// State
let pullCount = parseInt(localStorage.getItem(PULL_COUNT_KEY)) || 0;
let currentResults = [];

// Initialize
function init() {
    updatePullCountDisplay();

    btnPull10.addEventListener('click', doGachaPull);
    btnPullAgain.addEventListener('click', resetToGachaScreen);
    btnShare.addEventListener('click', shareToX);
    btnSaveImage.addEventListener('click', saveResultsAsImage);
    btnCloseModal.addEventListener('click', () => {
        modalImage.classList.add('hidden');
    });
}

function updatePullCountDisplay() {
    pullCountEl.innerText = `総ガチャ回数: ${pullCount}回`;
}

// Gacha Probability Logic
function getRandomItem() {
    const rand = Math.random() * 100; // 0 to 100

    let rarityStr = 'N';
    // Probabilities: SSR 1.5%, SR 8.5%, R 30%, N 60%
    if (rand < 1.5) rarityStr = 'SSR';
    else if (rand < 10) rarityStr = 'SR';
    else if (rand < 40) rarityStr = 'R';
    else rarityStr = 'N';

    // Filter items by rarity
    const pool = gachaItems.filter(item => item.rarity === rarityStr);

    // Pick random item from pool
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

// Run the 10-pull
function doGachaPull() {
    // 1. Calculate Results secretly
    currentResults = [];
    let maxRarityValue = 0; // N=0, R=1, SR=2, SSR=3
    const rarityMap = { 'N': 0, 'R': 1, 'SR': 2, 'SSR': 3 };

    for (let i = 0; i < 10; i++) {
        const item = getRandomItem();
        currentResults.push(item);
        if (rarityMap[item.rarity] > maxRarityValue) {
            maxRarityValue = rarityMap[item.rarity];
        }
    }

    // 2. Increment stats
    pullCount += 10;
    localStorage.setItem(PULL_COUNT_KEY, pullCount);
    updatePullCountDisplay();

    // 3. Show Animation Screen
    screenGacha.classList.remove('active');
    screenAnim.classList.remove('hidden');
    screenAnim.classList.add('active');

    // Promotion effects (昇格演出)
    const box = document.getElementById('gacha-box');
    box.className = 'box-sprite box-n'; // Reset to Normal

    if (maxRarityValue >= 1) { // R or higher
        setTimeout(() => box.className = 'box-sprite box-r', 800);
    }
    if (maxRarityValue >= 2) { // SR or higher
        setTimeout(() => box.className = 'box-sprite box-sr', 1600);
    }
    if (maxRarityValue >= 3) { // SSR
        setTimeout(() => box.className = 'box-sprite box-ssr', 2300);
    }

    // Wait 3.2 seconds for animation, then show results
    setTimeout(() => {
        renderResults();
        screenAnim.classList.remove('active');
        screenAnim.classList.add('hidden');
        screenResults.classList.remove('hidden');
        screenResults.classList.add('active');
    }, 3200);
}

// Security: HTML Escaping
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Render Results
function renderResults() {
    resultsGrid.innerHTML = ''; // Clear previous

    currentResults.forEach((item, index) => {
        // Delay each card's animation slightly for a cascading effect
        const delay = index * 100;

        // Construct Affiliate URL securely
        const safeName = escapeHTML(item.name);
        const safeRarity = escapeHTML(item.rarity);
        const query = encodeURIComponent(item.name);
        const url = `https://www.amazon.co.jp/s?k=${query}&tag=${AFFILIATE_TAG}`;

        // Create Card HTML
        const card = document.createElement('a');
        card.href = url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = `item-card rarity-${item.rarity.toLowerCase()}`;
        card.style.animationDelay = `${delay}ms`;
        card.style.animation = `fadeIn 0.5s ease-out ${delay}ms backwards`;

        card.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-name">${safeName}</div>
            <div class="item-rarity">${safeRarity}</div>
            <div class="buy-btn">Amazonで探す</div>
        `;

        resultsGrid.appendChild(card);
    });
}

// Reset UI
function resetToGachaScreen() {
    screenResults.classList.remove('active');
    screenResults.classList.add('hidden');
    screenGacha.classList.remove('hidden');
    screenGacha.classList.add('active');
}

// Social Sharing
function shareToX() {
    // Collect the best items to show off
    const ssrItems = currentResults.filter(r => r.rarity === 'SSR').map(r => r.name);
    const srItems = currentResults.filter(r => r.rarity === 'SR').map(r => r.name);

    let highlight = "";
    if (ssrItems.length > 0) {
        highlight = `【SSR】${ssrItems[0]} を引き当てました！！🎉`;
    } else if (srItems.length > 0) {
        highlight = `【SR】${srItems[0]} をゲット！✨`;
    } else {
        highlight = `レアリティR以下のしょっぱい結果でした...😭`;
    }

    const text = `無料で回せるAmazon10連ガチャシミュレーター\n\n私の結果：${highlight}\n\n総ガチャ回数: ${pullCount}回\n\nあなたも回してみる👇\n`;
    const url = window.location.href; // Assumes Vercel deployment URL will be used

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank');
}

// Generate Image
function saveResultsAsImage() {
    const originalText = btnSaveImage.innerText;
    btnSaveImage.innerText = '生成中...';
    btnSaveImage.disabled = true;

    const targetElement = document.getElementById('screen-results');

    // Hide actions visually during capture using a filter
    const filterFunc = (node) => {
        // Exclude the results-actions div
        if (node.classList && node.classList.contains('results-actions')) {
            return false;
        }
        return true;
    };

    // dom-to-image is much more reliable for mobile flex layouts
    // Use an extra scale factor for retina sharpness
    const scale = window.devicePixelRatio || 2;

    // Temporarily ensure the element isn't hidden by scroll
    window.scrollTo(0, 0);

    domtoimage.toPng(targetElement, {
        filter: filterFunc,
        bgcolor: '#0f172a',
        width: targetElement.offsetWidth * scale,
        height: targetElement.offsetHeight * scale,
        style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${targetElement.offsetWidth}px`,
            height: `${targetElement.offsetHeight}px`
        }
    })
        .then(function (dataUrl) {
            // Display the image in the modal
            generatedImagePreview.src = dataUrl;
            modalImage.classList.remove('hidden');

            // Reset button
            btnSaveImage.innerText = originalText;
            btnSaveImage.disabled = false;
        })
        .catch(function (error) {
            console.error('Error generating image!', error);
            alert('画像の生成に失敗しました。');
            btnSaveImage.innerText = originalText;
            btnSaveImage.disabled = false;
        });
}

// Run
init();
