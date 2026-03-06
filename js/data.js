// Amazon 10-Pull Gacha Item Database
// These are search keywords that will be passed to Amazon.co.jp

const gachaItems = [
    // ==========================================
    // SSR (Super Special Rare) - 1.5% probability
    // ==========================================
    { name: "純金 インゴット 1kg", rarity: "SSR", icon: "💎" },
    { name: "全自動麻雀卓", rarity: "SSR", icon: "🀄" },
    { name: "MacBook Pro M3 Max", rarity: "SSR", icon: "💻" },
    { name: "ハーマンミラー アーロンチェア", rarity: "SSR", icon: "💺" },
    { name: "業務用 ソフトクリームメーカー", rarity: "SSR", icon: "🍦" },
    { name: "防音室 組み立て式", rarity: "SSR", icon: "🔇" },
    { name: "サウナテント", rarity: "SSR", icon: "⛺" },
    { name: "甲冑 等身大", rarity: "SSR", icon: "🛡️" },
    { name: "ドラム式洗濯乾燥機", rarity: "SSR", icon: "🧺" },
    { name: "ゲーミングPC RTX4090", rarity: "SSR", icon: "🖥️" },

    // ==========================================
    // SR (Super Rare) - 8.5% probability
    // ==========================================
    { name: "松阪牛 A5 サーロインブロック", rarity: "SR", icon: "🥩" },
    { name: "Apple AirPods Pro", rarity: "SR", icon: "🎧" },
    { name: "ドンペリ 白", rarity: "SR", icon: "🍾" },
    { name: "ルンバ j7+", rarity: "SR", icon: "🤖" },
    { name: "Nintendo Switch (有機ELモデル)", rarity: "SR", icon: "🎮" },
    { name: "人をダメにするソファ 特大", rarity: "SR", icon: "🛋️" },
    { name: "巨大 カビゴン ぬいぐるみ", rarity: "SR", icon: "🧸" },
    { name: "Oculus Quest 3", rarity: "SR", icon: "🥽" },
    { name: "ダイソン ヘアドライヤー", rarity: "SR", icon: "💇" },
    { name: "生ハム 原木", rarity: "SR", icon: "🍖" },
    { name: "電動キックボード", rarity: "SR", icon: "🛴" },
    { name: "流しそうめんスライダー 特大", rarity: "SR", icon: "🎋" },
    { name: "キャビア 100g", rarity: "SR", icon: "🐟" },
    { name: "PlayStation 5", rarity: "SR", icon: "🎮" },
    { name: "ポータブル電源 1000W", rarity: "SR", icon: "🔋" },

    // ==========================================
    // R (Rare) - 30% probability
    // ==========================================
    { name: "レッドブル 250ml 24本", rarity: "R", icon: "🔋" },
    { name: "プロテイン 5kg", rarity: "R", icon: "🏋️" },
    { name: "Anker モバイルバッテリー", rarity: "R", icon: "📱" },
    { name: "アイリスオーヤマ パックご飯 24個", rarity: "R", icon: "🍚" },
    { name: "めぐりズム ホットアイマスク 大容量", rarity: "R", icon: "😌" },
    { name: "Fire TV Stick 4K", rarity: "R", icon: "📺" },
    { name: "カップヌードル 1箱", rarity: "R", icon: "🍜" },
    { name: "業務用 マヨネーズ 1kg", rarity: "R", icon: "🥚" },
    { name: "高級 レトルトカレー 詰め合わせ", rarity: "R", icon: "🍛" },
    { name: "入浴剤 爆汗湯 セット", rarity: "R", icon: "🛁" },
    { name: "腹筋ローラー", rarity: "R", icon: "💪" },
    { name: "ヨガマット 極厚", rarity: "R", icon: "🧘" },
    { name: "ブラックサンダー 1箱", rarity: "R", icon: "🍫" },
    { name: "カロリーメイト フルーツ味 箱買い", rarity: "R", icon: "🧱" },
    { name: "ツナ缶 大容量パック", rarity: "R", icon: "🐟" },
    { name: "Amazonギフトカード 3000円", rarity: "R", icon: "💳" },
    { name: "Echo Dot", rarity: "R", icon: "🔊" },
    { name: "ハッピーターン 缶", rarity: "R", icon: "🍘" },
    { name: "バブ 72錠", rarity: "R", icon: "🛀" },
    { name: "休足時間 18枚入", rarity: "R", icon: "🦶" },

    // ==========================================
    // N (Normal) - 60% probability
    // ==========================================
    { name: "うまい棒 めんたい味 30本", rarity: "N", icon: "🥖" },
    { name: "単三電池 40本セット", rarity: "N", icon: "🔋" },
    { name: "ティッシュペーパー 5箱", rarity: "N", icon: "🤧" },
    { name: "木魚", rarity: "N", icon: "🔔" },
    { name: "消しゴム まとまるくん", rarity: "N", icon: "✏️" },
    { name: "トイレットペーパー 3倍巻き", rarity: "N", icon: "🧻" },
    { name: "綿棒 200本", rarity: "N", icon: "👂" },
    { name: "クリップ 100個", rarity: "N", icon: "📎" },
    { name: "軍手 1ダース", rarity: "N", icon: "🧤" },
    { name: "ガムテープ 布", rarity: "N", icon: "📦" },
    { name: "つまようじ 1000本", rarity: "N", icon: "🥢" },
    { name: "輪ゴム 箱入り", rarity: "N", icon: "🎗️" },
    { name: "付箋 キューブ", rarity: "N", icon: "📝" },
    { name: "ちくわ", rarity: "N", icon: "🍢" },
    { name: "もやし", rarity: "N", icon: "🌱" },
    { name: "A4 コピー用紙 500枚", rarity: "N", icon: "📄" },
    { name: "ボールペン 黒", rarity: "N", icon: "🖊️" },
    { name: "ストロー 500本", rarity: "N", icon: "🥤" },
    { name: "段ボール箱 100サイズ", rarity: "N", icon: "📦" },
    { name: "ゴミ袋 45L", rarity: "N", icon: "🗑️" }
];
