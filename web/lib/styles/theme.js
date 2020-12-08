const map = {
  'cities': '--color-purple',
  'networks': '--color-red',
  'activities': '--color-yellow-dark'
};

export default (name) => `
  --color-theme: var(${map[name]});
`;
