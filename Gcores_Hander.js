// ==UserScript==
// @name         机核🐟塘 - 标签页伪装为 Github（摸鱼）
// @namespace    https://github.com/QuinceyWu/Gcores-Undercover
// @version      1.0
// @description  将机核标签页伪装成GitHub，用于摸鱼
// @author       QuinceyWu
// @match        *://*.gcores.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 修改网页标题
    function setTitle() {
        if (document.title !== 'GitHub') {
            document.title = 'GitHub';
        }
    }

    // 根据当前系统主题模式设置对应的GitHub图标
    function setFaviconForTheme() {
        const darkModeIcon = 'https://github.githubassets.com/favicons/favicon-dark.png';
        const lightModeIcon = 'https://github.githubassets.com/favicons/favicon.png';
        const faviconURL = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkModeIcon : lightModeIcon;

        // 移除页面上所有现有的图标链接
        document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']").forEach(function(link) {
            link.parentNode.removeChild(link);
        });

        // 添加新的图标链接
        let link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'icon'; // 使用 'icon' 而不是 'shortcut icon'
        link.href = faviconURL;
        document.head.appendChild(link);
    }

    // 使用MutationObserver监视标题变化
    function observeTitleChange() {
        const titleObserver = new MutationObserver(mutations => {
            setTitle();
        });

        titleObserver.observe(document.querySelector('title'), { childList: true });
    }
    // 初始化函数
    function init() {
        setTitle();
        setFaviconForTheme();
        observeTitleChange();
    }

    init();
})();