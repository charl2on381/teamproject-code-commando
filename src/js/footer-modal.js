
(() => {
  const refs = {
    openModalBtn:
      document.querySelector(
        '[data-modal-open]'
      ) /*The Attribute [data-modal-open] links the openModalBtn selector 
      to the HTML element that has [data-modal-open] as an attribute, the samething applies to the two other selectors (below) inside this object */,

    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  //These two event listeners above call the "toggleModal()" function when they are triggered.

  function toggleModal() {
    refs.modal.classList.toggle('backdrop__is-hidden');
  }
  //This function "toggleModal()" adds and removes the class "backdrop__is-hidden" to the HTML element that has the attribute [data-modal]
})();
