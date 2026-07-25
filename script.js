const STATS = {
    money: 1000,
    day: 1,
    health: 100,
    energy: 100,
    food: 90,
    water: 90
};

const CONFIG = {
    canvasWidth: 1200,
    canvasHeight: 700,
    worldWidth: 4000,
    worldHeight: 3500,
    playerSize: 30,
    playerSpeed: 4,
    interactionDistance: 50,
    maxInteractionDistance: 120,
    dayDuration: 12 * 60 * 1000,
    minutesPerHour: 1,
    dayStartHour: 6,
    dayStartMinute: 30,
    dayEndHour: 22,
    dayEndMinute: 0
};

const SLEEP_CONFIG = {
    sleepOutdoor: {
        energyGain: 20,
        healthLossMin: 5,
        healthLossMax: 10,
        theftChance: 0.2
    },
    hotelRooms: [
        {
            id: 'ironBed',
            name: '低配铁架床房',
            price: 20,
            description: '普通的铁架床，只有一块硬床垫',
            energyGain: 30,
            healthLoss: 5
        },
        {
            id: 'simpleRoom',
            name: '简易单人房',
            price: 50,
            description: '简单的设施，但是没有好的隔音',
            energyGain: 30,
            healthLoss: 2
        },
        {
            id: 'normalRoom',
            name: '普通单人房',
            price: 110,
            description: '标准的单人房间，舒适整洁',
            energyGain: 50,
            healthLoss: 0
        },
        {
            id: 'luxuryRoom',
            name: '豪华单人房',
            price: 156,
            description: '豪华的单人套房，享受最佳服务',
            energyGain: 100,
            healthLoss: 0
        }
    ]
};

const player = {
    x: 2000,
    y: 1750,
    size: CONFIG.playerSize,
    speed: CONFIG.playerSpeed,
    color: '#FF6B6B',
    direction: 'down'
};

const buildings = [
    {
        id: 'construction',
        name: '🏗️ 工地',
        desc: '搬砖打工，赚钱多但累',
        x: 1800,
        y: 1570,
        width: 140,
        height: 120,
        color: '#8B4513',
        actions: [
            { name: '搬砖工作', effects: { money: 250, energy: -45, food: -20, health: -10 }, energyRequired: 45, foodRequired: 20 }
        ]
    },
    {
        id: 'restaurant',
        name: '🍔 快餐店',
        desc: '兼职服务员，轻松稳定',
        x: 2000,
        y: 1570,
        width: 140,
        height: 120,
        color: '#FFD700',
        actions: [
            { name: '兼职服务员', effects: { money: 150, energy: -20, food: -15 }, energyRequired: 20, foodRequired: 15 }
        ]
    },
    {
        id: 'delivery',
        name: '🛵 外卖站',
        desc: '外卖骑手，风里来雨里去',
        x: 2200,
        y: 1570,
        width: 140,
        height: 120,
        color: '#FF6347',
        actions: [
            { name: '送外卖', effects: { money: 200, energy: -30, food: -25, health: -5 }, energyRequired: 30, foodRequired: 25 }
        ]
    },
    {
        id: 'office',
        name: '💻 写字楼',
        desc: '白领工作，稳定收入',
        x: 2400,
        y: 1570,
        width: 140,
        height: 120,
        color: '#4169E1',
        actions: [
            { name: '办公室工作', effects: { money: 300, energy: -30, food: -20 }, energyRequired: 30, foodRequired: 20 }
        ]
    },
    {
        id: 'hotel',
        name: '🏨 旅店',
        desc: '休息恢复精神度',
        x: 1800,
        y: 1750,
        width: 140,
        height: 120,
        color: '#9370DB',
        actions: [
            { name: '睡觉休息', effects: { money: -20, energy: 100 }, moneyRequired: 20 }
        ]
    },
    {
        id: 'foodShop',
        name: '🍜 餐厅',
        desc: '吃顿好的，恢复饱食度和生命值',
        x: 2000,
        y: 1750,
        width: 140,
        height: 120,
        color: '#FF8C00',
        actions: [
            { name: '吃顿好的', effects: { money: -50, food: 40, health: 15 }, moneyRequired: 50 }
        ]
    },
    {
        id: 'internetCafe',
        name: '🖥️ 网吧',
        desc: '上网娱乐，恢复精神度但消耗金钱',
        x: 2400,
        y: 1750,
        width: 140,
        height: 120,
        color: '#00CED1',
        actions: [
            { name: '上网娱乐', effects: { money: -15, energy: 30, health: -5 }, moneyRequired: 15 }
        ]
    },
    {
        id: 'library',
        name: '📚 图书馆',
        desc: '休息放松，恢复精神度',
        x: 2200,
        y: 1750,
        width: 140,
        height: 120,
        color: '#2E8B57',
        actions: [
            { name: '休息阅读', effects: { money: -10, energy: 30, food: -10 }, moneyRequired: 10, foodRequired: 10 }
        ]
    },
    {
        id: 'arcade',
        name: '🎮 游乐场',
        desc: '娱乐放松，恢复精神度',
        x: 2400,
        y: 1750,
        width: 140,
        height: 120,
        color: '#FF69B4',
        actions: [
            { name: '娱乐放松', effects: { money: -40, energy: 30, food: -15 }, moneyRequired: 40, foodRequired: 15 }
        ]
    },
    {
        id: 'hospital',
        name: '🏥 医院',
        desc: '治疗恢复生命值',
        x: 1600,
        y: 1660,
        width: 140,
        height: 120,
        color: '#00CED1',
        actions: [
            { name: '看病治疗', effects: { money: -100, health: 30 }, moneyRequired: 100 }
        ]
    },
    {
        id: 'market',
        name: '🏪 工作市场',
        desc: '查看所有工作机会',
        x: 2600,
        y: 1750,
        width: 140,
        height: 120,
        color: '#DAA520',
        actions: [
            { name: '查看招聘', effects: {}, special: 'showJobs' }
        ]
    }
];

const RANDOM_EVENTS = [
    { text: '今天天气很好，精神焕发！', effects: { energy: 10 } },
    { text: '路上捡到了100块钱！', effects: { money: 100 } },
    { text: '不小心感冒了，生命值下降。', effects: { health: -15 } },
    { text: '吃了顿丰盛的早餐！', effects: { food: 15 } },
    { text: '手机坏了，修手机花了200块。', effects: { money: -200 } },
    { text: '买彩票中了小奖！', effects: { money: 500 } },
    { text: '熬夜打游戏，精神度没恢复好。', effects: { energy: -20 } },
    { text: '吃到了好吃的路边摊。', effects: { food: 10, money: -20 } },
    { text: '工作时受伤了，去医院花了钱。', effects: { health: -20, money: -300 } },
    { text: '老板发了奖金！', effects: { money: 300 } },
    { text: '太饿了，工作效率下降。', effects: { food: -15, energy: -5 } },
    { text: '吃了顿大餐，饱食度恢复了！', effects: { food: 20 } },
    { text: '精神压力太大了。', effects: { energy: -15 } }
];

let canvas, ctx, minimapCanvas, minimapCtx;
let keys = {};
let currentBuilding = null;
let gameRunning = true;

let currentHour = CONFIG.dayStartHour;
let currentMinute = CONFIG.dayStartMinute;
let dayStartTime = Date.now();
let timeInterval = null;
let isSleepTime = false;
let isSleeping = false;
let isInInterior = false;
let bookedRoom = null;
let deposit = 0;
let realTimeSeconds = 0;
let cameraX = 0;
let cameraY = 0;
let interiorPos = { x: 320, y: 320 };
let playerNearDoor = false;

