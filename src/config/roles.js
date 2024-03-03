const allRoles = {
  user: ['manageJobs', 'getJobs', 'getUsers', 'manageUsers'],
  admin: ['getUsers', 'manageUsers', 'manageJobs, getJobs',],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
