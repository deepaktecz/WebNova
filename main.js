// Menu icon aur nav ko select karo
const menuIcon = document.querySelector('.menu-icon');
const navMenu  = document.getElementById('navMenu');

// Ye function HTML me onclick se call ho raha hai
function toggleMenu() {
  navMenu.classList.toggle('open');   // open class add/remove
}

// Page par kahin bhi click hote hi menu close
document.addEventListener('click', function (e) {
  // Agar click menu ke bahar hai AUR icon ke bahar hai
  if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
    navMenu.classList.remove('open');
  }
});