$(document).ready(function() {
  try {
    let urlParams = new URLSearchParams(window.location.search);
    let text = urlParams.get("text");

    $(".detail_content").append(text);
  }catch(error) {
    console.error("URL 파라메터 처리 중 오류 발생 : ",error);
    alert("데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도하세요.");
  }
})