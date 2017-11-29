const getters = {
  getAllUsers: state => state.users,
  getUserOptions: state => {
    return state.users.map(user => {
      return {
        text: user.name,
        value: user
      };
    });
  },
  getCurrentUser: state => state.user
};

export default getters;
