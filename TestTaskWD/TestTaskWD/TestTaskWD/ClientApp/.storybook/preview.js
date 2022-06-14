import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { addDecorator } from "@storybook/angular";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { withTests } from "@storybook/addon-jest";
// import results from "../.jest-test-results.json";

export const decorators = [
  mswDecorator,
  withTests({
    // results,
    filesExt: "((\\.specs?)|(\\.tests?))?(\\.ts)?$",
  }),
];

initialize();
addDecorator(mswDecorator);
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
};
