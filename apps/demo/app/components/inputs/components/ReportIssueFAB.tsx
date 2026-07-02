import ReportIssueDialog from "@/app/components/overlays/components/ReportIssueDialog";
import { FAB, MaterialIcon } from "@suankularb-components/react";
import type { FC } from "react";

const ReportIssueFAB: FC = () => (
  <>
    <FAB
      color="tertiary"
      icon={<MaterialIcon icon="report" />}
      command="show-modal"
      commandfor="report-issue-dialog"
    >
      Report issue
    </FAB>
    <ReportIssueDialog />
  </>
);

export default ReportIssueFAB;
