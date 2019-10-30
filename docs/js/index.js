var btn = document.querySelector('.field__show-pass');

btn.onclick = () => {
  var input = btn.parentNode.querySelector('input');

  if ( input.type === 'password' ) {
    input.type = 'text';
    btn.classList.add('isShown');
  } else {
    input.type = 'password';
    btn.classList.remove('isShown')
  }
};
