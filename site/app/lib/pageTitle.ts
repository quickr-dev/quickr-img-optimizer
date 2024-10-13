export const pageTitle = (title: string | false) => ({
  title: title === false ? "Quickr" : `${title} | Quickr`,
})
