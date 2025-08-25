/**
 * 線上分數兌換表管理系統
 * GitHub Pages 部署版本
 * 功能：分數區間管理、物品管理、列印功能、數據匯入匯出
 */

class ScoreExchangeManager {
    constructor() {
        this.scoreRanges = [];
        this.items = [];
        this.currentEditingRange = null;
        this.currentEditingItem = null;
        this.deleteTarget = null;
        
        // 初始化
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadData();
        this.render();
        this.showToast('系統已載入完成！', 'success');
    }

    // 事件監聽器設置
    setupEventListeners() {
        // 系統設定
        document.getElementById('systemTitle').addEventListener('change', (e) => {
            this.saveData();
        });
        
        document.getElementById('organizationName').addEventListener('change', (e) => {
            this.saveData();
        });

        // 主要功能按鈕
        document.getElementById('addRangeBtn').addEventListener('click', () => {
            this.openRangeModal();
        });

        document.getElementById('addItemBtn').addEventListener('click', () => {
            this.openItemModal();
        });

        document.getElementById('printBtn').addEventListener('click', () => {
            this.printTable();
        });

        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importDataBtn').addEventListener('click', () => {
            document.getElementById('importFileInput').click();
        });

        document.getElementById('importFileInput').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });

        // 分數區間模態框
        document.getElementById('rangeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveRange();
        });

        document.getElementById('rangeModalClose').addEventListener('click', () => {
            this.closeRangeModal();
        });

        document.getElementById('rangeCancel').addEventListener('click', () => {
            this.closeRangeModal();
        });

        // 物品模態框
        document.getElementById('itemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveItem();
        });

        document.getElementById('itemModalClose').addEventListener('click', () => {
            this.closeItemModal();
        });

        document.getElementById('itemCancel').addEventListener('click', () => {
            this.closeItemModal();
        });

        // 圖片上傳
        document.getElementById('imageUpload').addEventListener('click', () => {
            document.getElementById('itemImage').click();
        });

        document.getElementById('itemImage').addEventListener('change', (e) => {
            this.handleImageUpload(e.target.files[0]);
        });

        document.getElementById('removeImage').addEventListener('click', () => {
            this.removeImage();
        });

        // 拖拽上傳
        const imageUpload = document.getElementById('imageUpload');
        imageUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUpload.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
        });

        imageUpload.addEventListener('dragleave', (e) => {
            e.preventDefault();
            imageUpload.style.backgroundColor = '';
        });

        imageUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUpload.style.backgroundColor = '';
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageUpload(file);
            }
        });

        // 刪除確認模態框
        document.getElementById('deleteCancel').addEventListener('click', () => {
            this.closeDeleteModal();
        });

        document.getElementById('deleteConfirm').addEventListener('click', () => {
            this.confirmDelete();
        });

        // 點擊模態框外部關閉
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeAllModals();
            }
        });

        // 鍵盤快捷鍵
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    // 數據載入
    loadData() {
        const savedData = localStorage.getItem('scoreExchangeData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.scoreRanges = data.scoreRanges || [];
                this.items = data.items || [];
                
                // 載入系統設定
                if (data.systemTitle) {
                    document.getElementById('systemTitle').value = data.systemTitle;
                }
                if (data.organizationName) {
                    document.getElementById('organizationName').value = data.organizationName;
                }
            } catch (error) {
                console.error('載入數據失敗:', error);
                this.initDefaultData();
            }
        } else {
            this.initDefaultData();
        }
    }

    // 初始化預設資料
    initDefaultData() {
        this.scoreRanges = [
            {
                id: this.generateId(),
                name: '5~10分',
                min: 5,
                max: 10,
                color: 'green'
            },
            {
                id: this.generateId(),
                name: '20~50分',
                min: 20,
                max: 50,
                color: 'blue'
            },
            {
                id: this.generateId(),
                name: '60~90分',
                min: 60,
                max: 90,
                color: 'orange'
            },
            {
                id: this.generateId(),
                name: '100~200分',
                min: 100,
                max: 200,
                color: 'red'
            }
        ];

        // 預設物品
        const defaultItems = [
            { name: '鎖匙扣', points: 5 },
            { name: '小盲盒', points: 5 },
            { name: '八達通套', points: 10 },
            { name: 'Lego', points: 10 },
            { name: '精品文具', points: 20 },
            { name: '精品文具', points: 20 },
            { name: '模型', points: 20 },
            { name: '文具套裝', points: 40 },
            { name: '遊戲機', points: 40 },
            { name: '捏捏球', points: 50 },
            { name: '模型', points: 50 },
            { name: '公仔', points: 70 },
            { name: '模型', points: 70 },
            { name: '公仔', points: 70 },
            { name: '公仔', points: 80 },
            { name: '公仔', points: 80 },
            { name: '公仔', points: 90 },
            { name: '公仔', points: 100 },
            { name: '公仔', points: 150 },
            { name: '公仔', points: 150 },
            { name: '超大公仔', points: 200 }
        ];

        this.items = defaultItems.map(item => ({
            id: this.generateId(),
            name: item.name,
            points: item.points,
            description: '',
            image: null
        }));

        this.saveData();
    }

    // 數據儲存
    saveData() {
        const data = {
            scoreRanges: this.scoreRanges,
            items: this.items,
            systemTitle: document.getElementById('systemTitle').value,
            organizationName: document.getElementById('organizationName').value,
            lastUpdated: new Date().toISOString()
        };

        localStorage.setItem('scoreExchangeData', JSON.stringify(data));
    }

    // 渲染頁面
    render() {
        this.renderScoreRanges();
        this.updateEmptyState();
    }

    // 渲染分數區間
    renderScoreRanges() {
        const container = document.getElementById('scoreRangesContainer');
        
        if (this.scoreRanges.length === 0) {
            container.innerHTML = '';
            return;
        }

        const sortedRanges = [...this.scoreRanges].sort((a, b) => a.min - b.min);
        
        container.innerHTML = sortedRanges.map(range => {
            const rangeItems = this.items
                .filter(item => item.points >= range.min && item.points <= range.max)
                .sort((a, b) => a.points - b.points);

            return `
                <div class="score-range range-${range.color}">
                    <div class="score-range-header">
                        <div class="range-info">
                            <div class="range-badge">
                                ${range.min}-${range.max}
                            </div>
                            <div class="range-details">
                                <h3>${range.name}</h3>
                                <p>${rangeItems.length} 件物品</p>
                            </div>
                        </div>
                        <div class="range-actions">
                            <button class="btn btn--small btn--primary" onclick="scoreManager.addItemToRange('${range.id}')">
                                新增物品
                            </button>
                            <button class="btn btn--small btn--outline" onclick="scoreManager.editRange('${range.id}')">
                                編輯區間
                            </button>
                            <button class="btn btn--small btn--danger" onclick="scoreManager.deleteRange('${range.id}')">
                                刪除區間
                            </button>
                        </div>
                    </div>
                    <div class="items-grid">
                        ${rangeItems.map(item => this.createItemCard(item)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }

    // 創建物品卡片
    createItemCard(item) {
        return `
            <div class="item-card">
                <div class="item-image">
                    ${item.image ? 
                        `<img src="${item.image}" alt="${item.name}">` : 
                        `<div class="item-image-placeholder">📦<br>尚未上傳圖片</div>`
                    }
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-points">${item.points} 分</div>
                    ${item.description ? `<div class="item-description">${item.description}</div>` : ''}
                    <div class="item-actions">
                        <button class="btn btn--small btn--outline" onclick="scoreManager.editItem('${item.id}')">
                            編輯
                        </button>
                        <button class="btn btn--small btn--danger" onclick="scoreManager.deleteItem('${item.id}')">
                            刪除
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // 更新空白狀態
    updateEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const hasContent = this.scoreRanges.length > 0 || this.items.length > 0;
        emptyState.classList.toggle('hidden', hasContent);
    }

    // 分數區間管理
    openRangeModal(rangeId = null) {
        this.currentEditingRange = rangeId;
        const modal = document.getElementById('rangeModal');
        const title = document.getElementById('rangeModalTitle');
        const form = document.getElementById('rangeForm');

        if (rangeId) {
            const range = this.scoreRanges.find(r => r.id === rangeId);
            title.textContent = '編輯分數區間';
            document.getElementById('rangeName').value = range.name;
            document.getElementById('rangeMin').value = range.min;
            document.getElementById('rangeMax').value = range.max;
            document.getElementById('rangeColor').value = range.color;
        } else {
            title.textContent = '新增分數區間';
            form.reset();
        }

        modal.classList.remove('hidden');
        document.getElementById('rangeName').focus();
    }

    closeRangeModal() {
        document.getElementById('rangeModal').classList.add('hidden');
        this.currentEditingRange = null;
    }

    saveRange() {
        const name = document.getElementById('rangeName').value.trim();
        const min = parseInt(document.getElementById('rangeMin').value);
        const max = parseInt(document.getElementById('rangeMax').value);
        const color = document.getElementById('rangeColor').value;

        if (!name || isNaN(min) || isNaN(max)) {
            this.showToast('請填寫完整資訊', 'error');
            return;
        }

        if (min >= max) {
            this.showToast('最小分數必須小於最大分數', 'error');
            return;
        }

        // 檢查重疊
        const overlapping = this.scoreRanges.find(range => 
            range.id !== this.currentEditingRange &&
            ((min >= range.min && min <= range.max) || 
             (max >= range.min && max <= range.max) ||
             (min <= range.min && max >= range.max))
        );

        if (overlapping) {
            this.showToast(`分數範圍與「${overlapping.name}」重疊`, 'error');
            return;
        }

        if (this.currentEditingRange) {
            // 編輯現有區間
            const range = this.scoreRanges.find(r => r.id === this.currentEditingRange);
            range.name = name;
            range.min = min;
            range.max = max;
            range.color = color;
            this.showToast('分數區間已更新', 'success');
        } else {
            // 新增區間
            const newRange = {
                id: this.generateId(),
                name,
                min,
                max,
                color
            };
            this.scoreRanges.push(newRange);
            this.showToast('分數區間已新增', 'success');
        }

        this.closeRangeModal();
        this.saveData();
        this.render();
    }

    editRange(rangeId) {
        this.openRangeModal(rangeId);
    }

    deleteRange(rangeId) {
        const range = this.scoreRanges.find(r => r.id === rangeId);
        const itemsInRange = this.items.filter(item => 
            item.points >= range.min && item.points <= range.max
        );

        let message = `確定要刪除區間「${range.name}」嗎？`;
        if (itemsInRange.length > 0) {
            message += `\n區間內有 ${itemsInRange.length} 個物品也會一併刪除。`;
        }

        this.openDeleteModal(message, () => {
            // 刪除區間內的物品
            this.items = this.items.filter(item => 
                !(item.points >= range.min && item.points <= range.max)
            );
            
            // 刪除區間
            this.scoreRanges = this.scoreRanges.filter(r => r.id !== rangeId);
            
            this.saveData();
            this.render();
            this.showToast('區間已刪除', 'success');
        });
    }

    // 物品管理
    addItemToRange(rangeId) {
        const range = this.scoreRanges.find(r => r.id === rangeId);
        this.openItemModal(null, range.min);
    }

    openItemModal(itemId = null, defaultPoints = null) {
        this.currentEditingItem = itemId;
        const modal = document.getElementById('itemModal');
        const title = document.getElementById('itemModalTitle');
        const form = document.getElementById('itemForm');

        if (itemId) {
            const item = this.items.find(i => i.id === itemId);
            title.textContent = '編輯物品';
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemPoints').value = item.points;
            document.getElementById('itemDescription').value = item.description || '';
            
            if (item.image) {
                this.showImagePreview(item.image);
            }
        } else {
            title.textContent = '新增物品';
            form.reset();
            this.hideImagePreview();
            
            if (defaultPoints !== null) {
                document.getElementById('itemPoints').value = defaultPoints;
            }
        }

        modal.classList.remove('hidden');
        document.getElementById('itemName').focus();
    }

    closeItemModal() {
        document.getElementById('itemModal').classList.add('hidden');
        this.currentEditingItem = null;
        this.hideImagePreview();
    }

    saveItem() {
        const name = document.getElementById('itemName').value.trim();
        const points = parseInt(document.getElementById('itemPoints').value);
        const description = document.getElementById('itemDescription').value.trim();
        const imagePreview = document.getElementById('previewImg');
        const image = imagePreview.src && imagePreview.src !== window.location.href ? imagePreview.src : null;

        if (!name || isNaN(points)) {
            this.showToast('請填寫物品名稱和分數', 'error');
            return;
        }

        // 檢查分數是否在有效範圍內
        const validRange = this.scoreRanges.find(range => 
            points >= range.min && points <= range.max
        );

        if (!validRange) {
            this.showToast('分數不在任何區間範圍內，請先建立對應的分數區間', 'error');
            return;
        }

        if (this.currentEditingItem) {
            // 編輯現有物品
            const item = this.items.find(i => i.id === this.currentEditingItem);
            item.name = name;
            item.points = points;
            item.description = description;
            item.image = image;
            this.showToast('物品已更新', 'success');
        } else {
            // 新增物品
            const newItem = {
                id: this.generateId(),
                name,
                points,
                description,
                image
            };
            this.items.push(newItem);
            this.showToast('物品已新增', 'success');
        }

        this.closeItemModal();
        this.saveData();
        this.render();
    }

    editItem(itemId) {
        this.openItemModal(itemId);
    }

    deleteItem(itemId) {
        const item = this.items.find(i => i.id === itemId);
        this.openDeleteModal(`確定要刪除物品「${item.name}」嗎？`, () => {
            this.items = this.items.filter(i => i.id !== itemId);
            this.saveData();
            this.render();
            this.showToast('物品已刪除', 'success');
        });
    }

    // 圖片處理
    handleImageUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showToast('請選擇圖片檔案', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showToast('圖片檔案不能超過5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.showImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    showImagePreview(src) {
        const preview = document.getElementById('imagePreview');
        const img = document.getElementById('previewImg');
        const upload = document.getElementById('imageUpload');
        
        img.src = src;
        preview.classList.remove('hidden');
        upload.style.display = 'none';
    }

    hideImagePreview() {
        const preview = document.getElementById('imagePreview');
        const upload = document.getElementById('imageUpload');
        
        preview.classList.add('hidden');
        upload.style.display = 'block';
    }

    removeImage() {
        this.hideImagePreview();
    }

    // 刪除確認模態框
    openDeleteModal(message, callback) {
        this.deleteTarget = callback;
        document.getElementById('deleteMessage').textContent = message;
        document.getElementById('deleteModal').classList.remove('hidden');
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').classList.add('hidden');
        this.deleteTarget = null;
    }

    confirmDelete() {
        if (this.deleteTarget) {
            this.deleteTarget();
        }
        this.closeDeleteModal();
    }

    // 關閉所有模態框
    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
        this.currentEditingRange = null;
        this.currentEditingItem = null;
        this.deleteTarget = null;
    }

    // 列印功能
    printTable() {
        this.generatePrintContent();
        
        // 切換到列印模式
        document.getElementById('editMode').classList.add('hidden');
        document.getElementById('printMode').classList.remove('hidden');
        
        // 延遲執行列印，確保內容已渲染
        setTimeout(() => {
            window.print();
            
            // 列印後切換回編輯模式
            setTimeout(() => {
                document.getElementById('editMode').classList.remove('hidden');
                document.getElementById('printMode').classList.add('hidden');
            }, 100);
        }, 200);
    }

    generatePrintContent() {
        const systemTitle = document.getElementById('systemTitle').value || 'ACS分數兌換表';
        const organizationName = document.getElementById('organizationName').value;
        const currentDate = new Date().toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('printTitle').textContent = systemTitle;
        document.getElementById('printOrg').textContent = organizationName;
        document.getElementById('printDate').textContent = currentDate;

        const sortedRanges = [...this.scoreRanges].sort((a, b) => a.min - b.min);
        const printContainer = document.getElementById('printContainer');

        printContainer.innerHTML = sortedRanges.map(range => {
            const rangeItems = this.items
                .filter(item => item.points >= range.min && item.points <= range.max)
                .sort((a, b) => a.points - b.points);

            if (rangeItems.length === 0) return '';

            return `
                <div class="print-range">
                    <h2 class="print-range-title">${range.name}</h2>
                    <table class="print-table">
                        <thead>
                            <tr>
                                <th style="width: 80px;">圖片</th>
                                <th>物品名稱</th>
                                <th>描述</th>
                                <th style="width: 80px;">所需分數</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rangeItems.map(item => `
                                <tr>
                                    <td>
                                        ${item.image ? 
                                            `<img src="${item.image}" alt="${item.name}">` : 
                                            '<div style="text-align: center; color: #999;">無圖片</div>'
                                        }
                                    </td>
                                    <td>${item.name}</td>
                                    <td>${item.description || '-'}</td>
                                    <td class="print-item-points">${item.points} 分</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        }).join('');
    }

    // 數據匯出
    exportData() {
        const data = {
            systemTitle: document.getElementById('systemTitle').value,
            organizationName: document.getElementById('organizationName').value,
            scoreRanges: this.scoreRanges,
            items: this.items,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `分數兌換表_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showToast('數據已匯出', 'success');
    }

    // 數據匯入
    importData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (!data.scoreRanges || !data.items) {
                    throw new Error('檔案格式不正確');
                }

                this.scoreRanges = data.scoreRanges;
                this.items = data.items;
                
                if (data.systemTitle) {
                    document.getElementById('systemTitle').value = data.systemTitle;
                }
                if (data.organizationName) {
                    document.getElementById('organizationName').value = data.organizationName;
                }

                this.saveData();
                this.render();
                this.showToast('數據匯入成功', 'success');
            } catch (error) {
                console.error('匯入失敗:', error);
                this.showToast('匯入失敗，請檢查檔案格式', 'error');
            }
        };
        reader.readAsText(file);
    }

    // 工具函數
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const messageEl = document.getElementById('toastMessage');
        
        messageEl.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 初始化系統
let scoreManager;
document.addEventListener('DOMContentLoaded', () => {
    scoreManager = new ScoreExchangeManager();
});

// 確保在GitHub Pages上正常運行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!scoreManager) {
            scoreManager = new ScoreExchangeManager();
        }
    });
} else {
    if (!scoreManager) {
        scoreManager = new ScoreExchangeManager();
    }
}