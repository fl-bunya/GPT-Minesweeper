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
            cell.addEventListener('contextmenu', toggleFlag); // 右クリックイベントリスナーを追加
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
            cell.innerHTML = '💣';
            cell.style.backgroundColor = 'red';
            setTimeout(() => {
                alert('Game Over!');
                initializeGame();
            }, 100);
        } else {
            openCell(cell);
        }
    }

    function openCell(cell) {
        const cellId = parseInt(cell.id);
        const adjacentMineCount = getAdjacentMineCount(cellId);
    
        cell.textContent = adjacentMineCount === 0 ? '' : adjacentMineCount;
        cell.classList.add('opened'); // ここで 'opened' クラスを追加
        cell.style.pointerEvents = 'none';
    
        if (adjacentMineCount === 0) {
            openAdjacentCells(cellId);
        }

        checkGameClear();
    }

    function openAdjacentCells(cellId) {
        const x = cellId % gridSize;
        const y = Math.floor(cellId / gridSize);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                    const neighborId = ny * gridSize + nx;
                    const neighborCell = document.getElementById(neighborId.toString());
                    if (!neighborCell.classList.contains('opened')) {
                        openCell(neighborCell);
                    }
                }
            }
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

    function toggleFlag(event) {
        event.preventDefault(); // 右クリックメニューのデフォルトの動作を防止
        const cell = event.target;
    
        if (cell.classList.contains('opened')) {
            return; // 既に開かれたセルには何もしない
        }
    
        if (cell.textContent === '🚩') {
            cell.textContent = ''; // 旗を解除
        } else {
            cell.textContent = '🚩'; // 旗を設定
        }
    }

    function checkGameClear() {
        let openedCells = 0;
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.getElementById(i.toString());
            if (cell.classList.contains('opened')) {
                openedCells++;
            }
        }
    
        if (openedCells === (gridSize * gridSize - mineCount)) {
            alert('おめでとう！ゲームクリアです！');
            initializeGame(); // ゲームをリセット
        }
    }
    
    initializeGame();
});
