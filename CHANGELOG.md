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