function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    minimapCanvas = document.getElementById('minimap');
    minimapCtx = minimapCanvas.getContext('2d');
    
    document.addEventListener('keydown', (e) => {
        keys[e.key.toLowerCase()] = true;
        if (e.key.toLowerCase() === 'f') {
            if (isInInterior) {
                const fastfoodInterior = document.getElementById('fastfood-interior');
                const restaurantInterior = document.getElementById('restaurant-interior');
                
                if (fastfoodInterior && fastfoodInterior.classList.contains('show')) {
                    if (isNearDoor()) {
                        exitInterior();
                    } else if (isNearStaff()) {
                        talkToStaff();
                    }
                } else if (restaurantInterior && restaurantInterior.classList.contains('show')) {
                    if (isNearRestaurantExit()) {
                        exitInterior();
                    }
                }
            } else {
                interactWithBuilding();
            }
        }
        if (e.key.toLowerCase() === 'e') {
            if (isInInterior) {
                const fastfoodInterior = document.getElementById('fastfood-interior');
                const restaurantInterior = document.getElementById('restaurant-interior');
                
                if (fastfoodInterior && fastfoodInterior.classList.contains('show')) {
                    if (isNearFoodTray()) {
                        takeTray();
                    } else if (isHoldingTray) {
                        const nearTable = isNearTable();
                        if (nearTable) {
                            placeTray(nearTable);
                        }
                    } else if (isNearTableTray()) {
                        eatFood();
                    }
                } else if (restaurantInterior && restaurantInterior.classList.contains('show')) {
                    if (isNearRestaurantMenu()) {
                        openRestaurantMenu();
                    }
                }
            }
        }
        if (e.key === 'Escape') {
            closeRestaurantMenu();
        }
        if (e.key.toLowerCase() === 't') {
            skipToNight();
        }
        if (e.key === '1') {
            player.x = CONFIG.canvasWidth / 2;
            player.y = CONFIG.canvasHeight / 2;
            updateCamera();
            showNotification('🚀 传送到世界左上角边缘');
        }
        if (e.key === '2') {
            player.x = CONFIG.worldWidth - CONFIG.canvasWidth / 2;
            player.y = CONFIG.canvasHeight / 2;
            updateCamera();
            showNotification('🚀 传送到世界右上角边缘');
        }
        if (e.key === '3') {
            player.x = CONFIG.canvasWidth / 2;
            player.y = CONFIG.worldHeight - CONFIG.canvasHeight / 2;
            updateCamera();
            showNotification('🚀 传送到世界左下角边缘');
        }
        if (e.key === '4') {
            player.x = CONFIG.worldWidth - CONFIG.canvasWidth / 2;
            player.y = CONFIG.worldHeight - CONFIG.canvasHeight / 2;
            updateCamera();
            showNotification('🚀 传送到世界右下角边缘');
        }
    });
    
    document.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
    });
    
    startDayTimer();
    gameLoop();
    updateUI();
}

function startDayTimer() {
    clearInterval(timeInterval);
    dayStartTime = Date.now();
    currentHour = CONFIG.dayStartHour;
    currentMinute = CONFIG.dayStartMinute;
    isSleepTime = false;
    bookedRoom = null;
    deposit = 0;
    realTimeSeconds = 0;
    
    updateTimeDisplay();
    
    timeInterval = setInterval(() => {
        if (!gameRunning) return;
        
        currentMinute++;
        realTimeSeconds++;
        
        if (currentMinute >= 60) {
            currentMinute = 0;
            currentHour++;
        }
        
        if (realTimeSeconds % 5 === 0) {
            STATS.food = Math.max(0, STATS.food - 1);
            STATS.water = Math.max(0, STATS.water - 1);
            STATS.energy = Math.max(0, STATS.energy - 1);
        }
        
        if (STATS.food <= 0) {
            STATS.health = Math.max(0, STATS.health - 2);
        }
        if (STATS.water <= 0) {
            STATS.health = Math.max(0, STATS.health - 2);
        }
        if (STATS.energy <= 0) {
            STATS.health = Math.max(0, STATS.health - 3);
        }
        
        updateUI();
        checkGameOver();
        
        if (currentHour >= CONFIG.dayEndHour && currentMinute >= CONFIG.dayEndMinute && !isSleepTime) {
            isSleepTime = true;
            if (bookedRoom) {
                sleepInHotel(bookedRoom);
            } else {
                showSleepOptions();
            }
            return;
        }
        
        updateTimeDisplay();
    }, 1000);
}

function skipToNight() {
    if (isSleepTime) return;
    
    currentHour = CONFIG.dayEndHour;
    currentMinute = CONFIG.dayEndMinute;
    updateTimeDisplay();
    
    isSleepTime = true;
    if (bookedRoom) {
        sleepInHotel(bookedRoom);
    } else {
        showSleepOptions();
    }
    
    showNotification('⏰ 已跳过到晚上22:00！');
}

function updateTimeDisplay() {
    const hours = currentHour.toString().padStart(2, '0');
    const minutes = currentMinute.toString().padStart(2, '0');
    const displayTime = hours + ':' + minutes;
    document.getElementById('time').textContent = displayTime;
}

function gameLoop() {
    if (!gameRunning) return;
    
    update();
    render();
    renderMinimap();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (isSleeping) return;
    
    if (isInInterior) {
        const fastfoodInterior = document.getElementById('fastfood-interior');
        const restaurantInterior = document.getElementById('restaurant-interior');
        
        if (fastfoodInterior && fastfoodInterior.classList.contains('show')) {
            updateInteriorMovement();
            updateInteriorHUD();
        } else if (restaurantInterior && restaurantInterior.classList.contains('show')) {
            updateRestaurantMovement();
            updateRestaurantHUD();
        }
        return;
    }
    
    let dx = 0, dy = 0;
    
    let currentSpeed = player.speed;
    if (STATS.food <= 0 || STATS.water <= 0 || STATS.energy <= 0) {
        currentSpeed = player.speed / 4;
    } else if (STATS.food < 25 || STATS.water < 25 || STATS.energy < 30) {
        currentSpeed = player.speed / 2;
    }
    
    if (keys['w'] || keys['arrowup']) dy -= currentSpeed;
    if (keys['s'] || keys['arrowdown']) dy += currentSpeed;
    if (keys['a'] || keys['arrowleft']) dx -= currentSpeed;
    if (keys['d'] || keys['arrowright']) dx += currentSpeed;
    
    if (dy < 0) player.direction = 'up';
    else if (dy > 0) player.direction = 'down';
    else if (dx < 0) player.direction = 'left';
    else if (dx > 0) player.direction = 'right';
    
    const newX = player.x + dx;
    const newY = player.y + dy;
    
    if (!checkCollision(newX, player.y)) {
        player.x = newX;
    }
    if (!checkCollision(player.x, newY)) {
        player.y = newY;
    }
    
    player.x = Math.max(player.size / 2, Math.min(CONFIG.worldWidth - player.size / 2, player.x));
    player.y = Math.max(player.size / 2, Math.min(CONFIG.worldHeight - player.size / 2, player.y));
    
    updateCamera();
    
    checkNearbyBuilding();
}

function updateCamera() {
    cameraX = player.x - CONFIG.canvasWidth / 2;
    cameraY = player.y - CONFIG.canvasHeight / 2;
    
    cameraX = Math.max(0, Math.min(CONFIG.worldWidth - CONFIG.canvasWidth, cameraX));
    cameraY = Math.max(0, Math.min(CONFIG.worldHeight - CONFIG.canvasHeight, cameraY));
}

function checkCollision(x, y) {
    for (const building of buildings) {
        if (x + player.size / 2 > building.x && 
            x - player.size / 2 < building.x + building.width &&
            y + player.size / 2 > building.y && 
            y - player.size / 2 < building.y + building.height) {
            return true;
        }
    }
    return false;
}

function unstuckPlayer() {
    if (!checkCollision(player.x, player.y)) {
        showNotification('✅ 你没有被卡住！');
        return;
    }
    
    const searchRadius = 20;
    const searchStep = 10;
    
    for (let r = searchStep; r <= 200; r += searchStep) {
        for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
            const newX = player.x + Math.cos(angle) * r;
            const newY = player.y + Math.sin(angle) * r;
            
            const clampedX = Math.max(player.size / 2, Math.min(CONFIG.worldWidth - player.size / 2, newX));
            const clampedY = Math.max(player.size / 2, Math.min(CONFIG.worldHeight - player.size / 2, newY));
            
            if (!checkCollision(clampedX, clampedY)) {
                player.x = clampedX;
                player.y = clampedY;
                updateCamera();
                showNotification('🚀 已脱离卡死状态！');
                return;
            }
        }
    }
    
    player.x = CONFIG.worldWidth / 2;
    player.y = CONFIG.worldHeight / 2;
    updateCamera();
    showNotification('🚀 已传送到世界中心！');
}

