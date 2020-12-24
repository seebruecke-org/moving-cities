const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CITY':
      return {
        ...state,
        cities: state.cities.map((city) => ({
          ...city,
          isActive: action.slug === city.slug
        }))
      };

    case 'SET_ACTIVE_NETWORK':
      return {
        ...state,
        networks: state.networks.map((network) => ({
          ...network,
          isActive: action.slug === network.slug
        }))
      };

    default:
      return state;
  }
};

export default reducer;
