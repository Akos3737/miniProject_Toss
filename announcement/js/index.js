$(document).ready(async function() {
  let curPageNumber = 1;
  let maxPageBtnLength = 9;
  let jsonData = null;
  let totalPages = 0;
  

  try {
    let response = await fetch("/data/announce.json"); 
     jsonData = await response.json();
  } catch(error) {
    console.log("Json Data를 가져오는 중 오류 발생 : ", error);
    alert("데이터를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도하세요.");
    return;
  }

  init();

  $(".page_btn").on("click", function() {
    clearNoticeList()

    let pageNumber = $(this).text();
    curPageNumber = pageNumber;

    $(".pagination li").removeClass("active");
    $(this).parent().addClass("active");

    updatePaginationArrowButton(pageNumber);
    applyContentData(pageNumber);
    calculatePaginationRange();
  })

  $(".prev_btn").on("click", function() {
    clearNoticeList()
    applyContentData(--curPageNumber);
    updatePaginationArrowButton();
    addActiveClassInList();
    calculatePaginationRange();
    $(this).blur();
  })

  $(".next_btn").on("click", function() {
    clearNoticeList()
    applyContentData(++curPageNumber);
    updatePaginationArrowButton();
    addActiveClassInList();
    calculatePaginationRange();
    console.log(curPageNumber);
    $(this).blur();
  })

  function init() {
    let firstPage = 1;
    clearNoticeList()

    let pageKeys = Object.keys(jsonData).filter(key => key.startsWith("page"));
    totalPages = pageKeys.length;

    for (let i = 1; i <= totalPages; i++) {
      if (i == maxPageBtnLength) {
        $(".pagination").append(`
          <li><button class="btn page_btn" id="page${totalPages}">${totalPages}</button></li>
          <li class="next"><button class="btn next_btn">></button></li>`)
        converterPageBtnToThreeDot(8);
        break;
      }

      if (i === firstPage) {
        $(".pagination").append(`<li class="prev"><button class="btn prev_btn"><</button></li>`)
      }

      $(".pagination").append(`<li class=${i === firstPage ? 'active' : ''}><button class="btn page_btn" id="page${i}">${i}</button></li>`)

      if (i === totalPages) {
        $(".pagination").append(`<li class="next"><button class="btn next_btn">></button></li>`)
      }
    }

    applyContentData(firstPage);
  }

  function clearNoticeList() {
    $(".notice-list").empty();
  }

  function applyContentData(pageNumber) {
    let pageKey = `page${pageNumber}`;

    $.each(jsonData[pageKey].contents, function(index, content) {
      if (index == 9) {
        $(".notice-list").append(`
          <li class="active"> 
              <a href="announcementDetail/index.html?text=${encodeURIComponent(content.text)}">
                  <h4 class="notice-content">${content.title}</h4>
                  <p class="date">${content.date}</p>
              </a>
          </li>
      `);
      } else {
        $(".notice-list").append(`
          <li> 
              <a href="announcementDetail/index.html?text=${encodeURIComponent(content.text)}">
                  <h4 class="notice-content">${content.title}</h4>
                  <p class="date">${content.date}</p>
              </a>
              <hr>
          </li>
      `);
      }  
    });

    window.scrollTo(0,0);
  }

  function updatePaginationArrowButton() {
    if (curPageNumber == 1) {
      $(".prev_btn").addClass("disabled").prop("disabled", true); 
    } else {
      $(".prev_btn").removeClass("disabled").prop("disabled", false); 
    }

    if (curPageNumber == totalPages) {
      $(".next_btn").addClass("disabled").prop("disabled", true); 
    } else {
      $(".next_btn").removeClass("disabled").prop("disabled", false); 
    }
  }

  function calculatePaginationRange() {
    let firstPage = 1;
    let centerOfPageBtn = 5;  

    if (curPageNumber <= centerOfPageBtn) {
      for (let i = 0; i < centerOfPageBtn + 2; i++) {
        let pageBtn = $(".pagination").children().eq(firstPage + i).children();
        pageBtn.text((firstPage + i));
        pageBtn.attr("id", "page" + (firstPage + i));
      }

      converterPageBtnToThreeDot(8,(totalPages - 1));
      converterThreeDotToPageBtn(2,2)

      return;
    } else if (totalPages - curPageNumber < centerOfPageBtn - 1) {
      for (let i = 0; i < centerOfPageBtn + 2; i++) {
        let pageBtn = $(".pagination").children().eq(maxPageBtnLength - i).children();
        pageBtn.text((totalPages - i));
        pageBtn.attr("id", "page" + (totalPages - i));
      }

      converterPageBtnToThreeDot(2,2);
      converterThreeDotToPageBtn(8,(totalPages - 1))

      return;
    }

    let startPageNumber = curPageNumber - 2;
    let startPageBtnNumber = centerOfPageBtn - 2;

    for (let i = 0; i < centerOfPageBtn; i++) {
      let pageBtn = $(".pagination").children().eq(startPageBtnNumber + i).children()
      pageBtn.text((startPageNumber + i));
      pageBtn.attr("id", "page" + (startPageNumber + i));
    }

    converterPageBtnToThreeDot(2);
    converterPageBtnToThreeDot(8);

    addActiveClassInList();
  }

  function addActiveClassInList() {
    $(".pagination li").removeClass("active");
    $("#page"+curPageNumber).parent().addClass("active");
  }

  function converterPageBtnToThreeDot(index) {
    $(".pagination").children().eq(index).children().text("...");
    $(".pagination").children().eq(index).children().addClass("disabled");
  }

  function converterThreeDotToPageBtn(index, pageNumber) {
    $(".pagination").children().eq(index).children().text(pageNumber);
    $(".pagination").children().eq(index).children().removeClass("disabled");
  }
});

