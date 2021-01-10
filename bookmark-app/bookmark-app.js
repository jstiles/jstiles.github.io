const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = {};  // use object, more efficient to search, original design used array

// show modal, focus on input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

// modal even listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', (e) => (e.target === modal ? modal.classList.remove('show-modal') : false));

// validate form
function validate(nameValue, urlValue) {
  const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields');
    return false;
  }

  if (!urlValue.match(regex)) {
    alert('Please provide a valid web address !!!')
    return false;
  }
  // valid data
  return true;
}

// build bookmarks DOM
function buildBookmarks() {
  // remove all bookmark elements
  bookmarksContainer.textContent = '';
  // build items
  Object.keys(bookmarks).forEach((id) => {
    const { name, url } = bookmarks[id];
    // item
    const item = document.createElement('div');
    item.classList.add('item');
    // close icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onclick', `deleteBookmark('${id}')`);
    // favicon / link container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');  // open in new tab
    link.textContent = name;
    // append to bookmarks container
    linkInfo.append(favicon, link);    // don't use appendChild need multiple
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// fetch bookmarks from local local local
function fetchBookmarks() {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    // use object, more efficient than array for this
    const id = `https://ieee.org`
    bookmarks[id] = {
    	name: 'IEEE',
    	url: 'https://ieee.org',
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// delete bookmark
function deleteBookmark(id) {
  // -- using object, don't need to loop through array or use splice method, more efficient
  if (bookmarks[id]) {
    delete bookmarks[id]
  }

  // update bookmarks array in local storage  re-populate domain
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

// handle data from form
function storeBookmark(e) {
  e.preventDefault();   // --prevent default behavior of submit and refreshing
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks[urlValue] = bookmark;

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // name, array
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();  // go back to first input field
}

// general event listener (validation)
bookmarkForm.addEventListener('submit', storeBookmark);

// on load, get bookmarks
fetchBookmarks();
