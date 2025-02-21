let lastScrollTop = 0; // 마지막 스크롤 위치
let direction = ''; // 스크롤 방향

// toss_mid_imgcontainer 상태 추적
let isTossMidVisible = false; // toss_mid_imgcontainer가 보이는지 여부
let moveLeftPosition = 0; // .move_div_left 위치 추적
let moveRightPosition = 0; // .move_div_right 위치 추적

// Intersection Observer 설정
const observerOptions = {
    root: null, // viewport (브라우저 창)
    rootMargin: '0px', // 옵저버 마진
    threshold: 0.5 // 50% 이상 보일 때 트리거
};

// fade-in 요소들
const fadeElements = document.querySelectorAll('.fade-in, .later, .later2, .later3'); // 모든 섹션에서 fade-in 효과 적용

// section08의 fade-in 요소들
const section08 = document.querySelector('.section08_container');
const section08Elements = section08.querySelectorAll('.fade-in');

// toss_mid_imgcontainer에 대한 설정
const tossMidImgContainer = document.querySelector('.toss_mid_imgcontainer');
const moveLeft = document.querySelector('.move_div_left');
const moveRight = document.querySelector('.move_div_right');

// 스크롤 방향 추적 함수
const trackScrollDirection = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    direction = scrollTop > lastScrollTop ? 'down' : 'up'; // 'down'이면 아래로, 'up'이면 위로 스크롤
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 스크롤 위치가 0보다 작으면 0으로 설정
};

// 휠 이벤트 처리 함수
const handleWheelMovement = () => {
    if (!isTossMidVisible) return; // toss_mid_imgcontainer가 화면에 보일 때만 휠 이벤트 처리

    if (direction === 'down') {
        // 휠을 내릴 때는 정방향
        moveLeftPosition -= 20; // 왼쪽으로 50 이동
        moveRightPosition += 20; // 오른쪽으로 50 이동
    } else if (direction === 'up') {
        // 휠을 올릴 때는 반대방향
        moveLeftPosition += 20; // 오른쪽으로 50 반대로 이동
        moveRightPosition -= 20; // 왼쪽으로 50 반대로 이동
    }

    // 이동 처리
    moveLeft.style.transform = `translateX(${moveLeftPosition}px)`;
    moveRight.style.transform = `translateX(${moveRightPosition}px)`;
};

// Intersection Observer 콜백 함수
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        const element = entry.target;

        if (element === tossMidImgContainer) {
            // toss_mid_imgcontainer가 화면에 10% 이상 보일 때만 휠 이벤트 처리
            if (entry.isIntersecting && direction !== '') {
                isTossMidVisible = true; // 보이면 휠 이벤트 처리 시작
                handleWheelMovement();
            } else {
                isTossMidVisible = false; // 사라지면 휠 이벤트 멈춤
            }
        }

        if (section08.contains(element)) {
            // section08 내에서만 fade-in/아웃 적용
            if (entry.isIntersecting && direction === 'down') {
                element.classList.add('visible'); // 스크롤 내릴 때는 fade-in
            } else if (direction === 'up') {
                element.classList.remove('visible'); // 스크롤 올릴 때는 fade-out
            }
        } else {
            // section08이 아닌 다른 섹션에서는 fade-in만 적용
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 한 번만 실행되게
            }
        }
    });
};

// 옵저버 설정
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// 각 요소에 대해 옵저버 등록
fadeElements.forEach(element => observer.observe(element));

// toss_mid_imgcontainer에 대한 옵저버
const tossMidImgObserver = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // toss_mid_imgcontainer가 10% 이상 보일 때만 휠 이벤트 활성화
});
tossMidImgObserver.observe(tossMidImgContainer);

// 스크롤 이벤트에서 방향 추적
window.addEventListener('scroll', trackScrollDirection);

// 휠 이벤트 처리
window.addEventListener('wheel', handleWheelMovement);


// toss_mobile_btn 클릭 시 toss_menu_m 토글
const tossMobileBtn = document.getElementById('toss_mobile_btn'); // 모바일 메뉴 버튼
const tossMenuM = document.querySelector('.toss_menu_m'); // 모바일 메뉴

// 모바일 메뉴 버튼 클릭 시 토글 이벤트
tossMobileBtn.addEventListener('click', () => {
    // 모바일 메뉴의 display 스타일을 토글하여 보이게/숨기게
    if (tossMenuM.style.display === 'block') {
        tossMenuM.style.display = 'none';
    } else {
        tossMenuM.style.display = 'block';
    }
});

// 화면 크기가 768px 이상이면 toss_menu_m을 숨기기
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        tossMenuM.style.display = 'none'; // 화면 크기가 768px 이상일 때는 메뉴 숨김
    }
});