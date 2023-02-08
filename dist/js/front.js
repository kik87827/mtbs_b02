document.addEventListener("DOMContentLoaded", function() {
  commonInit();
  mbTotal();
  commonEvent();
  commonForm();
  inlineCalendar();
});
window.addEventListener("load", function() {
  stickyMenu();
});

function inlineCalendar(){
  let inline_calendar_form = document.querySelectorAll(".inline_calendar_form");
  if(inline_calendar_form.length===0){return;}
  inline_calendar_form.forEach((element)=>{
    let thisObj = element;
    let thisObjform = thisObj.querySelector(".inline_calendar");
    let thisObjlabel = thisObj.querySelector(".inline_calendar_label");
    thisObjlabel.textContent = thisObjform.value;

    thisObjform.addEventListener("change",(e)=>{
      thisObjlabel.textContent = thisObjform.value;
    });
  })
}

function commonInit() {
  let touchstart = "ontouchstart" in window;
  let userAgent = navigator.userAgent.toLowerCase();
  if (touchstart) {
    browserAdd("touchmode");
  }
  if (userAgent.indexOf('samsung') > -1) {
    browserAdd("samsung");
  }

  if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
    browserAdd("window");
  }

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
    // iPad or iPhone
    browserAdd("ios");
  }


  function browserAdd(opt) {
    document.querySelector("html").classList.add(opt);
  }
}

function stickyMenu(){
  let header_smenu_zone = document.querySelector(".header_smenu_zone");
  let header_smenu_list_wrap = null;
  let header_smenu_list = null;
  let header_smenu_li = null;
  let header_smenu_zone_pos = 0;
  if(header_smenu_zone !== null){
    header_smenu_list_wrap = header_smenu_zone.querySelector(".header_smenu_list_wrap");
    header_smenu_list = header_smenu_zone.querySelector(".header_smenu_list");
    header_smenu_li = header_smenu_zone.querySelectorAll(".header_smenu_list > li");
    getSetting();
    
    
    // console.log(window.scrollY , header_smenu_zone.getBoundingClientRect().top);
    window.addEventListener("scroll",()=>{
      let scroll = window.scrollY;
      if(scroll>header_smenu_zone_pos){
        header_smenu_list_wrap.classList.add("fixed");
      }else{
        header_smenu_list_wrap.classList.remove("fixed");
      }
    });
    window.addEventListener("resize",()=>{
      getSetting();
    });

    function getSetting(){
      header_smenu_zone.style.removeProperty("min-height");
      header_smenu_zone.style.minHeight = header_smenu_list_wrap.getBoundingClientRect().height + "px";
      header_smenu_zone_pos = window.scrollY + header_smenu_zone.getBoundingClientRect().top;
      activeTab();
    }

    function activeTab(){
      header_smenu_li.forEach((element,index)=>{
        if(element.classList.contains("active")){
          const elementObj = element;
          let elementObjLeft = elementObj.getBoundingClientRect().left;
          let elementObjWidth = elementObj.getBoundingClientRect().width;
          if(window.innerWidth < elementObjLeft + elementObjWidth){
            header_smenu_list_wrap.scrollLeft = (elementObjLeft + elementObjWidth + 18.5) - window.innerWidth;
          }
        }
      })
    }
  }
}

function setVh(){
  const form_wrap = document.querySelector(".form_wrap");
  

  function action(){
    form_wrap.style.minHeight = `${window.innerHeight}px`;
  }
  action();
  window.addEventListener('resize', action);
};


function mbTotal() {
  const touchstart = "ontouchstart" in window;
  const btn_htotal = document.querySelector(".btn_total"),
      mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
      mainmenu_dim = document.querySelector(".mainmenu_dim"),
      btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
      domHtml = document.querySelector("html"),
      domBody = document.querySelector("body");

  // init 
  if(mobile_mainmenu_zone === null){return;}
  btn_htotal.addEventListener("click",function(e){
      e.preventDefault();
      totalOpen();
  },false);
  btn_mbmenuclose.addEventListener("click",function(e){
      e.preventDefault();
      totalClose();
  },false);
  mainmenu_dim.addEventListener("click",function(e){
      e.preventDefault();
      totalClose();
  },false);
  function totalOpen(){
      mobile_mainmenu_zone.classList.add("active")
      setTimeout(function(){
          mobile_mainmenu_zone.classList.add("motion");
          if(touchstart){
              domBody.setAttribute("data-scr", window.pageYOffset);
              domBody.style.marginTop = -window.pageYOffset + "px";
              domHtml.classList.add("touchDis");
          }
      },30);
  }
  function totalClose(){
      mobile_mainmenu_zone.classList.remove("motion");
      setTimeout(function(){
          mobile_mainmenu_zone.classList.remove("active");
          domHtml.classList.remove("touchDis");
          domBody.style.marginTop = 0;
          window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
      },500);
  }
}


function commonEvent() {
  let windowWidth = 0;
  // action();
  window.addEventListener("resize", () => {
    if (windowWidth === window.innerWidth) {
      return;
    }
    // action();
    windowWidth = window.innerWidth;
  });

  function action() {
    function commonTitle(){
      const headerTitle = document.querySelector(".header_toptitle");
      const btn_total = document.querySelector(".btn_total");
      let btn_total_wid = btn_total !== null ? btn_total.getBoundingClientRect().width : 0;
      const header_util_wrap = document.querySelector(".header_util_wrap");
      let header_util_wrap_wid = header_util_wrap !== null ? header_util_wrap.getBoundingClientRect().width : 0;
      if(headerTitle !== null){
        headerTitle.style.paddingLeft = btn_total_wid + "px";
        headerTitle.style.paddingRight = header_util_wrap_wid + "px";
      }
    }
    commonTitle();
  }
}



