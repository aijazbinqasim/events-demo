import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilterEvents() {
  const router = useRouter();

  const params = router.query.slug;

  if (!params) return <p className="center">Loading...</p>;

  const paramYear = Number(params[0]);
  const paramMonth = Number(params[1]);

  if (
    isNaN(paramYear) ||
    isNaN(paramMonth) ||
    paramYear > 2030 ||
    paramYear < 2021 ||
    paramMonth < 1 ||
    paramMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filters. Please adjust your filter values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const events = getFilteredEvents({
    year: paramYear,
    month: paramMonth,
  });

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events could be found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(paramYear, paramMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}

export default FilterEvents;
