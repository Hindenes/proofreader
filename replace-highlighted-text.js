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

export default replaceRange;
