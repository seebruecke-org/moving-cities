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

    case 'SET_HIGHLIGHTED_CITY':
      return {
        ...state,
        cities: state.cities.map((city) => ({
          ...city,
          isHighlighted: action.slug === city.slug
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

    case 'SET_HIGHLIGHTED_NETWORK':
      return {
        ...state,
        networks: state.networks.map((network) => ({
          ...network,
          isHighlighted: action.slug === network.slug
        }))
      };

    default:
      return state;
  }
};

export default reducer;