function checkNearbyBuilding() {
    let touchingBottom = null;
    
    for (const building of buildings) {
        const buildingBottom = building.y + building.height;
        const playerTop = player.y - player.size / 2;
        
        if (Math.abs(playerTop - buildingBottom) < player.size &&
            player.x > building.x &&
            player.x < building.x + building.width) {
            touchingBottom = building;
            break;
        }
    }
    
    if (touchingBottom !== currentBuilding) {
        currentBuilding = touchingBottom;
        updateInteractionPanel();
    }
}

function getDistanceToBuilding(player, building) {
    const buildingCenterX = building.x + building.width / 2;
    const buildingCenterY = building.y + building.height / 2;
    
    const dx = player.x - buildingCenterX;
    const dy = player.y - buildingCenterY;
    
    return Math.sqrt(dx * dx + dy * dy);
}

function render() {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
    
    ctx.save();
    ctx.translate(-cameraX, -cameraY);
    
    ctx.fillStyle = '#2d5a27';
    ctx.fillRect(0, 0, CONFIG.worldWidth, CONFIG.worldHeight);
    
    drawRoads();
    
    for (const building of buildings) {
        drawBuilding(building);
    }
    
    drawPlayer();
    
    ctx.restore();
    
    if (currentBuilding) {
        drawInteractionHint(currentBuilding);
    }
}

function renderMinimap() {
    minimapCtx.fillStyle = '#2d5a27';
    minimapCtx.fillRect(0, 0, minimapCanvas.width, minimapCanvas.height);
    
    const scaleX = minimapCanvas.width / CONFIG.worldWidth;
    const scaleY = minimapCanvas.height / CONFIG.worldHeight;
    
    for (const building of buildings) {
        minimapCtx.fillStyle = building.color;
        minimapCtx.fillRect(
            building.x * scaleX,
            building.y * scaleY,
            building.width * scaleX,
            building.height * scaleY
        );
    }
    
    minimapCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    minimapCtx.lineWidth = 1;
    minimapCtx.strokeRect(
        cameraX * scaleX,
        cameraY * scaleY,
        CONFIG.canvasWidth * scaleX,
        CONFIG.canvasHeight * scaleY
    );
    
    minimapCtx.fillStyle = '#FF6B6B';
    minimapCtx.beginPath();
    minimapCtx.arc(
        player.x * scaleX,
        player.y * scaleY,
        player.size * scaleX / 2 + 1,
        0,
        Math.PI * 2
    );
    minimapCtx.fill();
    
    minimapCtx.strokeStyle = '#fff';
    minimapCtx.lineWidth = 1;
    minimapCtx.stroke();
    
    if (isInInterior) {
        minimapCtx.fillStyle = 'rgba(255, 215, 0, 0.6)';
        minimapCtx.beginPath();
        minimapCtx.arc(
            player.x * scaleX,
            player.y * scaleY,
            player.size * scaleX / 2 + 4,
            0,
            Math.PI * 2
        );
        minimapCtx.fill();
    }
}

function drawGrass() {
    ctx.fillStyle = '#3a7d32';
    for (let i = 0; i < 80; i++) {
        const x = Math.random() * CONFIG.canvasWidth;
        const y = Math.random() * CONFIG.canvasHeight;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawRoads() {
    const streetWidth = 40;
    const cornerRadius = 20;
    
    ctx.fillStyle = '#fff';
    
    for (const building of buildings) {
        const bx = building.x;
        const by = building.y;
        const bw = building.width;
        const bh = building.height;
        const sw = streetWidth;
        const cr = cornerRadius;
        
        ctx.beginPath();
        
        ctx.moveTo(bx - sw + cr, by - sw);
        ctx.lineTo(bx + bw + sw - cr, by - sw);
        ctx.quadraticCurveTo(bx + bw + sw, by - sw, bx + bw + sw, by - sw + cr);
        ctx.lineTo(bx + bw + sw, by + bh + sw - cr);
        ctx.quadraticCurveTo(bx + bw + sw, by + bh + sw, bx + bw + sw - cr, by + bh + sw);
        ctx.lineTo(bx - sw + cr, by + bh + sw);
        ctx.quadraticCurveTo(bx - sw, by + bh + sw, bx - sw, by + bh + sw - cr);
        ctx.lineTo(bx - sw, by - sw + cr);
        ctx.quadraticCurveTo(bx - sw, by - sw, bx - sw + cr, by - sw);
        
        ctx.closePath();
        ctx.fill();
    }
}

function drawBuilding(building) {
    const x = building.x;
    const y = building.y;
    const w = building.width;
    const h = building.height;
    
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    const gradient = ctx.createLinearGradient(x, y, x, y + h);
    gradient.addColorStop(0, building.color);
    gradient.addColorStop(1, adjustColor(building.color, -30));
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 5);
    ctx.fill();
    
    ctx.shadowColor = 'transparent';
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    const roofHeight = 30;
    const roofGradient = ctx.createLinearGradient(x - 5, y - roofHeight, x + w + 5, y);
    roofGradient.addColorStop(0, '#333');
    roofGradient.addColorStop(1, '#555');
    
    ctx.fillStyle = roofGradient;
    ctx.beginPath();
    ctx.moveTo(x - 5, y);
    ctx.lineTo(x + w / 2, y - roofHeight);
    ctx.lineTo(x + w + 5, y);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    const windowRows = 3;
    const windowCols = 4;
    const windowW = (w - 30) / windowCols;
    const windowH = (h - roofHeight - 20) / windowRows;
    
    for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
            const wx = x + 15 + col * windowW;
            const wy = y + roofHeight + 10 + row * windowH;
            
            ctx.fillStyle = '#FFE4B5';
            ctx.fillRect(wx + 2, wy + 2, windowW - 6, windowH - 6);
            
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 1;
            ctx.strokeRect(wx, wy, windowW - 4, windowH - 4);
            
            ctx.beginPath();
            ctx.moveTo(wx + (windowW - 4) / 2, wy);
            ctx.lineTo(wx + (windowW - 4) / 2, wy + windowH - 4);
            ctx.moveTo(wx, wy + (windowH - 4) / 2);
            ctx.lineTo(wx + windowW - 4, wy + (windowH - 4) / 2);
            ctx.stroke();
        }
    }
    
    ctx.fillStyle = '#333';
    ctx.fillRect(x + w / 2 - 20, y + h - 40, 40, 40);
    
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x + w / 2 - 15, y + h - 35, 30, 25);
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.fillText(building.name, x + w / 2, y + h / 2 + 6);
    
    if (currentBuilding && currentBuilding.id === building.id) {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 4;
        ctx.strokeRect(x - 3, y - 3, w + 6, h + 6);
    }
}

function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function drawPlayer() {
    ctx.font = player.size + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.fillText('🧑', player.x, player.y);
}

function drawInteractionHint(building) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(building.x, building.y - 35, building.width, 28);
    
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 14px Microsoft YaHei';
    ctx.textAlign = 'center';
    ctx.fillText('按 F 互动', building.x + building.width / 2, building.y - 15);
}

function updateInteractionPanel() {
    const panel = document.getElementById('interaction-panel');
    const nameEl = document.getElementById('building-name');
    const descEl = document.getElementById('building-desc');
    const actionsEl = document.getElementById('building-actions');
    
    if (!currentBuilding) {
        panel.classList.remove('show');
        return;
    }
    
    panel.classList.add('show');
    nameEl.textContent = currentBuilding.name;
    descEl.textContent = '按 F 键互动';
    
    actionsEl.innerHTML = '';
}

function getEffectsText(effects) {
    const parts = [];
    for (const [stat, value] of Object.entries(effects)) {
        if (value !== 0) {
            const icon = getStatIcon(stat);
            const sign = value > 0 ? '+' : '';
            parts.push(`${icon}${sign}${value}`);
        }
    }
    return parts.join(' ');
}

function getStatIcon(stat) {
    switch (stat) {
        case 'money': return '💰';
        case 'health': return '❤️';
        case 'energy': return '⚡';
        case 'food': return '🍖';
        default: return '';
    }
}

function performAction(action) {
    if (!currentBuilding) return;
    
    const distance = getDistanceToBuilding(player, currentBuilding);
    if (distance > CONFIG.interactionDistance) {
        showNotification('⚠️ 距离太远，无法互动！');
        return;
    }
    
    if (action.special === 'showJobs') {
        showAllJobs();
        return;
    }
    
    applyEffects(action.effects);
    
    const buildingName = currentBuilding.name;
    addLog(`在${buildingName}进行了${action.name}`);
    showNotification(`✅ ${action.name}完成！`);
    
    updateInteractionPanel();
}

