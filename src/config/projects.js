// Projects listed on the home page, including backend repos with no page of their own.
//
// {
//   name: 'Display name',
//   description: 'One or two sentence summary',
//   repo: 'github-repo-name',
//   type: 'frontend' | 'backend' | 'infra',
//   route: 'Optional route meta.id; adds a link to the page and uses its icon',
//   icon: 'Icon when there is no route',
//   disabled: true, // optional, hides the project from the list
// }

export const githubUrl = repo => `https://github.com/adratcliff/${repo}`;

export default [
  {
    name: 'Portfolio Site',
    description: 'This site, which loads in each project as its own app.',
    repo: 'web-adratcliff',
    type: 'frontend',
    route: 'home',
    icon: 'mdi-web',
  },
  {
    name: 'Recipe Book',
    description: 'Browse and create recipes.',
    repo: 'recipe-book',
    type: 'frontend',
    route: 'recipes',
  },
  {
    name: 'Indoor Cricket Stats',
    description: 'Sort and filter player stats from an indoor cricket league.',
    repo: 'indoor-stats',
    type: 'frontend',
    route: 'indoor-cricket',
  },
  {
    name: 'Secret Santa',
    description: 'Run a Secret Santa draw.',
    repo: 'secret-santa',
    type: 'frontend',
    route: 'secret',
  },
  {
    name: 'RGB Switcher',
    description: 'Swap RGB channels to build chains of related colours.',
    repo: 'rgb-crosser',
    type: 'frontend',
    route: 'rgb',
  },
  {
    name: 'Quantizer',
    description: 'Redraw an image using only the colours in a chosen palette.',
    repo: 'mask-generator',
    type: 'frontend',
    route: 'images',
  },
  {
    name: 'Audio Visualiser',
    description: 'Generate a waveform for an audio file.',
    repo: 'audio-visualiser',
    type: 'frontend',
    icon: 'mdi-waveform',
  },
  {
    disabled: true,
    name: 'Fitness Tracker',
    description: 'Log runs and track body weight. Work in progress.',
    repo: 'fitness-tracker',
    type: 'frontend',
    route: 'fitness',
  },
  {
    name: 'API',
    description: 'Node.js Lambda functions behind the site.',
    repo: 'lambda-adratcliff_06092024',
    type: 'backend',
    icon: 'mdi-lambda',
  },
  {
    name: 'Lambda Layers',
    description: 'Shared helpers used across the Lambda functions.',
    repo: 'lambda-adratcliff-layers_06092024',
    type: 'backend',
    icon: 'mdi-layers-outline',
  },
  {
    name: 'Infrastructure',
    description: 'Terraform for the AWS setup.',
    repo: 'terraform-adratcliff',
    type: 'infra',
    icon: 'mdi-terraform',
  },
];
