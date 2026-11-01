// Info drawer content, keyed by route meta.id.
// Pages that share content (e.g. list/create/item views) can point at the same object.
//
// {
//   name: 'Optional override for route meta.title',
//   description: 'What the page is',
//   usage: ['Step one', 'Step two'],
//   status: 'live' | 'beta' | 'wip',
//   tags: ['Vue', 'DynamoDB'],
//   limitations: ['Known issue'],
//   improvements: ['Planned feature'],
//   links: [{ label: 'GitHub', url: 'https://github.com/...', icon: 'mdi-github', chip: 'Optional, e.g. repo name' }],
//   related: ['otherRouteId'],
//   updated: 'YYYY-MM-DD',
// }

import { githubUrl } from './projects';

const github = repo => ({ label: 'GitHub', url: githubUrl(repo), icon: 'mdi-github', chip: repo });

const home = {
  description: 'A personal portfolio of small tools and side projects. Each page is its own app, built and deployed separately and loaded into this site at runtime.',
  usage: [
    'Pick a project from the side menu',
    'Open this panel on any page to see what it does and how to use it',
    'Log in to access pages that save data to your account',
    'Use the sun/moon button to switch between light and dark themes',
  ],
  status: 'live',
  tags: ['Vue 3', 'Vuetify', 'Pinia', 'Module Federation', 'AWS Lambda', 'DynamoDB', 'Terraform'],
  improvements: [
    'Add an overview of each project to the home page',
  ],
  links: [github('web-adratcliff')],
  updated: '2026-11-01',
};

const fitness = {
  description: 'A personal fitness log for recording runs and tracking body weight over time. Only the backend for storing entries exists so far.',
  usage: [],
  status: 'wip',
  tags: ['Vue 3', 'AWS Lambda', 'DynamoDB'],
  limitations: [
    'There is no interface yet; this page is a placeholder',
    'Only runs (speed and duration segments) and body weight entries are supported by the backend',
  ],
  improvements: [
    'Forms for logging runs and weigh-ins',
    'Charts showing weight trends and run speed or duration over time',
    'Load the fitness app into this page in place of the placeholder',
  ],
  links: [],
  updated: '2024-12-07',
};

const recipes = {
  description: 'A recipe book for browsing, searching and cooking from saved recipes. Each recipe is split into sections with tools, ingredients and step-by-step instructions, and the ingredient list can be scaled and copied as a shopping list.',
  usage: [
    'Search by name or tap tag chips to filter the list',
    'Open a recipe to see its tools, ingredients and instructions',
    'Pick a quantity multiplier (0.5x to 3x) or combine ingredients across sections',
    'Copy or share the shopping list, then tick off ingredients and steps as you cook',
    'Log in and choose New Recipe to add your own, public or private',
  ],
  status: 'beta',
  tags: ['Vue 3', 'Vuetify', 'Pinia', 'AWS Lambda', 'DynamoDB'],
  limitations: [
    'Recipe images are not supported yet',
    'Cook times and ratings on recipe cards are placeholders',
    'Recipes cannot be edited or deleted once created',
    'Ticked ingredients and steps reset when the page reloads',
    'Logging in is required to create recipes',
  ],
  improvements: [
    'Photo upload for recipes',
    'Prep and cook time fields, shown on recipe cards',
    'Form validation before submitting',
    'Edit and delete pages',
    'Save cooking progress per recipe',
  ],
  links: [github('recipe-book')],
  updated: '2026-02-15',
};

const secretSanta = {
  description: 'Organise a Secret Santa: enter everyone\'s names and the draw happens straight away, then share one link so each person can privately find out who they\'re buying for. Not even the organiser can see who drew whom.',
  usage: [
    'Log in and click New Secret Santa',
    'Give it a title and add names one at a time, or paste a comma or line separated list',
    'Optionally add groups so couples or households don\'t draw each other, then click Create & Draw',
    'Copy the share link from the Organiser panel and send it to everyone',
    'Participants open the link, pick their name and set a 4 digit PIN to see who they\'re buying for',
  ],
  status: 'beta',
  tags: ['Vue 3', 'Vuetify', 'Pinia', 'AWS Lambda', 'DynamoDB'],
  limitations: [
    'Organisers need an account; participants don\'t',
    'A draw can\'t be edited after creation, only deleted and recreated',
    'Anyone with the link can claim any unclaimed name',
    'There are no email notifications; the organiser shares the link manually',
    'Revealed results are remembered in the browser, so use "Hide on this device" on shared devices',
  ],
  improvements: [
    'Edit participants and groups on an existing draw, with an automatic redraw',
    'Clearer error messages, e.g. when groups make a valid draw impossible',
    'Optionally email participants their link',
    'Budget, exchange date and wishlist fields',
  ],
  links: [github('secret-santa')],
  updated: '2026-11-01',
};

