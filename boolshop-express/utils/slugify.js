function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-') // spazi o underscore → trattino
    .replace(/[^\w\-]+/g, '') // rimuove caratteri speciali
    .replace(/\-\-+/g, '-');  // sostituisce doppio trattino con singolo
}

module.exports = slugify;
