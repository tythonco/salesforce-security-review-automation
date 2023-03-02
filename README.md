# Salesforce Security Review Automation

## Background

Salesforce ISV partners are subject to a manual, deep-dive [security review](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/security_review_overview.htm) of the managed packages they distribute on the AppExchange.

This manual review process is required for the initial release of a package on the AppExchange and again in subsequent versions at the discretion of the Salesforce security review team.

In the interim, any package versions released can be auto-approved via the partner portal. However, even this auto-approval requires taking manual steps and submitting answers to the same questions about your package, many of which are unlikely to change.

This project aims to automate the task of submitting a package version for auto-approval on the partner portal by making use of Microsoft's excellent [Playwright](https://playwright.dev/) framework, used for web testing and automation.

## Setup

1. Install `node` and `sfdx` locally.

2. Run `npm install` to bring in all development dependencies.

3. Connect `sfdx` to your [PBO](https://partners.salesforce.com/s/education/general/Partner_Business_Org?language=en) used to log into the Salesforce partner portal with a set [alias](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference_alias_set.htm)

4. Copy the contents of `.env.example` to a new `.env` file and update placeholder values accordingly.

5. The default `scripts/automate-review.spec.ts` file will likely need to be updated based on your individual package. Currently, it fills in the minimal information required for a package that only leverages the Salesforce platform tech stack (Apex, LWC, etc.) Note: Although Playwright is capable of automating file uploads, the current script does not bother to upload Checkmarx scanner results or architectural documentation because the auto-approval process is not blocked when they are not provided, despite being marked as required in the security review wizard.

## Usage

`npm run review` will execute the Playwright script in headless mode.

`npm run live-review` will allow you to watch the automation live.

Either of the above commands can also be executed with the package version id pre-set: `npm run review 04tXXXXXXXXXXXXXXX` or `npm run live-review 04tXXXXXXXXXXXXXXX`

Otherwise, you will be prompted to provide the package version id at runtime; a default value will be pulled from `.env`

`npm start` and `npm test` can be used in lieu of `npm run review` and `npm run live-review`, respectively.

If Playwright encounters any issues then a new browser tab will open displaying an HTML report for troubleshooting.

`npm run report` will open the last HTML report run at any time.

## Additional Documentation

For more information on how to write/edit Playwright scripts see their [docs](https://playwright.dev/docs/writing-tests)

Playwright also has a nice test generator tool called [Codegen](https://playwright.dev/docs/codegen-intro)

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE.md)