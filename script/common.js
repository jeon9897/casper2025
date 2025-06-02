/*
  화면 스크롤 동작시 상단헤더에 .h_act적용하기
*/

//1. 자바스크립트로 구현하기
//const h = document.getElementById('header');

//2. 화면스크롤 이벤트 = window scroll
// window.addEventListener('scroll',function(){
//   let sPos = window.scrollY;
//   if(sPos>=1){
//     h.classList.add('h_act');
//   }else{
//     h.classList.remove('h_act');
//   }
// });

//2. 제이쿼리로 구현하기
$(document).ready(function(){
  const h = $('header');

  //1. 모달 변수 생성하기
  const modal=`
  <div class="modal">
    <div class="inner">
      <a href="#" title="배너">
        <img src="./images/pc_prod_notice_20230203.jpg" alt="">
      </a>
      <p>
        <input type="checkbox" id="ch">
        <label for="ch">일주일 간 창 보지 않기</label>
        <input type="button" value="닫기" id="c_btn">  
      </p>
    </div>
  </div>
`;

  // 모달변수를 body의 맨 뒤쪽에 출력한다.
  $('body').append(modal);

  //쿠키생성하기
  let ch = $('.modal #ch');  //체크박스 변수

  //현재 브라우저에 쿠키정보가 있는지 없는지 유무를 판단하여 모달이 나오지 않게함.
  if($.cookie('popup')=='none'){
    $('.modal').hide();
  }

  //쿠키의 존재 유무를 체크하여 쿠키를 생성하거나 모달윈도 숨기기
  function closeModal(){
    if(ch.is(':checked')){ //만약에 체크박스에 체크가 된 경우라면
      //쿠키를 생성하기
      $.cookie('popup', 'none', {expires:7, path:'/'});
    }
    //체크박스에 체크 안한 경우 그냥 모달 숨기기
    $('.modal').hide();
  }

  //닫기 버튼을 클릭하면 closeModal함수 실행하여 쿠키생성하고 모달 숨기기 한다.
  $('.modal #c_btn').click(function(){
    closeModal();
  });

  //헤더에 마우스오버시 h_act적용하기
  $('header').mouseenter(function(){
    $('header').addClass('h_act');
    $('header h1 img').attr('src','./images/logo-casper_black.png');
  });

  //헤더에 마우스아웃시 h_act제거
  $('header').mouseleave(function(){ //마우스를 빼는 경우
    if($(window).scrollTop()<=1){ //스크롤값이 1이상일 경우 아래내용 실행
      $('header').removeClass('h_act');
      $('header h1 img').attr('src','./images/logo-casper-white.png');
    }
  });

  $(window).scroll(function(){
    let sPos = $(this).scrollTop();
    console.log(sPos);

    if(sPos>=1){
      h.addClass('h_act');
      $('header h1 img').attr('src','./images/logo-casper_black.png');
    }else{
      h.removeClass('h_act');
      $('header h1 img').attr('src','./images/logo-casper-white.png');
    }
  });

});