function showAllJobs() {
    showNotification('💡 建议去各个建筑找工作！');
    addLog('在市场查看了招聘信息，建议去各建筑应聘！');
}

function interactWithBuilding() {
    if (!currentBuilding) return;
    
    if (currentBuilding.id === 'hotel') {
        showHotelOptions();
    } else if (currentBuilding.id === 'restaurant') {
        enterFastfoodInterior();
    } else if (currentBuilding.id === 'foodShop') {
        enterRestaurantInterior();
    } else {
        showNotification(`📍 你来到了 ${currentBuilding.name}！`);
        addLog(`来到了 ${currentBuilding.name}`);
    }
}

function enterFastfoodInterior() {
    document.getElementById('fastfood-interior').classList.add('show');
    isInInterior = true;
    interiorPos = { x: 320, y: 380 };
    const playerEl = document.querySelector('.player-in-store');
    if (playerEl) {
        playerEl.style.left = interiorPos.x + 'px';
        playerEl.style.top = interiorPos.y + 'px';
    }
    updateInteriorHUD();
    showNotification('🚪 进入了快餐店！');
    addLog('进入了🍔快餐店');
}

let restaurantPos = { x: 320, y: 380 };

function enterRestaurantInterior() {
    document.getElementById('restaurant-interior').classList.add('show');
    isInInterior = true;
    restaurantPos = { x: 200, y: 300 };
    const playerEl = document.querySelector('.player-in-restaurant');
    if (playerEl) {
        playerEl.style.left = restaurantPos.x + 'px';
        playerEl.style.top = restaurantPos.y + 'px';
    }
    updateRestaurantHUD();
    updateRestaurantHints();
    showNotification('🚪 进入了餐厅！');
    addLog('进入了🍜餐厅');
}

function updateRestaurantHUD() {
    document.getElementById('restaurant-day').textContent = STATS.day;
    document.getElementById('restaurant-time').textContent = formatTime(currentHour, currentMinute);
    document.getElementById('restaurant-money').textContent = STATS.money;
    document.getElementById('restaurant-health').textContent = STATS.health + '%';
    document.getElementById('restaurant-energy').textContent = STATS.energy + '%';
    document.getElementById('restaurant-food').textContent = STATS.food + '%';
    document.getElementById('restaurant-water').textContent = STATS.water + '%';
}

let restaurantNearDoor = false;

function updateRestaurantMovement() {
    if (isSleepTime) return;
    
    const speed = 3;
    const playerWidth = 40;
    const playerHeight = 60;
    const playerEl = document.querySelector('.player-in-restaurant');
    const interiorScene = document.querySelector('.restaurant-scene');
    
    if (!playerEl || !interiorScene) return;
    
    const sceneRect = interiorScene.getBoundingClientRect();
    
    let newX = restaurantPos.x;
    let newY = restaurantPos.y;
    
    if (keys['w'] || keys['arrowup']) newY -= speed;
    if (keys['s'] || keys['arrowdown']) newY += speed;
    if (keys['a'] || keys['arrowleft']) newX -= speed;
    if (keys['d'] || keys['arrowright']) newX += speed;
    
    newX = Math.max(-5, Math.min(sceneRect.width - 35, newX));
    newY = Math.max(90, Math.min(sceneRect.height - 50, newY));
    
    if (!checkRestaurantCollision(newX, restaurantPos.y, playerWidth, playerHeight)) {
        restaurantPos.x = newX;
    }
    if (!checkRestaurantCollision(restaurantPos.x, newY, playerWidth, playerHeight)) {
        restaurantPos.y = newY;
    }
    
    playerEl.style.left = restaurantPos.x + 'px';
    playerEl.style.top = restaurantPos.y + 'px';
    
    updateRestaurantHints();
}

function checkRestaurantCollision(x, y, width, height) {
    const counterBackEl = document.querySelector('.restaurant-counter-back');
    if (counterBackEl) {
        const counterRect = counterBackEl.getBoundingClientRect();
        const sceneRect = document.querySelector('.restaurant-scene').getBoundingClientRect();
        
        const counterX = counterRect.left - sceneRect.left;
        const counterY = counterRect.top - sceneRect.top;
        const counterW = counterRect.width;
        const counterH = counterRect.height;
        
        if (x < counterX + counterW &&
            x + width > counterX &&
            y < counterY + counterH &&
            y + height > counterY) {
            return true;
        }
    }
    return false;
}

function updateRestaurantHints() {
    const exitHint = document.getElementById('restaurant-exit-hint');
    const menuHint = document.getElementById('restaurant-menu-hint');
    const playerEl = document.querySelector('.player-in-restaurant');
    const interiorScene = document.querySelector('.restaurant-scene');
    if (!playerEl || !interiorScene) return;
    
    const playerRect = playerEl.getBoundingClientRect();
    const sceneRect = interiorScene.getBoundingClientRect();
    
    const exitLineEl = document.querySelector('.restaurant-exit-line');
    if (exitLineEl) {
        const exitLineRect = exitLineEl.getBoundingClientRect();
        const exitDistance = Math.abs(playerRect.top + playerRect.height / 2 - exitLineRect.top);
        restaurantNearDoor = exitDistance < 80;
        if (exitHint) exitHint.classList.toggle('show', restaurantNearDoor);
    }
    
    const menuSignEl = document.querySelector('.restaurant-menu-sign');
    if (menuSignEl) {
        const menuSignRect = menuSignEl.getBoundingClientRect();
        const menuDistance = Math.hypot(
            playerRect.left + playerRect.width / 2 - (menuSignRect.left + menuSignRect.width / 2),
            playerRect.top + playerRect.height / 2 - (menuSignRect.top + menuSignRect.height / 2)
        );
        const nearMenu = menuDistance < 100;
        
        if (menuHint) {
            if (nearMenu) {
                menuHint.style.display = 'block';
                menuHint.style.left = (menuSignRect.left - sceneRect.left + menuSignRect.width / 2 - 50) + 'px';
                menuHint.style.top = (menuSignRect.top - sceneRect.top - 40) + 'px';
            } else {
                menuHint.style.display = 'none';
            }
        }
    }
}

function isNearRestaurantExit() {
    return restaurantNearDoor;
}

function isNearRestaurantMenu() {
    const playerEl = document.querySelector('.player-in-restaurant');
    const menuSignEl = document.querySelector('.restaurant-menu-sign');
    if (!playerEl || !menuSignEl) return false;
    
    const playerRect = playerEl.getBoundingClientRect();
    const menuSignRect = menuSignEl.getBoundingClientRect();
    const menuDistance = Math.hypot(
        playerRect.left + playerRect.width / 2 - (menuSignRect.left + menuSignRect.width / 2),
        playerRect.top + playerRect.height / 2 - (menuSignRect.top + menuSignRect.height / 2)
    );
    return menuDistance < 100;
}

function openRestaurantMenu() {
    document.getElementById('restaurant-menu-modal').classList.add('show');
}

function closeRestaurantMenu() {
    document.getElementById('restaurant-menu-modal').classList.remove('show');
}

function formatTime(hour, minute) {
    return hour.toString().padStart(2, '0') + ':' + minute.toString().padStart(2, '0');
}

function updateInteriorHUD() {
    document.getElementById('interior-day').textContent = STATS.day;
    document.getElementById('interior-time').textContent = formatTime(currentHour, currentMinute);
    document.getElementById('interior-money').textContent = STATS.money;
    document.getElementById('interior-health').textContent = STATS.health + '%';
    document.getElementById('interior-energy').textContent = STATS.energy + '%';
    document.getElementById('interior-food').textContent = STATS.food + '%';
    document.getElementById('interior-water').textContent = STATS.water + '%';
}

function talkToStaff() {
    openOrderModal();
}

const menuItems = {
    burger: { price: 40, effects: { food: 60, water: -10, health: -2 }, name: '汉堡', emoji: '🍔' },
    chicken: { price: 25, effects: { food: 40, health: -3 }, name: '炸鸡', emoji: '🍗' },
    fries: { price: 15, effects: { food: 40, health: -4, water: -15 }, name: '薯条', emoji: '🍟' },
    drink: { price: 20, effects: { water: 60, health: -2 }, name: '饮料', emoji: '🥤' }
};

let currentOrder = [];
let preparedOrder = [];
let currentTrayTable = null;
let isHoldingTray = false;
let heldFoodEmojis = '';

