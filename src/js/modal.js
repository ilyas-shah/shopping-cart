// When the user clicks the button, open the modal
const modal = document.querySelector('.modal');
const editBtn = document.querySelectorAll('.edit');
const closeBtn = document.querySelectorAll('.c-btn-cancel');
const body = document.body;

const toggleModal = function (action) {
  const isOpen = action === 'open';

  modal.style.display = isOpen ? 'flex' : 'none';
  isOpen ? body.classList.add('modal-open') : body.classList.remove('modal-open');
};

editBtn.forEach((el) => el.addEventListener('click', () => toggleModal('open')));
// editBtn.addEventListener('click', showModal);
closeBtn.forEach((el) => el.addEventListener('click', () => toggleModal('close')));

window.addEventListener('click', function (e) {
  if (e.target === modal) toggleModal('close');
});
