$(function(){

  //ACTIVE NAVIGATION BUTTONS

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav__link').forEach((link) => {
          link.classList.toggle('nav__link--active',
          link.getAttribute('href').replace('#', '') === entry.target.id);
        });
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('section').forEach(section => { observer.observe(section) 
  });

  //ANCHORS

  let anchors = document.querySelectorAll('a[href*="#home"],a[href*="#about"],a[href*="#portfolio"],a[href*="#contact"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function(event){
      event.preventDefault();

      let blockID = anchor.getAttribute('href');

      document.querySelector('' + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start"
      })
    })
  }

  //FORM

  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
    
    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok){
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      }else{
        alert("ERROR");
      }
      
    }else{
      alert('EMPTY');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      }else{
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  //FUNCTION TEST EMAIL

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

});
  