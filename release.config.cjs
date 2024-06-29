const branch = process.env.GITHUB_REF_NAME;

const assetsToUpdate = ['package.json', 'pnpm-lock.yaml', 'ngsw-config.json', 'src/sitemap.xml'];
if (branch === 'master') {
  assetsToUpdate.push('CHANGELOG.md');
}

const config = {
  branches: ['master', { name: 'staging', channel: 'next', prerelease: true }],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' }
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        }
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        },
        writerOpts: {
          commitsSort: ['subject', 'scope']
        }
      }
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: assetsToUpdate
      }
    ],
    '@semantic-release/github'
  ]
};

module.exports = config;
