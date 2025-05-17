// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Vuetify
import { createVuetify } from 'vuetify';

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  defaults: {
    VChip: {
      variant: 'flat',
      size: 'small',
    },
    VTextField: {
      variant: 'outlined',
      density: 'compact',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'compact',
    },
    VCombobox: {
      variant: 'outlined',
      density: 'compact',
    },
  },
});