function openOrderModal() {
    currentOrder = [];
    document.querySelectorAll('.order-item-checkbox').forEach(box => {
        box.classList.remove('checked');
    });
    updateOrderTotal();
    document.getElementById('order-modal').style.display = 'flex';
}

function cancelOrder() {
    document.getElementById('order-modal').style.display = 'none';
    currentOrder = [];
}

function confirmOrder() {
    if (currentOrder.length === 0) {
        showNotification('⚠️ 请先选择餐品！');
        return;
    }
    
    let totalPrice = 0;
    let orderNames = [];
    
    currentOrder.forEach(itemKey => {
        const item = menuItems[itemKey];
        if (item) {
            totalPrice += item.price;
            orderNames.push(item.name);
        }
    });
    
    if (STATS.money < totalPrice) {
        showNotification('⚠️ 钱不够！');
        return;
    }
    
    applyEffects({ money: -totalPrice });
    showNotification(`💰 支付了${totalPrice}元，正在制作...`);
    addLog(`在快餐店点餐：${orderNames.join('、')}`);
    
    document.getElementById('order-modal').style.display = 'none';
    
    const orderNumber = Date.now().toString().slice(-3);
    const pendingDisplay = document.getElementById('display-pending');
    const currentPending = pendingDisplay.textContent.trim();
    if (currentPending === '--') {
        pendingDisplay.textContent = orderNumber;
    } else {
        pendingDisplay.textContent = currentPending + ' ' + orderNumber;
    }
    
    playOrderSound();
    
    setTimeout(() => {
        const readyDisplay = document.getElementById('display-ready');
        const currentReady = readyDisplay.textContent.trim();
        if (currentReady === '--') {
            readyDisplay.textContent = orderNumber;
        } else {
            readyDisplay.textContent = currentReady + ' ' + orderNumber;
        }
        
        const pendingNumbers = pendingDisplay.textContent.split(' ').filter(n => n !== orderNumber);
        pendingDisplay.textContent = pendingNumbers.length > 0 ? pendingNumbers.join(' ') : '--';
        
        preparedOrder = [...currentOrder];
        showFoodTray();
        currentOrder = [];
    }, 2000);
}

function playOrderSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2OnpmLoqqWmp6FhoaJho6GFhoqHhYWFhoqGhYWFhIqFhYWFhoqFhYWFhoqGhYWFhIqFhYWFhoqFhYWFhoqGhYWFhIqFhYWFhoqFhYWFhoqGhYWFhIqFhYWFhoqFhYWFhoqGhYWFhIqFhYWFhoqFhYWFhoqGhYWFhIqFhYWFhoqFhYWF');
    audio.volume = 0.3;
    audio.play().catch(() => {});
}

