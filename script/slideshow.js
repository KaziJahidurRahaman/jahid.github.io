
  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
      showSlides(slideIndex += n);
  }

  function currentSlide(n) {
      showSlides(slideIndex = n);
  }

  function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("demo");
      let captionText = document.getElementById("caption");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
      captionText.innerHTML = dots[slideIndex - 1].alt;
  }

  // Fetch images from folder and create slideshow
  window.onload = function() {
      fetch('assets/photographs/')
          .then(response => response.json())
          .then(data => {
              const slideshowContainer = document.querySelector('.slideshow-container');
              const thumbnailContainer = document.getElementById('thumbnail-container');
              data.forEach((image, index) => {
                  const slide = document.createElement('div');
                  slide.classList.add('mySlides');
                  const slideNumber = document.createElement('div');
                  slideNumber.classList.add('numbertext');
                  slideNumber.textContent = `${index + 1} / ${data.length}`;
                  const img = document.createElement('img');
                  img.src = `assets/photographs/${image}`;
                  img.style.width = '100%';
                  const thumbnail = document.createElement('img');
                  thumbnail.classList.add('demo');
                  thumbnail.src = `assets/photographs/${image}`;
                  thumbnail.style.width = '100%';
                  thumbnail.onclick = function() { currentSlide(index + 1) };
                  slide.appendChild(slideNumber);
                  slide.appendChild(img);
                  slideshowContainer.appendChild(slide);
                  thumbnailContainer.appendChild(thumbnail);
              });
          })
          .catch(error => console.error('Error fetching images:', error));
  };
