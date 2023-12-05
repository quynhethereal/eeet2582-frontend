// this function is used to add style class to an element dynamically
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
