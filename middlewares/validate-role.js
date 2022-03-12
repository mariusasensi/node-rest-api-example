
const isUserRole = (...rols) => {
  return (request, response, next) => {
    const authUser = request.user;
    if (!rols.includes(authUser.role)) {
      return response.status(403).json('Forbidden');
    }

    next();
  }
}

module.exports = {isUserRole};