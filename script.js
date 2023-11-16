document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game');
    const gridSize = 10;
    const mineCount = 20;
    let cells = [];

    // ゲームの初期化
    function init() {
        // セルの作成
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.classList.add('cell');
            grid.appendChild(cell);
            cells.push(cell);

            // クリックイベント
            cell.addEventListener('click', function(e) {
                clickCell(cell);
            });
        }

        // 地雷の配置
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            const randomCell = Math.floor(Math.random() * cells.length);
            const cell = cells[randomCell];
            if (!cell.classList.contains('mine')) {
                cell.classList.add('mine');
                minesPlaced++;
            }
        }
    }

    // セルのクリック処理
    function clickCell(cell) {
        if (cell.classList.contains('mine')) {
            alert('Game Over');
            // ゲームオーバーの処理
            revealMines();
        } else {
            // 安全なセルの処理
            cell.style.backgroundColor = '#ddd';
        }
    }

    // 全ての地雷を表示
    function revealMines() {
        cells.forEach(cell => {
            if (cell.classList.contains('mine')) {
                cell.innerHTML = '💣';
                cell.style.backgroundColor = '#f88';
            }
        });
    }

    init();
});
