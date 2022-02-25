import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
//import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilterEvents() {
  const [events, setEvents] = useState();
  const router = useRouter();
  const params = router.query.slug;

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data, error } = useSWR(
    "https://events-demo-e437b-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }
      setEvents(events);
    }
  }, [data]);

  if (!events) return <p className="center">Loading...</p>;

  const paramYear = Number(params[0]);
  const paramMonth = Number(params[1]);

  if (
    isNaN(paramYear) ||
    isNaN(paramMonth) ||
    paramYear > 2030 ||
    paramYear < 2021 ||
    paramMonth < 1 ||
    paramMonth > 12 ||
    error
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

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === paramYear &&
      eventDate.getMonth() === paramMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
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
      <EventList items={filteredEvents} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const params = context.params.slug;

//   const paramYear = Number(params[0]);
//   const paramMonth = Number(params[1]);

//   if (
//     isNaN(paramYear) ||
//     isNaN(paramMonth) ||
//     paramYear > 2030 ||
//     paramYear < 2021 ||
//     paramMonth < 1 ||
//     paramMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const events = await getFilteredEvents({
//     year: paramYear,
//     month: paramMonth,
//   });

//   return {
//     props: {
//       events: events,
//       date: {
//         paramYear: paramYear,
//         paramMonth: paramMonth,
//       },
//     },
//   };
// }
