export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
)

export const validName = new RegExp("^[a-zA-Z]{2,40} [a-zA-Z]{2,40}$")
export const validCity = new RegExp("^[a-zA-Z]{2,40}$")
// export const validZip = new RegExp("^d{5}|d{5}-d{4}$")
// export const validZip = new RegExp("/(^d{5}$)|(^d{5}-d{4}$)/")
export const validZip = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$")
export const validNumber = new RegExp("^[0-9]+$")
