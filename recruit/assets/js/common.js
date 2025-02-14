// ウィンドウサイズが1200px以上の場合のみluxyを初期化
if (window.innerWidth >= 1100) {
  luxy.init({
    wrapper: 'main',
    targets: '.parallax',
    wrapperSpeed: 0.08
  });
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.location.hash) {
        const hash = window.location.hash;
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            let offset = targetElement.offsetTop;

            // ウィンドウの幅に応じてオフセットを調整
            if (window.innerWidth <= 640) {
                if (hash === '#cold-chain') {
                    offset -= 120; // ウィンドウサイズが640px以下の場合は100減らす
                } else if (hash === '#large-airconditioner') {
                    offset -= 190; // ウィンドウサイズが640px以下の場合は200減らす
                }
            } else {
                // ウィンドウサイズが640pxより大きい場合のオフセット調整
                if (hash === '#cold-chain') {
                    offset -= 200;
                } else if (hash === '#large-airconditioner') {
                    offset -= 300;
                }
            }

            window.scrollTo(0, offset);
        }
    }
}, 300); // 300ミリ秒の遅延
  // 外部リンクの場合は新規ウィンドウで開く
  const externalLinks = document.querySelectorAll(
    'a[href^="http"]:not([href*="' + location.hostname + '"])'
  );
  externalLinks.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  setTimeout(() => {
    document.querySelector('#loader').classList.add('loaded');
    document.querySelector('main').classList.add('loaded');
    document.querySelector('body').classList.add('loaded');
  }, 1000);
  // バーガーメニューのトリガー関連
  const navGlobal = document.querySelector('nav.global');
  const trigger = document.getElementById('trigger');
  const main = document.querySelector('main');
  function toggleMenu() {
    trigger.classList.toggle('active');
    navGlobal.classList.toggle('active');
  }
  function checkAndToggleMenu() {
    if (navGlobal.classList.contains('active')) {
      toggleMenu();
    }
  }
  trigger.addEventListener('click', function () {
    toggleMenu();
  });
  window.addEventListener('scroll', checkAndToggleMenu);
  main.addEventListener('click', checkAndToggleMenu);
  // スマホの際に100vhを調整
  const setFillHeight = () => {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    );
  };
  // 初期ロード時に一度だけ実行
  setFillHeight();
  // スクロールイベントハンドラの更新
  function handleScroll() {
    if (trigger.classList.contains('active')) {
      toggleMenu();
    }
  }

  // ウィンドウリサイズ時にイベントリスナーを追加または削除するロジックの更新
  function handleResize() {
    trigger.removeEventListener('click', toggleMenu);
    window.removeEventListener('scroll', handleScroll); // 更新されたハンドラを使用
    main.removeEventListener('click', toggleMenu);
  }

  // イベントリスナーの初期設定
  window.addEventListener('resize', handleResize);
  handleResize();


  const elements = document.querySelectorAll('body *');
  elements.forEach((element) => {
    if (element.tagName === 'SPAN' && element.classList.contains('en')) {
      return;
    }
    const textNodes = [...element.childNodes].filter(
      (node) => node.nodeType === Node.TEXT_NODE
    );
    textNodes.forEach((textNode) => {
      let text = textNode.textContent || '';

      let newText = text.replace(/([〈「（〉」）、。])/g, (match, p1, offset, string) => {
        if (p1.match(/[〈「（]/) && (offset === 0 || !/[。、]/.test(string[offset - 1]))) {
          return `<span class="adj-l">${p1}</span>`;
        } else if (p1.match(/[〉」）、。]/) && (offset === string.length - 1 || !/[。、]/.test(string[offset + 1]))) {
          return `<span class="adj-r">${p1}</span>`;
        }
        return p1;
      });

      if (newText !== text) {
        const fragment = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = newText;
        while (div.firstChild) {
          fragment.appendChild(div.firstChild);
        }
        textNode.parentNode.insertBefore(fragment, textNode);
        if (textNode instanceof Element || textNode instanceof CharacterData) {
          textNode.remove();
        }
      }
    });
  });


  // ページロード後に実行するスクリプト
  setTimeout(() => {
    // フェードインエフェクト用のセレクターを定義
    // main要素内の特定の要素を選択するセレクター。ただし、footer内の要素や特定のクラスを持つ要素は除外する。
    const selectors = [
      'main video:not(.nofade):not(footer *)', // .nofadeクラスを持たないvideo要素を選択
      'main picture:not(.hover, .main-visual picture, .key-visual picture, .nofade, .loop-slider picture):not(footer *)', // 特定のクラスや位置にあるpicture要素を除外
      'main p:not(.read-more, div.thumb > .title, div.thumb > .copy, .main-visual p, .key-visual p, .nofade):not(footer *), p.nofade span.row:not(footer *)', // 特定のクラスや位置にあるp要素を除外、またnofadeクラスを持つp内のspan.rowを選択
      'main h2:not(.main-visual h2, .key-visual h2, .nofade):not(footer *)', // 特定のクラスや位置にあるh2要素を除外
      'main h3:not(.main-visual h3, .key-visual h3, .nofade):not(footer *)', // 特定のクラスや位置にあるh3要素を除外
      'main h4:not(.main-visual h4, .key-visual h4, .nofade):not(footer *)', // 特定のクラスや位置にあるh4要素を除外
      'main ul:not(.trees, .illust, .main-visual ul, .key-visual ul, .nofade) li:not(footer *)', // 特定のクラスや位置にあるul内のli要素を除外
      'main a.button:not(.main-visual a.button, .key-visual a.button, .nofade):not(footer *)' // 特定のクラスや位置にあるa.button要素を除外
    ];

    // セレクター文字列を結合
    const selectorString = selectors.join(',');

    // フェードインエフェクトを適用する要素を選択
    const fadeInElements = document.querySelectorAll(selectorString);

    fadeInElements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    gsap.utils.toArray('.action').forEach(function (action) {
      // ScrollTriggerインスタンスを変数に格納
      let trigger = ScrollTrigger.create({
        trigger: action, // トリガーとなる要素
        start: 'top 85%', // 表示領域の上端が要素の下端に達したときにトリガー
        onEnter: () => {
          action.classList.add('loaded'); // 要素が表示領域に入ったときに.loadedクラスを追加
          // イベント発火後、このトリガーをkillすることで、クラスの付与を一度だけに限定
          trigger.kill(); // 修正: thisではなく、変数に格納したインスタンスを使用
        }
        // マーカーは不要なのでmarkersプロパティは削除
      });
    });

    // .keyword-wrap内の各.card要素に対して処理を適用
    document.querySelectorAll('.keyword-wrap .card').forEach((card) => {
      // GSAPのtimelineを作成し、scaleを1.1から1.0にアニメーションする設定
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: card, // アニメーションのトリガーとなる要素
          start: 'top bottom', // 要素の上端がビューポートの中央に来た時にアニメーション開始
          end: 'top 60%', // 要素の下端がビューポートの中央を過ぎた時にアニメーション終了
          scrub: 2 // スクロールに合わせてアニメーションを進行させる
        }
      });

      // timelineにscaleのアニメーションを追加
      tl.fromTo(card, { scale: 0.8 }, { scale: 1.0, ease: 'none' });
    });
  }, 1000);
  if (document.body.classList.contains('top')) {
    const lis = document.querySelectorAll('.main-visual ul > li');
    let currentIndex = 0; // 現在のliのインデックス

    setTimeout(() => {
      lis[currentIndex].classList.add('on');
      setZIndexIfNeeded(currentIndex);

      setInterval(() => {
        const nextIndex = (currentIndex + 1) % lis.length;

        // 新しいliにonクラスを付与し、必要ならz-indexを調整
        lis[nextIndex].classList.add('on');
        setZIndexIfNeeded(nextIndex);

        // 1秒後に他の全てのliからonクラスを削除
        setTimeout(() => {
          lis.forEach((li, index) => {
            if (index !== nextIndex) {
              // 新しいli以外
              li.classList.remove('on');
            }
          });
        }, 1000);

        currentIndex = nextIndex; // インデックスを更新
      }, 5000);
    }, 1000);
  }
});
// li:first-childのz-indexを一時的に60に設定し、1秒後に50に戻す関数
function setZIndexIfNeeded(index) {
  const lis = document.querySelectorAll('.main-visual ul > li');
  if (index === 0) {
    lis[index].style.zIndex = 60;
    setTimeout(() => (lis[index].style.zIndex = 50), 1000);
  }
}
if (document.querySelector('.project-parallax')) {
  // すべての '.project-parallax' 要素を取得
  let pictures = document.querySelectorAll('.project-parallax picture');

  pictures.forEach((pic) => {
    gsap.fromTo(pic, {
      yPercent: 0
    }, {
      yPercent: 20,
      ease: Power0.easeNone,
      scrollTrigger: {
        trigger: pic.parentElement, // 直接の親要素をトリガーとして使用
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });
}
