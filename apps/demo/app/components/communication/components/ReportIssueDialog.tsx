import {
  Button,
  Checkbox,
  Columns,
  FormItem,
  FullscreenDialog,
  SegmentedButton,
} from "@suankularb-components/react";
import { snackbar } from "@suankularb-components/react/helpers";
import { useState, type FC } from "react";

const ReportIssueDialog: FC = () => {
  const [understood, setUnderstood] = useState(false);

  const [view, setView] = useState<"bug-report" | "feature-request">(
    "bug-report",
  );
  // const [issueTitle, setIssueTitle] = useState("");
  // const [issueDesc, setIssueDesc] = useState("");
  // const [issueExpect, setIssueExpect] = useState("");
  // const [showDiscard, setShowDiscard] = useState(false);

  return (
    <FullscreenDialog
      id="report-issue-dialog"
      title="Report an issue"
      action={
        <Button
          appearance="text"
          command="request-close"
          commandfor="report-issue-dialog"
          onClick={() => {
            snackbar.push(
              "Report submitted",
              <Button appearance="text">View</Button>,
            );
          }}
        >
          Submit
        </Button>
      }
      width={820}
    >
      <Columns columns={2}>
        <div className="flex flex-col gap-4">
          <p id="dialog-report-an-issue">
            If you have a GitHub account, please consider reporting issues on
            our{" "}
            <a
              href="https://github.com/suankularb-wittayalai-school/mysk-frontend"
              target="_blank"
              className="text-primary font-bold underline"
            >
              GitHub repository
            </a>
            . Thank you!
          </p>
          <FormItem
            label="I have already queried the issues page and cannot find my
                issue."
          >
            <Checkbox value={understood} onChange={setUnderstood} />
          </FormItem>
          <SegmentedButton alt="View" full className="pb-4">
            <Button
              appearance="outlined"
              selected={view === "bug-report"}
              onClick={() => setView("bug-report")}
            >
              Bug report
            </Button>
            <Button
              appearance="outlined"
              selected={view === "feature-request"}
              onClick={() => setView("feature-request")}
            >
              Feature request
            </Button>
          </SegmentedButton>
        </div>
        <div>
          <div className="flex h-104 flex-col gap-12 pb-12">
            {/* <TextField
              appearance="outlined"
              label="Title"
              behavior="single-line"
              helperMsg="What is your issue?"
              value={issueTitle}
              onChange={setIssueTitle}
            />
            <TextField
              appearance="outlined"
              label="Description"
              behavior="textarea"
              helperMsg="A clear and concise description."
              value={issueDesc}
              onChange={setIssueDesc}
            />
            <TextField
              appearance="outlined"
              label="Expectation"
              behavior="textarea"
              helperMsg="What you expected to have happened/think should be implemented."
              value={issueExpect}
              onChange={setIssueExpect}
            /> */}
          </div>
        </div>
      </Columns>
    </FullscreenDialog>
  );
};

export default ReportIssueDialog;
