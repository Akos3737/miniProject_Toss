  // footer 가져오기
  document.addEventListener('DOMContentLoaded', function() {
    fetch('/footer/index.html') // 외부 footer 파일 경로
      .then(response => response.text()) // 파일을 텍스트로 변환
      .then(data => {
        // 불러온 데이터가 footer_container에 삽입
        const footerContainer = document.getElementById('footer_container');
        if (footerContainer) {
          footerContainer.innerHTML = data;
        } else {
          console.error('footer_container 요소를 찾을 수 없습니다.');
        }
      })
      .catch(error => console.error('Error loading footer:', error));
  });

// 아이콘 클릭 시 검색창 포커스 및 스타일 변경
document.querySelector(".search-icon").addEventListener("click", function(event) {
  event.stopPropagation();  // 클릭 이벤트가 부모로 전파되지 않게 함
  document.querySelector(".search-box").focus();  // 검색창에 포커스
  document.querySelector(".search-box-container").classList.add("focused");  // 컨테이너에 focused 클래스 추가
});

// 외부 클릭 시 검색창 포커스 해제
document.addEventListener("click", function(event) {
  const searchBoxContainer = document.querySelector(".search-box-container");
  if (!searchBoxContainer.contains(event.target)) {  // 클릭한 곳이 search-box-container 내부가 아니라면
    searchBoxContainer.classList.remove("focused");  // focused 클래스 제거
    document.querySelector(".search-box").blur();  // 검색창 포커스 해제
  }
});
// search-box 클릭 시 링크로 이동
document.querySelector(".search-box").addEventListener("click", function(event) {
  window.location.href = "#";  // 링크로 이동
});

// navbar 사이트 스크롤 감지
window.addEventListener('scroll', function() {
  const nav_container = document.querySelector('.nav_container');
  
  if (window.scrollY > 0) {
    nav_container.classList.add('scrolled');
  } else {
    nav_container.classList.remove('scrolled');
  }
});
