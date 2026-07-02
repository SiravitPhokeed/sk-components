import CurrentPeriodCard from "@/app/examples/search/components/CurrentPeriodCard";
import PersonContactGrid from "@/app/examples/search/components/PersonContactGrid";
import PersonHeader from "@/app/examples/search/components/PersonHeader";
import PersonInformationGrid from "@/app/examples/search/components/PersonInformationGrid";
import SearchDetailsCard from "@/app/examples/search/components/SearchDetailsCard";
import StudentCard from "@/app/examples/search/components/StudentCard";
import PageHeader from "@/components/PageHeader";
import { Card, Search, SplitLayout } from "@suankularb-components/react";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Search students",
};

const SearchStudentsPage: FC = () => (
  <>
    <PageHeader parentURL="/examples">Search students</PageHeader>
    <SplitLayout ratio="list-detail">
      <div>
        <Search />
        <div className="-mx-4 sm:mx-0 sm:-mr-3 md:grow md:overflow-auto">
          <ul className="flex flex-col gap-1 pt-4 pb-6 sm:pr-3">
            <StudentCard name="Chatchai Charoen" classroom="604" selected />
            <StudentCard name="Pansa Santisakul" classroom="604" />
            <StudentCard name="Wasapol Rassameechot" classroom="604" />
          </ul>
        </div>
      </div>
      <SearchDetailsCard>
        <PersonHeader name="Chatchai Charoen" />
        <section className="relative grow">
          <Card
            appearance="filled"
            className="bg-surface-container absolute inset-0 flex flex-col gap-5 overflow-auto rounded-t-lg p-4 sm:overflow-visible md:overflow-auto"
          >
            <CurrentPeriodCard />
            <PersonInformationGrid />
            <PersonContactGrid />
          </Card>
        </section>
      </SearchDetailsCard>
    </SplitLayout>
  </>
);

export default SearchStudentsPage;
