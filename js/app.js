const AFFILIATE_TAG = 'desksetup05-22';
const PULL_COUNT_KEY = 'amazon_gacha_pull_count';

// DOM Elements
const screenGacha = document.getElementById('screen-gacha');
const screenAnim = document.getElementById('screen-animation');
const screenResults = document.getElementById('screen-results');
const btnPull10 = document.getElementById('btn-pull-10');
const btnPullAgain = document.getElementById('btn-pull-again');
const btnShare = document.getElementById('btn-share');
const resultsGrid = document.getElementById('results-grid');
const pullCountEl = document.getElementById('pull-count');

// State
let pullCount = parseInt(localStorage.getItem(PULL_COUNT_KEY)) || 0;
let currentResults = [];

// Initialize
function init() {
    updatePullCountDisplay();

    btnPull10.addEventListener('click', doGachaPull);
    btnPullAgain.addEventListener('click', resetToGachaScreen);
    btnShare.addEventListener('click', shareToX);
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
    for (let i = 0; i < 10; i++) {
        currentResults.push(getRandomItem());
    }

    // 2. Increment stats
    pullCount += 10;
    localStorage.setItem(PULL_COUNT_KEY, pullCount);
    updatePullCountDisplay();

    // 3. Show Animation Screen
    screenGacha.classList.remove('active');
    screenAnim.classList.remove('hidden');
    screenAnim.classList.add('active');

    // Wait 2.5 seconds for animation, then show results
    setTimeout(() => {
        renderResults();
        screenAnim.classList.remove('active');
        screenAnim.classList.add('hidden');
        screenResults.classList.remove('hidden');
        screenResults.classList.add('active');
    }, 2500);
}

// Render Results
function renderResults() {
    resultsGrid.innerHTML = ''; // Clear previous

    currentResults.forEach((item, index) => {
        // Delay each card's animation slightly for a cascading effect
        const delay = index * 100;

        // Construct Affiliate URL
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
            <div class="item-name">${item.name}</div>
            <div class="item-rarity">${item.rarity}</div>
        `;

        // If SSR, make a dramatic sound or effect (optional if we had audio)
        // just relying on CSS for now

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

// Run
init();
