# [1.5.0](https://github.com/pawcoding/Rainbow-Palette/compare/v1.4.0...v1.5.0) (2024-08-30)


### Bug Fixes

* **view:** delay drag start event on mobile to allow scrolling ([9ece515](https://github.com/pawcoding/Rainbow-Palette/commit/9ece5157ebd0da4e3b7ddb35ebfd0c489a91240c))
* **generator:** prevent generated palette from having duplicate color names ([4272690](https://github.com/pawcoding/Rainbow-Palette/commit/4272690682e9f89344c1d512f770466939c1a52c))
* **view:** prevent random color from having duplicate name ([0eaf7fd](https://github.com/pawcoding/Rainbow-Palette/commit/0eaf7fd4d4eec669d1e9ca03e519b194842da20c))
* **view:** prevent user from using duplicate color names ([7653316](https://github.com/pawcoding/Rainbow-Palette/commit/76533169b735315894c9832f75cf600a0e23e6eb))
* **view:** use correct min-height when display has more space then the ([e05a0e7](https://github.com/pawcoding/Rainbow-Palette/commit/e05a0e79d7c315ea3ae0b415a890df7daa3a2ca6))


### Features

* **util:** add utilities to filter and map arrays inside observables ([29e3d52](https://github.com/pawcoding/Rainbow-Palette/commit/29e3d52bfd41f433c9492a2f9449d3816734f798))
* **dialog:** allow custom validators in prompt dialog ([7753a10](https://github.com/pawcoding/Rainbow-Palette/commit/7753a10318c7d89fc6af32d2263d054d8bb51290))
* **palette-service:** allow reading of palette without updating internal state ([0160cd5](https://github.com/pawcoding/Rainbow-Palette/commit/0160cd5ffd9e65c2f5603981ea739b98ff6e388a))
* **view:** import colors from other palettes into current palette ([bba3afc](https://github.com/pawcoding/Rainbow-Palette/commit/bba3afc881e8f504e0d98556bd026b1a2faffbbc))
* **view:** search colors to import by hue ([a0b447f](https://github.com/pawcoding/Rainbow-Palette/commit/a0b447f984b2c0fdf29a5e9e975c2b3c88667990))

# [1.4.0](https://github.com/pawcoding/Rainbow-Palette/compare/v1.3.0...v1.4.0) (2024-08-15)


### Bug Fixes

* **clipboard:** better handling for errors when clipboard is not available ([416709b](https://github.com/pawcoding/Rainbow-Palette/commit/416709b07a769820a33b6f067d8da80396494e0e))
* **view:** disable export without colors ([232f19d](https://github.com/pawcoding/Rainbow-Palette/commit/232f19d3a2517392a2be4dd689f3e53608a7cf0f))
* **view:** don't warn about unsaved changes during update ([fa6bc1a](https://github.com/pawcoding/Rainbow-Palette/commit/fa6bc1aa2d089cb3bdaf3d82a18591d499f2f1ee))
* **editor:** open editor with correct width ([8208512](https://github.com/pawcoding/Rainbow-Palette/commit/8208512a9304abdb89beb288a55d83876fd6ea17))
* **export:** open editor with correct width ([a8757b1](https://github.com/pawcoding/Rainbow-Palette/commit/a8757b19ee74a09bccfcc2ec7347dad3e985cbdf))
* **matomo:** update route configuration in tracker ([d4e9784](https://github.com/pawcoding/Rainbow-Palette/commit/d4e97841f61d6c2a1c375f2da4b76e316346d394))
* **editor:** use correct cursor when save is disabled ([9cb46c2](https://github.com/pawcoding/Rainbow-Palette/commit/9cb46c2eb0a4ad7bdf29bb5861f7df4a34ad87aa))
* **export-modal:** use correct translation for close button ([e2a818b](https://github.com/pawcoding/Rainbow-Palette/commit/e2a818b542c8c1bbb5f4bb120d18530ac25ef70b))


### Features

* **no-palette:** add animation ([05e3c2a](https://github.com/pawcoding/Rainbow-Palette/commit/05e3c2a66b9d7758dad1293f73f3d6cc8e770c86))
* **confetti:** add confetti service ([62bbaec](https://github.com/pawcoding/Rainbow-Palette/commit/62bbaec706e132a8c296414188cac5613e0b0a62))
* **dialog:** add dialog component ([3e92ada](https://github.com/pawcoding/Rainbow-Palette/commit/3e92adab83ea9260b6ab5fb8bd58ec61534a7889))
* **generator:** add support for async palette generation ([74dab03](https://github.com/pawcoding/Rainbow-Palette/commit/74dab03d407e0cce6548da6e8fc7ac3213dd32f7))
* **toast:** add support for custom toast durations ([48d69e2](https://github.com/pawcoding/Rainbow-Palette/commit/48d69e262655e16d44928eb0bbfda9d0ae794431))
* **dialog:** handle I/O for dialog ([441462d](https://github.com/pawcoding/Rainbow-Palette/commit/441462d2c32428e563c957a0092698b54d2a3754))
* **dialog:** migrate `alert` to use custom dialog ([1ccc60a](https://github.com/pawcoding/Rainbow-Palette/commit/1ccc60adc93b24f3b31011086aedda3aca002851))
* **dialog:** migrate `confirm` to use custom dialog ([60a58dd](https://github.com/pawcoding/Rainbow-Palette/commit/60a58dd9bc4615b4c47a9f813cb658c64bdd4e28))
* **dialog:** migrate `prompt` to use custom dialog ([c86e785](https://github.com/pawcoding/Rainbow-Palette/commit/c86e785f476b24ea6070f4789a98f004c7aad9b2))
* **list:** prompt user to give duplicate palette a new name ([3727dc0](https://github.com/pawcoding/Rainbow-Palette/commit/3727dc05a329ab21daa76418f2ab539acacf1380))
* **view:** reorder colors with drag and drop ([7afb7cf](https://github.com/pawcoding/Rainbow-Palette/commit/7afb7cf9fcf7f2d1ca712cae075d31fc5ddba4f4))
* **export:** shoot confetti after successful export ([d94f2ee](https://github.com/pawcoding/Rainbow-Palette/commit/d94f2ee933a29e191c0faf5214a27608c6697316))
* **pwa:** shoot confetti after successful update ([b11871a](https://github.com/pawcoding/Rainbow-Palette/commit/b11871ab550f96c3095067eec32cc54c273675e7))

# [1.3.0](https://github.com/pawcoding/rainbow-palette/compare/v1.2.0...v1.3.0) (2024-06-30)


### Features

* **theme:** add `auto` theme that always uses a users preferred theme ([df83dae](https://github.com/pawcoding/rainbow-palette/commit/df83daec14da465bc6662edda00e9df8843a1786))
* **list:** duplicate palettes ([420a77a](https://github.com/pawcoding/rainbow-palette/commit/420a77ae2080e6aba8c43a6f43187a53aeb6ed41))

# [1.2.0](https://github.com/pawcoding/rainbow-palette/compare/v1.1.0...v1.2.0) (2024-06-08)


### Bug Fixes

* **navigation:** compare path for similarity not equality ([5d16a9f](https://github.com/pawcoding/rainbow-palette/commit/5d16a9ffbe29caf36feddbeac0e151bcc26d009f))
* **no-palette:** link back to list when palette not found ([396ab75](https://github.com/pawcoding/rainbow-palette/commit/396ab75ff6b620e47018afe770b4bf24abccec56))
* **index:** replace self-closing root element ([ebd2e51](https://github.com/pawcoding/rainbow-palette/commit/ebd2e518532e96c226a0e415fac6911f6aad60d2))
* **view:** treat newly generated palette as unsaved ([ca64f46](https://github.com/pawcoding/rainbow-palette/commit/ca64f46724a685ef635902875ae6eab8c468b279))
* **storybook:** update control type of `DropdownMenu` ([3caeb66](https://github.com/pawcoding/rainbow-palette/commit/3caeb668afdcf1d6c0e759d60ddbb6f88aea93d8))
* **view:** warn user about unsaved changes ([6c870ab](https://github.com/pawcoding/rainbow-palette/commit/6c870ab6219ecf0b8b4697232580d1a7de2d4ab4))


### Features

* **list:** add ability to save and load multiple palettes ([dc5e13f](https://github.com/pawcoding/rainbow-palette/commit/dc5e13fb5d2ac9af90716a409e1df862d26ea82f))
* **view:** add link to go back to list of palettes ([1d45e9b](https://github.com/pawcoding/rainbow-palette/commit/1d45e9bf57b7fbd6f5ccf77128a05f6bc73c4564))
* **list:** add list of palettes ([9f4bcae](https://github.com/pawcoding/rainbow-palette/commit/9f4bcae3abf3d42a9167ba6d6d35c3b5bd8841ce))
* **list:** add option to delete existing palettes ([9066744](https://github.com/pawcoding/rainbow-palette/commit/9066744e5f5998d277cfe704f87f2183406a2b0d))
* **view:** confirm closing of tab when palette has unsaved changes ([def986a](https://github.com/pawcoding/rainbow-palette/commit/def986ae8362ef352ecea5f074663a888654eacd))
* **view:** disable save button when no changes were made yet ([180a94e](https://github.com/pawcoding/rainbow-palette/commit/180a94eecae3f6b5f395eae74567c65b03b32fea))
* **list:** save name alongside id ([220065b](https://github.com/pawcoding/rainbow-palette/commit/220065bab91f4fcf299d81905842ba35b14d0d1d))

# [1.1.0](https://github.com/pawcoding/rainbow-palette/compare/v1.0.1...v1.1.0) (2024-03-26)


### Bug Fixes

* **ci:** add back chromatic action ([8436c28](https://github.com/pawcoding/rainbow-palette/commit/8436c2861199cabe154eaa7b69cf97eaf7f50761))
* **value:** copy value directly instead of by hex ([1e7d88f](https://github.com/pawcoding/rainbow-palette/commit/1e7d88f2e653737de03dd0914a1ea09fb4d74324))
* **layout:** enable click on RP logo ([bf47791](https://github.com/pawcoding/rainbow-palette/commit/bf477913eee2c6e2c41ed444b8a612a7a3361473))
* **view:** redirect to home on app start without palette ([ae36838](https://github.com/pawcoding/rainbow-palette/commit/ae368382fa4980e95b5059b31b973ee0e78c488c))


### Features

* **sitemap:** add sitemap generation ([3389b03](https://github.com/pawcoding/rainbow-palette/commit/3389b03abbcd9bf8eb242b0a837381f27393b136))
* **editor:** close editor with esc when no changes made ([42fa17d](https://github.com/pawcoding/rainbow-palette/commit/42fa17d2f1ce428eb3b53378a0c3122f089c0bec))
* **toast-stack:** upgrade toast service to show multiple toasts ([c5b38fa](https://github.com/pawcoding/rainbow-palette/commit/c5b38fa15289d5619fd9e928c82c7e120465dd8d))

## [1.0.1](https://github.com/pawcoding/rainbow-palette/compare/v1.0.0...v1.0.1) (2024-03-23)


### Bug Fixes

* **ci:** also update beta version on production release ([5b953b9](https://github.com/pawcoding/rainbow-palette/commit/5b953b943b126134dfa8e978cca0a182e265df4c))
* **ci:** run semver and publish in same action ([1f420d4](https://github.com/pawcoding/rainbow-palette/commit/1f420d44b0ba2b5bda9732f67c2d9c65eeb0044c))
* **ci:** update ngsw during semver ([04bfe38](https://github.com/pawcoding/rainbow-palette/commit/04bfe380d700a10c34335e386e8c1f51d546b2df))
* **ci:** use correct upload action ([ca6c1dd](https://github.com/pawcoding/rainbow-palette/commit/ca6c1ddab83dc9b2dff91de4eab332c25f62507b))

# 1.0.0 (2024-03-23)


### Bug Fixes

* **semver:** disable npm publish ([f13d1f8](https://github.com/pawcoding/rainbow-palette/commit/f13d1f8ce23161a0acbc09dbf9eadea61dc0178d))
* **view:** display text color with correct contrast ([ef133bf](https://github.com/pawcoding/rainbow-palette/commit/ef133bffcdf114075c06ea4aab9b5567f33eb7d0))
* **layout:** fix consent safe-area on desktop ([bcae061](https://github.com/pawcoding/rainbow-palette/commit/bcae06137bb26afb7fed357921a29cd572ac1018))
* **tests:** fix failing tests ([e4c9841](https://github.com/pawcoding/rainbow-palette/commit/e4c9841bf8814f1b287d563ebb31960622197b07))
* mock services in tests ([7f2a7f9](https://github.com/pawcoding/rainbow-palette/commit/7f2a7f9ef90cc2751d0f56a7bcba5cb75b97776f))
* **tests:** mock version service to not spam console ([aea439c](https://github.com/pawcoding/rainbow-palette/commit/aea439c9de1d4555cbf918bb7bcde3cbdc6623c3))
* **layout:** prevent duplicate scrollbar ([6eca4fc](https://github.com/pawcoding/rainbow-palette/commit/6eca4fc66d2bb45ec6008fb07128a6f06bf1f7d1))
* **analytics:** restyle consent popup ([c8fd03a](https://github.com/pawcoding/rainbow-palette/commit/c8fd03a5bb9aa52518e28eaa93a28a17d151636a))
* **home:** save generation settings between routing ([f2b883f](https://github.com/pawcoding/rainbow-palette/commit/f2b883f50616febce7fb0508d9b519938b8a6676))
* **dropdown:** update dropdown style ([039f38d](https://github.com/pawcoding/rainbow-palette/commit/039f38deaab8ad4f1769a657f4ce24c818276e69))
* **export:** update failing tests ([7e8501f](https://github.com/pawcoding/rainbow-palette/commit/7e8501fc1faa3b98d30f0e14704a808e9f3e39de))
* **toast:** update toast style ([a921d43](https://github.com/pawcoding/rainbow-palette/commit/a921d43a03cfb7a5b34e9208af95361f47544fd1))


### Features

* **editor:** add "add color" button ([7a180bf](https://github.com/pawcoding/rainbow-palette/commit/7a180bf757f0dd79d89105aedbde5f2cfee3c1cb))
* **shared:** add accordion component ([86e1bb7](https://github.com/pawcoding/rainbow-palette/commit/86e1bb763f952421296438d4cb4cef8e403936b8))
* **editor:** add actions for current palette ([d212dd8](https://github.com/pawcoding/rainbow-palette/commit/d212dd88a2d0c723e732c6d80c7c87a019842ee4))
* **home:** add additional info and support ([e99040c](https://github.com/pawcoding/rainbow-palette/commit/e99040c1a1003a60e7f6e502cbea31cad1015b00))
* **layout:** add basic layout ([275ed16](https://github.com/pawcoding/rainbow-palette/commit/275ed1670886f1da3bfef55ea30bbd8cb25b052b))
* **editor:** add color hex editor ([3cf2ae4](https://github.com/pawcoding/rainbow-palette/commit/3cf2ae44395f8ba2906b8284cfc34ba3a0fd595c))
* **editor:** add color hsl editor ([9d13dca](https://github.com/pawcoding/rainbow-palette/commit/9d13dca0ac66f1fe4781695684b9c1eb004a93fc))
* **shared:** add color name service ([1cbc542](https://github.com/pawcoding/rainbow-palette/commit/1cbc5428a434fc6859593624b68e0deee42ec89f))
* **analytics:** add consent management ([d152cca](https://github.com/pawcoding/rainbow-palette/commit/d152ccaf87d72940135db0faf1a7cfb1ab03d355))
* **shared:** add dialog service ([70a2d16](https://github.com/pawcoding/rainbow-palette/commit/70a2d161f26206ea5b2484b0e587e983e4596cdc))
* **editor:** add editor component drafts ([6b52384](https://github.com/pawcoding/rainbow-palette/commit/6b52384ea140b82a772a771b627bbe4e5a32af6d))
* **export:** add export dialog (1) ([891268d](https://github.com/pawcoding/rainbow-palette/commit/891268df01d5e1a61c1eb0aeea1e3d4f0d2bae22))
* **export:** add export dialog (2) ([acb44ec](https://github.com/pawcoding/rainbow-palette/commit/acb44ec51eda3e97cbb0a8ed198f5c3891318b2a))
* **icon:** add favicon ([85b6b46](https://github.com/pawcoding/rainbow-palette/commit/85b6b468cbcbd49d1d56659bee67a917415b4bb1))
* **home:** add generator component ([6fcba53](https://github.com/pawcoding/rainbow-palette/commit/6fcba533911ce6fa3645592fb91333f8058e533c))
* **toast:** add global toast service ([852f1bd](https://github.com/pawcoding/rainbow-palette/commit/852f1bd7b792a90565f933cbba31a0cac941f369))
* **imprint:** add imprint ([663939b](https://github.com/pawcoding/rainbow-palette/commit/663939b8a5dd41dbd40e92c4b1016c7ce061d872))
* **home:** add manual ([490a9be](https://github.com/pawcoding/rainbow-palette/commit/490a9bebd7c4f6c6eddc6d6c0eda3c6222e1adcd))
* **i18n:** add missing german translations ([10e2afa](https://github.com/pawcoding/rainbow-palette/commit/10e2afa997a985e1419c7011a74490cc4ffffb6b))
* add missing stories ([ca7c623](https://github.com/pawcoding/rainbow-palette/commit/ca7c6238d1d4b24c811746ac7bf2286059fb62bf))
* **analytics:** add page and custom event tracking ([210edae](https://github.com/pawcoding/rainbow-palette/commit/210edae94f8c3f93bfdd8e8ac1d5cf6fccf7ec16))
* **shared:** add palette service for palette generation ([8fc108d](https://github.com/pawcoding/rainbow-palette/commit/8fc108d7d6948dee3cef6f01af9c6b7443c4dab2))
* add storybook ([255492c](https://github.com/pawcoding/rainbow-palette/commit/255492cd95a853f46155ad6a42d3d63582057410))
* **a11y:** add tooltips ([032615e](https://github.com/pawcoding/rainbow-palette/commit/032615e7bfae12d74f825781a6abc5c3f2333194))
* **palette:** allow palette saving and loading ([9faf61d](https://github.com/pawcoding/rainbow-palette/commit/9faf61d6abd42e48a9444b17ac8457646a2206c0))
* **loading:** app loading indicator ([1d34f4c](https://github.com/pawcoding/rainbow-palette/commit/1d34f4c5d80d07db89123453a354126ed2a80754))
* **analytics:** cache offline events ([007a7c3](https://github.com/pawcoding/rainbow-palette/commit/007a7c3f27304fe2ee40e632262c7079b42ef120))
* **preview:** create preview preview component ([c231b1d](https://github.com/pawcoding/rainbow-palette/commit/c231b1d2396a76f7b95a5ed70bcd92164a32acda))
* **pwa:** enable pwa support ([3c2f4df](https://github.com/pawcoding/rainbow-palette/commit/3c2f4dfc835bffd21cdd4ae57d57056e10ae54e2))
* **shared:** export shared stuff in single entry point ([a2271ed](https://github.com/pawcoding/rainbow-palette/commit/a2271ed300d7f523c93c8523c73a048b7ad5f940))
* **angular:** initial project setup ([bdb9aaa](https://github.com/pawcoding/rainbow-palette/commit/bdb9aaa3a8d16a990034c34ce2940a03ae10ee6e))
* **editor:** provide service to open color editor ([65196db](https://github.com/pawcoding/rainbow-palette/commit/65196db5541e8daf9073d5a97cfbaa949eda47a2))
* **no-palette:** show error when no palette is available ([5b9c5fc](https://github.com/pawcoding/rainbow-palette/commit/5b9c5fccd1e36e2dd107387f73170a667e08e456))


### Performance Improvements

* **startup:** optimize initial bundle size ([4b9c333](https://github.com/pawcoding/rainbow-palette/commit/4b9c333bcb962c49e7ea0c05fb05e1287c1d882e))