function showFoodTray() {
    const tray = document.getElementById('food-tray');
    const trayFood = document.getElementById('tray-food');
    
    trayFood.innerHTML = '';
    
    const offsets = [
        { x: -10, y: -8, scale: 1 },
        { x: 10, y: -5, scale: 0.9 },
        { x: -5, y: 8, scale: 0.85 },
        { x: 8, y: 5, scale: 0.8 }
    ];
    
    preparedOrder.forEach((itemKey, index) => {
        const item = menuItems[itemKey];
        if (item) {
            const offset = offsets[index % offsets.length];
            const foodEl = document.createElement('div');
            foodEl.className = 'tray-food-item';
            foodEl.textContent = item.emoji;
            foodEl.style.left = '50%';
            foodEl.style.top = '50%';
            foodEl.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${offset.scale})`;
            foodEl.style.zIndex = 10 + index;
            trayFood.appendChild(foodEl);
        }
    });
    
    tray.style.display = 'flex';
    showNotification('🔔 您的餐品已备好！');
}

function takeTray() {
    const tray = document.getElementById('food-tray');
    const trayFood = document.getElementById('tray-food');
    if (tray.style.display !== 'flex') return;
    
    isHoldingTray = true;
    
    const heldTray = document.getElementById('held-tray');
    renderHeldTray(heldTray);
    heldTray.style.display = 'flex';
    
    updateHeldTrayPosition();
    
    tray.style.display = 'none';
    trayFood.innerHTML = '';
    showNotification('🍽️ 已取走餐盘，找个座位坐下吧');
}

function renderHeldTray(container) {
    container.innerHTML = '';
    
    const offsets = [
        { x: -6, y: -5, scale: 1 },
        { x: 6, y: -3, scale: 0.85 },
        { x: -3, y: 5, scale: 0.75 },
        { x: 5, y: 3, scale: 0.7 }
    ];
    
    preparedOrder.forEach((itemKey, index) => {
        const item = menuItems[itemKey];
        if (item) {
            const offset = offsets[index % offsets.length];
            const foodEl = document.createElement('div');
            foodEl.className = 'tray-food-item';
            foodEl.textContent = item.emoji;
            foodEl.style.left = '50%';
            foodEl.style.top = '50%';
            foodEl.style.transform = `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${offset.scale})`;
            foodEl.style.zIndex = 10 + index;
            container.appendChild(foodEl);
        }
    });
}

function placeTray(targetTable) {
    if (!isHoldingTray) return;
    
    const tableLeft = document.getElementById('table-tray-left');
    const tableRight = document.getElementById('table-tray-right');
    
    let targetTableEl;
    if (targetTable === 'left') {
        targetTableEl = tableLeft;
        currentTrayTable = 'left';
    } else if (targetTable === 'right') {
        targetTableEl = tableRight;
        currentTrayTable = 'right';
    } else {
        return;
    }
    
    renderHeldTray(targetTableEl);
    targetTableEl.style.display = 'flex';
    
    isHoldingTray = false;
    heldFoodEmojis = '';
    
    const heldTray = document.getElementById('held-tray');
    heldTray.style.display = 'none';
    heldTray.innerHTML = '';
    
    showNotification('🍽️ 将餐盘放到桌上');
}

function eatFood() {
    const tableId = currentTrayTable === 'left' ? 'table-tray-left' : 'table-tray-right';
    const tableTray = document.getElementById(tableId);
    const interiorScene = document.querySelector('.interior-scene');
    if (!tableTray || !interiorScene || tableTray.style.display !== 'flex') return;
    
    const tableRect = tableTray.getBoundingClientRect();
    const sceneRect = interiorScene.getBoundingClientRect();
    const tablePosition = { 
        left: tableRect.left - sceneRect.left + tableRect.width / 2, 
        top: tableRect.top - sceneRect.top + tableRect.height / 2 
    };
    
    tableTray.style.display = 'none';
    tableTray.textContent = '';
    
    showNotification('🍴 开始用餐...');
    
    animateEating(0, tablePosition);
}

function animateEating(index, tablePosition) {
    if (index >= preparedOrder.length) {
        showNotification('✅ 用餐完毕！');
        preparedOrder = [];
        currentTrayTable = null;
        return;
    }
    
    const playerEl = document.querySelector('.player-in-store');
    const interiorScene = document.querySelector('.interior-scene');
    if (!playerEl || !interiorScene) return;
    
    const playerRect = playerEl.getBoundingClientRect();
    const sceneRect = interiorScene.getBoundingClientRect();
    
    const playerX = playerRect.left - sceneRect.left + playerRect.width / 2;
    const playerY = playerRect.top - sceneRect.top + playerRect.height / 3;
    
    const itemKey = preparedOrder[index];
    const item = menuItems[itemKey];
    const emoji = item ? item.emoji : '🍽️';
    
    const animationEl = document.createElement('div');
    animationEl.className = 'eating-animation food-item';
    animationEl.textContent = emoji;
    animationEl.style.left = tablePosition.left + 'px';
    animationEl.style.top = tablePosition.top + 'px';
    animationEl.style.transform = 'translate(-50%, -50%) scale(1)';
    
    interiorScene.appendChild(animationEl);
    
    setTimeout(() => {
        animationEl.style.left = playerX + 'px';
        animationEl.style.top = playerY + 'px';
        animationEl.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }, 50);
    
    setTimeout(() => {
        animationEl.remove();
        
        if (item) {
            applyEffects(item.effects);
        }
        
        animateEating(index + 1, tablePosition);
    }, 1000);
}

function updateHeldTrayPosition() {
    if (!isHoldingTray) return;
    
    const playerEl = document.querySelector('.player-in-store');
    const heldTray = document.getElementById('held-tray');
    const interiorScene = document.querySelector('.interior-scene');
    if (!playerEl || !heldTray || !interiorScene) return;
    
    const playerRect = playerEl.getBoundingClientRect();
    const sceneRect = interiorScene.getBoundingClientRect();
    
    const relativeLeft = playerRect.right - sceneRect.left - 10;
    const relativeTop = playerRect.top - sceneRect.top + playerRect.height / 2 - 15;
    
    heldTray.style.left = relativeLeft + 'px';
    heldTray.style.top = relativeTop + 'px';
}

function updateOrderTotal() {
    let totalPrice = 0;
    currentOrder.forEach(itemKey => {
        const item = menuItems[itemKey];
        if (item) {
            totalPrice += item.price;
        }
    });
    document.getElementById('order-total-price').textContent = '¥' + totalPrice;
}

document.querySelectorAll('.order-item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('click', function() {
        const itemKey = this.getAttribute('data-item');
        const index = currentOrder.indexOf(itemKey);
        if (index > -1) {
            currentOrder.splice(index, 1);
            this.classList.remove('checked');
        } else {
            currentOrder.push(itemKey);
            this.classList.add('checked');
        }
        updateOrderTotal();
    });
});

function exitInterior() {
    const fastfoodInterior = document.getElementById('fastfood-interior');
    const restaurantInterior = document.getElementById('restaurant-interior');
    
    if (fastfoodInterior && fastfoodInterior.classList.contains('show')) {
        fastfoodInterior.classList.remove('show');
        showNotification('🚶 离开了快餐店');
        addLog('离开了🍔快餐店');
    } else if (restaurantInterior && restaurantInterior.classList.contains('show')) {
        restaurantInterior.classList.remove('show');
        showNotification('🚶 离开了餐厅');
        addLog('离开了🍜餐厅');
    }
    
    isInInterior = false;
}

function isNearDoor() {
    return playerNearDoor;
}

function isNearStaff() {
    const playerEl = document.querySelector('.player-in-store');
    const staffEl = document.querySelector('.staff');
    if (!playerEl || !staffEl) return false;
    
    const playerRect = playerEl.getBoundingClientRect();
    const staffRect = staffEl.getBoundingClientRect();
    
    const distance = Math.hypot(
        playerRect.left + playerRect.width / 2 - (staffRect.left + staffRect.width / 2),
        playerRect.top + playerRect.height / 2 - (staffRect.top + staffRect.height / 2)
    );
    
    return distance < 80;
}

function isNearFoodTray() {
    const playerEl = document.querySelector('.player-in-store');
    const tray = document.getElementById('food-tray');
    if (!playerEl || !tray || tray.style.display !== 'flex') return false;
    
    const playerRect = playerEl.getBoundingClientRect();
    const trayRect = tray.getBoundingClientRect();
    
    const distance = Math.hypot(
        playerRect.left + playerRect.width / 2 - (trayRect.left + trayRect.width / 2),
        playerRect.top + playerRect.height / 2 - (trayRect.top + trayRect.height / 2)
    );
    
    return distance < 80;
}

function isNearTable() {
    const playerEl = document.querySelector('.player-in-store');
    const tableLeft = document.querySelector('.table-left');
    const tableRight = document.querySelector('.table-right');
    if (!playerEl) return null;
    
    const playerRect = playerEl.getBoundingClientRect();
    
    let nearLeft = false;
    let nearRight = false;
    
    if (tableLeft) {
        const tableRect = tableLeft.getBoundingClientRect();
        const distance = Math.hypot(
            playerRect.left + playerRect.width / 2 - (tableRect.left + tableRect.width / 2),
            playerRect.top + playerRect.height / 2 - (tableRect.top + tableRect.height / 2)
        );
        if (distance < 90) {
            nearLeft = true;
        }
    }
    
    if (tableRight) {
        const tableRect = tableRight.getBoundingClientRect();
        const distance = Math.hypot(
            playerRect.left + playerRect.width / 2 - (tableRect.left + tableRect.width / 2),
            playerRect.top + playerRect.height / 2 - (tableRect.top + tableRect.height / 2)
        );
        if (distance < 90) {
            nearRight = true;
        }
    }
    
    if (nearLeft && nearRight) {
        const playerCenterX = playerRect.left + playerRect.width / 2;
        const leftTableRect = tableLeft.getBoundingClientRect();
        const rightTableRect = tableRight.getBoundingClientRect();
        const leftCenterX = leftTableRect.left + leftTableRect.width / 2;
        const rightCenterX = rightTableRect.left + rightTableRect.width / 2;
        
        if (playerCenterX < (leftCenterX + rightCenterX) / 2) {
            return 'left';
        } else {
            return 'right';
        }
    } else if (nearLeft) {
        return 'left';
    } else if (nearRight) {
        return 'right';
    }
    
    return null;
}

function isNearTableTray() {
    const playerEl = document.querySelector('.player-in-store');
    const tableLeft = document.getElementById('table-tray-left');
    const tableRight = document.getElementById('table-tray-right');
    if (!playerEl) return false;
    
    const playerRect = playerEl.getBoundingClientRect();
    
    if (tableLeft && tableLeft.style.display === 'flex') {
        const tableRect = tableLeft.getBoundingClientRect();
        const distance = Math.hypot(
            playerRect.left + playerRect.width / 2 - (tableRect.left + tableRect.width / 2),
            playerRect.top + playerRect.height / 2 - (tableRect.top + tableRect.height / 2)
        );
        if (distance < 80) {
            currentTrayTable = 'left';
            return true;
        }
    }
    
    if (tableRight && tableRight.style.display === 'flex') {
        const tableRect = tableRight.getBoundingClientRect();
        const distance = Math.hypot(
            playerRect.left + playerRect.width / 2 - (tableRect.left + tableRect.width / 2),
            playerRect.top + playerRect.height / 2 - (tableRect.top + tableRect.height / 2)
        );
        if (distance < 80) {
            currentTrayTable = 'right';
            return true;
        }
    }
    
    return false;
}

const interiorColliders = [
    { x: 92, y: 60, width: 430, height: 90 }
];

function checkInteriorCollision(newX, newY, playerWidth, playerHeight) {
    const playerRight = newX + playerWidth;
    const playerBottom = newY + playerHeight;
    
    for (const collider of interiorColliders) {
        const colliderRight = collider.x + collider.width;
        const colliderBottom = collider.y + collider.height;
        
        if (newX < colliderRight && playerRight > collider.x &&
            newY < colliderBottom && playerBottom > collider.y) {
            return true;
        }
    }
    return false;
}

function updateInteriorMovement() {
    if (isSleepTime) return;
    
    let speed = player.speed;
    if (STATS.food <= 0 || STATS.water <= 0 || STATS.energy <= 0) {
        speed = player.speed / 4;
    } else if (STATS.food < 25 || STATS.water < 25 || STATS.energy < 30) {
        speed = player.speed / 2;
    }
    const playerWidth = 40;
    const playerHeight = 60;
    const playerEl = document.querySelector('.player-in-store');
    
    if (!playerEl) return;
    
    let newX = interiorPos.x;
    let newY = interiorPos.y;
    
    if (keys['w'] || keys['arrowup']) newY -= speed;
    if (keys['s'] || keys['arrowdown']) newY += speed;
    if (keys['a'] || keys['arrowleft']) newX -= speed;
    if (keys['d'] || keys['arrowright']) newX += speed;
    
    newX = Math.max(-10, Math.min(585, newX));
    newY = Math.max(60, Math.min(420, newY));
    
    if (!checkInteriorCollision(newX, interiorPos.y, playerWidth, playerHeight)) {
        interiorPos.x = newX;
    }
    if (!checkInteriorCollision(interiorPos.x, newY, playerWidth, playerHeight)) {
        interiorPos.y = newY;
    }
    
    playerEl.style.left = interiorPos.x + 'px';
    playerEl.style.top = interiorPos.y + 'px';
    
    updateDoorHint();
}

function updateDoorHint() {
    const exitHint = document.getElementById('exit-hint');
    const interactionHint = document.querySelector('.interaction-hint');
    const trayHint = document.getElementById('tray-hint');
    const placeHint = document.getElementById('place-hint');
    const eatHint = document.getElementById('eat-hint');
    const playerEl = document.querySelector('.player-in-store');
    const interiorScene = document.querySelector('.interior-scene');
    if (!playerEl || !interiorScene) return;
    
    const playerRect = playerEl.getBoundingClientRect();
    const sceneRect = interiorScene.getBoundingClientRect();
    
    const exitLineEl = document.querySelector('.exit-line');
    if (exitLineEl) {
        const exitLineRect = exitLineEl.getBoundingClientRect();
        const exitDistance = Math.abs(playerRect.top + playerRect.height / 2 - exitLineRect.top);
        playerNearDoor = exitDistance < 60;
        if (exitHint) exitHint.classList.toggle('show', playerNearDoor);
    }
    
    const staffEl = document.querySelector('.staff');
    if (staffEl) {
        const staffRect = staffEl.getBoundingClientRect();
        const staffDistance = Math.hypot(
            playerRect.left + playerRect.width / 2 - (staffRect.left + staffRect.width / 2),
            playerRect.top + playerRect.height / 2 - (staffRect.top + staffRect.height / 2)
        );
        const nearStaff = staffDistance < 80;
        if (interactionHint) {
            interactionHint.style.display = nearStaff ? 'block' : 'none';
            interactionHint.style.left = (staffRect.left - sceneRect.left + staffRect.width / 2 - 50) + 'px';
            interactionHint.style.top = (staffRect.top - sceneRect.top - 40) + 'px';
        }
    }
    
    const tray = document.getElementById('food-tray');
    if (tray && tray.style.display === 'flex') {
        const trayRect = tray.getBoundingClientRect();
        trayHint.style.left = (trayRect.left - sceneRect.left + trayRect.width / 2 - 50) + 'px';
        trayHint.style.top = (trayRect.top - sceneRect.top - 35) + 'px';
        trayHint.style.display = isNearFoodTray() ? 'block' : 'none';
    } else {
        trayHint.style.display = 'none';
    }
    
    const nearTable = isNearTable();
    if (placeHint) {
        if (isHoldingTray && nearTable) {
            const tableLeft = document.querySelector('.table-left');
            const tableRight = document.querySelector('.table-right');
            let targetRect;
            
            if (nearTable === 'left' && tableLeft) {
                targetRect = tableLeft.getBoundingClientRect();
            } else if (nearTable === 'right' && tableRight) {
                targetRect = tableRight.getBoundingClientRect();
            }
            
            if (targetRect) {
                placeHint.style.left = (targetRect.left - sceneRect.left + targetRect.width / 2 - 45) + 'px';
                placeHint.style.top = (targetRect.top - sceneRect.top - 35) + 'px';
                placeHint.style.display = 'block';
            }
        } else {
            placeHint.style.display = 'none';
        }
    }
    
    const tableLeftTray = document.getElementById('table-tray-left');
    const tableRightTray = document.getElementById('table-tray-right');
    if (eatHint) {
        if (tableLeftTray && tableLeftTray.style.display === 'flex') {
            const tableRect = tableLeftTray.getBoundingClientRect();
            eatHint.style.left = (tableRect.left - sceneRect.left + tableRect.width / 2 - 35) + 'px';
            eatHint.style.top = (tableRect.top - sceneRect.top - 35) + 'px';
            eatHint.style.display = isNearTableTray() ? 'block' : 'none';
        } else if (tableRightTray && tableRightTray.style.display === 'flex') {
            const tableRect = tableRightTray.getBoundingClientRect();
            eatHint.style.left = (tableRect.left - sceneRect.left + tableRect.width / 2 - 35) + 'px';
            eatHint.style.top = (tableRect.top - sceneRect.top - 35) + 'px';
            eatHint.style.display = isNearTableTray() ? 'block' : 'none';
        } else {
            eatHint.style.display = 'none';
        }
    }
    
    updateHeldTrayPosition();
}



function doPartTime() {
    if (STATS.energy < 20) {
        showNotification('⚠️ 精神不足！需要至少20精神');
        return;
    }
    if (STATS.food < 15) {
        showNotification('⚠️ 饱食度不足！需要至少15饱食');
        return;
    }
    
    applyEffects({ money: 150, energy: -20, food: -15 });
    showNotification('✅ 完成兼职工作！收入150元');
    addLog('在快餐店完成了兼职工作');
}

function applyEffects(effects) {
    for (const [stat, value] of Object.entries(effects)) {
        if (stat in STATS) {
            if (stat === 'money') {
                STATS[stat] = Math.max(0, STATS[stat] + value);
            } else {
                STATS[stat] = Math.max(0, Math.min(100, STATS[stat] + value));
            }
        }
    }
    updateUI();
    checkGameOver();
}

function updateUI() {
    document.querySelector('#money-box .money-value').textContent = STATS.money;
    document.getElementById('day').textContent = STATS.day;
    
    updateCircleProgress('health-circle', STATS.health);
    updateCircleProgress('energy-circle', STATS.energy);
    updateCircleProgress('food-circle', STATS.food);
    updateCircleProgress('water-circle', STATS.water);
    
    document.querySelector('#health-circle .circle-value').textContent = STATS.health + '%';
    document.querySelector('#energy-circle .circle-value').textContent = STATS.energy + '%';
    document.querySelector('#food-circle .circle-value').textContent = STATS.food + '%';
    document.querySelector('#water-circle .circle-value').textContent = STATS.water + '%';
}

function updateCircleProgress(elementId, percent) {
    const circle = document.getElementById(elementId);
    const color = window.getComputedStyle(circle).getPropertyValue('--circle-color').trim();
    const angle = (percent / 100) * 360;
    circle.style.background = `conic-gradient(${color} ${angle}deg, transparent ${angle}deg)`;
}

function addLog(text) {
    const logContent = document.getElementById('log-content');
    if (!logContent) return;
    const p = document.createElement('p');
    p.textContent = `[第${STATS.day}天 ${currentHour}:00] ${text}`;
    logContent.appendChild(p);
    logContent.scrollTop = logContent.scrollHeight;
}

function showNotification(text) {
    const notification = document.getElementById('notification');
    notification.textContent = text;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2500);
}

function showSleepOptions() {
    clearInterval(timeInterval);
    timeInterval = null;
    
    const fastfoodInterior = document.getElementById('fastfood-interior');
    const restaurantInterior = document.getElementById('restaurant-interior');
    
    if (fastfoodInterior && fastfoodInterior.classList.contains('show')) {
        fastfoodInterior.classList.remove('show');
    }
    if (restaurantInterior && restaurantInterior.classList.contains('show')) {
        restaurantInterior.classList.remove('show');
    }
    
    isInInterior = false;
    
    document.getElementById('sleep-modal').style.display = 'flex';
}

function sleepOutdoor() {
    const config = SLEEP_CONFIG.sleepOutdoor;
    
    const healthLoss = Math.floor(Math.random() * (config.healthLossMax - config.healthLossMin + 1)) + config.healthLossMin;
    
    STATS.energy = Math.min(100, STATS.energy + config.energyGain);
    STATS.health = Math.max(0, STATS.health - healthLoss);
    
    let message = `🌿 露宿街边一晚，恢复了${config.energyGain}精神，健康减少了${healthLoss}。`;
    
    if (Math.random() < config.theftChance) {
        const stolenMoney = Math.floor(Math.random() * 50) + 10;
        STATS.money -= stolenMoney;
        message += `\n⚠️ 不幸被偷了${stolenMoney}块钱！`;
    }
    
    document.getElementById('sleep-modal').style.display = 'none';
    showNotification(message);
    sleepAnimation();
}

function showHotelOptions() {
    const modal = document.getElementById('hotel-modal');
    
    if (bookedRoom) {
        modal.innerHTML = `
            <div class="modal-content" style="position: relative;">
                <button class="exit-btn" onclick="closeHotelModal()" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #999;">&times;</button>
                <h2>🏨 修改预订</h2>
                <p>你已经预订了 ${bookedRoom.name}（押金${deposit}元）</p>
                <p>确定要修改房间吗？押金将全额退还。</p>
                <div class="sleep-options" style="margin-top: 20px;">
                    <button class="sleep-btn outdoor-btn" onclick="confirmModifyRoom()">✅ 是，修改房间</button>
                    <button class="sleep-btn" onclick="closeHotelModal()">❌ 否，保持原预订</button>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    } else {
        document.getElementById('sleep-modal').style.display = 'none';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🏨 旅馆</h2>
                <p>选择一个房间：</p>
                <div class="hotel-options">
                    <div class="hotel-room" data-id="ironBed">
                        <h3>🛏️ 低配铁架床房</h3>
                        <p class="room-desc">普通的铁架床，只有一块硬床垫</p>
                        <p class="room-price">💰 20元</p>
                        <p class="room-effects">⚡ +30精神 ❤️ -5健康</p>
                        <button class="room-btn" onclick="bookRoom('ironBed')">预订</button>
                    </div>
                    <div class="hotel-room" data-id="simpleRoom">
                        <h3>🏠 简易单人房</h3>
                        <p class="room-desc">简单的设施，但是没有好的隔音</p>
                        <p class="room-price">💰 50元</p>
                        <p class="room-effects">⚡ +30精神 ❤️ -2健康</p>
                        <button class="room-btn" onclick="bookRoom('simpleRoom')">预订</button>
                    </div>
                    <div class="hotel-room" data-id="normalRoom">
                        <h3>🏢 普通单人房</h3>
                        <p class="room-desc">标准的单人房间，舒适整洁</p>
                        <p class="room-price">💰 110元</p>
                        <p class="room-effects">⚡ +50精神</p>
                        <button class="room-btn" onclick="bookRoom('normalRoom')">预订</button>
                    </div>
                    <div class="hotel-room" data-id="luxuryRoom">
                        <h3>⭐ 豪华单人房</h3>
                        <p class="room-desc">豪华的单人套房，享受最佳服务</p>
                        <p class="room-price">💰 156元</p>
                        <p class="room-effects">⚡ 加满精神</p>
                        <button class="room-btn" onclick="bookRoom('luxuryRoom')">预订</button>
                    </div>
                </div>
                <button class="cancel-btn" onclick="closeHotelModal()">❌ 返回</button>
            </div>
        `;
        modal.style.display = 'flex';
        
        SLEEP_CONFIG.hotelRooms.forEach(room => {
            const btn = modal.querySelector(`.hotel-room[data-id="${room.id}"] .room-btn`);
            if (btn) {
                btn.disabled = STATS.money < room.price;
                btn.textContent = STATS.money < room.price ? '💰 余额不足' : '预订';
            }
        });
    }
}

function confirmModifyRoom() {
    STATS.money += deposit;
    deposit = 0;
    bookedRoom = null;
    isSleepTime = false;
    updateUI();
    
    const modal = document.getElementById('hotel-modal');
    modal.innerHTML = `
        <div class="modal-content" style="position: relative;">
            <div style="position: absolute; top: 15px; right: 15px; font-size: 16px; color: #4CAF50; font-weight: bold;">✅ 退订成功</div>
            <h2>🏨 修改预订</h2>
            <p>押金已全额退还！</p>
            <div class="sleep-options" style="margin-top: 20px;">
                <button class="sleep-btn outdoor-btn" disabled style="opacity: 0.6;">✅ 已退订</button>
                <button class="sleep-btn" disabled style="opacity: 0.6;">❌ 不可操作</button>
            </div>
            <button class="cancel-btn" onclick="closeHotelModal()" style="margin-top: 20px;">❌ 退出</button>
        </div>
    `;
    
    showNotification('💰 押金已退还！');
    
    if (!timeInterval) {
        timeInterval = setInterval(() => {
            if (!gameRunning) return;
            
            currentMinute++;
            
            if (currentMinute >= 60) {
                currentMinute = 0;
                currentHour++;
            }
            
            if (currentHour >= CONFIG.dayEndHour && currentMinute >= CONFIG.dayEndMinute && !isSleepTime) {
                isSleepTime = true;
                if (bookedRoom) {
                    sleepInHotel(bookedRoom);
                } else {
                    showSleepOptions();
                }
                return;
            }
            
            updateTimeDisplay();
        }, 1000);
    }
}

function closeHotelModal() {
    document.getElementById('hotel-modal').style.display = 'none';
    if (isSleepTime && !bookedRoom) {
        document.getElementById('sleep-modal').style.display = 'flex';
    } else {
        document.getElementById('sleep-modal').style.display = 'none';
    }
}

function bookRoom(roomId) {
    const room = SLEEP_CONFIG.hotelRooms.find(r => r.id === roomId);
    
    if (!room || STATS.money < room.price) {
        showNotification('💰 余额不足！');
        return;
    }
    
    STATS.money -= room.price;
    deposit = room.price;
    bookedRoom = room;
    
    document.getElementById('hotel-modal').style.display = 'none';
    showNotification(`🏨 你预订了${room.name}！押金${room.price}元，等到22:00会自动入住。`);
    updateUI();
}

function sleepInHotel(room) {
    const fastfoodInterior = document.getElementById('fastfood-interior');
    const restaurantInterior = document.getElementById('restaurant-interior');
    
    if (fastfoodInterior && fastfoodInterior.classList.contains('show')) {
        fastfoodInterior.classList.remove('show');
    }
    if (restaurantInterior && restaurantInterior.classList.contains('show')) {
        restaurantInterior.classList.remove('show');
    }
    
    isInInterior = false;
    
    STATS.energy = Math.min(100, STATS.energy + room.energyGain);
    STATS.health = Math.max(0, STATS.health - room.healthLoss);
    
    showNotification(`🏨 你住进了${room.name}！精神${room.energyGain === 100 ? '已满' : '+' + room.energyGain}${room.healthLoss > 0 ? '，健康-' + room.healthLoss : ''}。`);
    sleepAnimation();
}

function sleepAnimation() {
    isSleeping = true;
    const fadeEl = document.getElementById('sleep-fade');
    
    fadeEl.classList.remove('fade-in');
    fadeEl.classList.add('fade-out');
    
    setTimeout(() => {
        fadeEl.classList.remove('fade-out');
        fadeEl.classList.add('fade-in');
        
        setTimeout(() => {
            isSleeping = false;
            endDay();
        }, 800);
    }, 1200);
}

function endDay() {
    STATS.day++;
    STATS.food = Math.max(0, STATS.food - 35);
    STATS.water = Math.max(0, STATS.water - 35);
    
    addLog(`--- 第${STATS.day}天开始 ---`);
    updateUI();
    checkGameOver();
    
    if (gameRunning) {
        currentHour = CONFIG.dayStartHour;
        currentMinute = CONFIG.dayStartMinute;
        updateTimeDisplay();
        startDayTimer();
        showNotification(`🌅 新的一天开始了！第 ${STATS.day} 天`);
    }
}

function triggerRandomEvent() {
    if (Math.random() < 0.3) {
        const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
        addLog(`📢 ${event.text}`);
        applyEffects(event.effects);
        showNotification(`🎲 ${event.text}`);
    }
}

function checkGameOver() {
    if (STATS.health <= 0) {
        endGame('生命值归零！你已经死了。');
    } else if (STATS.money <= -500) {
        endGame('负债累累！你破产了。');
    }
}

function endGame(reason) {
    gameRunning = false;
    clearInterval(timeInterval);
    
    document.getElementById('final-day').textContent = STATS.day;
    document.getElementById('final-money').textContent = '¥' + STATS.money;
    document.getElementById('game-over-reason').textContent = reason;
    document.getElementById('game-over-modal').style.display = 'flex';
}

function restartGame() {
    STATS.money = 1000;
    STATS.day = 1;
    STATS.health = 100;
    STATS.energy = 100;
    STATS.food = 90;
    STATS.water = 90;
    
    player.x = 2000;
    player.y = 1750;
    
    currentHour = CONFIG.dayStartHour;
    currentMinute = CONFIG.dayStartMinute;
    
    gameRunning = true;
    
    document.getElementById('game-over-modal').style.display = 'none';
    const logContent = document.getElementById('log-content');
    if (logContent) {
        logContent.innerHTML = '<p>欢迎来到生活模拟器！用WASD移动，走近建筑物按F键互动！</p>';
    }
    
    updateTimeDisplay();
    updateUI();
    
    if (timeInterval) {
        clearInterval(timeInterval);
    }
    startDayTimer();
    
    gameLoop();
}

console.log('🎮 游戏已加载！');
console.log('📊 属性说明：');
console.log('  - 生命值: 健康状态，归零则死亡');
console.log('  - 精神度: 精力状态，归零则精神崩溃');
console.log('  - 饱食度: 饥饿状态，归零则饿死');
console.log('💡 注意: 所有属性都需要保持>0，否则游戏结束！');

initGame();