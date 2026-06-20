import ConventionalConfig from "@commitlint/config-conventional";
import { RuleConfigSeverity, type UserConfig } from "@commitlint/types";

const TYPES = [...ConventionalConfig.rules["type-enum"][2], "merge"];

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [RuleConfigSeverity.Disabled],
    "subject-max-length": [RuleConfigSeverity.Error, "always", 50],
    "type-enum": [RuleConfigSeverity.Error, "always", TYPES],
  },
};

export default Configuration;
