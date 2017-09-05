import { observable, action } from "mobx"

const modal = observable({
	page: 'login',
  isOpen: false
});

modal.open = action(function open(page) {
  modal.page = page;
  modal.isOpen = true;
});

modal.close = action(function close() {
  modal.isOpen = false;
});

export default modal;
