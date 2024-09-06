function preventScroll(e: Event) {
  e.preventDefault()
  e.stopPropagation()
}

export default preventScroll