const rgb = {
  description: 'Pick a colour by its red, green and blue values, then build a chain of new colours by swapping which channel each value feeds into. Each step shows a swatch so you can compare how the colour changes as the channels are reordered.',
  usage: [
    'Enter Red, Green and Blue values from 0 to 255 to set the starting colour',
    'Click + next to the swatch to add a new step to the chain',
    'Use the + and - buttons beside each channel to swap it with the channel above or below',
    'Keep adding steps to compare several channel orderings side by side',
  ],
  status: 'beta',
  tags: ['Vue 3', 'Vite', 'Module Federation', 'SCSS'],
  limitations: [
    'Steps can only be added, not removed or reset',
    'Values outside 0 to 255 aren\'t clamped',
    'Long chains overflow the page horizontally',
    'Colours can only be entered as numbers',
    'The chain is lost on reload',
  ],
  improvements: [
    'Remove and reset controls for steps',
    'Clamp and validate RGB inputs',
    'Show hex codes and allow hex or colour picker input',
    'Wrap or scroll the chain on small screens',
  ],
  links: [github('rgb-crosser')],
  related: ['images'],
  updated: '2026-01-26',
};

const quantizer = {
  description: 'Upload an image and redraw it using only the colours in a palette you choose. Each pixel can be blurred first, then replaced with the perceptually nearest palette colour (matched in CIELAB space), giving a flat, poster-style result.',
  usage: [
    'Choose an image file, or keep the default sample',
    'Edit the palette: change colours with the swatch picker, remove them with x, or click Select New Colour then click a pixel in the image to sample it',
    'Set the blur radius (0 to 50) to smooth out noise before matching',
    'Click Generate and watch the progress bar',
    'Click Save to download the result as a PNG',
  ],
  status: 'beta',
  tags: ['Vue 3', 'Web Workers', 'Canvas API', 'CIELAB'],
  limitations: [
    'All processing runs in your browser, so large images and high blur values are slow',
    'The palette must be picked by hand',
    'Generation can\'t be cancelled once started',
    'New palette colours start fully transparent until edited',
    'Output is PNG only',
  ],
  improvements: [
    'Generate a palette automatically from the image (e.g. k-means or median cut)',
    'Faster processing with transferable buffers and a separable blur',
    'A cancel button',
    'Preset palettes',
  ],
  links: [github('mask-generator')],
  related: ['rgb'],
  updated: '2026-01-26',
};

const indoorCricket = {
  description: 'Browse and filter player statistics for an indoor cricket league, pulled live from the league\'s public stats page on Inside Sportz each time the page loads.',
  usage: [
    'Wait for the table to load, then click any column header to sort',
    'Click Add Filter, pick a field, then choose a team or division, type a name, or set a number comparison',
    'Click the selection button in the table header, tick several rows and click it again to merge them into one combined player',
    'Expand a merged row with the chevron to see the stats behind it',
    'Use Clear All Filters to reset the view',
  ],
  status: 'beta',
  tags: ['Vue 3', 'Vuetify', 'AWS Lambda', 'Cheerio', 'Inside Sportz'],
  limitations: [
    'Only one league and season is available',
    'Stats are fetched fresh on every visit, so loading can be slow and breaks if the source site is down or changes',
    'Merged players are lost when you refresh',
  ],
  improvements: [
    'League and season picker',
    'Cache stats on the backend instead of fetching on every visit',
    'Save player merges and allow them to be undone',
    'Charts for player trends',
  ],
  links: [github('indoor-stats')],
  updated: '2026-11-01',
};

export default {
  home,
  fitness,
  recipes,
  recipe: recipes,
  'recipe-new': recipes,
  secret: secretSanta,
  'secret-new': secretSanta,
  'secret-draw': secretSanta,
  rgb,
  images: quantizer,
  'indoor-cricket': indoorCricket,
};
