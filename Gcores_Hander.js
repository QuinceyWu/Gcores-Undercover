// ==UserScript==
// @name         机核 增强 - 标签页伪装为 Github（摸鱼）
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
        document.title = 'GitHub';
    }

    // 根据系统主题模式设置对应的GitHub图标
    function setFaviconForTheme() {
        const darkModeIcon = 'https://github.githubassets.com/favicons/favicon-dark.png';
        const lightModeIcon = 'https://github.githubassets.com/favicons/favicon.png';
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkModeIcon : lightModeIcon;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    // 使用MutationObserver监视标题变化
    function observeTitleChange() {
        const titleObserver = new MutationObserver(mutations => {
            setTitle();
        });

        titleObserver.observe(document.querySelector('title'), { childList: true });
    }

    // 监听系统主题变化
    function observeSystemThemeChange() {
        window.matchMedia('(prefers-color-scheme: dark)').addListener(e => setFaviconForTheme());
        window.matchMedia('(prefers-color-scheme: light)').addListener(e => setFaviconForTheme());
    }

    // 初始化函数
    function init() {
        setTitle();
        setFaviconForTheme();
        observeTitleChange();
        observeSystemThemeChange();
    }

    init();
})();