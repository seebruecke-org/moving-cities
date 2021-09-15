import ReactSelect, { components as C } from 'react-select';

const styles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '0 0.3rem 0.4rem rgba(0, 0, 0, .2)',
    color: 'black',
    fontFamily: 'Raptor',
    padding: '0.4rem 0.8rem',
    zIndex: 20,

    '&:hover': {
      border: '1px solid black'
    }
  }),

  indicatorSeparator: () => ({
    display: 'none'
  }),

  menu: (provided) => ({
    ...provided,
    boxShadow: '0 0.4rem 1.6rem rgba(0, 0, 0, .25)',
    marginTop: 0,
    zIndex: 10
  }),

  menuList: (provided) => ({
    ...provided,
    padding: 0
  }),

  option: (provided, state) => {
    const { options } = state;
    const index = options.findIndex((option) => option.label === state.label);

    return {
      ...provided,
      backgroundColor: state.isSelected ? '#FAF11A' : 'transparent',
      border: '0',
      color: 'black',
      fontFamily: 'Raptor',
      fontSize: '1.6rem',
      padding: '1.2rem 1.8rem',
      position: 'relative',

      '&:hover': {
        backgroundColor: '#FAF11A',
        cursor: 'pointer'
      },

      '&:before':
        index !== 0
          ? {
              backgroundColor: '#E1E1E1',
              content: '""',
              height: '1px',
              left: '1rem',
              position: 'absolute',
              right: '1rem',
              top: '0'
            }
          : {}
    };
  },

  placeholder: (provided) => ({
    ...provided,
    color: 'black',
    fontFamily: 'Raptor',
    fontSize: '1.6rem',
    fontWeight: '700'
  }),

  singleValue: (provided) => ({
    ...provided,
    color: 'black',
    fontFamily: 'Raptor',
    fontSize: '1.6rem',
    fontWeight: '700'
  }),

  valueContainer: (provided) => ({
    ...provided,
    color: 'black'
  })
};

function DropdownIndicator(props) {
  if (props.isFocused === true) {
    return (
      <C.DropdownIndicator {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="17"
          viewBox="0 0 28 17"
          fill="none"
        >
          <path stroke="#F55511" stroke-linecap="round" stroke-width="3" d="M26 15L14 3 2 15" />
        </svg>
      </C.DropdownIndicator>
    );
  }

  return (
    <C.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="17"
        viewBox="0 0 28 17"
        fill="none"
      >
        <path stroke="#F55511" stroke-linecap="round" stroke-width="3" d="M2 2l12 12L26 2" />
      </svg>
    </C.DropdownIndicator>
  );
}

export default function Select(props) {
  return (
    <ReactSelect
      styles={styles}
      isSearchable={false}
      /*defaultMenuIsOpen*/
      components={{ DropdownIndicator }}
      {...props}
    />
  );
}
