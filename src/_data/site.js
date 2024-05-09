const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080',
  },
  production: {
    url: 'https://faux.cab',
  },
};

// valid values for each fonticon vendor are:
//   local: load the fonticon resources from the deployed site
//   CDN:   load the fonticon resources from a remote CDN
//   false: don't load this fonticon
const fonticons = {
  fonticons: {
    fontawesome: 'CDN',
    lineawesome: false,
    lineawesome_use_fa_names: true,
    foundation: false,
    glyphicons: false,
    icomoon: false,
    ionicons: false,
    material: false,
    octicons: false,
  },
};

const SITE_TITLE = 'faux.cab';
const SITE_EMAIL = 'hello@faux.cab';

const navbar = {
  // `icon` is the class name for your icon set
  // (ex: for FontAwesome, 'pencil-alt')
  left: [
    {
      icon: 'home',
      text: '',
      color: '',
      link: '/',
    },
    {
      icon: 'pencil-alt',
      text: '',
      color: '',
      link: '/blog',
    },
  ],
  center: [
    {
      icon: '',
      text: SITE_TITLE,
      color: '',
      link: '',
    },
  ],
  right: [
    {
      icon: 'info-circle',
      text: '',
      color: '',
      link: `/about`,
    },
    {
      icon: 'file-alt',
      text: '',
      color: '',
      link: `/about/resume`,
    },
    {
      icon: 'envelope',
      text: '',
      color: '',
      link: `mailto:${SITE_EMAIL}`,
    },
  ],
};

const footer = {
  columns: [
    // total width of all columns must be 12
    {
      width: 12,
      align: 'center',
      content: [
        {
          icon: '',
          text: `Copyright &copy; ${new Date().getFullYear()}`,
          color: '',
          link: '',
        },
      ],
    },
  ],
};

module.exports = {
  title: SITE_TITLE,
  author: 'Joseph B. Hall (@groundh0g)',
  email: SITE_EMAIL,
  description: 'A site to store my terrible puns.',
  keywords: [],
  language: 'en-US',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png',
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
  config: {
    ...navbar,
    ...footer,
    ...fonticons,
  },
};
