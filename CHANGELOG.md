## [1.8.12](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.11...1.8.12) (2025-02-22)


### Bug Fixes

* **docker:** copy node_modules from builder stage to optimize Docker image ([8335bf1](https://github.com/Billos/firefly-iii-leftover-manager/commit/8335bf1463b95c195dc4a5dd8b3b97a0de2b6995))

## [1.8.11](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.10...1.8.11) (2025-02-22)


### Bug Fixes

* **docker:** update Node.js version and optimize Dockerfile for multi-stage builds ([e108bf1](https://github.com/Billos/firefly-iii-leftover-manager/commit/e108bf11a40bb6a5761b9a1b1910b9425beaed2b))

## [1.8.10](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.9...1.8.10) (2025-02-13)


### Bug Fixes

* **budget:** budget limit is the LeftOver + already spent ([67995bb](https://github.com/Billos/firefly-iii-leftover-manager/commit/67995bb65e9ccff6d7bf08addf7f6f31dcc667dd))

## [1.8.9](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.8...1.8.9) (2025-02-11)


### Bug Fixes

* **budget:** filter inactive bills when updating budget limits ([8b82e51](https://github.com/Billos/firefly-iii-leftover-manager/commit/8b82e5126406abc921243c0b2f133255790ca672))
* **budget:** improve leftover budget calculation using the leftover of this budget ([0caaf5d](https://github.com/Billos/firefly-iii-leftover-manager/commit/0caaf5d1186711b9b3ec5d4c6583509d53c69190))
* **budget:** update auto budgets at start ([832b487](https://github.com/Billos/firefly-iii-leftover-manager/commit/832b4872ec78d54e552d75f436ef95a8f4073d02))

## [1.8.8](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.7...1.8.8) (2025-02-09)


### Bug Fixes

* **transaction:** Setting a budget redirects to the transaction show page ([acb8a88](https://github.com/Billos/firefly-iii-leftover-manager/commit/acb8a889522cf2f74daba2808dd100225e67ee46))

## [1.8.7](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.6...1.8.7) (2025-02-09)


### Bug Fixes

* **transaction:** do not regular check the unbudgeted transactions if they already have a specified messageId ([ad93434](https://github.com/Billos/firefly-iii-leftover-manager/commit/ad93434a171b8745dbd62a38ddf7aebf9e3b3b3a))

## [1.8.6](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.5...1.8.6) (2025-02-06)


### Bug Fixes

* **checkUnbudgetedTransactions:** rename file and implement hourly check for unbudgeted transactions ([1617a4a](https://github.com/Billos/firefly-iii-leftover-manager/commit/1617a4a82c1f618470e5510f45cc35828760b043))

## [1.8.5](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.4...1.8.5) (2025-02-05)


### Bug Fixes

* **transaction:** add periodic check for unbudgeted transactions ([8282785](https://github.com/Billos/firefly-iii-leftover-manager/commit/8282785a6d79f5eb7453c6ca5e7d76b1374f9553))

## [1.8.4](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.3...1.8.4) (2025-02-02)


### Bug Fixes

* **checkUnbudgetedTransactions:** update link format and message separator ([f43e212](https://github.com/Billos/firefly-iii-leftover-manager/commit/f43e212c30977e3c299c63408aab0a227f3316b6))

## [1.8.3](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.2...1.8.3) (2025-02-02)


### Bug Fixes

* **checkUnbudgetedTransactions:** open transaction link in a new tab ([a3fe6a0](https://github.com/Billos/firefly-iii-leftover-manager/commit/a3fe6a0e2cdffe800ec235a1afe96e9f77c5c44a))

## [1.8.2](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.1...1.8.2) (2025-02-02)


### Bug Fixes

* **checkUnbudgetedTransactions:** validate transaction type as withdrawal before processing ([ecf45b2](https://github.com/Billos/firefly-iii-leftover-manager/commit/ecf45b2230efa325985d51e1ae5ea9cecb2304f2))
* **config:** add assetAccountId to configuration ([7b62cdb](https://github.com/Billos/firefly-iii-leftover-manager/commit/7b62cdb3cb3b99e087288819cb8f6d8cc7f8d39d))
* **env:** clean config ([8c26c68](https://github.com/Billos/firefly-iii-leftover-manager/commit/8c26c68bfff707c2a2551c88873e323797af2572))
* **updateLeftoversBudget:** set leftover amount to 0.1 if negative ([6aaf9a9](https://github.com/Billos/firefly-iii-leftover-manager/commit/6aaf9a9248372a3a4e6e8742914b1ddd0d538c12))
* **updateLeftoversBudget:** using asset account balance to compute leftover amount ([6a901e9](https://github.com/Billos/firefly-iii-leftover-manager/commit/6a901e9e62d5fcf9c7e4e998644f5fc082c70fdd))

## [1.8.1](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.8.0...1.8.1) (2025-02-01)


### Bug Fixes

* **BudgetsService:** correct URL for fetching transactions without budget ([4016136](https://github.com/Billos/firefly-iii-leftover-manager/commit/401613610ce5b3ab24386dae6870364112c418cb))
* **checkUnbudgetedTransactions:** Using the transaction Without budget api rather than computing those ourself ([a54dffd](https://github.com/Billos/firefly-iii-leftover-manager/commit/a54dffd82339441c63086d35908f40ec92312ffc))
* **request:** handle response parsing for string and object types ([dbe82f0](https://github.com/Billos/firefly-iii-leftover-manager/commit/dbe82f076dba9412ab8bfa51e78288f180fd7530))

# [1.8.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.7.1...1.8.0) (2025-02-01)


### Bug Fixes

* **OpenAPI:** update BASE URL to include /api path ([67c3b6a](https://github.com/Billos/firefly-iii-leftover-manager/commit/67c3b6a757dc0adc0288106ed0257105bdaa8fbe))


### Features

* **checkUnbudgetedTransactions:** add transaction link to message output ([6667844](https://github.com/Billos/firefly-iii-leftover-manager/commit/666784412c5f02d70426ba041a4382f0efa67dda))

## [1.7.1](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.7.0...1.7.1) (2025-02-01)


### Bug Fixes

* **updateLeftoversBudget:** prevent updating budget with negative leftover amount ([d66e1dc](https://github.com/Billos/firefly-iii-leftover-manager/commit/d66e1dc05db343e29c3c4c2e111d9ad2b8b3826b))

# [1.7.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.6.0...1.7.0) (2025-01-31)


### Features

* **webhooks:** add transaction webhook endpoint and check unbudgeted transaction ([ff83a1c](https://github.com/Billos/firefly-iii-leftover-manager/commit/ff83a1c3d20a8067f6ccdeeab114c555d028f0b8))

# [1.6.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.5.1...1.6.0) (2025-01-31)


### Features

* **transactionHandler:** add Gotify integration for unbudgeted transaction notifications ([bbf512e](https://github.com/Billos/firefly-iii-leftover-manager/commit/bbf512e2c61daadf2bf800ee2d0f7635e5db9a6b))

## [1.5.1](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.5.0...1.5.1) (2025-01-23)


### Bug Fixes

* **checkUnbudgetedTransactions:** update deleteDiscordMessage to accept transactionId and adjust route parameters ([686a581](https://github.com/Billos/firefly-iii-leftover-manager/commit/686a581516f874d4b3ef0d4bd1b5389ce08008b2))

# [1.5.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.4.0...1.5.0) (2025-01-23)


### Bug Fixes

* **checkUnbudgetedTransactions:** add error handling for Discord message updates ([470771c](https://github.com/Billos/firefly-iii-leftover-manager/commit/470771c49055f88f2891dd6ddd68e61098bedb12))
* **checkUnbudgetedTransactions:** filter out specific budgets from the list ([b685e57](https://github.com/Billos/firefly-iii-leftover-manager/commit/b685e57f5edf4a7ec585668ee10f175179c9122c))
* **discord:** change message ID type from number to string in Discord message functions ([2d96302](https://github.com/Billos/firefly-iii-leftover-manager/commit/2d96302ecbb278f9a12464b3f1350ad8dc8cb270))


### Features

* **checkUnbudgetedTransactions:** manage Discord message IDs in transaction notes ([4c13aba](https://github.com/Billos/firefly-iii-leftover-manager/commit/4c13aba59467cb1d00497361ff51066c2493da03))

# [1.4.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.3.1...1.4.0) (2025-01-22)


### Bug Fixes

* **index:** simplify logging for budget setting in transaction ([b903598](https://github.com/Billos/firefly-iii-leftover-manager/commit/b90359810fbdee8d92035046b5b4e71e4166e027))


### Features

* **paypal:** Add API types for a Paypal account ([b7c926f](https://github.com/Billos/firefly-iii-leftover-manager/commit/b7c926f0f086d8f56711b214e72713b0e37bfecf))
* **paypal:** Link paypal transactions ([d601839](https://github.com/Billos/firefly-iii-leftover-manager/commit/d6018396bf3e91ef7b609bfefc46f9076ea1ee6d))

## [1.3.1](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.3.0...1.3.1) (2025-01-21)


### Bug Fixes

* **index:** remove unused sleep utility import ([ae7efc9](https://github.com/Billos/firefly-iii-leftover-manager/commit/ae7efc9a534eaa8f84a33eb2676e08bea489cebd))
* **transactions:** streamline transaction update process and improve response handling ([1bf95b2](https://github.com/Billos/firefly-iii-leftover-manager/commit/1bf95b26fda608f941fa4a244172d8117c1554b9))

## [1.3.1](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.3.0...1.3.1) (2025-01-21)


### Bug Fixes

* **transactions:** streamline transaction update process and improve response handling ([1bf95b2](https://github.com/Billos/firefly-iii-leftover-manager/commit/1bf95b26fda608f941fa4a244172d8117c1554b9))

# [1.3.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.2.0...1.3.0) (2025-01-21)


### Features

* **transactions:** add sleep utility and improve Discord message handling ([d11b0da](https://github.com/Billos/firefly-iii-leftover-manager/commit/d11b0da51b74bf5ec08381edbd215da07e4a3b45))

# [1.2.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.1.0...1.2.0) (2025-01-18)


### Features

* **discord:** enhance message handling with update and delete functionality ([efdcb2a](https://github.com/Billos/firefly-iii-leftover-manager/commit/efdcb2a1bf5480a51ac08527cc07811f72b6d9d6))

# [1.1.0](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.0.1...1.1.0) (2025-01-18)


### Features

* **index:** update response handling and refactor request parameters ([1f89954](https://github.com/Billos/firefly-iii-leftover-manager/commit/1f89954b769b58b1a6278e61df50258ab367d55b))
* **no-budget:** add no-budget transactions check and notification ([94e5ff5](https://github.com/Billos/firefly-iii-leftover-manager/commit/94e5ff5dd4b9bc1b4876a03f0ed3b41a30ef2687))
* **transactions:** add service URL and update unbudgeted transactions handling ([d0abd05](https://github.com/Billos/firefly-iii-leftover-manager/commit/d0abd05df2c129780bab4cab8e573f7d5a4c6ee0))

## [1.0.1](https://github.com/Billos/firefly-iii-leftover-manager/compare/1.0.0...1.0.1) (2025-01-08)


### Bug Fixes

* **api:** Add POST method to trigger endpoint ([8e02ced](https://github.com/Billos/firefly-iii-leftover-manager/commit/8e02ceda5a3f8304f8ef9e88ec74d48b47901bb9))

# 1.0.0 (2025-01-07)


### Bug Fixes

* **docker:** Add env_file to development configuration ([64fb383](https://github.com/Billos/firefly-iii-leftover-manager/commit/64fb3837420afb1fda762ecb4b1d1216ea479d5a))
* **package:** Update repository field format in package.json ([36b9116](https://github.com/Billos/firefly-iii-leftover-manager/commit/36b9116c8021514fac897e78b9241d463902fcd7))
* **release:** Remove npm plugin from release configuration ([e9966d1](https://github.com/Billos/firefly-iii-leftover-manager/commit/e9966d190d94c29fddb20ac2f7ca64c91d5427f3))


### Features

* **API:** Import FireflyIII types ([8a736c1](https://github.com/Billos/firefly-iii-leftover-manager/commit/8a736c164f1dc40644fa5db801ca3db9d83a56cd))
* **Budget:** Compute Bills and Leftover budgets amounts ([de542cf](https://github.com/Billos/firefly-iii-leftover-manager/commit/de542cf3ad0342914179cf865d8da3be74119313))
* **OpenAPI:** Update base URL and headers to use environment variables to use the OpenAPI provided functions ([d38f33d](https://github.com/Billos/firefly-iii-leftover-manager/commit/d38f33d1ef5680f78862aa792cdff0dc0ec9d40b))
