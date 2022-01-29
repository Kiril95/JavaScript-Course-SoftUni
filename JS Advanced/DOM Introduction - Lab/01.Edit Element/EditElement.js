function editElement(element, match, replacer) {
    const matched = new RegExp(match, "g")
    element.textContent = element.textContent.replace(matched, replacer)
}