const linkTree = {
    "games": {
        "valo": {
            "guides": [
                {"name": "最強キャラ", "url": "https://example.com/valo1"},
                {"name": "最強武器", "url": "https://example.com/valo2"},
                {"name": "初心者おすすめキャラ", "url": "https://example.com/valo3"}
            ],
            "forums": [
                {"name": "valoの掲示板", "url": "https://example.com/valo-forum"}
            ]
        },
        "apex": {
            "guides": [
                {"name": "APEX攻略1", "url": "https://example.com/apex1"},
                {"name": "APEX攻略2", "url": "https://example.com/apex2"}
            ],
            "forums": [
                {"name": "APEX掲示板", "url": "https://example.com/apex-forum"}
            ]
        }
    }
};

function createLinks(container, data) {
    const ul = document.createElement('ul');

    Object.keys(data).forEach(key => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = key;
        span.style.cursor = 'pointer';
        span.onclick = function() {
            // サブカテゴリーがあれば表示、リンクなら開く
            if (Array.isArray(data[key])) {
                // 最後のリンク階層の場合
                showFinalLinks(data[key]);
            } else {
                // 次の階層に進む
                ul.innerHTML = ''; // クリアして次の階層を表示
                createLinks(li, data[key]);
            }
        };
        li.appendChild(span);
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function showFinalLinks(links) {
    const container = document.getElementById('link-container');
    container.innerHTML = ''; // 既存のコンテンツをクリア

    const ul = document.createElement('ul');
    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.url;
        a.textContent = link.name;
        a.target = "_blank"; // 新しいタブで開く
        li.appendChild(a);
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

// 初期表示
window.onload = function() {
    const container = document.getElementById('link-container');
    createLinks(container, linkTree.games); // 初期階層を表示
};