function commonForm() {
  addDynamicEventListener(document.body, 'change', '.form_bsel', function(e) {
    let thisTarget = e.target;
    if (thisTarget.value === "0") {
      thisTarget.classList.add("ready");
    } else {
      console.log(thisTarget.value);
      thisTarget.classList.remove("ready");
    }
  });
  let form_input = document.querySelectorAll(".form_input");
  let input_form_select = document.querySelectorAll(".input_form_select");
  let domHTML = document.querySelector("html");
  if(form_input.length){
    form_input.forEach(function(elem,index){
          elem.addEventListener("focus",function(e){
              focusInAction(e.currentTarget);
          },false);
          elem.addEventListener("keydown",function(e){
              focusInAction(e.currentTarget);
          },false);
          elem.addEventListener("keypress",function(e){
              focusInAction(e.currentTarget);
          },false);
          
          elem.addEventListener("focusout",function(e){
              focusOutAction(e.currentTarget);
          },false);
      });
  }
  function focusInAction(target){
      let currentTarget = target;
      let currentParent = currentTarget.closest(".inform_fxwrap");
      if(currentParent !== null){
        currentParent.classList.add("active");
      }
  }

  function focusOutAction(target){
      let currentTarget = target;
      let currentParent = currentTarget.closest(".inform_fxwrap");
      if(currentParent !== null){
        currentParent.classList.remove("active");
      }
  }

  if(input_form_select.length){
      input_form_select.forEach(function(elem,index){
          let this_p = elem.closest(".input_form_select_w");
          if(elem.value.length>0){
              this_p.classList.add("active");
              return;
          }
          this_p.classList.remove("active");

          elem.addEventListener("change",function(e){
              e.preventDefault();
              let this_p = elem.closest(".input_form_select_w");
              this_p.classList.add("active");
          },false);
          elem.addEventListener("focus",function(e){
              e.preventDefault();
              let this_p = elem.closest(".input_form_select_w");
              if(domHTML.classList.contains("window")){
                  this_p.classList.add("active");
              }
          },false);
          elem.addEventListener("focusout",function(e){
              let this_p = elem.closest(".input_form_select_w");
              if(elem.value.length>0){return;}
              this_p.classList.remove("active");
          },false);
      })
    }
}


function DesignPopup(option) {
  this.selector = null;
  if (option.selector !== undefined) {
      this.selector = document.querySelector(option.selector);
  }
  this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
  this.domHtml = document.querySelector("html");
  this.domBody = document.querySelector("body");
  this.pagewrap = document.querySelector(".page_wrap");
  this.btn_closeTrigger = null;
  this.btn_close = null;
  this.bg_design_popup = null;
  this.scrollValue = 0;
  this.popupShow(option.selector);
}

DesignPopup.prototype.popupShow = function (target) {
  var objThis = this;
  this.selector = document.querySelector(target);
  if (this.selector == null) {
      return;
  }
  this.domBody.setAttribute("data-scr", window.pageYOffset);
  this.domBody.style.marginTop = -window.pageYOffset+"px";
  this.scrollValue = window.pageYOffset;
  this.domHtml.classList.add("touchDis");
  this.selector.classList.add("active");
  setTimeout(function(){
    objThis.selector.classList.add("motion");
  },30);

  


  this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");
  this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
  
  this.bg_design_popup = this.selector.querySelector(".popup_wrap .bg_dim");
  this.domBody.append(this.selector);
  this.bindEvent(this.selector);
  
}
DesignPopup.prototype.popupHide = function (target) {
  var objThis = this;
  if (target !== undefined) {
      if (typeof target =="object"){
          this.selector = target;
      }else{
          this.selector = document.querySelector(target);
      }
      this.selector.classList.remove("motion");
      setTimeout(function(){
          //remove
          objThis.selector.classList.remove("active");
          objThis.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
          if (objThis.design_popup_wrap_active.length==0){
              objThis.domHtml.classList.remove("touchDis");
              objThis.domBody.style.marginTop = 0;
              window.scrollTo(0, parseInt(objThis.domBody.getAttribute("data-scr")));
          }
      },0);
  }
}

DesignPopup.prototype.bindEvent = function () {
  var objThis = this;
  var closeItemArray = [...this.btn_closeTrigger,...this.btn_close];
  // console.log(closeItemArray);
  if (closeItemArray.length) {
    closeItemArray.forEach((element)=>{
      element.addEventListener("click", function () {
          objThis.popupHide(objThis.selector);
      }, false);
    });
  }
  // if (this.btn_closeTrigger.length) {
  //     for (var i = 0; i < this.btn_closeTrigger.length; i++) {
  //         this.btn_closeTrigger[i].addEventListener("click", function () {
  //             objThis.popupHide(objThis.selector);
  //         }, false);
  //     }
  // }

  // if (this.bg_design_popup !== null){
  //     this.bg_design_popup.addEventListener("click", function (e) {
  //         e.preventDefault();
  //         objThis.popupHide(objThis.selector);
  //     }, false);
  // }
};