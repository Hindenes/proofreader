function replaceRange(range, html, selectInserted = false) {
  range.deleteContents();

  // Create a DocumentFragment to insert and populate it with HTML
  // Need to test for the existence of range.createContextualFragment
  // because it's non-standard and IE 9 does not support it
  let fragment;
  if (range.createContextualFragment) {
      fragment = range.createContextualFragment(html);
  } else {
      // In IE 9 we need to use innerHTML of a temporary element
      var div = document.createElement("div"), child;
      div.innerHTML = html;
      fragment = document.createDocumentFragment();
      while ( (child = div.firstChild) ) {
          fragment.appendChild(child);
      }
  }

  var firstInsertedNode = fragment.firstChild;
  var lastInsertedNode = fragment.lastChild;
  range.insertNode(fragment);
  if (selectInserted) {
      if (firstInsertedNode) {
          range.setStartBefore(firstInsertedNode);
          range.setEndAfter(lastInsertedNode);
      }
      sel.removeAllRanges();
      sel.addRange(range);
  }
}


function wrapDeleted(fragment){
  const wrapper = document.createElement('span');
  wrapper.appendChild(fragment);
  wrapper.classList.add('text-deleted');
  return wrapper;
}

function wrapAdded(fragment){
  const wrapper = document.createElement('span');
  wrapper.appendChild(fragment);
  wrapper.classList.add('text-added');
  return wrapper;
}

function revertButtonClick(button, e) {
  const diffContainer = button.parentNode.parentNode;
  const textDeleted = diffContainer.getElementsByClassName('text-deleted')[0].innerHTML;
  diffContainer.outerHTML = textDeleted;
}

export function diffRange(range, html) {
  const deletedFragment = range.extractContents();

  // Create a DocumentFragment to insert and populate it with HTML
  // Need to test for the existence of range.createContextualFragment
  // because it's non-standard and IE 9 does not support it
  let newFragment;
  if (range.createContextualFragment) {
      newFragment = range.createContextualFragment(html);
  } else {
      // In IE 9 we need to use innerHTML of a temporary element
      var div = document.createElement("div"), child;
      div.innerHTML = html;
      newFragment = document.createDocumentFragment();
      while ( (child = div.firstChild) ) {
          fragment.appendChild(child);
      }
  }

  console.log(deletedFragment.children[0].children[0]);
  console.log(deletedFragment.children[0].children[1]);

  Array.prototype.forEach.call(deletedFragment.children[0].children, elem => {
    console.log('elem', elem);
    if(elem.classList.contains('text-added')) {
      console.log('rm');
      elem.outerHTML = '';
    } else {
      console.log('rm container');
      elem.outerHTML = elem.innerHTML;
    }
  });

  const fragment = document.createDocumentFragment();
  const container = document.createElement('span');
  container.classList.add('diff-container');


  const revertButton = document.createElement('button');
  revertButton.classList.add('revert-btn');
  revertButton.innerHTML = 'x';
  revertButton.addEventListener('click', revertButtonClick.bind(null, revertButton));

  const revertButtonContainer = document.createElement('span');
  revertButtonContainer.classList.add('revert-btn-container');
  revertButtonContainer.appendChild(revertButton);

  container.appendChild(revertButtonContainer);
  container.appendChild(wrapDeleted(deletedFragment));
  container.appendChild(wrapAdded(newFragment));
  fragment.appendChild(container);
  range.insertNode(fragment);
}

export function wrapRange(range, wrapperElementType) {
  const clone = range.cloneContents();
  const elem = document.createElement(wrapperElementType);
  elem.classList.add("text-highlighted");
  range.surroundContents(elem);
  return clone;
}

export function styleRange(range) {
  const deletedFragment = range.extractContents();

  // Create a DocumentFragment to insert and populate it with HTML
  // Need to test for the existence of range.createContextualFragment
  // because it's non-standard and IE 9 does not support it
  let newFragment;
  if (range.createContextualFragment) {
      newFragment = range.createContextualFragment(html);
  } else {
      // In IE 9 we need to use innerHTML of a temporary element
      var div = document.createElement("div"), child;
      div.innerHTML = html;
      newFragment = document.createDocumentFragment();
      while ( (child = div.firstChild) ) {
          fragment.appendChild(child);
      }
  }

  const fragment = document.createDocumentFragment();
  fragment.appendChild(wrapDeleted(deletedFragment));
  fragment.appendChild(wrapAdded(newFragment));

  range.insertNode(fragment);
}

export default replaceRange;
