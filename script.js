document.addEventListener('DOMContentLoaded', () => {
    const minefield = document.getElementById('minefield');
    const gridSize = 8;
    const mineCount = 10;
    let minePositions = [];

    function initializeGame() {
        minefield.innerHTML = '';
        minePositions = [];
        generateMinefield();
        placeMines();
    }

    function generateMinefield() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.id = i;
            cell.classList.add('cell');
            cell.addEventListener('click', handleCellClick);
            minefield.appendChild(cell);
        }
    }

    function placeMines() {
        let minesPlaced = 0;
        while (minesPlaced < mineCount) {
            const randomPosition = Math.floor(Math.random() * gridSize * gridSize);
            if (!minePositions.includes(randomPosition)) {
                minePositions.push(randomPosition);
                minesPlaced++;
            }
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const cellId = parseInt(cell.id);
    
        if (minePositions.includes(cellId)) {
            cell.innerHTML = '💣'; // 地雷を表す絵文字を表示
            cell.style.backgroundColor = 'red'; // 地雷セルの背景色を変更（オプション）
            setTimeout(() => { 
                alert('Game Over!'); // ゲームオーバーの警告（絵文字が表示されてからアラートを表示）
                initializeGame();   // ゲームをリセット
            }, 100); 
        } else {
            cell.textContent = getAdjacentMineCount(cellId);
            cell.style.pointerEvents = 'none'; // 既にクリックされたセルは再度クリック不可にする
        }
    }

    function getAdjacentMineCount(cellId) {
        let count = 0;
        const x = cellId % gridSize;
        const y = Math.floor(cellId / gridSize);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                    const neighborId = ny * gridSize + nx;
                    if (minePositions.includes(neighborId)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    initializeGame();
});
