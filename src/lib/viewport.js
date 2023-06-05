export default function inView (myElement) {
  if (!myElement) {
    return `inView fn: not existent selector`
  }
  const myElementHeight = myElement.offsetHeight;
  const myElementWidth = myElement.offsetWidth;

  const bounding = myElement.getBoundingClientRect();

  if (bounding.top >= -myElementHeight 
      && bounding.left >= -myElementWidth
      && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth
      && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) {

      return true
  } else {
      return false
  }
}
