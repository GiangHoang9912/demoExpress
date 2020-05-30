function validateName(fullName) {
  let check = RegExp('[\\d!@#$%^&*(),.?:{}|<>_+="]').test(fullName);
  if (fullName.trim().length === 0 || !fullName || check) {
    check = false;
  } else {
    check = true;
  }
  return check;
}
function validateScore(score) {
  let check = false;
  if (score < 0 || !score || score > 10) {
    check = false;
  } else {
    check = true;
  }
  return check;
}

export { validateName, validateScore }